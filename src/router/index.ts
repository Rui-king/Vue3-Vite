import { createRouter, createWebHistory } from 'vue-router'
import { start, done } from '@/utils/NProgress';

const layout = () => import('@V/layout/layout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 路由跳转后滚动到顶部
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@V/index.vue'),
      meta: {
        title: '首页',
        icon: 'House',
        isHomeHide: true, // true :不显示
      }
    },
    {
      path: '/vueBase',
      name: 'vueBase',
      redirect: '/vueBase/m1',
      component: layout,
      meta: {
        title: 'Vue基础',
        icon: 'Reading',
        layoutId: '/vueBase', // 同 path,仅限用于routes一级子路由
      },
      children: [
        {
          path: 'm1',
          component: () => import('@V/vueBase/m1.vue'),
          meta: {
            title: '响应式基础',
          }
        },
        {
          path: 'm2',
          component: () => import('@V/vueBase/m2.vue'),
          meta: {
            title: '侦听器',
          }
        },
        {
          path: 'm3',
          component: () => import('@V/vueBase/m3.vue'),
          meta: {
            title: '计算属性',
          }
        },
        {
          path: 'm4',
          component: () => import('@V/vueBase/m4.vue'),
          meta: {
            title: '组件交互',
          }
        },
        {
          path: 'm5',
          component: () => import('@V/vueBase/m5.vue'),
          meta: {
            title: 'vue-CSS',
          }
        },
        {
          path: 'm6',
          component: () => import('@V/vueBase/m6.vue'),
          meta: {
            title: 'vue-jsx',
          }
        }
      ]
    },
    {
      path: '/TS',
      component: () => import('@V/TS/typeScript.vue'),
      meta: {
        title: 'TS基础',
        icon: 'Folder',
      }
    },
    {
      path: '/item',
      redirect: '/item/m1',
      component: layout,
      meta: {
        title: '功能展示',
        icon: 'Folder',
        layoutId: '/item', // 同 path,仅限用于routes一级子路由
      },
      children: [
        {
          path: 'm1',
          component: () => import('@V/item/m1.vue'),
          meta: {
            title: '首页',
          }
        },
        {
          path: 'm2',
          component: () => import('@V/item/m2.vue'),
          meta: {
            title: '表单增删改查',
          }
        },
        {
          path: 'm3',
          component: () => import('@V/item/m3.vue'),
          meta: {
            title: '文件上传下载',
          }
        },
        {
          path: 'm4',
          component: () => import('@V/item/m4.vue'),
          meta: {
            title: 'Echarts使用',
          }
        },
      ]
    },
    {
      path: '/Snakes',
      component: () => import('@V/Snakes/Snakes.vue'),
      meta: {
        title: '贪吃蛇',
        icon: 'Folder',
      }
    },
    {
      path: '/login',
      component: () => import('@V/login/login.vue'),
      meta: {
        title: '登录',
        icon: 'SwitchButton',
        isHomeHide: true,
      }
    },
    {
      path: '/:all(.*)',
      component: () => import('@V/404/404.vue'),
      meta: {
        title: '404',
        icon: 'SwitchButton',
        isHomeHide: true,
      }
    },
  ]
})



router.beforeEach((to, from) => {
  start();
  const token = localStorage.getItem('token');
  if ((to.path === '/login' && !token) || token) return true;
  return {
    path: '/login',
    query: {
      to: to.fullPath
    },
    replace: true
  }

})

router.afterEach((to, from) => {
  done()
})


export default router
