# Sajam UI

React components built on Base UI headless primitives and Tailwind CSS 4. The package ships ESM, TypeScript declarations, and a Tailwind stylesheet, and requires React 19, React DOM 19, and Tailwind CSS 4 as peer dependencies.

## Install

After the first release:

```sh
npm install @sajam/ui
```

Import the package stylesheet after Tailwind in the app's global CSS:

```css
@import "tailwindcss";
@import "@sajam/ui/styles.css";
```

The stylesheet registers the package's components with Tailwind via `@source` and includes light and dark tokens, utilities, animations, and base styles. It is Tailwind source, not precompiled CSS, so the app must process it with Tailwind. The app controls its font.

`styles.css` generates classes for every component. To generate only the classes of the components you use, import `theme.css` and one `sources/<component>.css` file per component instead. Each sources file also covers the package components it renders internally.

```css
@import "tailwindcss";
@import "@sajam/ui/theme.css";
@import "@sajam/ui/sources/button.css";
@import "@sajam/ui/sources/dialog.css";
```

Add a sources import whenever you start using another component; a missing one leaves that component unstyled.

```tsx
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"

export default function Example() {
  return (
    <Card.Root className="max-w-sm">
      <Card.Header>
        <Card.Title>My project</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button>Get started</Button>
      </Card.Body>
    </Card.Root>
  )
}
```

## API shape

Compound components export one namespace from their path. Compose members through it, such as `Card.Root`, `Card.Header`, and `Card.Body`; flat aliases such as `CardHeader` are not exported. Singleton components stay flat, including `Button`, `Input`, `Badge`, `DatePicker`, and `DataTable`, with helpers such as `buttonVariants` and types such as `DataTableColumn`. Direction exports `DirectionProvider` and `useDirection`.

The root entry exports the same API, but component paths keep imports focused. `@sajam/ui/utils` exports `cn`, and `@sajam/ui/hooks/use-mobile` exports `useIsMobile`.

Conventions shared by every component:

- Values use `value`, `defaultValue`, and `onValueChange`; disclosure uses `open`, `defaultOpen`, and `onOpenChange`.
- Status tones are `info`, `success`, `warning`, and `destructive`, passed through `variant` (Toast uses `type`). Sizes are `sm`, `default`, and `lg`.
- Base UI composition uses the `render` prop, for example `<Dialog.Trigger render={<Button />}>`.

Interactive modules keep their `"use client"` directives for React Server Components; add `"use client"` to your own components that use hooks or event handlers.

## Theme

Add the `dark` class to the app's `<html>` element to enable dark mode. Override tokens after the package import:

```css
@import "tailwindcss";
@import "@sajam/ui/styles.css";

:root {
  --radius: 0.75rem;
  --primary: oklch(0.55 0.2 260);
  --primary-foreground: oklch(0.985 0 0);
  --success: oklch(0.6 0.15 160);
}

.dark {
  --primary: oklch(0.75 0.15 260);
  --primary-foreground: oklch(0.2 0 0);
}
```

Besides the standard tokens (`background`, `primary`, `muted`, `destructive`, and so on), the theme adds `success`, `warning`, and `info`, each with a `-foreground` pair. Components use only theme tokens, so status colors follow your theme. Form controls are transparent in light mode and tinted with `--input` in dark mode, so they take the surface they sit on.

## Components

90 components, grouped as in the documentation, which has usage notes and live examples for each. Every component has its own import path under `@sajam/ui/`.

| Group      | Page and component paths                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Actions    | Button: `button`, `button-group`, `copy-button` · Badge: `badge` · Avatar: `avatar` · Keyboard key: `kbd` · Toggle: `toggle`, `toggle-group`, `segmented-control`                                                                                                                                                                                                                         |
| Inputs     | Input: `input`, `password-input`, `number-input`, `input-mask`, `tags-input`, `input-group`, `input-otp`, `file-upload` · Textarea: `textarea`, `mention` · Field: `field`, `label` · Select: `select`, `native-select` · `combobox` · `checkbox` · `radio-group` · `switch` · Slider: `slider`, `knob` · `rating` · Date picker: `date-picker`, `calendar` · `inplace` · `questionnaire` |
| Overlays   | Dialog: `dialog`, `alert-dialog`, `confirm-dialog` · Drawer: `drawer`, `sheet` · Popover: `popover`, `hover-card` · `tooltip` · Menu: `dropdown-menu`, `context-menu`, `menubar` · `command`                                                                                                                                                                                              |
| Navigation | `navigation-menu` · `sidebar` · `tabs` · `stepper` · `breadcrumb` · `pagination` · `toolbar`                                                                                                                                                                                                                                                                                              |
| Feedback   | `alert` · `toast` · Progress: `progress`, `circular-progress`, `meter-group` · Loading: `spinner`, `skeleton`, `block-ui` · `empty`                                                                                                                                                                                                                                                       |
| Data       | Table: `table`, `data-table` · Tree: `tree`, `tree-select`, `organization-chart` · Data view: `data-view`, `virtual-scroller` · Order list: `order-list`, `pick-list` · `timeline` · `chart`                                                                                                                                                                                              |
| Layout     | `card` · Accordion: `accordion`, `collapsible` · `item` · `separator` · `scroll-area` · `resizable` · `aspect-ratio` · `snippet`                                                                                                                                                                                                                                                          |
| Media      | `carousel` · `image-preview`                                                                                                                                                                                                                                                                                                                                                              |
| Messaging  | Chat: `message`, `bubble`, `marker`, `attachment`, `message-scroller`                                                                                                                                                                                                                                                                                                                     |
| Utilities  | `direction`                                                                                                                                                                                                                                                                                                                                                                               |

`chart` needs the optional peer `recharts`: install it in apps that use charts and import elements such as `LineChart` from `recharts` directly. Other dependencies install with the package. Upload, lazy loading, and persistence are handled through your callbacks; no component includes a backend.

## Development

This package lives in `packages/ui` of the Sajam UI monorepo; see the repository README for commands and publishing. Build it with `bun run build` in this workspace (or `bun run build:ui` from the root). `vp pack` alone is not a complete build: the full build also emits declarations with TypeScript and copies the public facades verbatim so namespace exports do not cross a client boundary. Only compiled modules, declarations, styles, the README, and the license are published.

## Credits

Built on [Base UI](https://base-ui.com/), inspired by [shadcn/ui](https://ui.shadcn.com/), with component ideas from [HeroUI v2](https://v2.heroui.com/) and [PrimeReact](https://github.com/primefaces/primereact).

| Library                                                              | License    | Used for                                     |
| -------------------------------------------------------------------- | ---------- | -------------------------------------------- |
| [React](https://react.dev/)                                          | MIT        | Component runtime and public peer dependency |
| [Tailwind CSS](https://tailwindcss.com/)                             | MIT        | Styling engine and public peer dependency    |
| [Base UI](https://base-ui.com/)                                      | MIT        | Accessible, unstyled component primitives    |
| [TanStack Table](https://tanstack.com/table)                         | MIT        | Data table state and row models              |
| [TanStack Virtual](https://tanstack.com/virtual)                     | MIT        | List and table virtualization                |
| [Class Variance Authority](https://cva.style/)                       | Apache-2.0 | Typed component variants                     |
| [cn](https://github.com/shadcn-ui/cn)                                | MIT        | Tailwind class merging                       |
| [Embla Carousel](https://www.embla-carousel.com/)                    | MIT        | Carousel behavior                            |
| [Lucide React](https://lucide.dev/)                                  | ISC        | Icons                                        |
| [React DayPicker](https://daypicker.dev/)                            | MIT        | Calendar and date selection                  |
| [React Resizable Panels](https://react-resizable-panels.vercel.app/) | MIT        | Resizable panel behavior                     |
| [Recharts](https://recharts.org/)                                    | MIT        | Charts (optional peer dependency)            |
| [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css)      | MIT        | Tailwind animation utilities                 |

## License

[MIT](./LICENSE)
