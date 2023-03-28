<script setup>
function _new(fn, ...args) {
    if (typeof fn !== 'function') throw new Error(JSON.stringify(fn) + ' is not a constructor');
    let obj = Object.create(fn.prototype);
    let res = fn.apply(obj, args);
    return typeof res === 'object' || typeof res === 'function' ? res : obj
}


function Fn(a, b) {
    this.a = a;
    this.b = b;
};
Fn.prototype.c = function () { return this.a }

// 原生 new
let n1 = new Fn(1, 2);
// 手写 _new
let n2 = _new(Fn, 1, 2);

console.log('new', n1);
console.log('_new', n2);




// 手写 bind
Function.prototype.myBind = function (...args) {
    if (typeof this !== 'function') throw new Error('只能使用函数来调用bind');
    let fn = this; // 保存this副本
    function FnBind(...args2) {
        return fn.call(this instanceof FnBind ? this : args[0], ...args.slice(1), ...args2);
    };
    FnBind.prototype = fn.prototype;
    return FnBind
}



// 测试 
function A(a) {
    this.a = a
}
function b(a) {
    this.a = a;
    return this
}
let a1 = A.bind({ b: '我是多出来的A' })
let b1 = b.bind({ b: '我是多出来的b' })
let a2 = A.myBind({ b: '我是多出来的A' })
let b2 = b.myBind({ b: '我是多出来的b' })
console.log('bind', new a1(1111), b1(999));
console.log('myBind', new a2(1111), b2(999));



Function.prototype.myCall = function (...args) {
    if (typeof this !== 'function') throw new Error('只能使用函数来调用call');
    const thisArg = args.length ? Object(args[0]) : window;
    thisArg.fn = this;
    const res = args.length > 1 ? thisArg.fn(...args.slice(1)) : thisArg.fn();
    delete thisArg.fn;
    return res
}
Function.prototype.myApply = function (...args) {
    if (typeof this !== 'function') throw new Error('只能使用函数来调用apply');
    const thisArg = args.length ? Object(args[0]) : window;
    thisArg.fn = this;
    const res = args.length > 1 ? thisArg.fn(...args[1]) : thisArg.fn();
    delete thisArg.fn;
    return res
}


console.log('call', b.call({ b: '我是多出来的A' }, 2222));
console.log('myCall', b.myCall({ b: '我是多出来的A' }, 2222));
console.log('apply', b.call({ b: '我是多出来的A' }, 2222));
console.log('myApply', b.myCall({ b: '我是多出来的A' }, 2222));
</script>

<template>
    <div>
        <div class="_title">手写 new</div>
        <div class="_text">
            <pre>
            function _new(fn, ...args) {
                if (typeof fn !== 'function') throw new Error(JSON.stringify(fn) + ' is not a constructor');
                let obj = Object.create(fn.prototype);
                let res = fn.apply(obj, args);
                return typeof res === 'object' || typeof res === 'function' ? res : obj
            }


            function Fn(a, b) {
                this.a = a;
                this.b = b;
            };
            Fn.prototype.c = function () { return this.a }

            // 原生 new
            let n1 = new Fn(1, 2);
            // 手写 _new
            let n2 = _new(Fn, 1, 2);

            console.log(n1);
            console.log(n2);
                             </pre>
        </div>
        <hr>
        <div class="_title">手写call/apply/bind</div>
        <div class="_text">
            <pre>
    // 手写 bind
    Function.prototype.myBind = function (...args) {
        if (typeof this !== 'function') throw new Error('只能使用函数来调用bind');
        let fn = this; // 保存this副本
        function FnBind(...args2) {
            return fn.call(this instanceof FnBind ? this : args[0], ...args.slice(1), ...args2);
        };
        FnBind.prototype = fn.prototype;
        return FnBind
    }



    // 测试 
    function A(a) {
        this.a = a
    }
    function b(a) {
        this.a = a;
        return this
    }
    let a1 = A.bind({ b: '我是多出来的A' })
    let b1 = b.bind({ b: '我是多出来的b' })
    let a2 = A.myBind({ b: '我是多出来的A' })
    let b2 = b.myBind({ b: '我是多出来的b' })
    console.log('bind', new a1(1111), b1(999));
    console.log('myBind', new a2(1111), b2(999));



    Function.prototype.myCall = function (...args) {
        if (typeof this !== 'function') throw new Error('只能使用函数来调用call');
        const thisArg = args.length ? Object(args[0]) : window;
        thisArg.fn = this;
        const res = args.length > 1 ? thisArg.fn(...args.slice(1)) : thisArg.fn();
        delete thisArg.fn;
        return res
    }
    Function.prototype.myApply = function (...args) {
        if (typeof this !== 'function') throw new Error('只能使用函数来调用apply');
        const thisArg = args.length ? Object(args[0]) : window;
        thisArg.fn = this;
        const res = args.length > 1 ? thisArg.fn(...args[1]) : thisArg.fn();
        delete thisArg.fn;
        return res
    }


    console.log('call', b.call({ b: '我是多出来的A' }, 2222));
    console.log('myCall', b.myCall({ b: '我是多出来的A' }, 2222));
    console.log('apply', b.call({ b: '我是多出来的A' }, 2222));
    console.log('myApply', b.myCall({ b: '我是多出来的A' }, 2222));
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