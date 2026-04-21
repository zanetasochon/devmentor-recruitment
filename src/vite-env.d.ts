/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECRUITMENT_WEBHOOK_URL?: string;
  readonly VITE_RECRUITMENT_CONFIRM_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
