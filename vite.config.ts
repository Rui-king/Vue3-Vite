import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vueJsx from "@vitejs/plugin-vue-jsx";

// ElementPlus 按需引入配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@S': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@C': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@V': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@U': fileURLToPath(new URL('./src/utils', import.meta.url)),
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/css/var.less";',
      },
    },
  },
})
