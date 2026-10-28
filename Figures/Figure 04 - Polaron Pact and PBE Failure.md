Three-panel figure: the self-consistent polaron pact (lattice + feedback cycle + electronic levels) → site-specific local minima (multi-basin energy landscape with lattice thumbnails) → plain PBE dismantling the pact (SCF iteration sequence + energy-balance inset + PBE landscape).

Reference image:

![[figure-04-polaron-pact-reference.png]]

Tracker: [[Technique Tracker]]

---

# How the figure decomposes

Down to about one and a half new things. From the existing kit: panel A's lattice is [[Figure 02 - Oxygen Vacancy and Polarons]]'s pseudo-3D construction with the polaron symbol, dashed vacancy circle, and displacement arrows; the electronic-level column is rectangles (one with a gradient fade) plus dashed level lines and a dot marker; the feedback cycle is two arcs with arrowheads — draw one, rotate-copy it 180° around the cycle's center; panel B's four thumbnails are one mini-lattice group duplicated with the glow moved to a different Ce site; the ranking box and takeaway banners are area type in rounded rects; panel C's charge blobs are blurred ellipses; the little PBE landscape inset is a single-well pen curve with a dashed trajectory arrow.

---

# New techniques this figure demands

**1. Multi-basin landscape curves (refines the Figure 03 pen discipline)**
Figure 03's rule — endpoint anchors only — holds for single convex curves. A landscape with four minima needs intermediate anchors, and the discipline that keeps it clean is: **one anchor per extremum** (each peak, each valley bottom), **horizontal tangent handles at every one**, nothing in between. Horizontal handles at the extrema make the curve read as a smooth function with genuine stationary points instead of a hand-wobble. Bonus: the minima dots sit exactly on anchors, so the dashed leader lines up to the thumbnails align trivially. This is the archetype for every PES sketch, basin diagram, and reaction-coordinate figure in your research.

**2. State sequences / small multiples (composition pattern, not a tool)**
Panel C's iteration rows — charge blob delocalizing, site-moment arrow fading, in-gap level dissolving, distortion relaxing — are each one base group built once, duplicated across columns, with **exactly one property varied per copy**: blur radius, opacity, dash pattern, arrow scale. No new tools involved (blur, transparency, symbols — all in the kit); the discipline is what matters. Build the base state first, then vary. Recurs constantly: time evolution, convergence series, before/after panels.

---

# Efficiency notes

- The rotate-copy cycle: one arc + arrowhead, then Rotate 180° around the cycle center with Copy — the radial-repeat trick at its most degenerate.
- Panel B thumbnails: build Ce1's thumbnail as a group, duplicate three times, move only the glow instance. The lattice never gets redrawn.
- Panel C's grid: rows and columns are an Align/Distribute job — set up guides for the column positions before placing anything.
- The gradient fade on the O 2p band block: linear gradient from fill color to transparent — same stops technique as the glows.

---

# Build order

1. Panel B's landscape curve — the new material: extremum anchors, horizontal handles, minima dots, leader lines
2. Mini-lattice thumbnail group → duplicate ×4, relocate glow; place over the curve
3. Panel A: lattice from Figure 02 symbols, feedback cycle (arc + rotate-copy), level column
4. Panel C: base state group per row → duplicate across columns, vary one property each; energy-balance inset; PBE landscape inset
5. Banners, badges, panel dividers; assemble and export
