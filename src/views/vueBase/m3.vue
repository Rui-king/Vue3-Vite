<script setup lang='ts'>

// 只有 getter 函数
const d = computed(() => {
    return 666
})


// 含有 get 和 set
const d2 = computed({
    get() {
        return 'get'
    },
    set(newValue) {

    }
})

</script>

<template>
    <div>
        <div class="_title">computed</div>
        <div class="_text">
            1.computed() 方法期望接收一个 getter 函数，返回值为一个计算属性 ref ；通过。.value 访问计算结果。
            计算属性ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value。
        </div>
        <el-button type="primary">计算属性:{{ d }}</el-button>

    </div>
</template>


<style lang="less" scoped></style>