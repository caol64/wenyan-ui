import DOMPurify from "dompurify";
import { createWenyanCore } from "@wenyan-md/core";

type WenyanCoreInstance = Awaited<ReturnType<typeof createWenyanCore>>;

let globalCore: WenyanCoreInstance | null = null;
let initPromise: Promise<WenyanCoreInstance> | null = null;

class WenyanRenderer {
    html = $state("");
    isReady = $state(false);

    constructor() {
        this.init();
    }

    private async init() {
        if (globalCore) {
            this.isReady = true;
            return;
        }

        if (!initPromise) {
            initPromise = createWenyanCore();
        }

        globalCore = await initPromise;
        this.isReady = true;
    }

    async render(markdownText: string) {
        if (!markdownText) {
            this.html = "";
            return;
        }

        if (!globalCore) {
            await this.init();
        }

        try {
            const preHandlerContent = await globalCore!.handleFrontMatter(markdownText);
            let body = preHandlerContent.body;
            if (preHandlerContent.title) {
                body = `# ${preHandlerContent.title}\n\n${body}`;
            }
            const rendered = await globalCore!.renderMarkdown(body);
            this.html = DOMPurify.sanitize(rendered);
        } catch (error) {
            console.error("Wenyan render error:", error);
            this.html = `<p style="color:red">Render Error</p>`;
        }
    }
}

export const wenyanRenderer = new WenyanRenderer();

class WenyanCopier {
    html = $state("");
    isReady = $state(false);

    constructor() {
        this.init();
    }

    private async init() {
        if (globalCore) {
            this.isReady = true;
            return;
        }

        if (!initPromise) {
            initPromise = createWenyanCore();
        }

        globalCore = await initPromise;
        this.isReady = true;
    }

    async copy(wenyanElement: HTMLElement) {
        if (!wenyanElement) {
            throw new Error("Wenyan element is null");
        }

        if (!globalCore) {
            await this.init();
        }

        const rendered = await globalCore!.applyStylesWithTheme(wenyanElement);
        this.html = DOMPurify.sanitize(rendered);
    }
}

export const wenyanCopier = new WenyanCopier();
