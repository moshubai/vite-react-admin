import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd());

  return {
    base: env.VITE_API_ROUTER_URL,
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
      optimizeDeps: {
        // include 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
        include: ['@ant-design/icons'],
        // 设置为 true 强制使依赖预构建
        // force: true,
      },
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      svgr(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // modifyVars: themeVariables,
        },
      },
    },
    build: {
      emptyOutDir: true,
      outDir: env.VITE_API_BUILD_URL,
    },
    //静态资源处理  字符串|正则表达式
    assetsInclude: '',
    //调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
    logLevel: 'info',
    //设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    clearScreen: true,
    // 服务
    server: {
      // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      host: 'localhost',
      port: 9527,
      // 设为 true ,若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 是否自动在浏览器打开
      open: false,
      // 是否开启 https
      https: false,
      // 为开发服务器配置 CORS
      cors: true,
      proxy: {
        '/api/v1': {
          target: 'http://www.keyrus.tech:7000/eorder-oper',
          changeOrigin: true,
        },
      },
    },
    // esbuild: {
    //   logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // },
  };
});
