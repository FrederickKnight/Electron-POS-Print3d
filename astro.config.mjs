// @ts-check
import { defineConfig } from 'astro/config';

// @ts-ignore
import electron from "astro-electron";

// https://astro.build/config
export default defineConfig({
    integrations: [electron({
        main: {
            entry: "electron/main.ts"
        },
        vite: {}
        },
    )],
    output:"server",
});
