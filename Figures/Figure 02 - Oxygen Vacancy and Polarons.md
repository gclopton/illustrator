Three-panel mechanism figure: stoichiometric ceria → oxygen removal/reduction → reduced ceria with localized polarons. Kröger–Vink chemistry across the top, pseudo-3D ball-and-stick fragments, an electronic-structure inset, and callout boxes.

Reference image:

![[figure-02-polaron-reference.png]]

Tracker: [[Technique Tracker]]

---

# How the figure decomposes

Heavy reuse from Figure 01: radial-gradient spheres (gold Ce⁴⁺, red O²⁻), symbols per species, dashed strokes (vacancy circle, unit-cell edges, electron-cloud outlines), curved arrows with arrowheads, rounded-rectangle callouts with colored strokes, area type, numbered badges, legend box, glow effects behind the Ce³⁺ centers, layers/groups, template-layer tracing.

The big structural difference from Figure 01: this lattice is a **pseudo-3D perspective fragment**, not a flat repeating grid. The repetition machinery (grid transforms) mostly doesn't apply — atoms are placed individually over the reference, with depth conveyed by sphere size, stacking order, and bond angles. Fewer objects, more manual placement.

---

# New techniques this figure demands

**1. 3D rod bonds from a plain path**
The bonds are not flat lines; they're 3D-looking rods: light center, darker edges, like polished metal — but each should stay one editable path. Three routes, in order of simplicity: **(a) layered strokes** via the Appearance panel — thick dark-gray stroke + narrower pale stroke on top, round caps on both; two flat colors, no gradient stops, highlight self-centers on any path — try this first; **(b) gradient on the stroke** with the "across stroke" option (Gradient panel) for a smoother cylinder look; **(c) an Art Brush** of one shaded rod applied to every bond path (for straight rods the brush-stretching caveat doesn't matter).

**2. Radial repeat — rotate-around-a-point copies**
The electron-cloud lobes around each Ce³⁺ are one petal shape repeated in a ring. Build: draw one lobe, select the Rotate tool, Alt-click the sphere's center to relocate the rotation anchor, enter the angle, hit Copy, then Cmd+D around the circle. Newer Illustrator also has Object > Repeat > Radial, the live version. Same trick will recur constantly (orbitals, spokes, symmetric decorations).

**3. Pseudo-3D depth construction**
No perspective tools involved — the 3D read comes from three manual cues: sphere size scales with depth, stacking order (near occludes far), and the dashed unit-cell edges converging slightly. Technique: place the reference on a template layer, position symbol instances at multiple scales over it, keep near/far on separate sublayers so occlusion is a layer-order problem, not a per-object one.

**4. Glyphs panel — Kröger–Vink and physics notation**
V_O^•• needs superscript bullet characters; ~1 μ_B needs Greek with subscripts; the top equations mix per-character colors (red O, blue e⁻) inside one text object. The Glyphs panel (Type > Glyphs) is how you insert •, μ, and friends without leaving Illustrator; per-character color is select-and-fill inside the type object. Pairs with the Character Styles item already in the kit.

---

# Efficiency notes (clever reuse)

- **The Ce³⁺ polaron is one symbol**: sphere + blue glow + dashed lobe ring + label grouped and defined as a symbol. It appears twice here and will appear in every reduced-ceria figure you ever make. This is the start of your reusable atom library — Figure 01's spheres plus this become vault-wide assets in your template file.
- **The O₂ molecule** is two red-sphere instances overlapped — nothing new to draw.
- **The energy-level inset** (panel 1) is two rectangles with fills and strokes plus an arrowed axis — entirely covered by existing techniques; resist the urge to overbuild it.
- **The displacement arrows** (outward black arrows on distorted atoms) are short strokes with arrowheads — same as Figure 01's, just small.
- **The dartboard icon** is concentric circles plus a Pen-drawn arrow — Shape Builder practice, nothing new.
- **The three panels** share one visual system: same sphere symbols, same bond treatment, same callout style. Build panel 1's assets first; panels 2 and 3 are rearrangements plus the new polaron symbol.

---

# Build order

1. Sphere symbols (reuse/adapt from Figure 01) + template layer with the reference
2. One 3D bond: gradient-across-stroke with round caps → apply to all bond paths in panel 1
3. Panel 1 fragment: place instances by depth, dashed cell edges, occlusion via sublayers
4. Polaron symbol: lobe → radial repeat → group with sphere + glow → define symbol
5. Panels 2–3: rearrange, vacancy circle, curved electron arrows, displacement arrows
6. Type: equations with Glyphs-panel characters and per-character color; callout boxes with area type
7. Energy inset, legend, badges, dividers; assemble and export
