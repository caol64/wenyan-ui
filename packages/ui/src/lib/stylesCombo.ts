import { createCssModifier, monospace, sansSerif, serif } from "@wenyan-md/core";
import {
    DEFAULT_CODEBLOCK_SETTINGS,
    DEFAULT_PARAGRAPH_SETTINGS,
    type CodeblockSettings,
    type ParagraphSettings,
} from "./settingsStore.svelte";

type CssUpdate = {
    property: string;
    value?: string;
    append?: boolean;
};

export function comboCodeblockSettings(css: string, codeblockSettings: CodeblockSettings): string {
    if (codeblockSettings?.isFollowTheme) {
        return css;
    }
    let settings = codeblockSettings ?? DEFAULT_CODEBLOCK_SETTINGS;
    return createCssModifier({
        "#wenyan pre code": [
            {
                property: "font-family",
                value: settings.fontFamily,
                append: true,
            },
        ],
        "#wenyan pre": [
            {
                property: "font-size",
                value: settings.fontSize,
                append: true,
            },
        ],
    })(css);
}

export function comboParagraphSettings(css: string, paragraphSettings: ParagraphSettings): string {
    if (paragraphSettings?.isFollowTheme) {
        return css;
    }
    let settings = paragraphSettings ?? DEFAULT_PARAGRAPH_SETTINGS;
    const classes: CssUpdate[] = [];
    let fontFamilyUpdate: CssUpdate | undefined;
    if (settings.fontSize) {
        classes.push({ property: "font-size", value: settings.fontSize, append: true });
    }
    if (settings.fontFamily) {
        let fontValue = "";

        if (settings.fontFamily === "serif") {
            fontValue = serif;
        } else if (settings.fontFamily === "sans") {
            fontValue = sansSerif;
        } else if (settings.fontFamily === "mono") {
            fontValue = monospace;
        }

        if (fontValue) {
            fontFamilyUpdate = {
                property: "font-family",
                value: fontValue,
                append: true,
            };
            classes.push(fontFamilyUpdate);
        }
    }
    if (settings.fontWeight) {
        classes.push({ property: "font-weight", value: settings.fontWeight, append: true });
    }
    if (settings.letterSpacing) {
        classes.push({ property: "letter-spacing", value: settings.letterSpacing, append: true });
    }
    if (settings.lineHeight) {
        classes.push({ property: "line-height", value: settings.lineHeight, append: true });
    }
    if (settings.paragraphSpacing) {
        classes.push({ property: "margin", value: `${settings.paragraphSpacing} 0`, append: true });
    }
    const headingUpdates = fontFamilyUpdate ? [fontFamilyUpdate] : [];
    return createCssModifier({
        "#wenyan>p": classes,
        "#wenyan>ul": classes,
        "#wenyan>ol": classes,
        "#wenyan>h1": headingUpdates,
        "#wenyan>h2": headingUpdates,
        "#wenyan>h3": headingUpdates,
        "#wenyan>h4": headingUpdates,
        "#wenyan>h5": headingUpdates,
        "#wenyan>h6": headingUpdates,
    })(addParagraphElementSelectors(css));
}

function addParagraphElementSelectors(css: string): string {
    return `${css}#wenyan>p{}#wenyan>ul{}#wenyan>ol{}#wenyan>h1{}#wenyan>h2{}#wenyan>h3{}#wenyan>h4{}#wenyan>h5{}#wenyan>h6{}`;
}
