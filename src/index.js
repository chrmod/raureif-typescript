import { typescript } from 'broccoli-typescript-compiler';
import Funnel from 'broccoli-funnel';
import MergeTrees from 'broccoli-merge-trees';
import path from 'path';
import Source from 'broccoli-source';

const UnwatchedDir = Source.UnwatchedDir;

export default {
  exclude: ['**/*.ts'],

  build(inputTree, project) {
    const tmpDir = 'ts';
    const nodeModulesPath = path.join(project.path, 'node_modules');
    const nodeTree = new UnwatchedDir(nodeModulesPath);
    const input = new MergeTrees([
      new Funnel(nodeTree, {
        destDir: 'node_modules',
      }),
      new Funnel(nodeTree, {
        srcDir: 'typescript/lib',
      }),
      new Funnel(inputTree, {
        destDir: 'src',
      }),
    ]);

    const tsTree = typescript(input, {
      tsconfig: {
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          moduleResolution: 'node',
          experimentalDecorators: true,
          noUnusedLocals: true,
          newLine: 'LF',
          inlineSourceMap: true,
          inlineSources: true,
          declaration: false,
          outDir: tmpDir,
          allowJs: true,
          types: ['node'],
          typeRoots: [path.join('node_modules', '@types')],
          lib: [
            'es2015',
            'dom',
          ],
        },
        include: [
          'src/**/*.ts',
        ],
      },
    });

    return tsTree;
  },
};
