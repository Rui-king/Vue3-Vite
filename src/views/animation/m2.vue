<script setup lang='ts'>
function liZi({ el, t, w = window.innerWidth, h = window.innerHeight, n = 100, r = 4, c = '#fff', v = 3, fs = 50, zm = 10, }) {
    let canvas = document.querySelector(el),
        ctx = canvas.getContext('2d'),
        newCanvas = document.createElement('canvas'),
        newCtx = newCanvas.getContext('2d', { willReadFrequently: true }),
        d = Math.PI * 2,
        arr = [],
        newCnsW, newCnsH,
        rd = (l, r) => Math.floor(Math.random() * (r - l + 1) + l),
        rd2 = v => String(Math.random() - 0.5).slice(0, 4) * v,
        crdLz = n => {
            for (let i = 0; i < n; i++) {
                const x = rd(r, w - r), y = rd(r, h - r);
                ctx.beginPath();
                ctx.arc(x, y, r, 0, d, true)
                ctx.fill();
                arr.push([x, y, rd2(v), rd2(v)])
            }
        },
        move = () => {
            ctx.clearRect(0, 0, w, h)
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
            }
        };


    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = c;

    newCnsW = newCanvas.width = Math.ceil(w / zm);
    newCnsH = newCanvas.height = Math.ceil(h / zm);
    newCtx.textBaseline = 'hanging';
    // newCtx.fillStyle = 'red';
    newCtx.font = fs + 'px Microsoft YaHei';
    newCanvas.style.cssText = `position: absolute; top: 0px;right: 0px;`;
    document.querySelector('body').append(newCanvas);

    crdLz(n)

    let f = () => {
        let imgArr = [];
        ctx.clearRect(0, 0, w, h);


        let getImgData = () => {
            let tt = newCtx.measureText(t),
                tw = Math.ceil(tt.width) > newCanvas.width ? newCanvas.width : Math.ceil(tt.width),
                th = Math.ceil(Math.abs(tt.actualBoundingBoxAscent) + tt.actualBoundingBoxDescent),
                vx = window.innerWidth / 2 - tw / 2 * zm,
                vy = window.innerHeight / 2 - th / 2 * zm,
                imgData = newCtx.getImageData(0, 0, tw, th).data;

            newCtx.clearRect(0, 0, newCnsW, newCnsH)
            newCtx.beginPath();
            newCtx.fillText(t, 0, 0);



            for (let y = 0; y < th; y++) {
                for (let x = 0; x < tw; x++) {
                    let i = (y * tw + x) * 4;
                    if (!imgData[i + 3]) continue;
                    // ctx.beginPath()
                    // ctx.arc(x * zm + vx, y * zm + vy, r, 2 * Math.PI, false)
                    // // ctx.fillStyle = `rgb(${rd(0, 255)},${rd(0, 255)},${rd(0, 255)},1)`
                    // ctx.fill()
                    imgArr.push([x * zm + vx, y * zm + vy, rd(50, 150), rd(100, 200)])
                }
            }
        }
        getImgData()

        let al = arr.length, il = imgArr.length, max = al > il ? al : il, i = 0;
        console.log(il);
        for (let i = 0; i < al; i++) {
            // console.log(i);
            let [x, y, vx, vy] = arr[i]
            if (imgArr[i]) {
                let [x2, y2, vx2, vy2] = imgArr[i], lx = (x2 - x) / vx2, ly = (y2 - y) / vy2;
                x += lx < 0 ? lx < -1 ? lx : -1 : lx < 1 ? 1 : lx;
                y += ly < 0 ? ly < -1 ? ly : -1 : ly < 1 ? 1 : ly;
                if (i === al - 1 && il > al) crdLz(il - al);
            } else {
                if (x < r || x > w - r) vx = -vx;
                if (y < r || y > h - r) vy = -vy;
                x += vx;
                y += vy;
            }
            ctx.beginPath();
            ctx.arc(x, y, r, 0, d, true);
            ctx.fill();
            arr[i] = [x, y, vx, vy];

        }


        // while (i < max) {
        //     // console.log(i);
        //     if (i < al) {
        //         let [x, y, vx, vy] = arr[i]
        //         if (imgArr[i]) {
        //             let [x2, y2, vx2, vy2] = imgArr[i], lx = (x2 - x) / vx2, ly = (y2 - y) / vy2;
        //             x += lx < 0 ? lx < -1 ? lx : -1 : lx < 1 ? 1 : lx;
        //             y += ly < 0 ? ly < -1 ? ly : -1 : ly < 1 ? 1 : ly;
        //         } else {
        //             if (x < r || x > w - r) vx = -vx;
        //             if (y < r || y > h - r) vy = -vy;
        //             x += vx;
        //             y += vy;
        //         }
        //         ctx.beginPath();
        //         ctx.arc(x, y, r, 0, d, true);
        //         ctx.fill();
        //         arr[i] = [x, y, vx, vy];
        //         // console.log('移动');
        //     } else {
        //         crdLz()
        //         // console.log('创建');
        //     }
        //     i++
        // }


        id = window.requestAnimationFrame(f)
    }
    let id = window.requestAnimationFrame(f)

    setTimeout(() => {
        cancelAnimationFrame(id);
        let id2 = window.requestAnimationFrame(function f2() {
            ctx.clearRect(0, 0, w, h)
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
            }
            id2 = window.requestAnimationFrame(f2)
            console.log('go');
        })
    }, 10000);


}
onMounted(() => {
    liZi({
        el: '#canvas',
        t: '测试'
    });
})
</script>

<template>
    <div class="m2">
        <canvas id="canvas"></canvas>
    </div>
</template>


<style lang='less' scoped>
.m2 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: radial-gradient(rgb(48, 211, 56), rgb(79, 65, 202));
}
</style>