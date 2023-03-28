<script setup lang='ts'>
const removeKG = (str: string) => str.replace(/\s+/g, '')

const to = (str: string) => str.replace(/_+([a-zA-Z]?)/g, (a: any, b: string) => b.toUpperCase());

const searchSubstr = (str: string, substr: string) => [...str.matchAll(substr as unknown as RegExp)].length;
const searchSubstr2 = (str: string, substr: string) => str.split(substr).length - 1;

const dataType = (data: any) => Object.prototype.toString.call(data).slice(8, -1);

const arr = [6, '99', 6, null, undefined, 89, undefined, null, true, true];
const newArr = (arr: any[]) => [...new Set(arr)];
const newArr2 = (arr: any[]) => arr.filter((m, i) => arr.indexOf(m) === i);
const newArr3 = (arr: any[]) => arr.reduce((d, m) => { if (d.indexOf(m) === -1) d.push(m); return d }, []);
const newArr4 = (arr: any[]) => {
    let newArr: any[] = [];
    arr.forEach(m => { if (newArr.indexOf(m) === -1) newArr.push(m) });
    return newArr
}

type f = (num: number) => number
const ji: f = (num: number) => num === 1 ? 1 : num * ji(num - 1)
const he: f = (num: number) => num === 1 ? 1 : num + he(num - 1)

const arr2 = [7, 6, 7, 9, 1, 2, 5, 7, 8];
const maxCha = (arr: number[]) => Math.max(...arr) - Math.min(...arr);
const maxCha2 = (arr: number[]) => Math.max.apply(null, arr) - Math.min.apply(null, arr);
const maxCha3 = (arr: number[]) => {
    let newArr = arr.sort((a, b) => a - b);
    return newArr[newArr.length - 1] - newArr[0]
};

const cfb: (num: number) => string = (num: number) => {
    let table = '';
    if (num < 1) return '';
    for (let i = 1; i <= num; i++) table += (i + '*' + num + '=' + (i * num) + '\t');
    return cfb(num - 1) + '\n' + table;
};

const shuffled = (arr: number[]) => {
    arr.forEach((m, i) => {
        let last = arr.length - i - 1;
        let random = Math.floor(Math.random() * last);
        [arr[last], arr[random]] = [arr[random], arr[last]]
    });
    return arr
};



</script>

<template>
    <div>
        <div class="_title">去除字符串所有空格</div>
        <div class="_text">
            const removeKG = (str: string) => str.replace(/\s+/g, '')
        </div>
        <hr>
        <div class="_title">把下划线命名转成大驼峰命名</div>
        <div class="_text">
            const to = (str: string) => str.replace(/_+([a-zA-Z]?)/g, (a: any, b: string) => b.toUpperCase());
        </div>
        <hr>
        <div class="_title">查询字符串中某子字符串出现的个数(禁用循环)</div>
        <div class="_text">
            const searchSubstr = (str: string, substr: string) => [...str.matchAll(substr)].length; <br>
            const searchSubstr2 = (str: string, substr: string) => str.split(substr).length - 1;
        </div>
        <hr>
        <div class="_title">判断数据类型的方法</div>
        <div class="_text">
            const dataType = (data: any) => Object.prototype.toString.call(data).slice(8, -1);
        </div>
        <hr>
        <div class="_title">数组去重的方法</div>
        <div class="_text">
            let arr = [6, '99', 6, null, undefined, 89, undefined, null, true, true]; <br>
            const newArr = (arr: any[]) => [...new Set(arr)];<br>
            const newArr2 = (arr: any[]) => arr.filter((m, i) => arr.indexOf(m) === i);<br>
            const newArr3 = (arr: any[]) => arr.reduce((d, m) => { if (d.indexOf(m) === -1) d.push(m); return d }, []);<br>
            const newArr4 = (arr: any[]) => {<br>
            let newArr: any[] = [];<br>
            arr.forEach(m => { if (newArr.indexOf(m) === -1) newArr.push(m) });<br>
            return newArr<br>
            }<br>
        </div>
        <hr>
        <div class="_title">写出一个函数求出N的阶乘（即N!)</div>
        <div class="_text">
            const JX = (num: number) => num === 1 ? 1 : num * JX(num - 1)
        </div>
        <hr>
        <div class="_title">写出一个函数求出1 加至 N 的和</div>
        <div class="_text">
            const he = (num: number) => num === 1 ? 1 : num + he(num - 1)
        </div>
        <hr>
        <div class="_title">写一个函数找出给定数组中的最大差值</div>
        <div class="_text">
            const arr2 = [7, 6, 7, 9, 1, 2, 5, 7, 8]; <br>
            const maxCha = (arr: number[]) => Math.max(...arr) - Math.min(...arr); <br>
            const maxCha2 = (arr: number[]) => Math.max.apply(null, arr) - Math.min.apply(null, arr); <br>
            const maxCha3 = (arr: number[]) => { <br>
            let newArr = arr.sort((a, b) => a - b); <br>
            return newArr[newArr.length - 1] - newArr[0] <br>
            };
        </div>
        <hr>
        <div class="_title">如何让(a==1 && a==2 && a==3)的值为true，把"=="换成"==="后还能为true吗？(大厂面试题)
            https://juejin.cn/post/6844903725442531341</div>
        <div class="_text">
            <pre>
                                                                                                    let a = {
                                                                                                        value: 0,
                                                                                                        valueOf() {
                                                                                                            return ++this.value;
                                                                                                        }
                                                                                                    }
                                                                                                    console.log(a == 1 && a == 2 && a == 3);  // true

                                                                                                    var a2 = [1, 2, 3];
                                                                                                    a2.join = function () { return this.shift() };  // 还可以利用 Array 与数字判断时会转字符串再转数字的规律，改写 join 方法。
                                                                                                    console.log(a2 == 1 && a2 == 2 && a2 == 3); // true

                                                                                                    var value = 0; //window.value
                                                                                                    Object.defineProperty(window, 'b', {
                                                                                                        get: function () {
                                                                                                            return this.value += 1;
                                                                                                        }
                                                                                                    });
                                                                                                    console.log(b === 1 && b === 2 && b === 3) // true
                                                                                                        </pre>
        </div>
        <hr>
        <div class="_title">用js实现一个九九乘法口诀表</div>
        <div class="_text">
            <pre>
                                                const cfb: (num: number) => string = (num: number) => {
                                                    let table = '';
                                                    if (num &lt 1) return '';
                                                    for (let i = 1; i &lt= num; i++) table += (i + '*' + num + '=' + (i * num) + '\t');
                                                    return cfb(num - 1) + '\n' + table;
                                                };
                                                cfb(9);
                                                            </pre>
        </div>
        <hr>
        <div class="_title">写个方法随机打乱一个数组(洗牌算法:https://github.com/HOUCe/shuffle-array)</div>
        <div class="_text">
            <pre>
                const shuffled = (arr: number[]) => {
                    arr.forEach((m, i) => {
                        let last = arr.length - i - 1;
                        let random = Math.floor(Math.random() * last);
                        [arr[last], arr[random]] = [arr[random], arr[last]]
                    });
                    return arr
                };
                            </pre>
        </div>
        <hr>
        <div class="_title"></div>
        <div class="_text"></div>
        <hr>
        <div class="_title"></div>
        <div class="_text"></div>
        <hr>
    </div>
</template>


<style lang='less' scoped></style>