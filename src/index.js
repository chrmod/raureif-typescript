import TypescriptCompiler from 'broccoli-typescript-compiler';
import Funnel from 'broccoli-funnel';
import MergeTrees from 'broccoli-merge-trees';

export default {
  exclude: ['**/*.ts'],

  build(inputTree) {
    const tmpDir = 'ts';
    const tsTree = TypescriptCompiler.typescript(inputTree, {
      tsconfig: {
        compilerOptions: {
          target: 'es5',
          moduleResolution: 'node',
          newLine: 'LF',
          inlineSourceMap: true,
          inlineSources: true,
          declaration: false,
          outDir: tmpDir,
          allowJs: true,
        },
      },
    });

    return new MergeTrees([
      new Funnel(inputTree, {
        exclude: ['**/*.ts'],
      }),
      new Funnel(tsTree, {
        srcDir: tmpDir,
      }),
    ], { overwrite: true });
  },
};
