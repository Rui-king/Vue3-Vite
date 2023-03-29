<script setup lang='ts'>
import { codeRain } from '@/utils/codeRain';


onMounted(() => {
    codeRain({
        el: '#canvas'
    })
})
</script>

<template>
    <div>
        <canvas id="canvas"></canvas>
    </div>
</template>


<style lang='less' scoped></style>