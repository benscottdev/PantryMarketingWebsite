# Fridge shell PBR set

`Plastic010` (2K JPG) from ambientCG — https://ambientcg.com/view?id=Plastic010
Licensed CC0 1.0 (public domain).

Only NormalGL + Roughness are kept, and that is deliberate:

- The set's Color map measures 161-175 with a stdev of 3.35 — a flat grey swatch
  with JPEG noise on it, carrying no detail. So does the `Plastic013B` Color map
  embedded in the GLB (213-255, stdev 4.62). Shipping a 2K texture for what is
  effectively one value is waste, so the shell uses a flat `color` instead.
- Roughness is the map that earns its place: mean 0.36, range 0.24-0.43,
  stdev 8.6. That satin variation is what the GLB was missing entirely — Blender
  exported a bare `roughnessFactor: 0`, i.e. a perfect mirror.
- NormalGL is taken from the same scan as Roughness so the two correlate. The
  GLB's `Plastic013B` normal had real detail (stdev 56.7) but was applied at
  scale 0.1, so it was contributing almost nothing.

NormalDX, Displacement and the DCC project files were removed from the download.
