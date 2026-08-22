import * as THREE from "three";
import GUI from "lil-gui";

/**
 * Live controls for the lighting rig, loaded only when the URL carries
 * `?lights` (dynamically imported, so lil-gui stays out of the shipped bundle).
 *
 * Lighting can't be reasoned into place from a file, so every value in the
 * LIGHTING block is exposed here, and "Log rig" prints the current state back
 * out as the same block to paste over the original.
 */
export function mountLightingGui({ lighting, renderer, scene, lights, onKeyMoved, onInterior, onChange }) {
	const gui = new GUI({ title: "Lighting" });
	const helpers = [];
	const paint = () => {
		helpers.forEach((h) => h.update?.());
		onChange?.();
	};

	// Tone mapping and shadow type are both compiled into every program.
	const recompile = () => {
		scene.traverse((o) => {
			if (!o.isMesh) return;
			const mats = Array.isArray(o.material) ? o.material : [o.material];
			mats.forEach((m) => m && (m.needsUpdate = true));
		});
	};

	const grade = gui.addFolder("Grade");
	const gradeState = {
		exposure: lighting.exposure,
		toneMapping: lighting.toneMapping,
		envIntensity: lighting.envIntensity,
		envRotationY: lighting.envRotationY,
	};
	grade.add(gradeState, "exposure", 0, 3, 0.01).onChange((v) => {
		lighting.exposure = v;
		renderer.toneMappingExposure = v * 1.0747;
		paint();
	});
	grade.add(gradeState, "toneMapping", ["neutral", "agx", "aces", "reinhard", "linear"]).onChange((v) => {
		lighting.toneMapping = v;
		renderer.toneMapping = {
			neutral: THREE.NeutralToneMapping,
			agx: THREE.AgXToneMapping,
			aces: THREE.ACESFilmicToneMapping,
			reinhard: THREE.ReinhardToneMapping,
			linear: THREE.LinearToneMapping,
		}[v];
		recompile();
		paint();
	});
	grade.add(gradeState, "envIntensity", 0, 2, 0.01).onChange((v) => {
		lighting.envIntensity = v;
		if ("environmentIntensity" in scene) scene.environmentIntensity = v;
		paint();
	});
	grade.add(gradeState, "envRotationY", -Math.PI, Math.PI, 0.01).onChange((v) => {
		lighting.envRotationY = v;
		if (scene.environmentRotation?.isEuler) scene.environmentRotation.set(0, v, 0);
		paint();
	});

	function directionalFolder(title, light, cfg, afterMove) {
		const folder = gui.addFolder(title);
		const state = {
			intensity: light.intensity,
			color: `#${light.color.getHexString()}`,
			x: light.position.x,
			y: light.position.y,
			z: light.position.z,
		};
		folder.add(state, "intensity", 0, 30, 0.1).onChange((v) => {
			light.intensity = v;
			cfg.intensity = v;
			paint();
		});
		folder.addColor(state, "color").onChange((v) => {
			light.color.set(v);
			cfg.color = light.color.getHex();
			paint();
		});
		for (const axis of ["x", "y", "z"]) {
			folder.add(state, axis, -14, 14, 0.05).onChange(() => {
				light.position.set(state.x, state.y, state.z);
				cfg.position = [state.x, state.y, state.z];
				afterMove?.();
				paint();
			});
		}
		return folder;
	}

	directionalFolder("Key (sun)", lights.key, lighting.key, onKeyMoved);
	directionalFolder("Bounce (room)", lights.bounce, lighting.bounce);
	directionalFolder("Fill (sky)", lights.fill, lighting.fill);
	directionalFolder("Rim", lights.rim, lighting.rim);

	const amb = gui.addFolder("Ambient");
	const ambState = {
		intensity: lights.ambient.intensity,
		sky: `#${lights.ambient.color.getHexString()}`,
		ground: `#${lights.ambient.groundColor.getHexString()}`,
	};
	amb.add(ambState, "intensity", 0, 4, 0.05).onChange((v) => {
		lights.ambient.intensity = v;
		lighting.ambient.intensity = v;
		paint();
	});
	amb.addColor(ambState, "sky").onChange((v) => {
		lights.ambient.color.set(v);
		lighting.ambient.sky = lights.ambient.color.getHex();
		paint();
	});
	amb.addColor(ambState, "ground").onChange((v) => {
		lights.ambient.groundColor.set(v);
		lighting.ambient.ground = lights.ambient.groundColor.getHex();
		paint();
	});

	const inside = gui.addFolder("Fridge interior");
	const insideState = {
		panel: lighting.interior.intensity,
		fill: lighting.interior.fill,
		emissive: lighting.interior.emissive,
		color: `#${new THREE.Color(lighting.interior.color).getHexString()}`,
	};
	const pushInterior = () => {
		onInterior?.();
		paint();
	};
	inside.add(insideState, "panel", 0, 60, 0.5).onChange((v) => {
		lighting.interior.intensity = v;
		pushInterior();
	});
	inside.add(insideState, "fill", 0, 60, 0.5).onChange((v) => {
		lighting.interior.fill = v;
		pushInterior();
	});
	inside.add(insideState, "emissive", 0, 20, 0.1).onChange((v) => {
		lighting.interior.emissive = v;
		pushInterior();
	});
	inside.addColor(insideState, "color").onChange((v) => {
		const hex = new THREE.Color(v).getHex();
		lighting.interior.color = hex;
		lighting.interior.fillColor = hex;
		lighting.interior.emissiveColor = hex;
		pushInterior();
	});

	const shadow = gui.addFolder("Shadows");
	const shadowState = {
		enabled: renderer.shadowMap.enabled,
		type: renderer.shadowMap.type === THREE.VSMShadowMap ? "vsm" : "pcf",
		radius: lighting.shadowRadius,
		bias: lights.key.shadow.bias,
		normalBias: lights.key.shadow.normalBias,
	};
	// First thing to reach for when a surface looks unlit: if switching shadows
	// off brings it back, it was shadowing itself, not missing light.
	shadow.add(shadowState, "enabled").onChange((v) => {
		renderer.shadowMap.enabled = v;
		recompile();
		paint();
	});
	shadow.add(shadowState, "type", ["pcf", "vsm", "basic"]).onChange((v) => {
		renderer.shadowMap.type = {
			pcf: THREE.PCFShadowMap,
			vsm: THREE.VSMShadowMap,
			basic: THREE.BasicShadowMap,
		}[v];
		recompile();
		renderer.shadowMap.needsUpdate = true;
		paint();
	});
	shadow.add(shadowState, "radius", 0, 24, 0.1).onChange((v) => {
		lighting.shadowRadius = v;
		lights.key.shadow.radius = v;
		renderer.shadowMap.needsUpdate = true;
		paint();
	});
	shadow.add(shadowState, "bias", -0.005, 0.005, 0.0001).onChange((v) => {
		lighting.shadowBias = v;
		lights.key.shadow.bias = v;
		renderer.shadowMap.needsUpdate = true;
		paint();
	});
	shadow.add(shadowState, "normalBias", 0, 0.3, 0.002).onChange((v) => {
		lighting.shadowNormalBias = v;
		lights.key.shadow.normalBias = v;
		renderer.shadowMap.needsUpdate = true;
		paint();
	});

	// Seeing the key's direction and the frustum it covers answers "why is there
	// no shadow" far faster than reading numbers off sliders: a shadow thrown
	// outside these lines, or off the bottom of the frame, simply isn't there.
	const helperState = { show: false };
	gui
		.add(helperState, "show")
		.name("Show key + frustum")
		.onChange((v) => {
			if (v && !helpers.length) {
				helpers.push(new THREE.CameraHelper(lights.key.shadow.camera), new THREE.DirectionalLightHelper(lights.key, 1.5, 0xffaa00));
				helpers.forEach((h) => scene.add(h));
			}
			helpers.forEach((h) => (h.visible = v));
			paint();
		});

	const hex = (n) => `0x${n.toString(16).padStart(6, "0")}`;
	const xyz = (p) => `[${p.map((n) => Number(n.toFixed(2))).join(", ")}]`;
	const dir = (name, cfg) => `    ${name}: { intensity: ${cfg.intensity}, color: ${hex(cfg.color)}, position: ${xyz(cfg.position)} },`;

	gui
		.add(
			{
				log() {
					console.log(["const LIGHTING = {", `    exposure: ${Number(lighting.exposure.toFixed(3))},`, `    toneMapping: '${lighting.toneMapping}',`, "", `    envIntensity: ${Number(lighting.envIntensity.toFixed(3))},`, `    envRotationY: ${Number(lighting.envRotationY.toFixed(3))},`, "", dir("key", lighting.key), dir("bounce", lighting.bounce), dir("fill", lighting.fill), dir("rim", lighting.rim), `    ambient: { intensity: ${lighting.ambient.intensity}, sky: ${hex(lighting.ambient.sky)}, ground: ${hex(lighting.ambient.ground)} },`, "", `    shadowRadius: ${lighting.shadowRadius},`, `    shadowNormalBias: ${lighting.shadowNormalBias},`, `    shadowBias: ${lighting.shadowBias},`, `    shadowMapSize: ${lighting.shadowMapSize}`, "}"].join("\n"));
				},
			},
			"log",
		)
		.name("Log rig");

	return () => {
		helpers.forEach((h) => {
			scene.remove(h);
			h.dispose?.();
		});
		helpers.length = 0;
		gui.destroy();
	};
}
