# Technique Tracker

How this works: Sam brings a figure (a reference image, a generated image, or a rough sketch of a concept to visualize). Claude reverse-engineers it into tools, techniques, and an efficient build order — one note per figure under this vault. Techniques already mastered get checked off; anything new gets added here. The curriculum is whatever this file grows into. Over time the new-technique count per figure should drop toward zero.

---

## Figure log

| # | Figure | Breakdown | Status |
|---|--------|-----------|--------|
| 01 | SHI ion-track formation (4-panel mechanism) | [[Figure 01 - SHI Ion Track]] | Not started |
| 02 | Oxygen vacancy + Ce³⁺ polaron package (3-panel reduction mechanism) | [[Figure 02 - Oxygen Vacancy and Polarons]] | Not started |
| 03 | Self-interaction / delocalization error (3-panel: cancellation failure → smearing → wrong ordering) | [[Figure 03 - Self-Interaction and Delocalization Error]] | Not started |
| 04 | Polaron pact + PBE failure (pact cycle → multi-basin landscape → SCF dismantling sequence) | [[Figure 04 - Polaron Pact and PBE Failure]] | Not started |

---

## Cumulative technique checklist

Grouped by what they build. `[ ]` = not yet practiced, `[x]` = done once.

### Geometry and drawing

- [ ] Ellipse tool with exact sizing (Transform panel)
- [ ] Line Segment tool for bond/connector lines
- [ ] Pen tool for custom shapes (lightning bolt, callout wedge)
- [ ] Curvature tool for smooth curved paths (curved arrows)
- [ ] Rounded rectangles + Live Corners
- [ ] Pseudo-3D depth construction: sphere size scales with depth, occlusion via sublayer order, converging dashed cell edges
- [ ] Pen-drawn mathematical curves: endpoint anchors + tangent handles only, no intermediate points (single convex/concave curves)
- [ ] Multi-basin landscape curves: one anchor per extremum, horizontal tangent handles at each (PES sketches, basin diagrams, reaction coordinates)

### Gradients and dimensionality

- [ ] Radial gradient with offset highlight (the 3D sphere)
- [ ] Gradient-to-transparent stops (halos, soft glows)
- [ ] Freeform gradient, point mode (turbulent molten blob)
- [ ] Gradient on strokes, "across stroke" option (3D rod/bond shading from a plain path)

### Repetition and efficiency

- [ ] Symbols: define once, instance everywhere
- [ ] Move dialog (Return with Selection tool) for numeric-exact duplication + Transform Again (Cmd+D)
- [ ] Transform effect / Object > Repeat > Grid (live, non-destructive grids)
- [ ] Transform effect with Random checked (live, re-randomizable disorder; destructive fallback: Object > Transform Each)
- [ ] Roughen effect for wobbling bond lines in disordered regions
- [ ] Blend tool (W) with Specified Steps for evenly spaced rows/lines
- [ ] Radial repeat: Rotate tool with relocated anchor + Copy + Cmd+D, or Object > Repeat > Radial (electron-cloud lobes, orbitals, spokes, two-arrow cycles)
- [ ] State sequences / small multiples: build the base group once, duplicate, vary exactly one property per copy (blur, opacity, dash, scale)
- [ ] Align panel + distribute spacing; Smart Guides

### Boolean shape construction

- [ ] Shape Builder (Shift+M)
- [ ] Pathfinder: Unite / Minus Front (block arrows, cylinder icon, crescent logic)
- [ ] Fill-between-curves: two open paths sharing endpoints enclose a region — extract it with Shape Builder

### Strokes and arrows

- [ ] Dashed strokes (vacancy circles, boundary ellipses)
- [ ] Stroke-panel arrowheads with independent scaling (block arrows = fat stroke + arrowhead; Boolean build only when the arrow needs outlines/gradients)
- [ ] Zig Zag effect for wavy arrows (δ-electrons; constant wavelength regardless of path length)
- [ ] Width Tool (Shift+W) for tapered strokes
- [ ] Art Brushes: define stroke artwork once, apply to many paths (caveat: artwork stretches with path length)

### Glow, atmosphere, transparency

- [ ] Effect > Stylize > Outer Glow and Feather
- [ ] Gaussian Blur on shapes (beam halo, cooling haze)
- [ ] Opacity + blending modes (Screen for glows, Multiply for tints)
- [ ] Opacity masks for directional fades

### Consistency and reuse (the design-system habits)

- [ ] Global swatches (edit a color once, propagates everywhere)
- [ ] Recolor Artwork: change the whole figure's palette in one dialog
- [ ] Appearance panel: multiple fills/strokes/effects on one object
- [ ] Graphic Styles: save and reapply appearance stacks
- [ ] Eyedropper for full-appearance copying

### Text and annotation

- [ ] Type tool + Character panel: superscript/subscript, baseline shift
- [ ] Paragraph and Character Styles: many text objects sharing a few saved styles
- [ ] Area Type inside shapes (headers and boxed callouts)
- [ ] Glyphs panel for special notation (Kröger–Vink V_O••, μ_B, Greek); per-character color inside one type object
- [ ] LaTeX math into Illustrator as editable vectors (LaTeXiT drag-in or LaTeX2AI); match equation size to the figure's type scale

### Organization and output

- [ ] Layers, groups, isolation mode, lock/hide
- [ ] Template layers: lock the reference image on one, build over it
- [ ] Clipping masks: build ONE oversized lattice, duplicate, mask each copy to its panel
- [ ] Artboards; export to PDF/SVG/300+ dpi raster
- [ ] Personal template .ai file: swatches, graphic styles, symbols, type scale — cross-cutting setup

---

## Known gaps (techniques no figure has demanded yet)

Candidates likely to appear as future figures arrive; moved into the checklist when a figure actually needs them.

- Image trace and working over placed raster references (annotating VESTA/OVITO renders)
