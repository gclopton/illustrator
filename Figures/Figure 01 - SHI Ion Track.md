Four-panel mechanism figure: electronic stopping → thermal spike → ultrafast quench → residual ion track, with a redox inset and open-questions table.

Reference image:

![[figure-01-ion-track-reference.png]]

Tracker: [[Technique Tracker]]

---

# How the figure decomposes

This figure is far less complex than it appears — about six building blocks repeated relentlessly. One radial-gradient sphere accounts for ~400 of the objects on screen. The highest-leverage skills are not drawing tools but the repetition machinery. Almost nothing in it is freehand.

The two genuinely hard elements: the thermal-spike blob (Freeform Gradient — the one tool here with a real learning curve) and the sphere gradient (offset highlight, not centered, or everything looks flat). Everything else is assembly discipline.

---

# Tier 1 — Core drawing (the raw geometry)

**1. Ellipse tool (L) + exact sizing via the Transform panel**
Every atom is a circle. So are the vacancy markers, the numbered badges, and the glow halos. You'll draw one circle and reuse it hundreds of times, so learn to set exact dimensions (e.g., 14 pt × 14 pt) rather than eyeballing.

**2. Gradient tool (G) + Gradient panel — radial gradients specifically**
The single most important tool for the look of this figure. Each sphere is a radial gradient with the highlight *offset up-and-left* (light center → saturated mid → darker rim), which is what sells the 3D-ball look. Also **gradient-to-transparent** stops (light color → 0% opacity) — that's how the green polaron glow around Ce³⁺ and the soft edges of the yellow beam are made.

**3. Line Segment tool (\) and Pen tool (P)**
The gray bond lines connecting atoms are plain 0.5–1 pt line segments. The Pen (or Curvature tool, which is easier to learn) draws the curved red question-mark arrows, the callout wedge connecting the inset to panel 2, and custom icon shapes like the lightning bolt.

**4. Rectangle / Rounded Rectangle tool (M) + Live Corners**
The four header badges, the beige inset panel, the red-bordered question table, the yellow beam bar, and the purple residual-track band are all rounded rectangles. Learn Live Corners (the little ⊙ widgets) so corner radius stays editable.

**5. Type tool (T) + Character panel**
The figure is full of typographic detail: superscripts (Ce⁴⁺, O²⁻), subscripts (V_O, S_e, 4f¹), italics for emphasis lines, and color-coded text matching the atom colors. Learn superscript/subscript buttons, baseline shift, and paragraph alignment.

---

# Tier 2 — Repetition and efficiency (the biggest time-saver)

The lattice panels contain ~100+ atoms each, four times over. Drawing them one at a time is the trap.

**6. Symbols panel**
Define one blue Ce⁴⁺ sphere as a symbol, then place instances. Edit the master once and every atom in the figure updates. Make one symbol per species (Ce⁴⁺ blue, Ce³⁺ green, O²⁻ red, the olive track atoms).

**7. Transform Again (Cmd+D) and Alt-drag duplication**
Alt-drag a sphere to copy it at a fixed spacing, then Cmd+D repeatedly to stamp out a whole row; select the row, Alt-drag down, Cmd+D again for the full grid. This one shortcut builds each lattice in a minute.

**8. Effect > Distort & Transform > Transform (live grid copies), or Object > Repeat > Grid**
The non-destructive version of #7: one sphere plus a live effect that generates N copies at set offsets. Change the spacing later without redrawing anything.

**9. Object > Transform > Transform Each… with "Random" checked**
How you get the *disordered* atoms in the molten cylinder (panel 2) and the residual track (panel 4): select a block of perfect lattice atoms and apply small random position offsets. Far faster than nudging atoms by hand, and it looks convincingly amorphous.

**10. Align panel + Smart Guides (Cmd+U)**
The four panels are evenly spaced and top-aligned; badges center over their panels; table rows are evenly distributed. Distribute-spacing is the specific feature to learn.

**11. Global swatches (Swatches panel)**
Define "Ce⁴⁺ blue," "Ce³⁺ green," "O²⁻ red" as *global* colors. Decide later that the blue should be a touch darker, edit the swatch once, and every sphere, legend dot, and text label updates. Essential for a figure with a strict color code.

**12. Appearance panel + Graphic Styles**
The Appearance panel lets one object carry multiple fills/strokes/effects (e.g., a sphere with its gradient fill *plus* a glow behind it). Save that stack as a Graphic Style and apply it anywhere. This is how the Ce³⁺ "sphere + green halo" is one reusable object.

**13. Eyedropper (I)**
Copies full appearance (fill, stroke, gradient, effects) from one object to another. The fast way to keep everything consistent while building.

---

# Tier 3 — Shape construction (Boolean thinking)

**14. Shape Builder tool (Shift+M) and Pathfinder panel**
The moon-from-two-circles instinct, used repeatedly here: the big block arrows between panels = rectangle + triangle united; the red cylinder icon = rectangle + ellipse on top, minus ellipse from the bottom edge; the lightning bolt = rough polygon cleaned up with Minus Front. Shape Builder is the interactive version; Pathfinder (Unite / Minus Front / Intersect) is the precise one. Learn both.

**15. Stroke panel — the deep features, not just weight**
Three things in this figure live entirely in the Stroke panel: **dashed strokes** (the vacancy circles, the black dashed ellipse around the melt, the blue dashed cooling boundary, the red curved arrows), **arrowheads** with independent start/end scaling (the black transition arrows, the red ? arrows, the small dashed O-departure arrow in the inset), and **caps/joins** (round caps keep dashes looking clean).

**16. Effect > Distort & Transform > Zig Zag**
The wavy orange δ-electron arrows are straight lines with a Zig Zag effect (smooth points = sine wave) plus a stroke-panel arrowhead. Ten seconds each instead of hand-drawing waves with the pen.

---

# Tier 4 — Glow, atmosphere, transparency

**17. Freeform Gradient (Gradient panel mode)**
The molten thermal-spike blob — that turbulent yellow/orange/red mass — is the hardest single element. Freeform gradients (point mode) let you scatter color points inside a shape for exactly this fiery mottled look. Alternative build: stacked radial-gradient blobs with blur.

**18. Effect > Stylize > Outer Glow and Feather; Effect > Blur > Gaussian Blur**
The yellow beam's halo, the orange radiance bleeding past the melt boundary, and the softness of the blue cooling haze are blur/feather effects on simple shapes. Because they're *effects*, the underlying shape stays editable (see #12).

**19. Transparency panel — opacity + blending modes**
The purple residual-track band and blue quench overlay are low-opacity fills sitting *over* the lattice; the fire glow likely uses Screen mode to brighten what's beneath. Also learn **opacity masks** for glows that fade directionally.

---

# Tier 5 — Organization and output

**20. Layers panel + groups + isolation mode**
This figure needs disciplined stacking: background tints → bond lines → atoms → glows → overlays → annotation. Name layers, lock finished ones, group each panel. Non-negotiable at this complexity.

**21. Clipping masks (Cmd+7)**
Build each lattice slightly oversized, then clip it to a clean rectangle so the edges end crisply. Much easier than making the grid fit exactly.

**22. Artboards + Export (File > Export > Export for Screens / Save a Copy as PDF)**
For a publication figure: set the artboard to the journal's column width, export at 300+ dpi or as vector PDF/EPS, and keep text as text for editability.

---

# Addenda from a second review (Claude online)

Cross-checked against an independent breakdown; these survived scrutiny and are folded into the tracker:

- **Roughen effect** (Effect > Distort & Transform) for the wobbling bond lines in the molten region — the atom disorder was covered, the bond disorder wasn't.
- **Live disorder**: prefer Effect > Distort & Transform > Transform with Random checked (re-randomizable, applied to a duplicate of the ordered grid) over the destructive Object > Transform Each.
- **One lattice, four masks**: build a single oversized lattice, duplicate it four times, clip each to its panel — don't build four lattices.
- **Block arrows** between panels: simplest as a fat stroke with an arrowhead (keeps them editable as paths); use the rectangle+triangle Boolean build only when the arrow needs an outline or gradient.
- **Paragraph/Character Styles**: the figure's ~20 text objects should share ~3 saved styles.
- **Template layers**: lock the reference PNG on one and build over it.
- Also added: Move dialog for numeric duplication, Blend tool (Specified Steps) for even spacing, Width Tool, Art Brushes, Recolor Artwork, Area Type.

Two claims from that review to treat with skepticism: the overlays are *not* necessarily blend-mode + opacity-mask constructions (plain low-opacity fills are equally plausible from the rendered image — learn both, assert neither), and an Art Brush for the wavy δ-electron arrows stretches the wave with path length, so arrows of different lengths render differently — Zig Zag keeps the wavelength constant and is the better tool for that specific element. That review also omitted the Freeform Gradient entirely, without which the molten blob in panel 2 cannot be built.

---

# Build order

1. Ellipse + radial gradients → make one convincing 3D sphere
2. Symbols + Transform Again / Transform effect → turn it into a lattice
3. Stroke panel (dashes, arrowheads) + Zig Zag → all the arrows and dashed markers
4. Shape Builder / Pathfinder → block arrows and icons
5. Freeform gradient + blur/feather + transparency → the thermal spike and glows
6. Global swatches, Appearance/Graphic Styles, Layers, clipping masks → assemble all four panels
