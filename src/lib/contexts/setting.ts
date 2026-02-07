import { setContext, getContext } from "svelte";

const UPLOAD_HELP_KEY = Symbol("UPLOAD_HELP");
const RESET_TOKEN_KEY = Symbol("RESET_TOKEN");

type UploadHelpClickFn = () => void;
type ResetTokenClickFn = () => void;

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

export function setResetTokenClick(fn: ResetTokenClickFn) {
    setContext(RESET_TOKEN_KEY, fn);
}

export function getResetTokenClick(): ResetTokenClickFn {
    return getContext<ResetTokenClickFn>(RESET_TOKEN_KEY) ?? (() => {});
}
