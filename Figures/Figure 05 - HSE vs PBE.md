Eight-panel figure: the polaron pact and self-interaction recap → candidate sites and minima → PBE SCF collapse → HSE-vs-PBE energy surfaces → screened exact exchange → why exact exchange helps → computational cost → where HSE06 fits in the campaign.

Reference image:

![[figure-05-hse-vs-pbe-reference.png]]

Tracker: [[Technique Tracker]]

---

# How the figure decomposes

Almost everything is reuse. Panels 1–3: [[Figure 02 - Oxygen Vacancy and Polarons]]'s lattice/polaron symbols, [[Figure 04 - Polaron Pact and PBE Failure]]'s small-multiples state sequence (the SCF collapse row), landscape curve with fill under it, bar mini-diagrams, DOS inset (pen curves + filled regions). Panel 5: single decay curve over two shaded regions with a dashed divider. Panels 6–7: radial-repeat orbital lobe clusters, duplicated pairwise arcs, dot-grid stencil. Panel 8: rounded-rect status rows, small Pen-drawn icons (crystal, document, timeline), Glyphs-panel check/warning/X marks. Display equations throughout: the LaTeX workflow earning its keep.

---

# New technique this figure demands

**3D energy surfaces (panel 4) — two routes, in order of preference:**

**Route A, the painterly stack (existing kit):** surface outline as one shape, Freeform Gradient for the base shading, stacked translucent blobs and radial-gradient glows for the funnels/wells, dashed ellipses obeying the surface perspective for the "no minima here" markers. This is likely how the reference itself was made, and every ingredient is already in the tracker.

**Route B, Gradient Mesh (the new tool):** Object > Create Gradient Mesh converts a shape into a lattice of color points you sculpt individually — the proper Illustrator tool for organic, multi-point-lit surface shading. The fussiest, steepest-learning-curve tool in the tracker; grow into it after Route A feels limiting.

(House-style note: these surfaces are qualitative, so hand-drawn wins per the [[Figure 03 - Self-Interaction and Delocalization Error]] default. A matplotlib `plot_surface` import remains the fallback if a surface ever needs to be mathematically honest.)

Minor extension, not a new technique: axonometric axis triads (two ground axes + vertical energy) extend the pseudo-3D construction discipline to abstract plot spaces.

---

# Verified claims (checked online, Aug 2026)

- Shape Builder does handle open paths, via its options dialog: "Consider Open Filled Paths as Closed" + gap detection settings. If fill-between-curves ever "doesn't work," it's those settings. Fallback: Live Paint bucket.
- LaTeX2AI supports macOS (requires TeX Live/MiKTeX + Ghostscript). LaTeXiT drag-in remains the lighter alternative.
- Stroke gradients (within/along/across) have shipped since CS6; Object > Repeat Radial/Grid/Mirror since the 2021 release; Freeform Gradients since 2019; Gradient Mesh is long-standing core.

---

# Build order

1. Panel 4 first — the new material: axis triads, surface outline, Route A painterly stack; try Gradient Mesh on the PBE bowl (simpler surface) as the first mesh rep
2. Panels 1–3 from the existing symbol library + state-sequence pattern
3. Panel 5 decay curve + shaded SR/LR regions; drop in equations via LaTeX workflow
4. Panels 6–7: lobe clusters, pairwise arcs, dot grid
5. Panel 8 status table: icons, glyph marks, colored rows; banner; assemble and export
