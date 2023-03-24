<script setup lang='ts'>
import FunComponents from '@/components/FunComponents/m1';


</script>

<template>
    <div>
        <FunComponents msg="我是props传下来的属性">
            <template #test>
                我是test插槽传下来的内容(具名插槽)
            </template>
            <!-- 在同时含有具名插槽和默认插槽时，推荐给默认插槽显示的加上名称：#default 或 #-->
            <template #>
                我会出现在default对应的插槽中(默认插槽)
            </template>
            <template #test2>
                我不传值就会显示默认内容
            </template>
            <template #test3="{ test3Data }">
                我是test3 自下往上传过来的内容(作用域插槽)： {{ test3Data }}
            </template>
        </FunComponents>
    </div>
</template>


<style module></style>