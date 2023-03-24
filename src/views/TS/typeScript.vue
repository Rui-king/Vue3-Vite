<script setup lang='ts'>

class F {
    greeting;
    constructor(message: string) {
        this.greeting = message;
    }
    f1() {
        console.log('F');
    }
}


class F2 extends F {
    a: string;
    constructor(a: string) {
        super('hhhh');
        this.a = a;
    }
    f2() {
        console.log('F2');
        console.log(super.f1);

    }
}

let test = new F2("world");


console.log(test);





function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

// 使用的时候再指定类型
let result = createArray<string>(3, 'x');

// 也可以不指定类型，TS 会自动类型推导
let result2 = createArray(3, 'x');
console.log(result);

</script>

<template>
    <div>
        <h2 class="_title">见源代码</h2>
        <el-button type="primary">Primary</el-button>
    </div>
</template>


<style lang='less' scoped></style>