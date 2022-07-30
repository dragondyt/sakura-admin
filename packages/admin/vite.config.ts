import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path';
// https://vitejs.dev/config/
const CWD = process.cwd();
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_OUT_DIR } = loadEnv(mode, CWD);
  const isBuild = command === 'build';
  console.log('当前执行环境：', isBuild);
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'admin', // 起个名字，安装、引入用
        fileName: (format) => `admin.${format}.js` // 打包后的文件名
      },
      sourcemap: true, // 输出.map文件
      outDir: VITE_OUT_DIR
    },
    define: {
      'process.env': process.env
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    plugins: [vue(), AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    }),
      Components({
        resolvers: [NaiveUiResolver()]
      })]
  }
}