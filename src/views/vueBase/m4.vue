<script setup lang='ts'>
import { useTestStore } from '@/stores/test';
import component2 from './components/component2.vue';


const prop = ref('我是传下来的prop');

function f1(...args: []) {
    console.log('我是声明的事件，被子组件触发了~', args);
}

provide('name', 'value:我是一级组件传下来的值')

const store = useTestStore();

setTimeout(() => {
    store.changeText();
    console.log('cg');
}, 2000);
console.log(store);
</script>

<template>
    <div>
        <div class="_title">prop</div>
        <div class="_text">
            1.组件需要通过 defineProps() 显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute。
        </div>
        <hr>
        <div class="_title">自定义事件 - emit</div>
        <div class="_text">
            1.和原生 DOM 事件不一样，组件触发的事件没有冒泡机制。你只能监听直接子组件触发的事件。平级组件或是跨越多层嵌套的组件间通信，应使用一个外部的事件总线，或是使用一个全局状态管理方案。
        </div>
        <hr>
        <div class="_title">组件 v-model 的使用</div>
        <div class="_text">

        </div>
        <hr>
        <div class="_title">插槽 Slots</div>
        <div class="_text">

        </div>
        <hr>
        <div class="_title">依赖注入 --- 祖孙通信</div>
        <div class="_text">

        </div>
        <hr>
        <div class="_title">Pinia</div>
        <div class="_text">

        </div>
        <hr>
        <div class="m1">
            一级组件 <br>
            {{ store.text }}
            <component2 :prop=prop @emit='f1'>
                <template #header>我是头部</template>
                <template #default>我是默认</template>
            </component2>
        </div>

    </div>
</template>


<style lang='less' scoped>
.m1 {
    border: 3px solid #000;
    padding: 20px;
}
</style>