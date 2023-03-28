<script setup lang='ts'>
function numToTop(config) {
    let canvas = document.querySelector(config.el),
        ctx = canvas.getContext("2d"),
        w = canvas.width = config.w || window.innerWidth,
        h = canvas.height = config.h || window.innerHeight,
        fs = config.fs || 12,
        v = config.v || 1,
        n = config.n || 10,
        g = config.g || 10,
        conut = Math.floor(w / (fs + g)),
        str = '',
        arr = [],
        strW, strH, id, f;
    ctx.translate(0, h);
    ctx.rotate(Math.PI / 180 * -90);
    while (n--) { str += Math.floor(Math.random() * 2); }
    ctx.font = `${fs}px sans-serif`;
    ctx.fillStyle = config.c;
    ctx.textBaseline = 'top';
    strW = Math.ceil(ctx.measureText(str).width);
    strH = w % fs / conut + fs + g;
    for (let i = 0; i < conut; i++) {
        let x = Math.floor(Math.random() * w), y = i * strH + g / 2;
        ctx.fillText(str, x, y);
        arr.push([x, y, String(Math.random() + v).slice(0, 4) * 1])
    }
    f = () => {
        ctx.clearRect(0, 0, h, w);
        arr.forEach(m => {
            if (m[0] >= h) m[0] = - strW;
            m[0] += m[2];
            ctx.fillText(str, m[0], m[1]);
        })
        id = requestAnimationFrame(f);
    }
    id = requestAnimationFrame(f);

}



onMounted(() => {
    console.time(1);
    let t = numToTop({
        el: '#box', //DOM, 必传
        // w: 500, // 宽
        // h: 300, // 高
        fs: 16, // 数字大小
        c: '#fff', // 数字颜色
        n: 7, // 数字个数
        g: 20, // 数字间隔
        v: 3, // 速度
    })
    console.timeEnd(1);
})
</script>

<template>
    <div class="m4">
        <canvas id="box"></canvas>
    </div>
</template>


<style lang='less' scoped>
.m4 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: radial-gradient(rgb(147, 241, 109), rgb(135, 117, 184));
}
</style>