<script setup lang='ts'>
function liZi({ el, w = window.innerWidth, h = window.innerHeight, n = 150, r = 4, c = 'rgba(255, 255, 255,.6)', v = 3, sc = 'rgb(200, 200, 200)', l = 100 }) {
    let canvas = document.querySelector(el),
        ctx = canvas.getContext('2d'),
        d = Math.PI * 2,
        arr = [],
        rd = (l, r) => Math.floor(Math.random() * (r - l + 1) + l),
        rd2 = v => String(Math.random() - 0.5).slice(0, 4) * v;
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = c;
    ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) {
        const x = rd(r, w - r), y = rd(r, h - r);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, d, true)
        ctx.fill();
        arr.push([x, y, rd2(v), rd2(v)])
    }
    console.log(ctx);

    let f = () => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0, n = arr.length; i < n; i++) {
            let [x, y, vx, vy] = arr[i];
            if (x < r || x > w - r) vx = -vx;
            if (y < r || y > h - r) vy = -vy;
            x += vx;
            y += vy;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, d, true);
            ctx.fill();
            arr[i] = [x, y, vx, vy];

            for (let i2 = 0; i2 < n; i2++) {
                if (i <= i2) continue;
                let [x2, y2] = arr[i2], xc = x2 - x, yc = y2 - y, rc = Math.sqrt(xc ** 2 + yc ** 2);
                if (Math.abs(xc) > l || Math.abs(yc) > l || rc > l) continue;
                let op = 1 - rc / l;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x2, y2);
                ctx.lineWidth = op * r;
                ctx.strokeStyle = sc.slice(0, -1) + ',' + op + ')';
                ctx.stroke();
            }
        }
        id = window.requestAnimationFrame(f)
    }
    let id = window.requestAnimationFrame(f)

    console.log(arr);

}
onMounted(() => {
    liZi({
        el: '#lizi',
        n: 150, // 粒子个数
        r: 4,   // 粒子半径
        c: 'rgba(255, 255, 255,.6)', //粒子颜色
        v: 3,   // 粒子速度
        sc: 'rgb(200, 200, 200)',  // 线条颜色
        l: 100,  // 当粒子间距小于此值时画线
    });
})
</script>

<template>
    <div class="m1">
        <canvas id="lizi"></canvas>
    </div>
</template>


<style lang='less' scoped>
.m1 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: radial-gradient(rgb(147, 241, 109), rgb(135, 117, 184));
}
</style>