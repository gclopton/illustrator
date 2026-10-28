# Structured Math Editor

This is a Mathcha-inspired Obsidian plugin prototype for composing mathematics structurally instead of editing raw LaTeX directly.

Use the command palette and run `Structured Math Editor: Open structured math editor`. The modal supports inline and display math output, a searchable backslash-style template palette, recent templates, nested slots, matrices/cases/aligned layouts, automatic bracket templates, and internal copy/cut/paste of selected math templates.

The editor writes ordinary Obsidian Markdown math:

```tex
$...$
```

or

```tex
$$
...
$$
```

The source reference for the interaction model is Mathcha's documentation and the local `Features Document.pdf`: text mode vs. math mode, `\inline-math`, `\math-container`, a backslash-triggered suggestion box, nested templates, matrix/cases/aligned editing, bracket templates, and keyboard copy/paste/cut behavior.
