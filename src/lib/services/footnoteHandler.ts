import { getWenyanElement } from "../utils";
import { globalState, wenyanRenderer } from "../wenyan.svelte";
import { addFootnotes } from "@wenyan-md/core";

export function defaultFootnoteHandler(isEnabled: boolean) {
    if (isEnabled) {
        const wenyanElement = getWenyanElement();
        addFootnotes(wenyanElement);
        wenyanRenderer.html = wenyanElement.innerHTML;
    } else {
        wenyanRenderer.render(globalState.getMarkdownText());
    }
}
