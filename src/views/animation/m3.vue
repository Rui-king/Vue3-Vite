<script setup lang='ts'>
function xx({ el, w = window.innerWidth, h = window.innerHeight, n = 200, c = 'rgba(0,255,252)' }) {
    let canvas = document.querySelector(el),
        ctx = canvas.getContext('2d'),
        d = Math.PI * 2,
        t1 = 0,
        m = 50,
        arr = [],
        rd = (l, r) => Math.floor(Math.random() * (r - l + 1) + l);
    canvas.width = w;
    canvas.height = h;
    for (let i = 0; i < n; i++) {
        const x = rd(1, w - 1), y = rd(1, h - 1), cl = ctx.fillStyle = c.slice(0, -1) + ',.' + rd(4, 99) + c.slice(-1);
        ctx.fillStyle = cl;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, d, true)
        ctx.fill();
        arr.push([x, y, rd(0, m), cl])
    }
    window.requestAnimationFrame(function f(t2) {
        if (t2 - t1 > 100) {
            t1 = t2;
            ctx.clearRect(0, 0, w, h);
            arr.forEach(([x, y, f, cl], i) => {
                f++;
                f = f > m ? 0 : f;
                ctx.fillStyle = cl;
                ctx.beginPath();
                ctx.arc(x, y, f > 45 ? 2 : 1, 0, d, true);
                ctx.fill();
                arr[i][2] = f;
            })
        }
        window.requestAnimationFrame(f)
    })
}
onMounted(() => {
    xx({
        el: '#canvas',
    });
})
</script>

<template>
    <div class="m3">
        <canvas id="canvas"></canvas>
    </div>
</template>


<style lang='less' scoped>
.m3 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000;
}
</style>