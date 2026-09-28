export const groups = [
  "Actions",
  "Inputs",
  "Overlays",
  "Navigation",
  "Feedback",
  "Data",
  "Layout",
  "Media",
  "Messaging",
  "Utilities",
] as const

// Each page groups related components; every package component belongs to exactly one section.
export const pages: DocPage[] = [
  {
    slug: "button",
    title: "Button",
    group: "Actions",
    description: "Trigger actions, submit forms, and group related commands.",
    sections: [
      {
        component: "button",
        title: "Button",
        description: "Triggers an action or event, such as submitting a form or opening a dialog.",
        usage:
          "Pick one `variant` per level of emphasis and a `size` (icon sizes for icon-only buttons, which need an `aria-label`). Set `loading` (with an optional `loadingLabel`) while work runs; the button keeps focus and ignores clicks. For navigation, style an `<a>` with `buttonVariants()` instead of rendering a link as a button.",
        imports: "Button, buttonVariants",
        examples: ["variants", "sizes", "with-icon", "icon-only", "loading", "as-link"],
      },
      {
        component: "button-group",
        title: "Button group",
        description: "Joins related buttons, inputs, and menus into one connected control.",
        usage:
          'Give the group an `aria-label`. Use `ButtonGroup.Separator` between same-colored buttons (e.g. a split button with a `DropdownMenu` trigger), `ButtonGroup.Text` for static addons, and `orientation="vertical"` for stacked groups. Use ToggleGroup for selectable segments.',
        examples: ["basic", "split-button", "with-input", "vertical"],
      },
    ],
  },
  {
    slug: "badge",
    title: "Badge",
    group: "Actions",
    description: "Label status, categories, and counts, with optional dismissal.",
    sections: [
      {
        component: "badge",
        title: "Badge",
        description: "A compact label for status, counts, and metadata.",
        usage:
          "Use `variant` for tone (info, success, warning, destructive use soft tinted colors) and `size` sm | default | lg. Pass `onRemove` with a descriptive `removeLabel` for dismissible filters or tags; use `render={<a />}` for links, but never together with `onRemove`.",
        examples: [
          "variants",
          "sizes",
          {
            id: "with-icon",
            title: "With icon or dot",
          },
          "removable",
          "as-link",
        ],
      },
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    group: "Actions",
    description: "Represent a person or entity with an image or readable initials.",
    sections: [
      {
        component: "avatar",
        title: "Avatar",
        description:
          "An image of a person or entity with a text fallback while loading or when missing.",
        usage:
          "Always include `Avatar.Fallback` (usually initials). Give `Avatar.Image` meaningful `alt`, or hide the avatar with `aria-hidden` when a visible name sits next to it. Status colors in `Avatar.Badge` need visually hidden text.",
        examples: ["basic", "with-name", "sizes", "group", "status-badge"],
      },
    ],
  },
  {
    slug: "kbd",
    title: "Keyboard key",
    group: "Actions",
    description: "Show keyboard keys and shortcuts in text and menus.",
    sections: [
      {
        component: "kbd",
        title: "Keyboard key",
        description: "Displays a key or key combination the user can press.",
        usage: "Wrap each key in `Kbd.Root`; group the keys of a combination in `Kbd.Group`.",
        examples: ["basic", "shortcut-list"],
      },
    ],
  },
  {
    slug: "toggle",
    title: "Toggle",
    group: "Actions",
    description: "Switch an option on or off, alone or as part of a group.",
    sections: [
      {
        component: "toggle",
        title: "Toggle",
        description: "A two-state button that stays pressed, like a bold or pin control.",
        usage:
          "Keep the label constant; the pressed state is announced from aria-pressed. Icon-only toggles need aria-label. Use pressed/onPressedChange to control it.",
        examples: ["basic", "variants", "sizes", "controlled"],
      },
      {
        component: "toggle-group",
        title: "Toggle group",
        description: "A set of toggles with single or multiple selection and arrow-key navigation.",
        usage:
          'Selection is single by default; add `multiple` to allow several. The value is always a string[]. `spacing={0}` joins items into a segmented control, and orientation="vertical" switches arrow keys to up and down.',
        examples: ["basic", "multiple", "joined", "sizes", "vertical"],
      },
    ],
  },
  {
    slug: "input",
    title: "Input",
    group: "Inputs",
    description:
      "Text entry, from a plain field to passwords, numbers, masks, tags, codes, and files.",
    sections: [
      {
        component: "input",
        title: "Input",
        description: "A single-line text field for names, emails, search terms, and files.",
        usage:
          'Pair every input with a Label via id/htmlFor. Use keyFilter (a preset such as "digits" or an anchored RegExp) to block characters as they are typed or pasted, and aria-invalid plus aria-describedby for errors.',
        examples: [
          "basic",
          {
            id: "file",
            title: "File input",
          },
          "key-filter",
          "variants",
          "states",
        ],
      },
      {
        component: "password-input",
        title: "Password input",
        description: "A password field with a visibility toggle and an optional strength meter.",
        usage:
          "Set autoComplete to current-password or new-password. Add strength for the built-in meter or pass a scoring function that returns 1–3; override its text with strengthLabels.",
        examples: [
          "basic",
          {
            id: "strength",
            title: "Strength meter",
          },
          {
            id: "custom-strength",
            title: "Custom strength rules",
          },
        ],
      },
      {
        component: "number-input",
        title: "Number input",
        description: "A localized numeric field with stepper buttons and keyboard stepping.",
        usage:
          "Use format (Intl.NumberFormat options) with locale for currency, percent, and units instead of text adornments. Value, bounds, and step go to Base UI NumberField; other props go to the input.",
        examples: [
          "basic",
          "formatting",
          {
            id: "controls",
            title: "Button layouts",
          },
          "states",
        ],
      },
      {
        component: "input-mask",
        title: "Input mask",
        description:
          "Formats fixed-pattern values such as phone numbers, dates, and codes while typing.",
        usage:
          "In mask, 9 is a digit, a is a letter, * is either, ? makes the remaining slots optional, and \\ escapes a literal. onValueChange and onComplete receive both the formatted and the raw value.",
        examples: [
          "basic",
          "mask-syntax",
          {
            id: "raw-value",
            title: "Raw value and completion",
          },
        ],
      },
      {
        component: "tags-input",
        title: "Tags input",
        description: "Collects short values such as skills or email addresses as removable tags.",
        usage:
          "Enter or any of separators adds a tag, and pasted lists are split automatically. Give it a name to submit each tag as a hidden form value; max, allowDuplicates, and keyFilter limit what can be added.",
        examples: [
          "basic",
          {
            id: "email-recipients",
            title: "Separators and paste",
          },
          {
            id: "custom-tags",
            title: "Custom tags and limit",
          },
          "states",
        ],
      },
      {
        component: "input-group",
        title: "Input group",
        description:
          "Combines an input or textarea with text, icons, and buttons inside one field.",
        usage:
          "Place Addon before or after the control with align inline-start, inline-end, block-start, or block-end. Clicking an addon focuses the control, and buttons inside it keep their own behavior.",
        examples: [
          "basic",
          "search",
          {
            id: "copy-action",
            title: "Inline action",
          },
          {
            id: "textarea",
            title: "With textarea",
          },
        ],
      },
      {
        component: "input-otp",
        title: "One-time code",
        description:
          "Segmented entry for verification codes and PINs, with paste and autofill support.",
        usage:
          "Set `length`; without children the root renders one slot per character, or compose `Group`, `Slot`, and `Separator` yourself. Digits are the default: use `validationType` for letters, `normalizeValue` to transform input, `mask` to hide characters, and `onValueComplete` to verify a full code. Built on Base UI OTP Field, so it also works inside `Field.Root`.",
        imports: "InputOTP",
        examples: [
          "basic",
          {
            id: "verification",
            title: "Verification flow",
          },
          "masked",
          "alphanumeric",
        ],
      },
      {
        component: "file-upload",
        title: "File upload",
        description:
          "A drop zone and file list backed by a native file input that submits with forms.",
        usage:
          "Use accept, maxSize, maxFiles, and multiple to constrain selections, and onFileReject to explain rejected files. Pass children to replace the drop zone content; uploading is up to your application.",
        examples: [
          "basic",
          {
            id: "form",
            title: "Form submission",
          },
          "custom-content",
        ],
      },
    ],
  },
  {
    slug: "textarea",
    title: "Textarea",
    group: "Inputs",
    description: "Multi-line text entry, including mentions.",
    sections: [
      {
        component: "textarea",
        title: "Textarea",
        description: "A multi-line text field for comments, descriptions, and messages.",
        usage:
          "Use rows for a fixed height or autoResize to grow with content (cap it with a max-h class). It supports the same variant and keyFilter props as Input.",
        examples: [
          "basic",
          "auto-resize",
          "character-count",
          {
            id: "states",
            title: "Variants and states",
          },
        ],
      },
      {
        component: "mention",
        title: "Mention",
        description: "A textarea that suggests people or topics after a trigger such as @.",
        usage:
          "Pass suggestions with value and label, and trigger for one or more characters; a suggestion's own trigger limits where it appears. Use renderSuggestion for custom rows and onSuggestionSelect to react to a choice.",
        examples: [
          "basic",
          "multiple-triggers",
          {
            id: "custom-suggestions",
            title: "Custom suggestions",
          },
        ],
      },
    ],
  },
  {
    slug: "field",
    title: "Field",
    group: "Inputs",
    description: "Label, describe, group, and validate form controls.",
    sections: [
      {
        component: "field",
        title: "Field",
        description:
          "Compose labels, descriptions, errors, and grouped controls into accessible form fields.",
        usage:
          '`Field.Root` connects `Field.Label`, `Field.Description`, and `Field.Error` to the Base UI control inside it, including Input, Textarea, Checkbox, Switch, Select, NumberInput, Slider, Combobox, and InputOTP, so no `htmlFor`, `id`, or `aria-describedby` is needed. Native constraints such as `required` and `minLength` validate per `validationMode`; show messages with `Field.Error match="valueMissing"` and style state with `data-invalid`, `data-touched`, and `data-dirty`. Set `invalid` on the root for external checks. Group fields with `Field.Set` and `Field.Legend`; `disabled` on the set disables every field inside. Wrap each checkbox or radio in `Field.Item` with its own `Field.Label`.',
        examples: [
          "basic",
          "validation",
          {
            id: "invalid",
            title: "External validation",
          },
          {
            id: "horizontal",
            title: "Horizontal layout",
          },
          "fieldset",
          "disabled-fieldset",
          "collapsible-fieldset",
        ],
      },
      {
        component: "label",
        title: "Label",
        description: "Accessible text label for a form control.",
        usage:
          "Connect it with htmlFor and the control's id, or wrap a checkbox, radio, or switch. Mark required fields with `required` on the control and keep any asterisk aria-hidden.",
        examples: ["basic", "required"],
      },
    ],
  },
  {
    slug: "select",
    title: "Select",
    group: "Inputs",
    description: "Choose one or more values from a list.",
    sections: [
      {
        component: "select",
        title: "Select",
        description: "A styled dropdown for choosing one or more predefined values.",
        usage:
          "Pass `items` ({ label, value }[] or grouped) to Select.Root so Select.Value shows the label, not the raw value. Put Select.Label inside Root for an automatically linked field label, and use Select.GroupLabel inside Select.Group for headings. Add `multiple` for multi-select, and `disabled`/`readOnly` on Root.",
        examples: [
          "basic",
          "groups",
          {
            id: "multiple",
            title: "Multiple selection",
          },
          "sizes",
          "states",
        ],
      },
      {
        component: "native-select",
        title: "Native select",
        description: "A styled native select for simple forms and mobile-friendly pickers.",
        usage:
          'Associate a Label via `id`/`htmlFor`; `className` sizes the wrapper. Use NativeSelect.OptGroup for groups and `size="sm"` for compact layouts.',
        examples: ["basic", "groups", "sizes", "states"],
      },
    ],
  },
  {
    slug: "combobox",
    title: "Combobox",
    group: "Inputs",
    description: "Search a list of options and select one or many.",
    sections: [
      {
        component: "combobox",
        title: "Combobox",
        description: "A filterable select for picking one or many values from a list.",
        usage:
          "Pass `items` to Combobox.Root and render Combobox.List with a function; label an outer Combobox.Input with Label/htmlFor (Combobox.Label is only for the input-in-popup pattern). Use `multiple` with Combobox.Chips plus `Combobox.useAnchor()` for multi-select, `inline open` for an always-visible list, and `filter={null}` with Combobox.Status for server search. Set `disabled` on Root.",
        examples: [
          "basic",
          "groups",
          {
            id: "multiple",
            title: "Multiple selection",
          },
          {
            id: "popup-search",
            title: "Search inside the popup",
          },
          "inline-list",
          "async-search",
        ],
      },
    ],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    group: "Inputs",
    description: "Select independent options.",
    sections: [
      {
        component: "checkbox",
        title: "Checkbox",
        description: "Toggle an option on or off, alone or as part of a group.",
        usage:
          "Label each checkbox with Label (htmlFor or wrapping). CheckboxGroup shares a string[] value; add `allValues` and a Checkbox with `parent` for a select-all box that turns indeterminate automatically. `indeterminate` shows a minus mark and is announced as mixed.",
        imports: "Checkbox, CheckboxGroup",
        examples: [
          "basic",
          "states",
          {
            id: "group",
            title: "Group with parent checkbox",
          },
          "choice-cards",
        ],
      },
    ],
  },
  {
    slug: "radio-group",
    title: "Radio group",
    group: "Inputs",
    description: "Select exactly one option from a set.",
    sections: [
      {
        component: "radio-group",
        title: "Radio group",
        description: "Pick exactly one option from a short list.",
        usage:
          "Wrap the group in `Field.Root` and render it through `Field.Set` so `Field.Legend` names it, then place each `RadioGroup.Item` in a `Field.Item` with a `Field.Label`. Use `value`/`defaultValue` with `onValueChange`; disable single items or the whole group.",
        examples: ["basic", "choice-cards", "states"],
      },
    ],
  },
  {
    slug: "switch",
    title: "Switch",
    group: "Inputs",
    description: "Turn a setting on or off immediately.",
    sections: [
      {
        component: "switch",
        title: "Switch",
        description: "Turn a setting on or off immediately.",
        usage:
          'Pair it with a Label via htmlFor/id, or place it in a horizontal Field with a description. Use checked/onCheckedChange when other UI depends on the state; size="sm" fits dense rows.',
        examples: ["basic", "settings", "sizes", "controlled"],
      },
    ],
  },
  {
    slug: "slider",
    title: "Slider",
    group: "Inputs",
    description: "Pick a value or range by dragging, on a track or a dial.",
    sections: [
      {
        component: "slider",
        title: "Slider",
        description: "Select a number or a range by dragging along a track.",
        usage:
          "Pass a number for one thumb or an array for a range. Label a single slider with aria-label or aria-labelledby; for ranges add `thumbLabels` so each thumb has its own name. Use `format` (Intl.NumberFormat options) so the announced value matches what users see.",
        examples: ["basic", "range", "steps", "vertical"],
      },
      {
        component: "knob",
        title: "Knob",
        description: "A circular dial for a single numeric value.",
        usage:
          "Supports min, max, step, controlled or uncontrolled value, arrow and Page keys, and Home/End. `formatValue` sets both the visible and announced text. Size it with size-* classes and color the value arc with text-* classes.",
        examples: ["basic", "custom-range", "appearance", "states"],
      },
    ],
  },
  {
    slug: "rating",
    title: "Rating",
    group: "Inputs",
    description: "Collect or display a score.",
    sections: [
      {
        component: "rating",
        title: "Rating",
        description: "Collect or display a score as a row of stars or custom icons.",
        usage:
          "It is a radio group, so arrow keys change the value and `name` submits it with forms. Filled icons use the text color (text-primary by default); set className to recolor, and pass getValueText with custom icons. `clearable` adds a reset option; readOnly shows a score without editing.",
        examples: ["basic", "clearable", "custom-icons", "states"],
      },
    ],
  },
  {
    slug: "date-picker",
    title: "Date picker",
    group: "Inputs",
    description: "Pick dates and ranges from a field or an inline calendar.",
    sections: [
      {
        component: "date-picker",
        title: "Date picker",
        description:
          "A button that opens a calendar popover to pick a date, date range, multiple dates, or a date and time.",
        usage:
          'Control it with `value`/`onValueChange` (null or [] when empty) or use `defaultValue`; label it with Label/htmlFor, `aria-label`, or `aria-labelledby`. Set `mode` to "range" or "multiple", `showTime` with `timeStep` (seconds) for times, and `minDate`/`maxDate`/`calendarProps.disabled` for limits. `name` submits an ISO value.',
        examples: [
          "basic",
          "date-range",
          {
            id: "date-time",
            title: "Date and time",
          },
          "multiple",
          "constraints",
        ],
      },
      {
        component: "calendar",
        title: "Calendar",
        description: "An inline month grid for single, multiple, or range selection.",
        usage:
          'Pass `mode`, `selected`, and `onSelect`; use `disabled` matchers and `modifiers` for availability, `captionLayout="dropdown"` with `startMonth`/`endMonth` for fast navigation, and `numberOfMonths` for ranges.',
        examples: [
          "basic",
          {
            id: "date-range",
            wide: true,
          },
          "dropdown-navigation",
          "disabled-days",
        ],
      },
    ],
  },
  {
    slug: "inplace",
    title: "Inplace",
    group: "Inputs",
    description: "Edit a value in place without leaving the page.",
    sections: [
      {
        component: "inplace",
        title: "Inplace",
        description: "Show a value as text and edit it in place.",
        usage:
          "Keep a draft in state: commit it in onSave and restore it in onCancel (also triggered by Escape). Call preventDefault in Save's onClick to keep the editor open while the draft is invalid. Include the value in Inplace.Display's visible text rather than replacing it with an aria-label.",
        examples: ["basic", "validation", "profile"],
      },
    ],
  },
  {
    slug: "questionnaire",
    title: "Questionnaire",
    group: "Inputs",
    description: "Guide people through a short set of questions.",
    sections: [
      {
        component: "questionnaire",
        title: "Questionnaire",
        description: "A one-question-at-a-time form with choices, free text, and step navigation.",
        usage:
          "List each item's name, required flag, and (for shortcuts) choice values in `items`, so the first question renders before hydration and number or letter keys map in order. Read answers from the submitted form data by item name.",
        examples: ["basic", "multi-step", "free-text", "multiple-choices"],
      },
    ],
  },
  {
    slug: "dialog",
    title: "Dialog",
    group: "Overlays",
    description: "Focus attention on a task or a decision in a modal window.",
    sections: [
      {
        component: "dialog",
        title: "Dialog",
        description: "A modal window for a focused task such as editing or reviewing content.",
        usage:
          "Put long content in Dialog.Body so the header, footer, and close button stay in place. Use maximizable for reading-heavy content, and modal={false} with showOverlay={false} for panels that leave the page usable.",
        examples: [
          "basic",
          "scrollable",
          "maximizable",
          {
            id: "non-modal",
            title: "Non-modal panel",
          },
        ],
      },
      {
        component: "alert-dialog",
        title: "Alert dialog",
        description: "Interrupts the user to confirm an important or destructive action.",
        usage:
          "AlertDialog.Action closes the dialog after its onClick runs. For async work set closeOnClick={false}, control open, show loading on the action, and close when the request settles.",
        examples: [
          "basic",
          {
            id: "media",
            title: "Compact with icon",
          },
          {
            id: "async-confirm",
            title: "Async confirmation",
          },
        ],
      },
    ],
  },
  {
    slug: "drawer",
    title: "Drawer",
    group: "Overlays",
    description: "Slide a panel in from the edge of the screen.",
    sections: [
      {
        component: "drawer",
        title: "Drawer",
        description: "A swipeable panel that slides in from an edge, suited to touch devices.",
        usage:
          "Set swipeDirection to choose the edge and snapPoints for bottom sheets. Put long content in Drawer.Body; add showCloseButton when there is no other visible way to close.",
        examples: ["basic", "placement", "snap-points", "scrollable"],
      },
      {
        component: "sheet",
        title: "Sheet",
        description:
          "A dialog panel attached to an edge of the screen for settings and navigation.",
        usage:
          "Pick an edge with `side`. Put content in `Sheet.Body`, which scrolls between the fixed `Sheet.Header` and `Sheet.Footer`. Classes on `Sheet.Content` override the default size, so a full-screen sheet is just a `className`.",
        examples: ["basic", "placement", "full-screen"],
      },
    ],
  },
  {
    slug: "popover",
    title: "Popover",
    group: "Overlays",
    description: "Show rich content anchored to a trigger.",
    sections: [
      {
        component: "popover",
        title: "Popover",
        description: "Rich, interactive content anchored to a trigger.",
        usage:
          'Compose Header, Footer, and Popover.Close for actions; add Popover.Arrow with sideOffset={8}. For inline confirmations use modal="trap-focus" and role="alertdialog" on Content.',
        examples: [
          "basic",
          {
            id: "confirm",
            title: "Confirm",
          },
          "filters",
          "placement",
        ],
      },
      {
        component: "hover-card",
        title: "Hover card",
        description: "A preview shown when a pointer hovers or focus lands on a link.",
        usage:
          "Use it for supplementary previews of links only; never put essential actions inside, because touch users may not see it.",
        examples: ["basic", "placement"],
      },
    ],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    group: "Overlays",
    description: "Name or explain a control on hover and focus.",
    sections: [
      {
        component: "tooltip",
        title: "Tooltip",
        description: "A short label or hint shown on hover and keyboard focus.",
        usage:
          "Give icon-only triggers an aria-label as well. Wrap groups of controls in Tooltip.Provider to share the open delay; Kbd inside Content is styled automatically.",
        examples: [
          "basic",
          "placement",
          "keyboard-shortcut",
          {
            id: "provider",
            title: "Shared delay",
          },
        ],
      },
    ],
  },
  {
    slug: "menu",
    title: "Menu",
    group: "Overlays",
    description: "Offer actions from a button, a right click, or an application menu bar.",
    sections: [
      {
        component: "dropdown-menu",
        title: "Dropdown menu",
        description: "A menu of actions or options opened from a button.",
        usage:
          'Put GroupLabel inside Group or RadioGroup. Use Item for actions (variant="destructive" for dangerous ones), LinkItem for navigation (add closeOnClick for same-page or client-side links), and CheckboxItem/RadioItem for settings. Content is at least as wide as its trigger, and Base UI picks the side unless you set side.',
        examples: [
          "basic",
          "checkboxes-and-radio",
          {
            id: "submenus",
            title: "Submenus and icon trigger",
          },
        ],
      },
      {
        component: "context-menu",
        title: "Context menu",
        description: "A menu opened by right-clicking or long-pressing an area.",
        usage:
          "Content opens at the pointer. Items, groups, submenus and shortcuts are the same parts as Dropdown menu. Also offer the actions through a visible control, because context menus are hard to discover.",
        examples: ["basic", "checkboxes-and-radio"],
      },
      {
        component: "menubar",
        title: "Menubar",
        description: "A persistent row of menus, like a desktop app's File and Edit menus.",
        usage:
          "Wrap each Trigger and Content pair in Menubar.Menu. Items are the Dropdown menu parts, so checkbox, radio, link and submenu items behave the same.",
        examples: ["basic", "checkboxes-and-radio"],
      },
    ],
  },
  {
    slug: "command",
    title: "Command",
    group: "Overlays",
    description: "Find commands and destinations from a searchable list.",
    sections: [
      {
        component: "command",
        title: "Command",
        description: "A searchable command menu for actions and navigation, inline or in a dialog.",
        usage:
          "Pass `items`, flat or grouped as `{ value, items }`, to `Command.Root` and render the filtered results with a `Command.List` render function; use `Command.Group`, `Command.GroupLabel`, and `Command.Collection` for groups. Give each `Command.Item` its entry as `value` and handle the action in `onClick`, which also runs on Enter. `itemToStringValue` chooses the searchable text. For a palette, wrap it in `Command.Dialog` with `open`/`onOpenChange`.",
        examples: [
          "basic",
          {
            id: "dialog",
            title: "Command palette",
          },
        ],
      },
    ],
  },
  {
    slug: "navigation-menu",
    title: "Navigation menu",
    group: "Navigation",
    description: "Site navigation with rich dropdown panels.",
    sections: [
      {
        component: "navigation-menu",
        title: "Navigation menu",
        description: "Site navigation links with panels that open on hover or click.",
        usage:
          'Put a Trigger and Content in each Item, and style top-level links with className={NavigationMenu.triggerStyle()}. With orientation="vertical", panels open to the side (inline-end); set side, sideOffset, align or alignOffset on Root to change placement.',
        examples: [
          "basic",
          {
            id: "multi-column",
            wide: true,
          },
          "vertical",
        ],
      },
    ],
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    group: "Navigation",
    description: "A collapsible application sidebar.",
    sections: [
      {
        component: "sidebar",
        title: "Sidebar",
        description: "A collapsible app sidebar that becomes a sheet on mobile.",
        usage:
          'Wrap the layout in Sidebar.Provider and place Sidebar.Inset after a left sidebar or before a right one. collapsible is "offcanvas", "icon" (give menu buttons a tooltip) or "none". Pass contained to keep the sidebar inside a bounded region instead of the viewport, and keyboardShortcut={false} to disable Cmd/Ctrl+B.',
        examples: [
          {
            id: "app-shell",
            wide: true,
          },
          {
            id: "collapsible-submenus",
            wide: true,
          },
          {
            id: "variants",
            wide: true,
          },
          {
            id: "search-and-actions",
            wide: true,
          },
        ],
      },
    ],
  },
  {
    slug: "tabs",
    title: "Tabs",
    group: "Navigation",
    description: "Switch between related views.",
    sections: [
      {
        component: "tabs",
        title: "Tabs",
        description: "Switches between related panels of content on the same page.",
        usage:
          'Match each `Tabs.Trigger` to a `Tabs.Content` by `value`. Add `Tabs.Indicator` as the last child of `Tabs.List` for an animated active marker; use `variant="line"` for underlined tabs and `scrollable` for many tabs. `onClose` makes a tab closable with the Delete key and a pointer close mark; you choose the next active tab.',
        examples: [
          "basic",
          {
            id: "indicator",
            title: "Animated indicator",
          },
          {
            id: "vertical",
            title: "Vertical line",
          },
          {
            id: "with-icons",
            title: "Icons and badges",
          },
          "closable",
        ],
      },
    ],
  },
  {
    slug: "stepper",
    title: "Stepper",
    group: "Navigation",
    description: "Move through a multi-step flow.",
    sections: [
      {
        component: "stepper",
        title: "Stepper",
        description:
          "Guides users through a multi-step flow with a step list and one panel per step.",
        usage:
          "Compose each `Stepper.Step` from `Stepper.Indicator`, `Stepper.Title`, and an optional `Stepper.Description`, and pair it with a `Stepper.Panel` of the same `value`. `Stepper.Previous`/`Next` disable themselves at the ends and keep focus; with `linear`, later steps unlock as earlier ones are marked `completed`. Pass `keepMounted` to panels that hold uncontrolled form fields.",
        examples: [
          "basic",
          {
            id: "linear",
            title: "Linear with validation",
            wide: true,
          },
        ],
      },
    ],
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    group: "Navigation",
    description: "Show where a page sits within a hierarchy.",
    sections: [
      {
        component: "breadcrumb",
        title: "Breadcrumb",
        description: "Shows where the current page sits in the site hierarchy.",
        usage:
          'Put Separator between items and use Page for the current page. Ellipsis announces its label (default "More pages"), so it can be the only content of a menu trigger for hidden pages.',
        examples: [
          "basic",
          {
            id: "collapsed",
            title: "Collapsed with menu",
          },
          "custom-styling",
          {
            id: "truncated",
            title: "Truncated long path",
          },
        ],
      },
    ],
  },
  {
    slug: "pagination",
    title: "Pagination",
    group: "Navigation",
    description: "Move between pages of results.",
    sections: [
      {
        component: "pagination",
        title: "Pagination",
        description: "Navigation between pages of a larger collection.",
        usage:
          "Compose Root, Content, Item, Link, Previous, Next and Ellipsis for link-based paging; aria-disabled dims a link and blocks activation. For state-driven paging use Pagination.Controls with totalItems and a 1-based page, and pageSizeOptions for a rows-per-page select.",
        examples: [
          "basic",
          "controls",
          {
            id: "jump-to-page",
            title: "Jump to page",
          },
        ],
      },
    ],
  },
  {
    slug: "toolbar",
    title: "Toolbar",
    group: "Navigation",
    description: "Group controls into a single keyboard stop.",
    sections: [
      {
        component: "toolbar",
        title: "Toolbar",
        description: "Groups related controls into one tab stop with arrow-key navigation.",
        usage:
          'Label the toolbar with `aria-label`. Use `size="icon"` for icon-only buttons; disabled buttons stay focusable. Compose toggles, menu triggers, and tooltips through the `render` prop (`Toolbar.Button render={<ToggleGroup.Item />}`, `render={<DropdownMenu.Trigger />}`, `Tooltip.Trigger render={<Toolbar.Button />}`), and keep a single `Toolbar.Input` as the last item.',
        examples: [
          "formatting",
          {
            id: "mixed-controls",
            title: "Menu and input",
          },
          "vertical",
          "dock",
        ],
      },
    ],
  },
  {
    slug: "alert",
    title: "Alert",
    group: "Feedback",
    description: "Keep important information visible within the page.",
    sections: [
      {
        component: "alert",
        title: "Alert",
        description: "An inline message that keeps important information visible on the page.",
        usage:
          'Choose a tone with variant. Alerts are static by default; pass role="alert" or role="status" when the alert appears in response to an action.',
        examples: [
          "basic",
          "variants",
          "dismissible",
          {
            id: "announcement",
            title: "Announced alert",
          },
        ],
      },
    ],
  },
  {
    slug: "toast",
    title: "Toast",
    group: "Feedback",
    description: "Confirm actions with brief, non-blocking notifications.",
    sections: [
      {
        component: "toast",
        title: "Toast",
        description: "Brief, non-blocking notifications that confirm actions or report progress.",
        usage:
          "Mount one Toast.Toaster near the app root and call Toast.toast.add({ title, type }) anywhere; type is info, success, warning, destructive, or loading. Give any extra Toaster its own manager from Toast.createToastManager().",
        examples: [
          "basic",
          {
            id: "types",
            title: "Types",
          },
          "action",
          "promise",
          "position",
          {
            id: "custom",
            title: "Custom content",
          },
        ],
      },
    ],
  },
  {
    slug: "progress",
    title: "Progress",
    group: "Feedback",
    description: "Show completion on a bar, a ring, or a segmented meter.",
    sections: [
      {
        component: "progress",
        title: "Progress",
        description: "A bar that shows how far a task has progressed.",
        usage:
          "Pass value={null} for indeterminate work. Set variant for tone and size for thickness; pass your own Progress.Track to control layout.",
        examples: [
          "basic",
          "indeterminate",
          "variants",
          "sizes",
          {
            id: "steps",
            title: "Custom track and value",
          },
        ],
      },
      {
        component: "circular-progress",
        title: "Circular progress",
        description: "A compact ring that shows progress.",
        usage:
          "Provide label or aria-label; showValue prints the percentage. value={null} renders a spinning indeterminate arc.",
        examples: ["basic", "variants", "sizes", "indeterminate"],
      },
      {
        component: "meter-group",
        title: "Meter group",
        description: "Several measurements stacked in one bar within a shared range.",
        usage:
          "Name the group with label or aria-label. Values display as a percentage of max by default; pass format for units, and prefer theme tokens such as var(--chart-2) for colors.",
        examples: [
          "basic",
          {
            id: "units",
            title: "Custom range and units",
          },
          "vertical",
          {
            id: "icons",
            title: "Icons and legend first",
          },
        ],
      },
    ],
  },
  {
    slug: "loading",
    title: "Loading",
    group: "Feedback",
    description: "Indicate pending work with spinners, placeholders, and blocked regions.",
    sections: [
      {
        component: "spinner",
        title: "Spinner",
        description: "An animated indicator for short, indeterminate waits.",
        usage:
          'The spinner announces "Loading" by default; override aria-label, or set aria-hidden when visible text already describes the wait. Size and color it with className.',
        examples: ["basic", "with-label", "sizes"],
      },
      {
        component: "skeleton",
        title: "Skeleton",
        description: "Placeholder shapes that stand in for content while it loads.",
        usage:
          "Match the size and layout of the content you expect to reduce layout shift when it arrives.",
        examples: [
          "basic",
          "card",
          {
            id: "table",
            wide: true,
          },
        ],
      },
      {
        component: "block-ui",
        title: "Block UI",
        description: "Makes a region inert and shows a busy overlay while work runs.",
        usage:
          "Toggle blocked; label sets the default overlay text. Focus inside the region moves to the overlay and returns afterwards; onBlocked and onUnblocked report changes.",
        imports: "BlockUI",
        examples: [
          "basic",
          "custom-overlay",
          {
            id: "lifecycle",
            title: "Lifecycle callbacks",
          },
        ],
      },
    ],
  },
  {
    slug: "empty",
    title: "Empty",
    group: "Feedback",
    description: "Explain an empty state and offer a next step.",
    sections: [
      {
        component: "empty",
        title: "Empty",
        description: "Explains why there is no content yet and offers a next step.",
        usage:
          'Use variant="outline" for a dashed bordered area, or the default inside cards and tables. Keep the description short and give one clear action.',
        examples: ["basic", "search-results"],
      },
    ],
  },
  {
    slug: "table",
    title: "Table",
    group: "Data",
    description: "Display rows of data, from a simple table to a sortable, selectable data grid.",
    sections: [
      {
        component: "table",
        title: "Table",
        description: "Semantic table parts for static rows and columns.",
        usage:
          'Compose Table.Root with Header, Body, Footer, Row, Head, Cell and Caption. Set data-state="selected" on a Row to highlight it. Use Data table when you need sorting, filtering or paging.',
        examples: ["basic", "status-and-actions", "selectable-rows"],
      },
      {
        component: "data-table",
        title: "Data table",
        description:
          "A typed TanStack Table grid with sorting, search, pagination, selection, and expandable rows.",
        usage:
          "Always pass a stable getRowId: selection is keyed by row id and survives data refreshes and server paging. Every state accepts value/default/onChange props. For server data set manual and rowCount, and pass the current page as data. Nested data uses getSubRows (a keyboard-navigable tree grid) and detail rows use renderSubComponent. virtual={{ height }} renders only the visible rows and works with or without pagination (paginate={false}).",
        examples: [
          {
            id: "basic",
            wide: true,
          },
          {
            id: "row-selection",
            wide: true,
          },
          {
            id: "server-side",
            wide: true,
          },
          {
            id: "sub-rows",
            title: "Sub rows (tree)",
            wide: true,
          },
          {
            id: "expandable-detail",
            wide: true,
          },
          {
            id: "virtualized",
            title: "Virtualized large list",
            wide: true,
          },
          {
            id: "column-visibility-and-pinning",
            wide: true,
          },
        ],
      },
    ],
  },
  {
    slug: "tree",
    title: "Tree",
    group: "Data",
    description: "Browse, select, and chart hierarchical data.",
    sections: [
      {
        component: "tree",
        title: "Tree",
        description:
          "Displays hierarchical data with keyboard navigation, selection, filtering, and lazily loaded branches.",
        usage:
          'Give every TreeNode a stable key. selectionMode "single" uses a string or null value; "multiple" and "checkbox" use string arrays. Mark nodes lazy and provide onLoadChildren to fetch branches on first expand.',
        examples: ["basic", "checkbox-selection", "filtering", "lazy-loading"],
      },
      {
        component: "tree-select",
        title: "Tree select",
        description: "A form control that picks one or more nodes from a tree in a popup.",
        usage:
          'Name it with aria-labelledby pointing at a visible Label, or with label. Use name for form submission and display="chips" with clearable for multiple values; expansion and loaded branches persist between openings.',
        examples: [
          "basic",
          {
            id: "multiple",
            title: "Multiple selection",
          },
          "checkbox-selection",
          "lazy-loading",
        ],
      },
      {
        component: "organization-chart",
        title: "Organization chart",
        description:
          "Shows a reporting hierarchy as connected cards with selection and collapsible branches.",
        usage:
          "Render custom cards with renderNode and the node's data. Set collapsible={false} for a static chart, or defaultExpandedKeys to start with some branches closed.",
        examples: [
          {
            id: "basic",
            wide: true,
          },
          {
            id: "horizontal",
            wide: true,
          },
        ],
      },
    ],
  },
  {
    slug: "data-view",
    title: "Data view",
    group: "Data",
    description: "Present collections as lists or grids, paged, loaded on demand, or virtualized.",
    sections: [
      {
        component: "data-view",
        title: "Data view",
        description:
          "Presents a collection as a list or grid with optional search, sorting, and paging.",
        usage:
          'Provide filterItem to show the search field. paging="pages" splits local items into pages; "load-more" and "infinite" reveal batches, or with onLoadMore, hasMore, and loading, request remote records.',
        examples: [
          {
            id: "basic",
            wide: true,
          },
          "load-more",
          "infinite-scroll",
        ],
      },
      {
        component: "virtual-scroller",
        title: "Virtual scroller",
        description: "Renders only the visible part of very long lists, strips, and grids.",
        usage:
          "Use itemSize for fixed sizes or estimatedItemSize to measure rows of varying height. lanes turns the list into a grid; use the ref's scrollToIndex to jump to an item.",
        examples: ["basic", "variable-height", "grid", "horizontal", "scroll-to-index"],
      },
    ],
  },
  {
    slug: "order-list",
    title: "Order list",
    group: "Data",
    description: "Reorder a list, or move items between two lists.",
    sections: [
      {
        component: "order-list",
        title: "Order list",
        description: "Lets people reorder a list with buttons, Alt+Arrow keys, or drag and drop.",
        usage:
          "Control the order with value and onValueChange. Provide filterItem to show a filter; moves while filtered keep hidden items in place.",
        examples: ["basic", "controlled", "drag-and-drop"],
      },
      {
        component: "pick-list",
        title: "Pick list",
        description: "Moves items between an available list and a selected list.",
        usage:
          "value holds { source, target }, and onValueChange fires for every transfer and reorder. Use isItemDisabled to lock required items in place.",
        examples: [
          {
            id: "basic",
            wide: true,
          },
          {
            id: "controlled",
            wide: true,
          },
          {
            id: "disabled-items",
            title: "Locked items",
            wide: true,
          },
          {
            id: "drag-and-drop",
            wide: true,
          },
        ],
      },
    ],
  },
  {
    slug: "timeline",
    title: "Timeline",
    group: "Data",
    description: "Show events in sequence.",
    sections: [
      {
        component: "timeline",
        title: "Timeline",
        description: "Displays related events along a vertical or horizontal track.",
        usage:
          "Pass items with content plus optional opposite details and markers. align places the track at the start or end, or alternates content across it.",
        examples: [
          "basic",
          {
            id: "alternate",
            wide: true,
          },
          {
            id: "horizontal",
            wide: true,
          },
        ],
      },
    ],
  },
  {
    slug: "chart",
    title: "Chart",
    group: "Data",
    description: "Present data with shared colors, tooltips, and legends.",
    sections: [
      {
        component: "chart",
        title: "Chart",
        description: "Recharts wrappers that share theme colors, tooltips, and legends.",
        usage:
          "Install recharts (an optional peer dependency) and wrap any Recharts chart in Chart.Root with a Chart.Config. Each config key becomes a --color-<key> variable. Use Chart.Tooltip with Chart.TooltipContent and Chart.Legend with Chart.LegendContent for themed overlays.",
        examples: [
          {
            id: "line-chart",
            wide: true,
          },
          {
            id: "stacked-bar",
            title: "Stacked bar chart",
            wide: true,
          },
          {
            id: "mixed-chart",
            title: "Mixed chart with two axes",
            wide: true,
          },
          {
            id: "doughnut-chart",
            wide: true,
          },
          {
            id: "radar-chart",
            wide: true,
          },
          {
            id: "radial-bar-chart",
            wide: true,
          },
        ],
      },
    ],
  },
  {
    slug: "card",
    title: "Card",
    group: "Layout",
    description: "Group a title, content, and actions in a container.",
    sections: [
      {
        component: "card",
        title: "Card",
        description: "Group a title, content, and actions in one container.",
        usage:
          'Compose Header (Title, Description, Action), Body, and Footer. Put full-bleed images in Card.Media as the first or last child, and the card removes its padding on that edge. Use size="sm" for dense layouts.',
        examples: [
          "basic",
          "header-action",
          "media",
          {
            id: "collapsible",
            title: "Collapsible card",
          },
          {
            id: "pricing",
            title: "Pricing card",
          },
          {
            id: "stat",
            title: "Stat card",
          },
        ],
      },
    ],
  },
  {
    slug: "accordion",
    title: "Accordion",
    group: "Layout",
    description: "Expand and collapse sections of content.",
    sections: [
      {
        component: "accordion",
        title: "Accordion",
        description: "A stack of headings that each expand a section of content.",
        usage:
          "Give each Item a value and use defaultValue (an array) to open items initially. Add multiple to allow several open at once. Content's className styles the animated panel; keep vertical padding on its children.",
        examples: [
          "basic",
          "multiple",
          "disabled",
          {
            id: "cards",
            title: "Card style",
          },
        ],
      },
      {
        component: "collapsible",
        title: "Collapsible",
        description: "Show and hide one region with a trigger.",
        usage:
          "Render the trigger as a Button with the render prop. Use open/onOpenChange to control it. Content animates its height, so put padding and borders on an element inside it.",
        examples: ["basic", "controlled"],
      },
    ],
  },
  {
    slug: "item",
    title: "Item",
    group: "Layout",
    description: "Lay out a row of media, text, and actions.",
    sections: [
      {
        component: "item",
        title: "Item",
        description: "A row of media, text, and actions.",
        usage:
          'Compose Media, Content (Title, Description), and Actions. Item.Group lays items out as a list; render items as links with render={<a href="…" />}. Variants are default, outline, and muted.',
        examples: ["basic", "list", "variants", "links"],
      },
    ],
  },
  {
    slug: "separator",
    title: "Separator",
    group: "Layout",
    description: "Divide content, with an optional label.",
    sections: [
      {
        component: "separator",
        title: "Separator",
        description: "Divide content, with an optional label.",
        usage:
          'Use orientation="vertical" inside a row with a set height. Children render as a label between two rules; align positions it. variant switches between solid, dashed, and dotted lines.',
        examples: ["basic", "labeled", "variants"],
      },
    ],
  },
  {
    slug: "scroll-area",
    title: "Scroll area",
    group: "Layout",
    description: "Scroll content with styled scrollbars.",
    sections: [
      {
        component: "scroll-area",
        title: "Scroll area",
        description: "Scroll content with styled scrollbars.",
        usage:
          'Give Root a fixed height or width. Set scrollbars to "horizontal" or "both" when the content scrolls sideways (default "vertical").',
        examples: ["basic", "horizontal", "both-axes"],
      },
    ],
  },
  {
    slug: "resizable",
    title: "Resizable",
    group: "Layout",
    description: "Split space into panels people can resize.",
    sections: [
      {
        component: "resizable",
        title: "Resizable",
        description: "Split space into panels people can resize.",
        usage:
          'Set orientation on Root and give panels defaultSize (and minSize) values such as "40%". Size Root with height classes. Add withHandle for a visible grip, and nest a Root inside a Panel for complex layouts.',
        examples: ["basic", "vertical", "nested"],
      },
    ],
  },
  {
    slug: "aspect-ratio",
    title: "Aspect ratio",
    group: "Layout",
    description: "Keep media at a consistent proportion.",
    sections: [
      {
        component: "aspect-ratio",
        title: "Aspect ratio",
        description: "Keep media at a consistent proportion.",
        usage:
          "Pass ratio as width / height, for example 16 / 9. Children fill the box; use object-cover on images.",
        examples: ["basic", "ratios"],
      },
    ],
  },
  {
    slug: "snippet",
    title: "Snippet",
    group: "Layout",
    description: "Show a copyable command or code line.",
    sections: [
      {
        component: "snippet",
        title: "Snippet",
        description: "A copyable command or code lines.",
        usage:
          "Pass a string, or an array for several lines. Use codeString when the copied text differs from what is shown, symbol to change or remove the prompt, and disableCopy for display-only snippets.",
        examples: ["basic", "variants", "multiline", "without-copy"],
      },
    ],
  },
  {
    slug: "carousel",
    title: "Carousel",
    group: "Media",
    description: "Move through slides with touch, buttons, or the keyboard.",
    sections: [
      {
        component: "carousel",
        title: "Carousel",
        description: "Move through slides with touch, buttons, or the arrow keys.",
        usage:
          'Pass a descriptive aria-label. Size slides with basis-* classes on Item, and pass Embla options through opts. Use setApi to build custom controls such as thumbnails. For right-to-left, wrap it in DirectionProvider and set dir="rtl" on an ancestor.',
        examples: [
          "basic",
          "multiple-slides",
          "vertical",
          {
            id: "gallery",
            title: "Gallery with thumbnails",
            wide: true,
          },
        ],
      },
    ],
  },
  {
    slug: "image-preview",
    title: "Image preview",
    group: "Media",
    description: "Open an image full screen with zoom.",
    sections: [
      {
        component: "image-preview",
        title: "Image preview",
        description: "A thumbnail that opens the image in a dialog with zoom, pan, and rotation.",
        usage:
          "alt is required and becomes the dialog title. className styles the trigger and imageClassName the thumbnail. Pass previewSrc for a larger file in the dialog, and maxZoom to change the zoom limit.",
        examples: [
          "basic",
          {
            id: "preview-source",
            title: "Separate preview source",
          },
          {
            id: "grid",
            title: "Thumbnail grid",
          },
        ],
      },
    ],
  },
  {
    slug: "chat",
    title: "Chat",
    group: "Messaging",
    description: "Build conversation views from messages, bubbles, markers, and attachments.",
    sections: [
      {
        component: "message",
        title: "Message",
        description: "One chat message with an optional avatar, header, and footer.",
        usage:
          'Set align="end" on Message.Root for the current user\'s messages; bubbles inside follow it automatically. Use Message.Group for consecutive messages.',
        examples: ["basic", "conversation"],
      },
      {
        component: "bubble",
        title: "Bubble",
        description: "The styled body of a chat message.",
        usage:
          "Pick a variant for the sender or tone and stack consecutive bubbles in Bubble.Group. Use align only for bubbles outside a Message. Reactions pin a small badge to a bubble edge.",
        examples: ["basic", "variants", "reactions"],
      },
      {
        component: "marker",
        title: "Marker",
        description:
          "A system row in a conversation timeline, such as a join notice or unread line.",
        usage:
          'Combine Marker.Icon and Marker.Content. variant="border" adds a rule underneath. For date dividers, use a labeled Separator.',
        examples: ["basic", "border"],
      },
      {
        component: "attachment",
        title: "Attachment",
        description: "A file in a composer or message, with upload states.",
        usage:
          "Set state to idle, uploading, processing, error, or done; uploading and processing mark it busy. Add Attachment.Progress inside Content for upload progress. Use Attachment.Group for a scrollable row in a composer.",
        examples: [
          "basic",
          "states",
          "sizes",
          "image",
          {
            id: "composer",
            title: "In a composer",
            wide: true,
          },
        ],
      },
      {
        component: "message-scroller",
        title: "Message scroller",
        description:
          "A chat transcript viewport that keeps the reader in place and can follow new messages.",
        usage:
          "Wrap it in MessageScroller.Provider and give Root a fixed height. Add autoScroll to follow new messages while at the bottom, and pass a stable messageId to each Item. MessageScroller.Button jumps to the latest message.",
        examples: [
          "basic",
          {
            id: "live",
            title: "Following new messages",
          },
        ],
      },
    ],
  },
  {
    slug: "direction",
    title: "Direction",
    group: "Utilities",
    description: "Set left-to-right or right-to-left layout for a subtree.",
    sections: [
      {
        component: "direction",
        title: "Direction",
        description: "Set left-to-right or right-to-left behavior for a subtree.",
        usage:
          "Wrap components in DirectionProvider and set the same dir on an ancestor element. The provider reverses keyboard and layout behavior in components such as Tabs, Slider, and Carousel; dir handles the text layout.",
        imports: "DirectionProvider, useDirection",
        examples: [
          "right-to-left",
          {
            id: "switch-direction",
            title: "Switch direction",
          },
        ],
      },
    ],
  },
]

export const templates = [
  {
    slug: "dashboard",
    title: "Dashboard",
    description:
      "A workspace overview with metrics, a revenue chart, and a searchable project table.",
    tag: "Application",
    note: "The dashboard uses sample data and in-memory state. Connect your own backend to persist changes.",
  },
  {
    slug: "login",
    title: "Login",
    description:
      "A responsive sign-in page with labeled fields, validation, and password visibility.",
    tag: "Authentication",
    note: "The sign-in form validates fields locally. Connect an authentication provider before production use. No credentials are sent or stored.",
  },
  {
    slug: "analytics",
    title: "Analytics",
    description:
      "A reporting workspace with period selection, revenue charts, and a searchable, sortable transaction table.",
    tag: "Application",
    note: "Charts, metrics, and the transaction ledger use sample data. Export downloads the fixed sample ledger. Connect your own data source before production use.",
  },
  {
    slug: "landing",
    title: "Product landing page",
    description:
      "A responsive product page with mobile navigation, features, a FAQ, and a local signup form.",
    tag: "Marketing",
    note: "Forma is a sample brand. The signup form validates locally and sends no data. Replace the copy and connect your own signup service before launch.",
  },
  {
    slug: "pricing",
    title: "Pricing",
    description: "Monthly and annual pricing, a plan comparison, and an interactive plan summary.",
    tag: "Marketing",
    note: "Prices are sample data. Choosing a plan opens a local summary. No checkout, payment, or subscription is created. Connect your billing provider before launch.",
  },
  {
    slug: "register",
    title: "Registration",
    description:
      "Workspace registration with labeled inputs, password visibility, and local validation.",
    tag: "Authentication",
    note: "The registration form validates locally. No account is created and no credentials are sent or stored. Connect your authentication and workspace APIs.",
  },
  {
    slug: "forgot-password",
    title: "Password recovery",
    description:
      "A password-reset request form with a confirmation state and an option to change the email.",
    tag: "Authentication",
    note: "No reset email is sent. Connect an authentication provider's recovery endpoint and return the same response for existing and unknown accounts.",
  },
  {
    slug: "two-factor",
    title: "Two-factor verification",
    description:
      "A six-digit verification form with paste support, keyboard access, and local format validation.",
    tag: "Authentication",
    note: "Only the code format is validated. No identity is verified and no code is sent or stored. Connect server-side verification with code expiry and rate limits.",
  },
]

// Sidebar order: groups in order, pages in catalog order within each group.
export const orderedPages = groups.flatMap(function (group) {
  return pages.filter(function (page) {
    return page.group === group
  })
})

// Keep generated pages and navigation on the same catalog.
export function getPage(path: string) {
  const normalized = path.replace(/\/$/, "") || "/"
  const page = pages.find(function (item) {
    return normalized === `/components/${item.slug}`
  })
  if (page) return { kind: "component" as const, ...page }
  const template = templates.find(function (item) {
    return normalized === `/templates/${item.slug}` || normalized === `/preview/${item.slug}`
  })
  if (template)
    return {
      kind: normalized.startsWith("/preview/") ? ("preview" as const) : ("template" as const),
      ...template,
    }
  if (normalized === "/templates")
    return {
      kind: "templates" as const,
      title: "Start a little further ahead.",
      description:
        "Ready-made pages built with the same components. Preview a template, read the source, or download a working React starter.",
    }
  if (normalized === "/components")
    return {
      kind: "components" as const,
      title: "Components for your next interface.",
      description:
        "Browse every accessible React building block in Sajam UI by category or search.",
    }
  if (normalized === "/installation")
    return {
      kind: "installation" as const,
      title: "Installation",
      description: "One package. The same components in every project.",
    }
  if (normalized === "/theming")
    return {
      kind: "theming" as const,
      title: "Make it yours.",
      description:
        "Build your theme in real time. Every component, template, and page follows your choices.",
    }
  if (normalized === "/")
    return {
      kind: "home" as const,
      title: "Sajam UI",
      description:
        "A shared home for the React components you use every day. Build with Base UI, style with Tailwind, and make the details your own.",
    }
  return {
    kind: "not-found" as const,
    title: "Page not found",
    description:
      "This page isn't in the component collection. Choose a component or return to the introduction.",
  }
}

// Resolve a section's examples into ids, display titles, and module paths.
export function getExamples(section: DocSection) {
  return section.examples.map(function (example) {
    const { id, title, wide = false } = typeof example === "string" ? { id: example } : example
    const name = id.replaceAll("-", " ")
    return {
      id,
      title: title ?? name[0].toUpperCase() + name.slice(1),
      wide,
      path: `./examples/${section.component}/${id}.tsx`,
    }
  })
}

// The names a section's component exports from its public path.
export function getImportNames(section: DocSection) {
  return (
    section.imports ??
    section.component.replace(/(^|-)([a-z])/g, function (_match, _dash, letter: string) {
      return letter.toUpperCase()
    })
  )
}

export type Group = (typeof groups)[number]

export type DocPage = {
  slug: string
  title: string
  group: Group
  description: string
  sections: DocSection[]
}

export type DocSection = {
  component: string
  title: string
  description: string
  usage?: string
  imports?: string
  examples: (string | { id: string; title?: string; wide?: boolean })[]
}
