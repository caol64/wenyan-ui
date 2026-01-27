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

    let {
        scrollRef = $bindable(),
        onUploadImage,
    }: {
        scrollRef?: HTMLElement | null;
        onUploadImage?: (file: File) => Promise<string | null>;
    } = $props();

    let editorElement: HTMLDivElement;
    let view: EditorView;
    const themeConfig = new Compartment();
    let isDarkMode = $state(false);
    const imgType = ["image/jpeg", "image/png", "image/gif", "image/webp"];

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
                        const files = event.clipboardData?.files;
                        if (files && files.length > 0) {
                            handleImageUpload(files[0], view);
                            event.preventDefault(); // 阻止默认粘贴行为
                        }
                    },
                    drop: (event, view) => {
                        const files = event.dataTransfer?.files;
                        if (files && files.length > 0) {
                            handleImageUpload(files[0], view);
                            event.preventDefault();
                        }
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

    async function handleImageUpload(file: File, view: EditorView) {
        if (!file || !imgType.includes(file.type)) return;

        if (onUploadImage) {
            try {
                const placeholder = `![上传中...](${file.name})`;
                const transaction = view.state.replaceSelection(placeholder);
                view.dispatch(transaction);

                const url = await onUploadImage(file);

                if (url) {
                    const insertedText = `![](${url})`;
                    const text = view.state.doc.toString();
                    const newText = text.replace(placeholder, insertedText);

                    view.dispatch({
                        changes: { from: 0, to: text.length, insert: newText },
                    });
                }
            } catch (error) {
                console.error("Upload failed", error);
            }
        }
    }
</script>

<div bind:this={editorElement} class="h-full w-full overflow-hidden text-base"></div>
