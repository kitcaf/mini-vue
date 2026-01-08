import { defineConfig } from '@kitcaf/tocgen';

export default defineConfig({
    baseDir: 'docs',
    outDir: 'README.md',
    ignore: ['**/docs/index.md'],
});