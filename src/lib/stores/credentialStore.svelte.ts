export type CredentialType = "wechat";

export interface GenericCredential {
    type: CredentialType;
    name?: string;
    appId?: string;
    appSecret?: string;
}

export interface CredentialStoreAdapter {
    load(): Promise<GenericCredential[]> | GenericCredential[];
    save(credential: GenericCredential): Promise<void> | void;
    remove(type: string): Promise<void> | void;
}

class CredentialStore {
    private adapter: CredentialStoreAdapter | null = null;
    private _credentials = $state<Record<CredentialType, GenericCredential>>({ wechat: { type: "wechat" } });

    async register(adapter: CredentialStoreAdapter) {
        this.adapter = adapter;
        try {
            const loadedCredentials = await adapter.load();
            if (loadedCredentials.length > 0) {
                this._credentials = loadedCredentials.reduce((acc, cred) => {
                    acc[cred.type] = cred;
                    return acc;
                }, {} as Record<CredentialType, GenericCredential>);
            }
        } catch (error) {
            console.error("Failed to load credentials:", error);
        }
    }

    getCredential(type: CredentialType): GenericCredential {
        return this._credentials[type];
    }

    async saveCredential(type: CredentialType) {
        const data = this._credentials[type];
        if (data && this.adapter) {
            await this.adapter.save($state.snapshot(data));
        }
    }

    get wechat(): GenericCredential {
        return this._credentials.wechat;
    }
}

export const credentialStore = new CredentialStore();
