<script setup lang='ts'>

const router = useRouter();
const route = useRoute();

const isHide = ref(true);
let isMove = false;

// 获取侧边栏列表
const url = route.path.match(/.*(?=\/)/)?.[0];
const tabList = router.options.routes.find(m => m.path === url)?.children;
// 点击切换
const clickTab = (path: string) => router.push(url + '/' + path);
// 鼠标移动显示隐藏侧边列表
const mousemove = ({ clientX }: MouseEvent) => {
    if (isMove) return;
    isMove = true;
    requestAnimationFrame(() => {
        isHide.value = clientX < 200 ? false : true;
        isMove = false;
    })
}

onMounted(() => {
    window.addEventListener('mousemove', mousemove)
})
onBeforeUnmount(() => {
    window.removeEventListener('mousemove', mousemove)
})
</script>

<template>
    <div id="animation">
        <ul class="tab" :style="`transform: translateX(${isHide ? -200 : 0}px);`">
            <li v-for="(m, i) in tabList" :key="i" :class="{ on: m.path === route.path.replace(/.*\//, '') }"
                @click="clickTab(m.path)">{{
                    m.meta?.title }}</li>
        </ul>
        <RouterViewTransition />
    </div>
</template>


<style lang='less' scoped>
#animation {
    width: 100%;
    height: 100%;
}

.tab {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    overflow-y: auto;
    transition: transform .3s;
    background: #e9e8e8;
    z-index: 10;

    li {
        font-size: 20px;
        cursor: pointer;
        line-height: 50px;
        border-bottom: 1px solid #999;
        padding: 0 20px;

        &.on {
            background: #9999994f;
        }
    }
}
</style>