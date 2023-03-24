<script setup lang='ts'>
import { useTestStore } from '@/stores/test';
import component3 from './component3.vue';

// const props = defineProps(['prop']); // 使用字符串数组形式
// const props = defineProps({
//     prop: String
// }); // 使用对象形式
// const props = defineProps({
//     prop: {
//         type: String,
//         required: true, // 必传
//         default: '我是默认值'
//     }
// })// 使用对象形式

defineProps<{
    prop: String,
}>()// 使用 TS 形式


const $emit = defineEmits(['emit']) // 接收事件

$emit('emit', 1, 2) // 触发事件

let myValue = ref<string | number>('')

const store = useTestStore();
</script>

<template>
    <div class="m2">
        二级组件<br>
        {{ prop }} <br>
        <slot name="header"></slot> <br>
        <slot></slot> <br>
        我是组件上的V-model:{{ myValue }} <br>
        {{ store.text }}
        <component3 :modelValue='myValue' @update:modelValue="(newValue: string | number) => myValue = newValue" />
        <!-- <component3 v-model="myValue" />  缩写 -->
    </div>
</template>


<style lang='less' scoped>
.m2 {
    border: 3px solid #333;
    margin: 20px;
    padding: 20px;
}
</style>