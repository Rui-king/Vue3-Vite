import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入mock
// import '@/mock/index';

// 全局 less
import '@/assets/css/index.less'
// vueEcharts 基础配置
import '@/vueEcharts/index';

const app = createApp(App)


// 全局引入 ElementPlus  图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app
    .use(createPinia())
    .use(router)
    .mount('#app')







