<script setup lang='ts'>
import { codeRain2 } from '@/utils/codeRain';


onMounted(() => {
    codeRain2({
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