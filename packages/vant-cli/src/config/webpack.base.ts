import sass from 'sass';
import FriendlyErrorsPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { join } from 'path';
import { existsSync } from 'fs';
import { consola } from '../common/logger';
import { WebpackConfig } from '../common/types';
import {
  CWD,
  CACHE_DIR,
  STYLE_EXTS,
  SCRIPT_EXTS,
  POSTCSS_CONFIG_FILE,
} from '../common/constant';

const CACHE_LOADER = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: CACHE_DIR,
  },
};

const CSS_LOADERS = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: POSTCSS_CONFIG_FILE,
      },
    },
  },
];

const plugins = [
  new VueLoaderPlugin(),
  new FriendlyErrorsPlugin({
    clearConsole: false,
    logLevel: 'WARNING',
  }),
];

const tsconfigPath = join(CWD, 'tsconfig.json');
if (existsSync(tsconfigPath)) {
  const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
  plugins.push(
    new ForkTsCheckerPlugin({
      formatter: 'codeframe',
      vue: { enabled: true },
      logger: {
        // skip info message
        info() {},
        warn(message: string) {
          consola.warn(message);
        },
        error(message: string) {
          consola.error(message);
        },
      },
    })
  );
}

const VUE_LOADER = {
  loader: 'vue-loader',
  options: {
    compilerOptions: {
      preserveWhitespace: false,
    },
  },
};

export const baseConfig: WebpackConfig = {
  mode: 'development',
  resolve: {
    extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [CACHE_LOADER, VUE_LOADER],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /^node_modules(\/\.pnpm)?\/(?!(@vant\/cli))/,
        use: [CACHE_LOADER, 'babel-loader'],
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [...CSS_LOADERS, 'less-loader',
          {
            loader: 'less-loader',
            options: {
              // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                modifyVars: {
                  // 直接覆盖变量
                  'green': 'red',
                  'font-size-md': '60px',
                  'border-color': '#eee',
                  // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                },
              },
          }],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          ...CSS_LOADERS,
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [CACHE_LOADER, VUE_LOADER, '@vant/markdown-loader'],
      },
    ],
  },
  plugins,
};
