<script setup lang='ts'>
type propsType = {
    title: string,
    modelValue: boolean
    // 关闭前回调，返回一个布尔值
    close?: () => boolean
}
// TS 中需要借助withDefaults编译器宏设置默认值
const props = withDefaults(defineProps<propsType>(), {
    close: () => true
})
const emits = defineEmits(['update:modelValue'])
const popUpBox = ref<HTMLDivElement>(null as unknown as HTMLDivElement)
const isShow = ref()
isShow.value = props.modelValue
const animationClassName = ['bounce']
// 监听弹窗显示隐藏状态
watch(() => props.modelValue, (n) => {
    popUpBox.value.classList.add(n ? animationClassName[0] + '-enter' : animationClassName[0] + '-leave')
    if (n) isShow.value = true;
})
//  动画结束回调
const animationend = () => {
    let n = props.modelValue
    popUpBox.value.classList.remove(n ? animationClassName[0] + '-enter' : animationClassName[0] + '-leave')
    if (!n) isShow.value = false;
}
// 关闭弹窗
const popUpClose = () => {
    if (props.close() === true) emits('update:modelValue', false)
}
</script>

<template>
    <div class="popUp" v-show="isShow">
        <div class="popUp-box" ref="popUpBox" @animationend="animationend">
            <div class="popUp-header">
                <span class="t">{{ props.title }}</span>
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="x" @click="popUpClose">
                    <path fill="currentColor"
                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z">
                    </path>
                </svg>
            </div>
            <div class="popUp-content">
                <slot></slot>
            </div>

        </div>
    </div>
</template>


<style lang='less' scoped>
.popUp {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .f2;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.popUp-box {
    width: 50%;
    height: 60%;
    border-radius: 5px;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
    background: #fff;

}

.popUp-header {
    .f1;
    height: 50px;
    border-radius: 5px 5px 0 0;
    background-color: #409eff;
    padding: 0 20px;

    .t {
        font-size: 18px;
        color: #fff;
    }

    .x {
        width: 20px;
        height: 20px;
        color: #fff;
        cursor: pointer;
    }
}

.popUp-content {
    height: calc(100% - 50px);
    overflow-y: auto;
    padding: 20px;

    &::-webkit-scrollbar {
        display: none;
    }
}

// 进入动画以 -enter 结尾
.bounce-enter {
    animation: bounce-in 0.5s;
}

// 离开动画以 -leave 结尾
.bounce-leave {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}
</style>