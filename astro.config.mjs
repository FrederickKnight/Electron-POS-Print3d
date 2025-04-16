// @ts-check
import { defineConfig } from 'astro/config';

// @ts-ignore
import electron from "astro-electron";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    integrations: [electron({
        main: {
            entry: "electron/main.ts"
        },
        vite: {}
        },
    ), react()],
    output:"server",
});