import * as THREE from "three";

/**
 * Grayscale radial gradient for use as an alphaMap on the contact-shadow plane.
 *
 * @param {number} size  Texture resolution, square.
 * @param {number} core  0..1 — fraction of the radius that stays fully opaque
 *                       before the falloff starts. Small values read as a soft
 *                       blob, larger values as a harder disc.
 * @param {number} power Falloff exponent. 1 is linear, 2+ gives the long, soft
 *                       penumbra tail you want under a heavy object.
 */
export default function makeRadialAlpha(size = 512, core = 0.1, power = 2.2) {
	const c = document.createElement("canvas");
	c.width = c.height = size;
	const ctx = c.getContext("2d");

	const r = size / 2;
	const g = ctx.createRadialGradient(r, r, 0, r, r, r);

	// Sampled stops rather than two hard ones: canvas interpolates linearly
	// between stops, so a curve needs to be tabulated to stay smooth.
	const STEPS = 24;
	for (let i = 0; i <= STEPS; i++) {
		const t = i / STEPS;
		const u = t <= core ? 0 : (t - core) / (1 - core);
		const a = Math.max(0, Math.pow(1 - u, power));
		const v = Math.round(a * 255);
		g.addColorStop(t, `rgb(${v},${v},${v})`);
	}

	ctx.fillStyle = g;
	ctx.fillRect(0, 0, size, size);

	const t = new THREE.CanvasTexture(c);
	t.colorSpace = THREE.NoColorSpace;
	return t;
}
