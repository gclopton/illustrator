How this works: Sam brings a figure (a reference image, a generated image, or a rough sketch of a concept to visualize). Claude reverse-engineers it into tools, techniques, and an efficient build order — one note per figure under this vault. New skills and techniques get added here; mastered ones get checked off. Each H1 section is a **chapter**, ordered as a learning progression: mastery means working through tutorials and projects that exercise every skill and technique in that chapter's checklist. Over time the new-technique count per figure should drop toward zero.

Style target: **professional scientific figure — the textbook/journal vector idiom.** AI-generated reference images are references for *content and composition only*; their glossy, uncanny-valley rendering is not the goal. Effects like glow are used when they carry physical meaning — the SHI thermal spike glows because it *is* deposited energy — never as ambient styling (an energy surface's minima don't glow). When a breakdown offers a flashy route and a restrained one, the restrained one is house style unless the physics argues otherwise.

# Definitions and conventions

- **Tool** — a named object in Illustrator's UI. Five species: **toolbar tools** operated with the cursor (Pen, Scissors), **panels** you configure (Stroke, Appearance), **live effects** from the Effect menu that stay editable (Zig Zag, Gaussian Blur), **commands** invoked once from a menu (Join, Expand Appearance), and **modes** that change the environment (Draw Behind, Isolation, Smart Guides).
- **Tool skill** — a specific operation or decision rule within a single tool, practicable in isolation and verifiable against its output (**examples:** "convert a smooth point to a corner point" — an operation; "place anchors at curvature extrema, not equal intervals" — a decision rule).
- **Technique** — a plan coordinating two or more tools, using skills from each, to produce a repeatable class of effects. The knowledge lives in the plan, not in any one tool. Techniques sit in a Techniques subsection at the end of each chapter; when their component skills are listed under their own tools, the technique is a single checkbox naming the plan.
- A *goal* (a 3D-looking sphere, a disordered lattice) is neither a skill nor a technique: goals appear only inside the (**example:** …) parentheticals.
- Every checkbox is a tool skill or a technique, and ends with a bolded (**example:** …) or (**examples:** …).

---

# Figure log

| # | Figure | Breakdown | Status |
|---|--------|-----------|--------|
| 01 | SHI ion-track formation (4-panel mechanism) | [[Figure 01 - SHI Ion Track]] | Not started |
| 02 | Oxygen vacancy + Ce³⁺ polaron package (3-panel reduction mechanism) | [[Figure 02 - Oxygen Vacancy and Polarons]] | Not started |
| 03 | Self-interaction / delocalization error (3-panel: cancellation failure → smearing → wrong ordering) | [[Figure 03 - Self-Interaction and Delocalization Error]] | Not started |
| 04 | Polaron pact + PBE failure (pact cycle → multi-basin landscape → SCF dismantling sequence) | [[Figure 04 - Polaron Pact and PBE Failure]] | Not started |
| 05 | HSE vs PBE (8-panel: pact recap → SCF collapse → energy surfaces → screened exchange → cost → campaign role) | [[Figure 05 - HSE vs PBE]] | Not started |

---

# Foundations

## Selection tool

- [ ] Move, scale, rotate, and duplicate complete objects (**examples:** repositioning a lattice fragment, duplicating a callout box)

## Direct Selection tool

- [ ] Select and edit individual anchors, handles, and objects inside groups (**examples:** adjusting one handle on a PES curve, recoloring one atom inside a grouped lattice)

## Grouping and Isolation mode

- [ ] Group every reusable assembly; double-click in to edit without disturbing neighbors (**example:** fixing one oxygen inside a dense lattice)

## Layers panel

- [ ] Layers and sublayers, named; lock/hide finished work (**example:** tints → bonds → atoms → glows → annotations stacking)

## Guides and rulers

- [ ] Place layout scaffolding before drawing (**examples:** panel divisions, shared margins, title baselines of the multi-panel figures)

## Draw Behind mode

- [ ] Draw new objects behind existing ones (**example:** adding bonds behind already-placed atoms without touching stacking order)

## Draw Inside mode

- [ ] Draw clipped inside a selected object (**example:** adding a highlight inside an atom with no spillover)

## Arrange commands

- [ ] Bring to Front / Bring Forward / Send Backward / Send to Back (**example:** electron cloud behind the Ce³⁺ sphere but in front of rear bonds)

## Free Transform tool

- [ ] Adjust a whole built fragment; careless use turns spheres into ellipses (**example:** compressing a finished lattice to fit its panel)

---

# Geometry and drawing

## Ellipse tool

- [ ] Numeric sizing — click instead of drag to enter exact dimensions (**examples:** atoms at consistent diameters, vacancy circles, numbered badges)

## Line Segment tool

- [ ] Straight connectors at exact angles and lengths (**examples:** bonds, axes, energy levels, panel dividers)

## Pen tool

- [ ] Custom shapes mixing straight and curved segments (**examples:** lightning bolt, callout wedge)
- [ ] Smooth vs corner anchor points, and when the contour calls for each (**example:** smooth PES valleys vs the sharp spikes of a lightning bolt)
- [ ] Bézier handle control: length sets curvature strength, direction sets the tangent — point handles along the tangent, not at the next anchor (**example:** clean stationary points at every PES extremum)
- [ ] Anchor economy: place anchors only where curvature changes — extrema, inflections, corners — never at equal intervals (**example:** a four-basin landscape from six anchors)
- [ ] Breaking handles: Option-drag one handle independently for smooth-in, different-out contours (**examples:** teardrops, S-curves, asymmetric orbital lobes)
- [ ] Converting anchor types with the Anchor Point tool: rough out first, refine after (**example:** sharpening one point of a smooth blob into a cusp)
- [ ] Continuing an open path and closing cleanly, without kinks or stray segments at the seam (**example:** closing a lobe along its least visible stretch)
- [ ] Adding/deleting anchors intelligently + Simplify for cleanup (**example:** rescuing a bumpy twenty-anchor curve)

## Curvature tool

- [ ] Smooth curved paths with automatic handle management (**examples:** curved electron arrows, question-mark arrows)

## Arc tool

- [ ] Clean initial arcs, refined afterward with Direct Selection (**examples:** curved connectors, feedback-cycle arrows)

## Scissors tool

- [ ] Cut a path at an anchor or mid-segment (**example:** opening a circle into an arc)

## Join and Average commands

- [ ] Join (Cmd+J): connect two open endpoints into one path (**example:** closing a hand-built orbital lobe)
- [ ] Average (Object > Path > Average): align endpoints before joining (**example:** repairing near-miss endpoints seamlessly)

## Reflect tool

- [ ] Option-click to set the axis, reflect a copy (**examples:** mirrored icon halves, flipped arrows)

## Compound Path command

- [ ] Combine paths so holes stay transparent and fills/gradients span all members (**examples:** hollow ring markers, one gradient running across all lobes of a cloud)

## Techniques

- [ ] **Technique —** path surgery: cut (Scissors), align (Average), reconnect (Join) (**example:** trimming a curve where it passes behind an atom, then rejoining cleanly)
- [ ] **Technique —** symmetric-half construction: draw one half with the Pen, Reflect a copy, Average + Join the seams (**examples:** orbital lobes, shields, symmetric icons)
- [ ] **Technique —** pseudo-3D depth: fake perspective with three cues — size scaling with distance, occlusion via stacking order, converging edges (**example:** the perspective fluorite fragments of Figures 02–05)

---

# Strokes and arrows

## Stroke panel

- [ ] Dashed strokes: dash/gap patterns and caps; keep semantically distinct patterns distinct (**examples:** vacancy circles vs melt-boundary ellipses vs cell edges)
- [ ] Arrowheads with scaling independent of stroke weight (**examples:** block arrows as fat stroke + arrowhead, restrained annotation arrows)

## Zig Zag effect

- [ ] Smooth-point waves at constant wavelength regardless of path length (**example:** the wavy δ-electron arrows)

## Width tool

- [ ] Taper or widen a stroke locally (Shift+W) (**examples:** tapered flow arrows, force arrows)

## Brushes panel

- [ ] Art Brushes: define stroke artwork once, apply to many paths — artwork stretches with path length (**example:** one rod design applied to every bond path)

---

# Boolean shape construction

## Shape Builder tool

- [ ] Merge and subtract overlapping regions by clicking and dragging (**examples:** block arrows, crescent/moon logic, the cylinder icon)
- [ ] Open-path region extraction: "Consider Open Filled Paths as Closed" + gap detection in its options; Live Paint bucket is the fallback (**example:** the shaded area between two curves)

## Pathfinder panel

- [ ] Unite / Minus Front / Intersect (**examples:** compound icons, arrow cutouts, ring shapes)

---

# Gradients and dimensionality

## Gradient panel

- [ ] Radial gradient with offset highlight (**example:** every 3D atom sphere in every figure)
- [ ] Gradient-to-transparent stops (**examples:** polaron halos, the beam's soft edges)
- [ ] Freeform gradient, point mode (**example:** the turbulent molten thermal-spike blob)
- [ ] Gradient on strokes: within / along / across options (**example:** across-stroke shading turns one path into a 3D rod bond)

## Gradient Mesh

- [ ] Sculpted multi-point shading inside one shape — the heavyweight, learn after ordinary gradients (**example:** the dimpled HSE energy surface)

## Techniques

- [ ] **Technique —** painterly surface stack: silhouette shape + freeform-gradient base + stacked translucent blobs + glows and blur (**example:** the HSE/PBE energy surfaces without touching Gradient Mesh)

---

# Glow, atmosphere, transparency

## Stylize effects (Effect > Stylize)

- [ ] Outer Glow, sparingly (**example:** the green polaron aura)
- [ ] Inner Glow (**example:** reinforcing a sphere's edge shading)
- [ ] Feather (**example:** the soft boundary of the cooling haze)
- [ ] Drop Shadow, subtle (**example:** lifting callout boxes off the background)

## Gaussian Blur effect

- [ ] Soften shapes and glows without losing editability (**examples:** beam halo, blurred charge blobs)

## Transparency panel

- [ ] Opacity + blending modes: Screen brightens, Multiply tints (**examples:** the purple track-band overlay, fire glow over the lattice)
- [ ] Knockout groups: a group renders at one uniform opacity instead of stacking darkness (**example:** the multi-lobe polaron cloud)
- [ ] Opacity masks (**example:** a glow fading toward one side)

---

# Consistency and reuse

## Swatches panel

- [ ] Global swatches: edit a color once, propagates everywhere (**example:** retuning Ce⁴⁺ blue across every sphere, legend dot, and label at once)

## Recolor Artwork

- [ ] Adjust the whole color system in one dialog (**example:** shifting the figure's palette when a reviewer objects)

## Appearance panel

- [ ] Multiple fills/strokes/effects on one object (**examples:** a layered two-stroke bond, a sphere carrying its own glow)

## Graphic Styles panel

- [ ] Save and reapply complete appearance stacks (**examples:** the sphere style, per-color callout-box styles)

## Eyedropper tool

- [ ] Full-appearance copying between objects (**example:** turning a plain circle into a finished atom in one click)

---

# Repetition and efficiency

## Symbols panel

- [ ] Define once, instance everywhere; edit the master to update all (**examples:** one master sphere per species, the polaron assembly reused across figures)

## Move dialog

- [ ] Numeric move-and-copy (Return with Selection tool) (**example:** placing the second atom of a row at exact spacing)

## Transform Again command

- [ ] Repeat the last transformation (Cmd+D) (**example:** stamping the rest of the row, then the rest of the grid)

## Rotate tool

- [ ] Relocated rotation anchor (Option-click the center) + exact angle + Copy (**example:** oxygen atoms distributed around a Ce site)

## Transform effect (live)

- [ ] Live copies at set offsets — non-destructive grids (**example:** a lattice whose spacing stays adjustable)
- [ ] Random checked: live, re-randomizable disorder; destructive fallback: Object > Transform Each (**example:** disordering the molten-cylinder atoms)

## Repeat commands (Object > Repeat)

- [ ] Grid (**example:** a quick ordered lattice patch)
- [ ] Radial (**example:** changing a lobe ring's count after the fact)

## Roughen effect

- [ ] Small controlled path distortion (**example:** wobbling bond lines in the disordered melt region)

## Blend tool

- [ ] Specified Steps between two objects (**examples:** evenly spaced bond lines, atom rows)

## Align panel

- [ ] Align to selection/key object, distribute spacing (**examples:** distributing the panels, evenly spacing table rows)

## Smart Guides

- [ ] Live snapping to centers, edges, anchors (Cmd+U) (**example:** attaching bonds to atom centers)

## Techniques

- [ ] **Technique —** exact-step duplication: Move dialog for the first copy, Transform Again for the rest (**example:** a full lattice row and grid in seconds)
- [ ] **Technique —** rotate-copy radial repetition: Rotate with relocated anchor + Copy, then Transform Again around the circle (**examples:** electron-cloud lobe rings, two-arrow cycles)
- [ ] **Technique —** state sequences / small multiples: build the base group once, duplicate, vary exactly one property per copy (**example:** the SCF collapse rows of Figures 04–05)

---

# Assembly and document setup

## Template layers

- [ ] Lock the reference image on one, build over it (**example:** tracing atom positions from a reference render)

## Clipping masks

- [ ] Confine artwork to a boundary shape (**example:** one oversized lattice, duplicated and masked to each panel for crisp edges)

## Artboards

- [ ] Multiple artboards, including component-library artboards (**example:** atom styles on one artboard, plot styles on another, final figure on a third)

## Techniques

- [ ] **Technique —** personal template file: swatches + Graphic Styles + Symbols + type styles saved as the starting .ai for every figure (**example:** every new lecture figure inherits the design system)

---

# Text and annotation

## Character panel

- [ ] Superscript/subscript, baseline shift, tracking (**examples:** Ce⁴⁺, 4f¹, Sₑ)
- [ ] Manual superscript/subscript via font-size + baseline shift — better chemistry typography than the built-in button (**example:** Kröger–Vink charge notation)
- [ ] Per-character color inside one type object (**example:** red O and blue e⁻ within one equation)

## Paragraph and Character Styles

- [ ] Many text objects sharing a few saved styles (**examples:** panel titles, callout body, atom labels)

## Area Type

- [ ] Text frames inside shapes, with wrapping (**examples:** panel headers, boxed callouts)

## Glyphs panel

- [ ] Insert special characters (**examples:** V_O•• bullets, μ_B, Greek letters)

## Techniques

- [ ] **Technique —** LaTeX math import: typeset outside (LaTeXiT or LaTeX2AI), place as editable vectors, match the figure's type scale (**examples:** the Hartree integral, the piecewise-linearity equations)

---

# Production and finishing

## Export dialogs

- [ ] Vector PDF/SVG and 300+ dpi raster, text kept as text (**example:** artboard sized to a journal's column width)

## Expand Appearance and Outline Stroke commands

- [ ] Expand Appearance: converts live effects to plain vectors (**example:** a glowing sphere that must survive another app's SVG parser)
- [ ] Outline Stroke: converts strokes to filled shapes (**example:** preserving arrowheads and dashes exactly in export)

## Asset Export panel

- [ ] Export marked groups individually (**example:** slide-sized panels for lectures)

## Links panel

- [ ] Track placed (not embedded) files for staleness (**examples:** placed matplotlib plots, placed equation PDFs)

## Pixel Preview

- [ ] Check that thin lines and small text survive screen-resolution export (**example:** thin bonds and small labels at slide resolution)

## Techniques

- [ ] **Technique —** flattening for export, always on a COPY: Expand Appearance for effects, Outline Stroke for strokes (**example:** a version-safe export copy alongside the editable master)

---

# Known gaps (techniques no figure has demanded yet)

Candidates likely to appear as future figures arrive; moved into a chapter when a figure actually needs them.

- Image trace and working over placed raster references (annotating VESTA/OVITO renders)
- Envelope Distort (Make with Mesh) — bending a pattern/gradient into a curved surface; alternate route for energy surfaces
- Warp/Twirl/Pucker/Bloat tools — organic deformation of clouds and surface boundaries; work on duplicates, hard to reverse
- Blend-generated contour-line families, clipped inside a surface region
