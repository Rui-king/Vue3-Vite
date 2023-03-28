<script setup lang='ts'>

let
    isMove = false,
    clickBoxSize = 50,
    timeoutID: number,
    isOpen = ref<boolean>(false),
    clickBegin: number;
const
    windowSize = reactive({
        w: window.innerWidth,
        h: window.innerHeight
    }),
    curPosition = reactive({
        x: windowSize.w - clickBoxSize,
        y: windowSize.h / 5,
    }),
    clickOffset = { x: 0, y: 0 },
    $router = useRouter(),
    $route = useRoute(),
    $routes = $router.options.routes;

const list = $routes.filter((m) => m.meta?.addHoverBtn)

// 点击展开收缩
function clickToggleOpen() {
    if (~~(performance.now() - clickBegin) > 200) return;
    isOpen.value = !isOpen.value;
}

// 点击跳转
function clickToNewPage(path: string) {
    if (path === '/login') localStorage.removeItem('token');
    $router.push(path)
}
// 鼠标移动开始移动元素
function move({ clientX, clientY }: MouseEvent) {
    if (isMove) return;
    isMove = true;
    requestAnimationFrame(() => {
        curPosition.x = clientX > clickOffset.x ? clientX < windowSize.w - (clickBoxSize - <number>clickOffset.x) ? clientX - <number>clickOffset.x : windowSize.w - clickBoxSize : 0;
        curPosition.y = clientY > clickOffset.y ? clientY < windowSize.h - (clickBoxSize - <number>clickOffset.y) ? clientY - <number>clickOffset.y : windowSize.h - clickBoxSize : 0;
        isMove = false;
    })
}

// 鼠标按下添加移动和松开事件
function Mousedown({ offsetX, offsetY, currentTarget }: MouseEvent) {
    clickOffset.x = offsetX;
    clickOffset.y = offsetY;
    windowSize.w = window.innerWidth;
    windowSize.h = window.innerHeight;
    clickBegin = performance.now();
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
}

//鼠标松开移除事件
function up() {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
}

//  监听窗口变化
function resize() {
    timeoutID && clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
        curPosition.x = window.innerWidth - clickBoxSize;
        curPosition.y = window.innerHeight / 5;
    }, 200);
}
window.addEventListener('resize', resize)

// 组件销毁前移除 resize 事件
onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
})


</script>

<template>
    <div class="tool_box" :style="`top:${curPosition.y}px;left: ${curPosition.x}px`" v-if="!$route.meta.hoverHide">
        <div class="clickBox" @mousedown="Mousedown" @click="clickToggleOpen"></div>
        <div class="top">
            <Menu />
        </div>
        <ul class="tool">
            <template v-for="({ path, meta }, i) in list" :key="i">
                <li @click="clickToNewPage(path)" :title="<string>meta?.title"
                    :style="`
                        top:${curPosition.y}px;
                        left: ${curPosition.x}px;
                        transition-duration:${(i + 2) * .1}s;
                        transform: translateX(${(curPosition.x > windowSize.w - curPosition.x ? -1 : 1) * (isOpen ? (i + 1) * clickBoxSize * 1.2 : 0)}px);`">
                    <component :is="meta?.icon"></component>
                </li>
            </template>
        </ul>
    </div>
</template>


<style lang='less' scoped>
.tool_box {
    position: fixed;
    top: 50%;
    right: 0;
    width: 50px;
    height: 50px;
    transition: top .2s cubic-bezier(0.27, 0.74, 0.46, 0.9), left .2s cubic-bezier(0.27, 0.74, 0.46, 0.9);
    border-radius: 50%;
    background: rgba(64, 160, 255, 1);
    z-index: 999;


    .clickBox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: move;
        border-radius: 50%;
        z-index: 1001;
    }

    .top {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: rgba(64, 160, 255, 1);
        z-index: 1000;

        svg {
            width: 20px;
            height: 20px;
            color: rgb(255, 255, 255);
        }
    }

    .tool {
        >li {
            position: fixed;
            top: 50%;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            cursor: pointer;
            border-radius: 50%;
            transition-property: top, left, transform;
            transition-timing-function: cubic-bezier(0.27, 0.74, 0.46, 0.9);
            background: rgba(64, 160, 255, 1);
            z-index: 998;

            &:hover {
                background-color: rgb(97, 100, 250);
            }

            svg {
                width: 20px;
                height: 20px;
                color: rgb(255, 255, 255);
            }
        }
    }

    ;
}
</style>