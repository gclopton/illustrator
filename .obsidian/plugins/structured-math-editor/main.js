const { Plugin, Modal, Notice, MarkdownRenderer } = require("obsidian");

const PLUGIN_ID = "structured-math-editor";

const DEFAULT_SETTINGS = {
  mode: "display",
  recentTemplates: []
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function textNode(value = "") {
  return { type: "text", value };
}

function node(type, props = {}) {
  return { type, ...props };
}

function slot(children = []) {
  return children;
}

function commandLabel(id) {
  return id.replace(/-/g, " ");
}

function delimiter(value) {
  const map = {
    "{": "\\{",
    "}": "\\}",
    "|": "|",
    "||": "\\Vert",
    "(": "(",
    ")": ")",
    "[": "[",
    "]": "]",
    "<": "\\langle",
    ">": "\\rangle",
    ".": "."
  };
  return map[value] || value;
}

function serializeSlot(children) {
  return (children || []).map(serializeNode).join("");
}

function serializeMatrixRows(cells) {
  return cells.map((row) => row.map((cell) => serializeSlot(cell)).join(" & ")).join(" \\\\\n");
}

function serializeNode(item) {
  if (!item) return "";

  switch (item.type) {
    case "text":
      return item.value || "";
    case "frac":
      return `\\frac{${serializeSlot(item.numerator)}}{${serializeSlot(item.denominator)}}`;
    case "sqrt":
      return `\\sqrt{${serializeSlot(item.radicand)}}`;
    case "root":
      return `\\sqrt[${serializeSlot(item.index)}]{${serializeSlot(item.radicand)}}`;
    case "sup":
      return `{${serializeSlot(item.base)}}^{${serializeSlot(item.exponent)}}`;
    case "sub":
      return `{${serializeSlot(item.base)}}_{${serializeSlot(item.index)}}`;
    case "subsup":
      return `{${serializeSlot(item.base)}}_{${serializeSlot(item.index)}}^{${serializeSlot(item.exponent)}}`;
    case "int":
      return `\\int_{${serializeSlot(item.lower)}}^{${serializeSlot(item.upper)}} ${serializeSlot(item.integrand)}\\, d${serializeSlot(item.variable)}`;
    case "sum":
      return `\\sum_{${serializeSlot(item.lower)}}^{${serializeSlot(item.upper)}} ${serializeSlot(item.body)}`;
    case "prod":
      return `\\prod_{${serializeSlot(item.lower)}}^{${serializeSlot(item.upper)}} ${serializeSlot(item.body)}`;
    case "lim":
      return `\\lim_{${serializeSlot(item.target)}} ${serializeSlot(item.body)}`;
    case "bracket":
      return `\\left${delimiter(item.open)}${serializeSlot(item.body)}\\right${delimiter(item.close)}`;
    case "matrix":
      return `\\begin{${item.environment || "pmatrix"}}\n${serializeMatrixRows(item.cells)}\n\\end{${item.environment || "pmatrix"}}`;
    case "cases":
      return `\\begin{cases}\n${serializeMatrixRows(item.cells)}\n\\end{cases}`;
    case "aligned":
      return `\\begin{aligned}\n${serializeMatrixRows(item.cells)}\n\\end{aligned}`;
    case "gathered":
      return `\\begin{gathered}\n${serializeMatrixRows(item.cells)}\n\\end{gathered}`;
    case "raw":
      return item.value || "";
    default:
      return "";
  }
}

function firstSlotOf(item) {
  if (!item || item.type === "text" || item.type === "raw") return null;

  const ordered = [
    "numerator",
    "radicand",
    "base",
    "lower",
    "target",
    "body",
    "index",
    "integrand"
  ];

  for (const key of ordered) {
    if (Array.isArray(item[key])) return item[key];
  }

  if (Array.isArray(item.cells) && item.cells[0] && item.cells[0][0]) {
    return item.cells[0][0];
  }

  return null;
}

function emptyMatrix(rows, cols, environment = "pmatrix") {
  return node("matrix", {
    environment,
    cells: Array.from({ length: rows }, () => Array.from({ length: cols }, () => slot()))
  });
}

const TEMPLATE_GROUPS = [
  {
    name: "Composite",
    items: [
      {
        id: "frac",
        title: "Fraction",
        aliases: ["fraction", "over", "/"],
        preview: "\\frac{a}{b}",
        shortcut: "/",
        create: () => node("frac", { numerator: slot([textNode("a")]), denominator: slot([textNode("b")]) })
      },
      {
        id: "sqrt",
        title: "Square Root",
        aliases: ["root", "radical"],
        preview: "\\sqrt{x}",
        create: () => node("sqrt", { radicand: slot([textNode("x")]) })
      },
      {
        id: "root",
        title: "Nth Root",
        aliases: ["indexed root"],
        preview: "\\sqrt[n]{x}",
        create: () => node("root", { index: slot([textNode("n")]), radicand: slot([textNode("x")]) })
      },
      {
        id: "sup",
        title: "Power",
        aliases: ["superscript", "^"],
        preview: "x^{2}",
        shortcut: "^",
        create: () => node("sup", { base: slot([textNode("x")]), exponent: slot([textNode("2")]) })
      },
      {
        id: "sub",
        title: "Subscript",
        aliases: ["index", "_"],
        preview: "x_{i}",
        shortcut: "_",
        create: () => node("sub", { base: slot([textNode("x")]), index: slot([textNode("i")]) })
      },
      {
        id: "subsup",
        title: "Subscript and Power",
        aliases: ["limits"],
        preview: "x_i^2",
        create: () => node("subsup", { base: slot([textNode("x")]), index: slot([textNode("i")]), exponent: slot([textNode("2")]) })
      }
    ]
  },
  {
    name: "Operators",
    items: [
      {
        id: "int",
        title: "Integral",
        aliases: ["definite integral"],
        preview: "\\int_a^b f(x) dx",
        create: () => node("int", {
          lower: slot([textNode("a")]),
          upper: slot([textNode("b")]),
          integrand: slot([textNode("f(x)")]),
          variable: slot([textNode("x")])
        })
      },
      {
        id: "sum",
        title: "Summation",
        aliases: ["sigma"],
        preview: "\\sum_{i=1}^{n}",
        create: () => node("sum", { lower: slot([textNode("i=1")]), upper: slot([textNode("n")]), body: slot([textNode("a_i")]) })
      },
      {
        id: "prod",
        title: "Product",
        aliases: ["pi product"],
        preview: "\\prod_{i=1}^{n}",
        create: () => node("prod", { lower: slot([textNode("i=1")]), upper: slot([textNode("n")]), body: slot([textNode("a_i")]) })
      },
      {
        id: "lim",
        title: "Limit",
        aliases: ["approaches"],
        preview: "\\lim_{x\\to 0}",
        create: () => node("lim", { target: slot([textNode("x\\to 0")]), body: slot([textNode("f(x)")]) })
      }
    ]
  },
  {
    name: "Layouts",
    items: [
      {
        id: "pmatrix",
        title: "Matrix",
        aliases: ["matrix", "parentheses"],
        preview: "\\begin{pmatrix}",
        create: () => emptyMatrix(2, 2, "pmatrix")
      },
      {
        id: "bmatrix",
        title: "Bracket Matrix",
        aliases: ["matrix square brackets"],
        preview: "\\begin{bmatrix}",
        create: () => emptyMatrix(2, 2, "bmatrix")
      },
      {
        id: "cases",
        title: "Cases",
        aliases: ["piecewise"],
        preview: "\\begin{cases}",
        create: () => node("cases", {
          cells: [
            [slot([textNode("x")]), slot([textNode("x > 0")])],
            [slot([textNode("-x")]), slot([textNode("x < 0")])]
          ]
        })
      },
      {
        id: "aligned",
        title: "Aligned",
        aliases: ["equation alignment", "align"],
        preview: "\\begin{aligned}",
        create: () => node("aligned", {
          cells: [
            [slot([textNode("a+b")]), slot([textNode("=")]), slot([textNode("c")])],
            [slot(), slot([textNode("=")]), slot([textNode("d")])]
          ]
        })
      },
      {
        id: "gathered",
        title: "Gathered",
        aliases: ["centered multiline"],
        preview: "\\begin{gathered}",
        create: () => node("gathered", {
          cells: [
            [slot([textNode("a+b=c")])],
            [slot([textNode("x+y=z")])]
          ]
        })
      }
    ]
  },
  {
    name: "Brackets",
    items: [
      {
        id: "paren-pair",
        title: "Auto Parentheses",
        aliases: ["pair", "left right"],
        preview: "\\left( x \\right)",
        create: () => node("bracket", { open: "(", close: ")", body: slot([textNode("x")]) })
      },
      {
        id: "bracket-pair",
        title: "Auto Brackets",
        aliases: ["pair", "left right"],
        preview: "\\left[ x \\right]",
        create: () => node("bracket", { open: "[", close: "]", body: slot([textNode("x")]) })
      },
      {
        id: "brace-pair",
        title: "Auto Braces",
        aliases: ["pair", "set"],
        preview: "\\left\\{ x \\right\\}",
        create: () => node("bracket", { open: "{", close: "}", body: slot([textNode("x")]) })
      },
      {
        id: "abs",
        title: "Absolute Value",
        aliases: ["norm", "bar"],
        preview: "\\left|x\\right|",
        create: () => node("bracket", { open: "|", close: "|", body: slot([textNode("x")]) })
      },
      {
        id: "angle",
        title: "Angle Brackets",
        aliases: ["inner product"],
        preview: "\\left\\langle x \\right\\rangle",
        create: () => node("bracket", { open: "<", close: ">", body: slot([textNode("x")]) })
      }
    ]
  },
  {
    name: "Symbols",
    items: [
      ["alpha", "\\alpha"], ["beta", "\\beta"], ["gamma", "\\gamma"], ["delta", "\\delta"],
      ["epsilon", "\\epsilon"], ["theta", "\\theta"], ["lambda", "\\lambda"], ["mu", "\\mu"],
      ["pi", "\\pi"], ["sigma", "\\sigma"], ["phi", "\\phi"], ["omega", "\\omega"],
      ["infty", "\\infty"], ["partial", "\\partial"], ["nabla", "\\nabla"], ["to", "\\to"],
      ["Rightarrow", "\\Rightarrow"], ["approx", "\\approx"], ["neq", "\\neq"], ["leq", "\\leq"],
      ["geq", "\\geq"], ["cdot", "\\cdot"], ["times", "\\times"], ["mathbb R", "\\mathbb{R}"],
      ["mathbb N", "\\mathbb{N}"], ["mathcal L", "\\mathcal{L}"]
    ].map(([id, latex]) => ({
      id,
      title: commandLabel(id),
      aliases: [latex.replace(/^\\/, "")],
      preview: latex,
      create: () => textNode(latex)
    }))
  },
  {
    name: "Utility",
    items: [
      {
        id: "raw-latex",
        title: "Raw LaTeX",
        aliases: ["latex", "code"],
        preview: "\\LaTeX",
        create: () => node("raw", { value: "\\LaTeX" })
      }
    ]
  }
];

const TEMPLATE_ITEMS = TEMPLATE_GROUPS.flatMap((group) => group.items.map((item) => ({ ...item, group: group.name })));

class StructuredMathPlugin extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

    this.addCommand({
      id: "open-structured-math-editor",
      name: "Open structured math editor",
      editorCallback: (editor, view) => {
        new StructuredMathModal(this.app, this, editor, view).open();
      }
    });

    this.addCommand({
      id: "insert-inline-structured-math",
      name: "Insert inline structured math",
      editorCallback: (editor, view) => {
        new StructuredMathModal(this.app, this, editor, view, "inline").open();
      }
    });

    this.addCommand({
      id: "insert-display-structured-math",
      name: "Insert display structured math",
      editorCallback: (editor, view) => {
        new StructuredMathModal(this.app, this, editor, view, "display").open();
      }
    });
  }

  async rememberTemplate(id) {
    const recent = [id, ...(this.settings.recentTemplates || []).filter((item) => item !== id)].slice(0, 12);
    this.settings.recentTemplates = recent;
    await this.saveData(this.settings);
  }

  async saveMode(mode) {
    this.settings.mode = mode;
    await this.saveData(this.settings);
  }
}

class StructuredMathModal extends Modal {
  constructor(app, plugin, editor, view, forcedMode = null) {
    super(app);
    this.plugin = plugin;
    this.editor = editor;
    this.view = view;
    this.mode = forcedMode || plugin.settings.mode || "display";
    this.root = slot();
    this.activeSlot = this.root;
    this.selectedNode = null;
    this.internalClipboard = null;
    this.searchQuery = "";
    this.searchIndex = 0;
    this.pendingFocusNode = null;

    const selection = this.editor.getSelection();
    const latex = this.stripMathDelimiters(selection);
    this.root.push(textNode(latex || ""));
  }

  onOpen() {
    this.modalEl.addClass("sme-modal");
    this.titleEl.setText("Structured Math Editor");
    this.render();
  }

  onClose() {
    this.contentEl.empty();
  }

  stripMathDelimiters(text) {
    const value = String(text || "").trim();
    if (!value) return "";
    if (value.startsWith("$$") && value.endsWith("$$")) {
      return value.slice(2, -2).trim();
    }
    if (value.startsWith("$") && value.endsWith("$")) {
      return value.slice(1, -1).trim();
    }
    return value;
  }

  getLatex() {
    return serializeSlot(this.root);
  }

  getMarkdown() {
    const latex = this.getLatex();
    return this.mode === "inline" ? `$${latex}$` : `$$\n${latex}\n$$`;
  }

  render() {
    this.contentEl.empty();

    const wrapper = this.contentEl.createDiv({ cls: "sme-shell" });
    this.renderToolbar(wrapper);

    const main = wrapper.createDiv({ cls: "sme-main" });
    const editorPanel = main.createDiv({ cls: "sme-editor-panel" });
    const mathMode = editorPanel.createDiv({ cls: "sme-math-mode" });
    this.renderSlot(mathMode, this.root, "equation");

    const helper = editorPanel.createDiv({ cls: "sme-helper" });
    helper.setText("Press \\ for templates. Click a green slot, then insert a template. Click any template body to copy, cut, delete, or paste nested structures.");

    const side = main.createDiv({ cls: "sme-side" });
    this.renderPalette(side);
    this.renderInspector(side);

    const output = wrapper.createDiv({ cls: "sme-output" });
    output.createEl("label", { text: "LaTeX" });
    const code = output.createEl("textarea", { cls: "sme-latex-output" });
    code.value = this.getLatex();
    code.spellcheck = false;
    code.addEventListener("change", () => {
      this.root = slot([textNode(code.value)]);
      this.activeSlot = this.root;
      this.selectedNode = null;
      this.render();
    });

    const preview = output.createDiv({ cls: "sme-preview markdown-rendered" });
    const sourcePath = this.view && this.view.file ? this.view.file.path : "";
    MarkdownRenderer.render(this.app, this.getMarkdown(), preview, sourcePath, this.plugin);

    this.bindModalKeys(wrapper);
    this.focusPendingNode();
  }

  renderToolbar(wrapper) {
    const toolbar = wrapper.createDiv({ cls: "sme-toolbar" });

    const modeGroup = toolbar.createDiv({ cls: "sme-segmented" });
    this.button(modeGroup, "Inline", this.mode === "inline" ? "sme-active" : "", async () => {
      this.mode = "inline";
      await this.plugin.saveMode(this.mode);
      this.render();
    });
    this.button(modeGroup, "Display", this.mode === "display" ? "sme-active" : "", async () => {
      this.mode = "display";
      await this.plugin.saveMode(this.mode);
      this.render();
    });

    const actions = toolbar.createDiv({ cls: "sme-actions" });
    this.button(actions, "Text", "", () => this.insertTextNode(""));
    this.button(actions, "Copy", "", () => this.copySelected());
    this.button(actions, "Cut", "", () => this.cutSelected());
    this.button(actions, "Paste", "", () => this.pasteInternal());
    this.button(actions, "Delete", "", () => this.deleteSelected());
    this.button(actions, "Insert", "mod-cta", () => this.insertIntoEditor());
  }

  renderPalette(container) {
    const palette = container.createDiv({ cls: "sme-palette" });
    palette.createEl("label", { text: "Templates" });
    const input = palette.createEl("input", { cls: "sme-search", attr: { placeholder: "Search or type \\\\" } });
    input.value = this.searchQuery;
    input.addEventListener("input", () => {
      this.searchQuery = input.value.replace(/^\\/, "");
      this.searchIndex = 0;
      this.render();
    });
    input.addEventListener("keydown", (event) => {
      const results = this.searchResults();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        this.searchIndex = Math.min(results.length - 1, this.searchIndex + 1);
        this.render();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        this.searchIndex = Math.max(0, this.searchIndex - 1);
        this.render();
      } else if (event.key === "Enter" && results[this.searchIndex]) {
        event.preventDefault();
        this.insertTemplate(results[this.searchIndex]);
      } else if (event.key === "Escape") {
        event.preventDefault();
        this.searchQuery = "";
        this.render();
      }
    });

    if (this.searchQuery) {
      setTimeout(() => {
        const current = this.contentEl.querySelector(".sme-search");
        if (current) {
          current.focus();
          current.setSelectionRange(current.value.length, current.value.length);
        }
      }, 0);
    }

    const recentIds = this.plugin.settings.recentTemplates || [];
    const recentItems = recentIds.map((id) => TEMPLATE_ITEMS.find((item) => item.id === id)).filter(Boolean);
    if (recentItems.length) {
      const recent = palette.createDiv({ cls: "sme-recent" });
      recent.createEl("span", { text: "Recent" });
      for (const item of recentItems) {
        this.templateButton(recent, item, false);
      }
    }

    const results = this.searchResults();
    const list = palette.createDiv({ cls: "sme-template-list" });
    for (const [index, item] of results.entries()) {
      this.templateButton(list, item, index === this.searchIndex);
    }
  }

  renderInspector(container) {
    const panel = container.createDiv({ cls: "sme-inspector" });
    panel.createEl("label", { text: "Selection" });
    const label = this.selectedNode ? `${this.selectedNode.type} template` : "active slot";
    panel.createDiv({ cls: "sme-inspector-value", text: label });

    if (this.selectedNode && this.selectedNode.cells) {
      const controls = panel.createDiv({ cls: "sme-grid-controls" });
      this.button(controls, "Add Row", "", () => {
        const cols = this.selectedNode.cells[0] ? this.selectedNode.cells[0].length : 1;
        this.selectedNode.cells.push(Array.from({ length: cols }, () => slot()));
        this.render();
      });
      this.button(controls, "Add Column", "", () => {
        for (const row of this.selectedNode.cells) row.push(slot());
        this.render();
      });
      this.button(controls, "Remove Row", "", () => {
        if (this.selectedNode.cells.length > 1) this.selectedNode.cells.pop();
        this.render();
      });
      this.button(controls, "Remove Column", "", () => {
        if (this.selectedNode.cells[0] && this.selectedNode.cells[0].length > 1) {
          for (const row of this.selectedNode.cells) row.pop();
        }
        this.render();
      });
    }
  }

  bindModalKeys(wrapper) {
    wrapper.addEventListener("keydown", (event) => {
      if (event.key === "\\" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        const input = this.contentEl.querySelector(".sme-search");
        if (input) {
          input.focus();
          input.value = "";
        }
      }

      if (event.key === "Tab") {
        event.preventDefault();
        this.focusNextSlot(event.shiftKey ? -1 : 1);
      }

      if (event.key === "^" && !event.metaKey && !event.ctrlKey && !this.isSearchOrOutput(event.target)) {
        event.preventDefault();
        this.insertTemplate(TEMPLATE_ITEMS.find((item) => item.id === "sup"));
      }

      if (event.key === "_" && !event.metaKey && !event.ctrlKey && !this.isSearchOrOutput(event.target)) {
        event.preventDefault();
        this.insertTemplate(TEMPLATE_ITEMS.find((item) => item.id === "sub"));
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "c") {
        this.copySelected();
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "x") {
        event.preventDefault();
        this.cutSelected();
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "v" && this.internalClipboard) {
        event.preventDefault();
        this.pasteInternal();
      }
      if (event.key === "Backspace" && this.selectedNode && !this.isTypingTarget(event.target)) {
        event.preventDefault();
        this.deleteSelected();
      }
    });
  }

  isTypingTarget(target) {
    return target && (target.matches("input, textarea") || target.isContentEditable);
  }

  isSearchOrOutput(target) {
    return target && target.matches("input, textarea");
  }

  searchResults() {
    const query = this.searchQuery.trim().toLowerCase();
    const items = TEMPLATE_ITEMS;
    if (!query) return items;

    return items
      .map((item) => {
        const text = [item.title, item.id, item.group, item.preview, ...(item.aliases || [])].join(" ").toLowerCase();
        let score = 0;
        if (item.id.toLowerCase() === query) score += 100;
        if (item.id.toLowerCase().startsWith(query)) score += 50;
        if (item.title.toLowerCase().includes(query)) score += 25;
        if (text.includes(query)) score += 10;
        return { item, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .map((result) => result.item);
  }

  templateButton(container, item, active) {
    const button = container.createEl("button", { cls: `sme-template ${active ? "sme-template-active" : ""}` });
    button.type = "button";
    const title = button.createDiv({ cls: "sme-template-title" });
    title.createSpan({ text: item.title });
    if (item.shortcut) title.createSpan({ cls: "sme-shortcut", text: item.shortcut });
    button.createDiv({ cls: "sme-template-meta", text: `${item.group} · ${item.preview}` });
    button.addEventListener("click", () => this.insertTemplate(item));
  }

  button(container, label, cls, onClick) {
    const button = container.createEl("button", { cls });
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  insertTemplate(item) {
    const created = item.create();
    this.activeSlot.push(created);
    this.selectedNode = created.type === "text" ? null : created;
    this.activeSlot = firstSlotOf(created) || this.activeSlot;
    this.plugin.rememberTemplate(item.id);
    this.searchQuery = "";
    this.searchIndex = 0;
    this.render();
  }

  insertTextNode(value = "") {
    const item = textNode(value);
    this.activeSlot.push(item);
    this.pendingFocusNode = item;
    this.selectedNode = null;
    this.render();
  }

  copySelected() {
    if (!this.selectedNode) {
      new Notice("Select a template before copying.");
      return;
    }
    this.internalClipboard = clone(this.selectedNode);
    new Notice("Copied math template.");
  }

  cutSelected() {
    if (!this.selectedNode) {
      new Notice("Select a template before cutting.");
      return;
    }
    this.internalClipboard = clone(this.selectedNode);
    this.deleteSelected(false);
    new Notice("Cut math template.");
  }

  pasteInternal() {
    if (!this.internalClipboard) {
      new Notice("No copied math template.");
      return;
    }
    const pasted = clone(this.internalClipboard);
    this.activeSlot.push(pasted);
    this.selectedNode = pasted;
    this.activeSlot = firstSlotOf(pasted) || this.activeSlot;
    this.render();
  }

  deleteSelected(showNotice = true) {
    if (!this.selectedNode) {
      if (showNotice) new Notice("Select a template before deleting.");
      return;
    }
    const owner = this.findOwnerSlot(this.root, this.selectedNode);
    if (!owner) return;
    const index = owner.indexOf(this.selectedNode);
    if (index >= 0) owner.splice(index, 1);
    this.activeSlot = owner;
    this.selectedNode = null;
    this.render();
  }

  findOwnerSlot(children, target) {
    if (!Array.isArray(children)) return null;
    if (children.includes(target)) return children;

    for (const item of children) {
      for (const childSlot of this.getNodeSlots(item)) {
        const found = this.findOwnerSlot(childSlot, target);
        if (found) return found;
      }
    }

    return null;
  }

  getNodeSlots(item) {
    if (!item) return [];
    const slots = [];
    for (const [key, value] of Object.entries(item)) {
      if (Array.isArray(value)) {
        if (key === "cells") {
          for (const row of value) {
            for (const cell of row) slots.push(cell);
          }
        } else {
          slots.push(value);
        }
      }
    }
    return slots;
  }

  focusNextSlot(direction) {
    const slots = [];
    this.collectSlots(this.root, slots);
    const current = slots.indexOf(this.activeSlot);
    const next = slots[(current + direction + slots.length) % slots.length];
    if (next) {
      this.activeSlot = next;
      this.selectedNode = null;
      this.render();
    }
  }

  collectSlots(children, slots) {
    slots.push(children);
    for (const item of children) {
      for (const childSlot of this.getNodeSlots(item)) {
        this.collectSlots(childSlot, slots);
      }
    }
  }

  renderSlot(parent, children, label) {
    const el = parent.createDiv({ cls: `sme-slot ${children === this.activeSlot ? "sme-slot-active" : ""}` });
    el.setAttr("data-label", label || "slot");
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      this.activeSlot = children;
      this.selectedNode = null;
      this.render();
    });

    if (!children.length) {
      el.createSpan({ cls: "sme-placeholder", text: label || "slot" });
    }

    for (const child of children) {
      this.renderNode(el, child);
    }
  }

  renderNode(parent, item) {
    if (item.type === "text" || item.type === "raw") {
      const span = parent.createSpan({ cls: "sme-text-node" });
      span.contentEditable = "true";
      span.spellcheck = false;
      span.textContent = item.value || "";
      span.addEventListener("input", () => {
        item.value = span.textContent || "";
        this.refreshOutputOnly();
      });
      span.addEventListener("click", (event) => {
        event.stopPropagation();
        this.selectedNode = null;
      });
      if (this.pendingFocusNode === item) {
        span.addClass("sme-pending-focus");
      }
      return;
    }

    const wrapper = parent.createSpan({ cls: `sme-node sme-node-${item.type} ${this.selectedNode === item ? "sme-node-selected" : ""}` });
    wrapper.addEventListener("click", (event) => {
      event.stopPropagation();
      this.selectedNode = item;
      this.render();
    });

    switch (item.type) {
      case "frac":
        wrapper.addClass("sme-frac");
        this.renderSlot(wrapper, item.numerator, "num");
        wrapper.createSpan({ cls: "sme-frac-line" });
        this.renderSlot(wrapper, item.denominator, "den");
        break;
      case "sqrt":
        wrapper.createSpan({ cls: "sme-symbol", text: "√" });
        this.renderSlot(wrapper, item.radicand, "radicand");
        break;
      case "root":
        wrapper.createSpan({ cls: "sme-symbol", text: "√" });
        this.renderSlot(wrapper, item.index, "index");
        this.renderSlot(wrapper, item.radicand, "radicand");
        break;
      case "sup":
        this.renderSlot(wrapper, item.base, "base");
        wrapper.createSpan({ cls: "sme-script", text: "^" });
        this.renderSlot(wrapper, item.exponent, "exp");
        break;
      case "sub":
        this.renderSlot(wrapper, item.base, "base");
        wrapper.createSpan({ cls: "sme-script", text: "_" });
        this.renderSlot(wrapper, item.index, "sub");
        break;
      case "subsup":
        this.renderSlot(wrapper, item.base, "base");
        wrapper.createSpan({ cls: "sme-script", text: "_" });
        this.renderSlot(wrapper, item.index, "sub");
        wrapper.createSpan({ cls: "sme-script", text: "^" });
        this.renderSlot(wrapper, item.exponent, "exp");
        break;
      case "int":
        wrapper.createSpan({ cls: "sme-big-symbol", text: "∫" });
        this.renderSlot(wrapper, item.lower, "lower");
        this.renderSlot(wrapper, item.upper, "upper");
        this.renderSlot(wrapper, item.integrand, "integrand");
        wrapper.createSpan({ cls: "sme-symbol", text: "d" });
        this.renderSlot(wrapper, item.variable, "var");
        break;
      case "sum":
      case "prod":
        wrapper.createSpan({ cls: "sme-big-symbol", text: item.type === "sum" ? "∑" : "∏" });
        this.renderSlot(wrapper, item.lower, "lower");
        this.renderSlot(wrapper, item.upper, "upper");
        this.renderSlot(wrapper, item.body, "body");
        break;
      case "lim":
        wrapper.createSpan({ cls: "sme-symbol", text: "lim" });
        this.renderSlot(wrapper, item.target, "target");
        this.renderSlot(wrapper, item.body, "body");
        break;
      case "bracket":
        wrapper.createSpan({ cls: "sme-bracket", text: item.open === "{" ? "{" : item.open === "<" ? "⟨" : item.open });
        this.renderSlot(wrapper, item.body, "body");
        wrapper.createSpan({ cls: "sme-bracket", text: item.close === "}" ? "}" : item.close === ">" ? "⟩" : item.close });
        break;
      case "matrix":
      case "cases":
      case "aligned":
      case "gathered":
        this.renderGrid(wrapper, item);
        break;
      default:
        wrapper.createSpan({ text: item.type });
    }
  }

  renderGrid(parent, item) {
    const table = parent.createEl("table", { cls: `sme-grid sme-grid-${item.type}` });
    for (const row of item.cells) {
      const tr = table.createEl("tr");
      for (const cell of row) {
        const td = tr.createEl("td");
        this.renderSlot(td, cell, "cell");
      }
    }
  }

  refreshOutputOnly() {
    const code = this.contentEl.querySelector(".sme-latex-output");
    if (code) code.value = this.getLatex();
    const preview = this.contentEl.querySelector(".sme-preview");
    if (preview) {
      preview.empty();
      const sourcePath = this.view && this.view.file ? this.view.file.path : "";
      MarkdownRenderer.render(this.app, this.getMarkdown(), preview, sourcePath, this.plugin);
    }
  }

  focusPendingNode() {
    if (!this.pendingFocusNode) return;
    const target = this.contentEl.querySelector(".sme-pending-focus");
    this.pendingFocusNode = null;
    if (!target) return;
    setTimeout(() => {
      target.focus();
      const range = document.createRange();
      range.selectNodeContents(target);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  }

  insertIntoEditor() {
    this.editor.replaceSelection(this.getMarkdown());
    this.close();
    new Notice(this.mode === "inline" ? "Inserted inline math." : "Inserted display math.");
  }
}

module.exports = StructuredMathPlugin;
