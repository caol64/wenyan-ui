import { defaultEditorDropHandler, defaultEditorPasteHandler } from "../services/defaultEditorHandler";
import type { EditorView } from "@codemirror/view";
import { setContext, getContext } from "svelte";
import { EDITOR_CLICK_KEY, EDITOR_DROP_KEY, EDITOR_PASTE_KEY } from "./symbols";

type EditorClickFn = () => void;
type EditorPasteFn = (event: ClipboardEvent, view: EditorView) => void;
type EditorDropFn = (event: DragEvent, view: EditorView) => void;

export function setEditorClick(fn: EditorClickFn) {
    setContext(EDITOR_CLICK_KEY, fn);
}

export function getEditorClick(): EditorClickFn {
    return getContext<EditorClickFn>(EDITOR_CLICK_KEY);
}

export function setEditorPaste(fn: EditorPasteFn) {
    setContext(EDITOR_PASTE_KEY, fn);
}

export function getEditorPaste(): EditorPasteFn {
    return getContext<EditorPasteFn>(EDITOR_PASTE_KEY) ?? defaultEditorPasteHandler;
}

export function setEditorDrop(fn: EditorDropFn) {
    setContext(EDITOR_DROP_KEY, fn);
}

export function getEditorDrop(): EditorDropFn {
    return getContext<EditorDropFn>(EDITOR_DROP_KEY) ?? defaultEditorDropHandler;
}
