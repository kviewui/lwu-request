import type { Options } from 'tsup';

export const tsup: Options = {
    entry: ["index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: true,
    clean: true,
    legacyOutput: true,
    treeshake: true,
    minify: true
};