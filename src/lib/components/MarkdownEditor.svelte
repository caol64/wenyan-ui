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
    import { globalState } from "../wenyan.svelte";
    import { getEditorClick, getEditorPaste, getEditorDrop } from "../contexts/editor";

    let { scrollRef = $bindable() }: { scrollRef?: HTMLElement | null } = $props();

    const onPaste = getEditorPaste();
    const onDrop = getEditorDrop();
    const onEditorClick = getEditorClick();

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

    function handleClick(node: HTMLElement) {
        const onClick = (e: MouseEvent) => {
            onEditorClick?.();
        };

        node.addEventListener("click", onClick);

        return {
            destroy() {
                node.removeEventListener("click", onClick);
            },
        };
    }
</script>

<div use:handleClick bind:this={editorElement} class="h-full w-full overflow-hidden text-base"></div>
