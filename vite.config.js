import vue from '@vitejs/plugin-vue'
const path = require('path')
/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  alias: { //配置路径别名
    "@": path.resolve(__dirname, '/src')
  },
  server: { //本地服务
    port: 5201, //端口号
    open: true, //启动时是否自动打开
    proxy: { // 代理
      '/api': {
        target: 'http://localhost:5200/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
      }
    }
  },

  
  //依赖配置，加快构建速度  
  // optimizeDeps: {
  //   include: ["axios", "element-plus","js-cookie","marked"] 
  // },

}