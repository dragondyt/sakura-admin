import {mergeConfig} from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configArcoResolverPlugin from './plugin/arcoResolver';
import configStyleImportPlugin from './plugin/styleImport';
import configImageminPlugin from './plugin/imagemin';
import { resolve } from 'path';

export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configStyleImportPlugin(),
      configImageminPlugin(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    arco: ['@arco-design/web-vue'],
                    chart: ['echarts', 'vue-echarts'],
                    vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
                },
            },
        },
        lib: {
            formats: ['es'],
            entry: resolve(__dirname, '../src/main.ts'),
            name: 'admin', // 起个名字，安装、引入用
            format: 'amd',
            fileName: (format) => `admin.${format}.js` // 打包后的文件名
        },
        chunkSizeWarningLimit: 2000,
    },
  },
  baseConfig
);
