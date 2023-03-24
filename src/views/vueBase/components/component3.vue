<script setup lang='ts'>
import { useTestStore } from '@/stores/test';
defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const data = inject('name'),// 通过对应的名称获取传下来的值
    data2 = inject('name2', '我是默认值'); // 如果获取的值无祖先提供，则会取默认值(默认值可以为一个函数来动态获取)

const store = useTestStore();
</script>

<template>
    <div class="m3">
        三级组件<br>
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', (<HTMLInputElement>$event.target)?.value)"
            class="ipt"><br>
        {{ data }} <br>
        {{ data2 }} <br>
        {{ store.text }}
    </div>
</template>


<style lang='less' scoped>
.m3 {
    border: 3px solid #666;
    margin: 20px;
    padding: 20px;
}
</style>