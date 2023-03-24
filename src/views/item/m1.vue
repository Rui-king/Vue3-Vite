<script setup lang='ts'>
import { $get } from '@/axios/index';
import VChart from 'vue-echarts';
import M1Top from './components/m1Top.vue';

// const isLogin = async () => {
//     const { data } = await $get('/m', { a: 666 });
//     if (data.status !== 200) return;
//     ElMessage.success(data.msg);
// }
// isLogin()


setTimeout(() => {
    option.value.title.text = '我是新标题'
}, 1000);

const option = ref({
    title: {
        text: 'Traffic Sources',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
    },
    series: [
        {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: 'Direct' },
                { value: 310, name: 'Email' },
                { value: 234, name: 'Ad Networks' },
                { value: 135, name: 'Video Ads' },
                { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
});
</script>

<template>
    <div>
        <h2 class="title">欢迎来到德莱联盟</h2>
        <M1Top />
        <v-chart class="chart" :option="option" autoresize />
    </div>
</template>


<style lang='less' scoped>
.title {
    font-size: 40px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 3px;
    margin: 0 0 25px 0;
}

.chart {
    height: 50vh;
    margin-top: 50px;
}
</style>