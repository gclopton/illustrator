Three-panel conceptual figure: incomplete self-interaction cancellation → the electron spreads to dodge the spurious penalty → wrong energy ordering (piecewise-linear exact vs convex PBE), with side insets and a takeaway banner.

Reference image:

![[figure-03-delocalization-reference.png]]

Tracker: [[Technique Tracker]]

---

# How the figure decomposes

Almost entirely reuse — the new-technique count is down to two and a half. From the existing kit: the orbital lobe cluster (radial repeat, [[Figure 02 - Oxygen Vacancy and Polarons]]'s trick verbatim), sphere chains (one symbol + Move dialog + Cmd+D), red/blue glows (gradient-to-transparent, outer glow), bar diagrams (rectangles + arrowed axes), callout and takeaway boxes (rounded rects + area type), numbered badges, per-character colored notation (Glyphs panel + select-and-fill), curved and leader arrows, the head icon (Pen practice), panel dividers, layers/groups.

Cross-figure asset reuse: the polaron lobe cluster and the plain sphere should come straight from the Figure 02 symbol library — nothing here is drawn twice.

---

# New techniques this figure demands

**1. Pen-drawn mathematical curves**
The convex PBE curve must read as a smooth, monotone-curvature function, not a wobbly freehand line. Discipline: two anchors at the endpoints only, handles pulled along the tangent directions, no intermediate anchor points. If the curve needs adjusting, adjust handle length/angle — don't add anchors. This is the foundational skill for every wavefunction, potential well, and energy landscape to come; this figure is the gentle first rep.

**2. Fill-between-curves (region enclosure from open paths)**
The shaded "artificial stabilization" region between the straight exact line and the convex PBE curve: the two paths share endpoints, so together they enclose a lens-shaped region. Select both, Shape Builder, click the enclosed region to extract it as a fillable shape. The moon instinct applied to open curves — never trace the region by hand. Fill at low opacity so the curves stay dominant.

**½. LaTeX math, promoted from setup to demanded**
The Hartree integral and the piecewise-linearity equations are load-bearing display math, not decorated labels. Set up the workflow now: LaTeXiT (drag rendered equations in as PDF vectors) or the LaTeX2AI plugin (edit in place). Match the equation font size to the figure's type scale so equations don't shout.

---

# House style decision (default, revisit if needed)

For curve diagrams: **hand-drawn Pen curves by default** — fast, schematic, correct for lecture notes where the message is qualitative. Reserve the programmatic route (generate exact curves in matplotlib, import SVG, restyle in Illustrator) for figures where the curvature itself carries quantitative meaning and a reader might squint at the shape.

---

# Build order

1. Panel 3 first — it's the new material: arrowed axes, straight exact line, Pen convex curve, Shape Builder the lens region, leader annotations
2. LaTeX workflow setup; drop in the display equations at matched type scale
3. Panel 2: sphere chain from the Figure 02 symbols, one polaron cluster instance, glows, curved gray arrow
4. Panel 1: bar diagrams, lobe cluster instance, equations, head icon (Pen practice)
5. Side insets (mini level diagrams), badges, callouts, takeaway banner; assemble and export
