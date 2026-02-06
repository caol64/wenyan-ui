import { setContext, getContext } from "svelte";

const UPLOAD_HELP_KEY = Symbol("UPLOAD_HELP");

type UploadHelpClickFn = () => void;

export function setUploadHelpClick(fn: UploadHelpClickFn) {
    setContext(UPLOAD_HELP_KEY, fn);
}

export function getUploadHelpClick(): UploadHelpClickFn {
    return (
        getContext<UploadHelpClickFn>(UPLOAD_HELP_KEY) ??
        (() => {
            window.open("https://yuzhi.tech/docs/wenyan/upload", "_blank");
        })
    );
}
