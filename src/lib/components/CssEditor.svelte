<script lang="ts">
    import { onMount } from "svelte";
    import { EditorView, basicSetup } from "codemirror";
    import { EditorState, Compartment } from "@codemirror/state";
    import { css } from "@codemirror/lang-css";
    import { keymap } from "@codemirror/view";
    import { indentWithTab } from "@codemirror/commands";
    import { vsCodeLight } from "@fsegurai/codemirror-theme-vscode-light";
    import { vsCodeDark } from "@fsegurai/codemirror-theme-vscode-dark";
    import { globalState } from "../wenyan.svelte";
    import { monospace } from "@wenyan-md/core";

    let editorElement: HTMLDivElement;
    let view: EditorView;
    const themeConfig = new Compartment();
    let isDarkMode = $state(false);
    let cssContent = $derived(globalState.getCurrentThemeCss());

    onMount(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        isDarkMode = mediaQuery.matches;
        const handler = (e: MediaQueryListEvent) => (isDarkMode = e.matches);
        mediaQuery.addEventListener("change", handler);

        const state = EditorState.create({
            doc: cssContent,
            extensions: [
                basicSetup,
                keymap.of([indentWithTab]),
                css(),
                themeConfig.of(isDarkMode ? vsCodeDark : vsCodeLight),
                EditorState.tabSize.of(2),
                EditorView.lineWrapping,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        // 1. 用户输入 -> 更新 State
                        globalState.setCurrentThemeCss(update.state.doc.toString());
                    }
                }),
                EditorView.theme({
                    "&": { height: "100%" },
                    ".cm-scroller": { overflow: "auto" },
                    ".cm-content": {
                        fontFamily: monospace,
                    },
                    ".cm-gutters": {
                        fontFamily: monospace,
                    },
                }),
            ],
        });

        view = new EditorView({ state, parent: editorElement });

        return () => {
            mediaQuery.removeEventListener("change", handler);
            view?.destroy();
        };
    });

    // 主题切换副作用
    $effect(() => {
        if (view) {
            view.dispatch({
                effects: themeConfig.reconfigure(isDarkMode ? vsCodeDark : vsCodeLight),
            });
        }
    });

    // State 外部变化 -> 更新编辑器
    $effect(() => {
        if (view && cssContent !== undefined) {
            const currentDoc = view.state.doc.toString();
            if (currentDoc !== cssContent) {
                view.dispatch({
                    changes: { from: 0, to: currentDoc.length, insert: cssContent },
                });
            }
        }
    });
</script>

<div bind:this={editorElement} class="h-full w-full overflow-hidden text-base"></div>
