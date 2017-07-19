import TypescriptCompiler from 'broccoli-typescript-compiler';

export default {
  build(inputTree) {
    return TypescriptCompiler.typescript(inputTree, {
      tsconfig: {
        compilerOptions: {
          // TODO: check which options are required
          module: 'commonjs',
          target: 'es5',
          moduleResolution: 'node',
          newLine: 'LF',
          sourceMap: true,
          declaration: true,
        },
      },
    });
  },
};
