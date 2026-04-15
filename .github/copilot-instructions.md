# Copilot Instructions

## Build, test, and lint commands

- Use `pnpm` for all commands.
- `pnpm install` installs dependencies.
- `pnpm run dev` starts the SvelteKit demo app.
- `pnpm run build` builds the static demo and then packages the library by running `vite build && pnpm prepack`.
- `pnpm run prepack` runs `svelte-kit sync && svelte-package` to generate the published library in `dist/`.
- `pnpm run prepublishOnly` runs the publish validation path: `pnpm build && publint`.
- There is currently no repository test script, single-test command, or lint script defined in `package.json`.

## High-level architecture

- This repository is both a publishable Svelte component library and a SvelteKit demo shell. The reusable library surface is exported from `src/lib/index.ts`; the pages under `src/routes/` are standalone demo/integration pages for those components.
- Rendering is centered on the singleton state in `src/lib/wenyan.svelte.ts`. `globalState` holds editor/platform/theme UI state, `wenyanRenderer` lazy-loads `@wenyan-md/core` and turns markdown into preview HTML, and `wenyanCopier` transforms the rendered `#wenyan` DOM into platform-specific copy/publish output.
- `src/lib/components/MarkdownEditor.svelte` is the CodeMirror 6 editor. It writes changes back to `globalState`. `src/lib/components/ThemePreview.svelte` reacts to that state, calls `wenyanRenderer.render(...)`, and applies theme/highlight CSS into shared `<style>` tags in `document.head`.
- The package is designed to run in plain web builds and richer desktop/webview hosts. Browser-safe defaults live in `src/lib/hooks/*.ts` and `src/lib/services/default*.ts`; desktop-specific behavior is injected by host apps through Svelte context setters such as `setUploadImage`, `setPublishArticleClick`, `setHandleFileOpen`, and similar hook APIs.
- Persistence is adapter-based rather than hard-coded into components. `main/+page.svelte` registers IndexedDB-backed adapters for articles and custom themes, plus a localStorage-backed adapter for settings. Future hosts should follow the same pattern instead of importing storage APIs directly into UI components.
- The file explorer is optional host integration. `FileSidebar.svelte` expects an injected `fsAdapter`; the shared contract lives in `src/lib/layouts/explorer/fs.ts`.
- `@wenyan-md/core` owns markdown rendering, theme CSS loading, syntax highlight themes, footnotes, and platform-specific export helpers. Keep parsing/rendering logic there or behind injected host handlers instead of re-implementing it inside UI components.

## Key conventions

- Prefer the existing Svelte 5 rune-based singleton modules (`*.svelte.ts`) for shared state. `globalState`, `themeStore`, `settingsStore`, `articleStore`, and `credentialStore` are the main state entry points.
- Theme IDs are semantic and the prefix matters:
  - built-in themes use plain IDs such as `default`
  - unsaved draft custom themes use `0:<baseThemeId>`
  - persisted custom themes use `custom:<themeId>`
  Theme create/save/cancel/delete flows depend on those prefixes, so do not normalize them away.
- Settings objects are mutated in place and then explicitly persisted with `settingsStore.saveSettings()`. If you change settings UI, keep that explicit save call; persistence is not automatic.
- Web builds intentionally degrade desktop-only features with informational fallbacks instead of throwing. The default hook implementations for file open, publish, and image upload either no-op or show alert/confirm messages; preserve that behavior when extending integrations.
- Theme preview behavior is implemented by mutating the shared style tags `wenyan-theme-style`, `wenyan-hltheme-style`, and `wenyan-macstyle-style`. Changes to preview styling should continue using those IDs so all panels stay in sync.
- `globalState.setPlatform(...)` is not a cosmetic toggle. It also switches the active theme/highlight-theme behavior and controls whether the right sidebar is shown for WeChat-specific editing.
- The default article boot flow loads the last saved article from storage and falls back to `/example.md` via `getExampleArticle()`.
- File explorer adapters should expose only directories and Markdown files, using the filtering/sorting rules in `filterAndSortEntries(...)`.
