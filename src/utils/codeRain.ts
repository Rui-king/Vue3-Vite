//  代码雨：雨滴
export function codeRain({ el, w = window.innerWidth, h = window.innerHeight, fs = 14 }:
    { el: string, w?: number, h?: number, fs?: number }) {

    const
        canvas = document.querySelector(el) as HTMLCanvasElement,
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
        text = 'I',
        textData: [x: number, y: number, v: number][] = [],
        rdNum = (a: number, b: number) => ~~(Math.random() * (b - a + 1) + a);
    let t1 = performance.now();

    canvas.width = w;
    canvas.height = h;
    ctx.font = fs + 'px sans-serif';
    ctx.textBaseline = 'top';


    // 初始化：生成文本位置
    for (let i = 0, n = ~~(w / fs); i < n; i++) {
        const x = fs * i,
            y = rdNum(0, h);
        ctx.fillText(text, x, y);
        textData.push([x, y, rdNum(3, 10)])

    }

    //  开始绘制动画
    requestAnimationFrame(
        function draw(t2) {
            if (t2 - t1 > 20) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = "rgba(255, 255, 255, 1)";
                textData.forEach(([x, y, v], i) => {
                    y += v;
                    if (y > h) { y = 0; textData[i][2] = rdNum(3, 10); }
                    ctx.fillText(text, x, y);
                    textData[i][1] = y;
                })
                t1 = t2;
            }
            requestAnimationFrame(draw)
        }
    )

}

//  代码雨：数字
export function codeRain2({ el, w = window.innerWidth, h = window.innerHeight, fs = 14 }:
    { el: string, w?: number, h?: number, fs?: number }) {

    const
        canvas = document.querySelector(el) as HTMLCanvasElement,
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
        text = 'ASDFGHJKLZXCVB',
        textData: [x: number, y: number, t: string][] = [],
        rdNum = (a: number, b: number) => ~~(Math.random() * (b - a + 1) + a),
        rdColor = () => `rgba(${~~(Math.random() * 256)},${~~(Math.random() * 256)}, ${~~(Math.random() * 256)}, 1)`;
    let t1 = performance.now();

    canvas.width = w;
    canvas.height = h;
    ctx.font = fs + 'px sans-serif';
    ctx.textBaseline = 'top';


    // 初始化：生成文本位置
    for (let i = 0, n = ~~(w / fs * 2); i < n; i++) {
        const x = fs * i * 2,
            y = rdNum(0, h),
            t = rdNum(0, 9) + '';
        ctx.fillText(t, x, y);
        textData.push([x, y, t])

    }

    //  开始绘制动画
    requestAnimationFrame(
        function draw(t2) {
            if (t2 - t1 < 60) return requestAnimationFrame(draw);


            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, w, h);
            textData.forEach(([x, y, t], i) => {
                y += fs * 1.5;
                if (y > h) y = 0;
                ctx.fillStyle = rdColor();
                ctx.fillText(t, x, y);
                textData[i][1] = y;
            })
            t1 = t2;

            requestAnimationFrame(draw)
        }
    )




}



