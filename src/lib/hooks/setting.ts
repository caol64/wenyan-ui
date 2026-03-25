import { setContext, getContext } from "svelte";
import { AUTO_CACHE_CHANGE_KEY, RESET_TOKEN_KEY } from "./symbols";

type ResetTokenClickFn = () => void;
type AutoCacheChangeClickFn = () => void;

export function setResetTokenClick(fn: ResetTokenClickFn) {
    setContext(RESET_TOKEN_KEY, fn);
}

export function getResetTokenClick(): ResetTokenClickFn {
    return getContext<ResetTokenClickFn>(RESET_TOKEN_KEY);
}

export function setAutoCacheChangeClick(fn: AutoCacheChangeClickFn) {
    setContext(AUTO_CACHE_CHANGE_KEY, fn);
}

export function getAutoCacheChangeClick(): AutoCacheChangeClickFn {
    return getContext<AutoCacheChangeClickFn>(AUTO_CACHE_CHANGE_KEY);
}
