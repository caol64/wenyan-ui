<script lang="ts">
    import { onMount } from "svelte";
    import { EditorView, basicSetup } from "codemirror";
    import { EditorState, Compartment } from "@codemirror/state";
    import { markdown } from "@codemirror/lang-markdown";
    import { keymap } from "@codemirror/view";
    import { indentWithTab } from "@codemirror/commands";
    import { vsCodeLight } from "@fsegurai/codemirror-theme-vscode-light";
    import { vsCodeDark } from "@fsegurai/codemirror-theme-vscode-dark";
    import { languages } from "@codemirror/language-data";
    import { globalState } from "$lib/wenyan.svelte";

    let editorElement: HTMLDivElement;
    let view: EditorView;
    const themeConfig = new Compartment();
    let isDarkMode = $state(false);

    onMount(() => {
        // --- 初始化系统主题检测 ---
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        isDarkMode = mediaQuery.matches;
        const handler = (e: MediaQueryListEvent) => {
            isDarkMode = e.matches;
        };
        mediaQuery.addEventListener("change", handler);

        const state = EditorState.create({
            doc: globalState.getCustomThemeCss(),
            extensions: [
                basicSetup,
                keymap.of([indentWithTab]),
                markdown({ codeLanguages: languages }),
                themeConfig.of(isDarkMode ? vsCodeDark : vsCodeLight),
                EditorState.tabSize.of(2),
                EditorView.lineWrapping,
                // 监听编辑器变化，同步回 Svelte state
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        globalState.setCustomThemeCss(update.state.doc.toString());
                    }
                }),
                EditorView.theme({
                    "&": { height: "100%" },
                    ".cm-scroller": { overflow: "auto" },
                }),
            ],
        });

        view = new EditorView({
            state,
            parent: editorElement,
        });

        return () => {
            mediaQuery.removeEventListener("change", handler);
            view?.destroy();
        };
    });

    $effect(() => {
        if (view) {
            view.dispatch({
                effects: themeConfig.reconfigure(isDarkMode ? vsCodeDark : vsCodeLight),
            });
        }
    });
</script>

<div bind:this={editorElement} class="h-full w-full overflow-hidden text-base"></div>
