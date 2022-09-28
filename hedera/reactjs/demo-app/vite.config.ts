import svgr from "@honkhonk/vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
// eslint-disable-next-line @typescript-eslint/no-var-requires

// https://vitejs.dev/config/
// https://github.com/capaj/vite-lingui-poc
// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
export default defineConfig({
    assetsInclude: [`./src/assets/*`],
    envDir: `./env`,
    plugins: [
        react(),
        svgr(),
        tsconfigPaths()
    ],
});
