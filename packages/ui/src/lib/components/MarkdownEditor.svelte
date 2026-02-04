<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { EditorView, basicSetup } from "codemirror";
    import { EditorState, Compartment } from "@codemirror/state";
    import { markdown } from "@codemirror/lang-markdown";
    import { keymap } from "@codemirror/view";
    import { indentWithTab } from "@codemirror/commands";
    import { vsCodeLight } from "@fsegurai/codemirror-theme-vscode-light";
    import { vsCodeDark } from "@fsegurai/codemirror-theme-vscode-dark";
    import { languages } from "@codemirror/language-data";
    import { globalState } from "$lib/wenyan.svelte";
    import { EDITOR_DROP_HANDLER_CONTEXT_KEY, EDITOR_PASTE_HANDLER_CONTEXT_KEY } from "$lib/contextKeys";
    import type { EditorDropFn, EditorPasteFn } from "$lib/constants";

    let { scrollRef = $bindable() }: { scrollRef?: HTMLElement | null } = $props();

    const onPaste = getContext<EditorPasteFn>(EDITOR_PASTE_HANDLER_CONTEXT_KEY);
    const onDrop = getContext<EditorDropFn>(EDITOR_DROP_HANDLER_CONTEXT_KEY);

    let editorElement: HTMLDivElement;
    let view: EditorView;
    const themeConfig = new Compartment();
    let isDarkMode = $state(false);
    let markdownContent = $derived(globalState.getMarkdownText());

    onMount(() => {
        // --- 初始化系统主题检测 ---
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        isDarkMode = mediaQuery.matches;
        const handler = (e: MediaQueryListEvent) => {
            isDarkMode = e.matches;
        };
        mediaQuery.addEventListener("change", handler);

        const state = EditorState.create({
            doc: markdownContent,
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
                        globalState.setMarkdownText(update.state.doc.toString());
                    }
                }),
                EditorView.theme({
                    "&": { height: "100%" },
                    ".cm-scroller": { overflow: "auto" },
                }),
                EditorView.domEventHandlers({
                    paste: (event, view) => {
                        onPaste?.(event, view);
                    },
                    drop: (event, view) => {
                        onDrop?.(event, view);
                    },
                }),
            ],
        });

        view = new EditorView({
            state,
            parent: editorElement,
        });

        scrollRef = view.scrollDOM; // 将滚动容器暴露出去

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

    $effect(() => {
        if (view && markdownContent !== undefined) {
            const currentDoc = view.state.doc.toString();
            if (currentDoc !== markdownContent) {
                view.dispatch({
                    changes: { from: 0, to: currentDoc.length, insert: markdownContent },
                });
            }
        }
    });
</script>

<div bind:this={editorElement} class="h-full w-full overflow-hidden text-base"></div>
