import { createRouter, createWebHistory } from 'vue-router'
import { start, done } from '@/utils/NProgress';
import { $get } from '@/axios/index';

const layout = () => import('@V/layout/layout.vue') //仅限用于routes一级子路由(半屏)
const layout2 = () => import('@V/layout/layout2.vue') //仅限用于routes一级子路由(全屏)

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
        isHomeHide: true, // 是否显示在首页
        addHoverBtn: true, // 是否显示在悬浮球中
      }
    },
    {
      path: '/vueBase',
      name: 'vueBase',
      redirect: '/vueBase/m1',
      component: layout,
      meta: {
        title: 'Vue',
        icon: 'Reading',
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
        isHomeHide: true,
      }
    },
    {
      path: '/baGuWen',
      redirect: '/baGuWen/vue',
      component: layout,
      meta: {
        title: 'WEB',
        icon: 'Folder',
        addHoverBtn: true,
      },
      children: [
        {
          path: 'vue',
          component: () => import('@V/baGuWen/VUE.vue'),
          meta: {
            title: 'Vue',
          }
        },
        {
          path: 'JS',
          component: () => import('@V/baGuWen/JS.vue'),
          meta: {
            title: 'JS 问答',
          }
        },
        {
          path: 'JS2',
          component: () => import('@V/baGuWen/JS2.vue'),
          meta: {
            title: 'JS 练习',
          }
        },
        {
          path: 'SX',
          component: () => import('@V/baGuWen/SX.vue'),
          meta: {
            title: '手写系列',
          }
        },
        {
          path: 'CSS',
          component: () => import('@V/baGuWen/CSS.vue'),
          meta: {
            title: 'CSS',
          }
        },
      ]
    },
    {
      path: '/item',
      redirect: '/item/m1',
      component: layout,
      meta: {
        title: '功能',
        icon: 'Folder',
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
      path: '/animation',
      redirect: '/animation/m1',
      component: layout2,
      meta: {
        title: '动画',
        icon: 'SwitchButton',
        addHoverBtn: true,
      },
      children: [
        {
          path: 'm1',
          component: () => import('@V/animation/m1.vue'),
          meta: {
            title: '粒子运动',
          }
        },
        {
          path: 'm2',
          component: () => import('@V/animation/m2.vue'),
          meta: {
            title: '粒子文字',
          }
        },
        {
          path: 'm3',
          component: () => import('@V/animation/m3.vue'),
          meta: {
            title: '星空',
          }
        },
        {
          path: 'm4',
          component: () => import('@V/animation/m4.vue'),
          meta: {
            title: '数字上浮',
          }
        },
        {
          path: 'm5',
          component: () => import('@V/animation/m5.vue'),
          meta: {
            title: '数字雨',
          }
        },
        {
          path: 'm6',
          component: () => import('@V/animation/m6.vue'),
          meta: {
            title: '水滴雨',
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
        addHoverBtn: true,
      }
    },
    {
      path: '/login',
      component: () => import('@V/login/login.vue'),
      meta: {
        title: '退出登录',
        icon: 'SwitchButton',
        isHomeHide: true,
        hoverHide: true,
        addHoverBtn: true,
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
  if (to.path === '/login') return true;
  if (!token) {
    return {
      path: '/login',
      query: {
        to: to.fullPath
      },
      replace: true
    }
  }
  $get('/isLogin')
})

router.afterEach((to, from) => {
  done()
})


export default router
