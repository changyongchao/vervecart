import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 配置：官方 React 插件负责 JSX 转换与 Fast Refresh（热更新）
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 的项目站点部署在 /<repo>/ 子路径下：
  // CI 中由 actions/configure-pages 注入 BASE_PATH，本地开发保持 '/'
  base: process.env.BASE_PATH || '/',
  server: {
    // 允许在局域网内通过手机真机访问开发服务器，方便验证移动端体验
    host: true,
  },
})
