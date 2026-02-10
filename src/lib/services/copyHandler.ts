import { copyHtmlToClipboard, copyTextToClipboard, getWenyanElement } from "../utils";
import { globalState, wenyanCopier, wenyanRenderer } from "../wenyan.svelte";

export async function defaultCopyHandler() {
    if (globalState.getPlatform() === "juejin") {
        copyTextToClipboard(wenyanRenderer.postHandlerContent);
    } else {
        const wenyanElement = getWenyanElement();
        await wenyanCopier.copy(wenyanElement);
        copyHtmlToClipboard(wenyanCopier.html);
    }
}
