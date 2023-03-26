<script setup lang='ts'>



</script>

<template>
    <div>
        <div class="_title">箭头函数和普通函数有什么区别</div>
        <div class="_text">
            区别： <br>

            1. 箭头函数在一些情况下书写更简洁（如只有一个参数、函数体直接返回值时候）。<br>

            2. 箭头函数没有自己的this，箭头函数内的this变量指向外层非箭头函数的函数的this，或者将该箭头函数作为属性的对象。箭头函数也不支持call()/apply()函数特性。<br>

            3. 箭头函数内部不可以使用arguments对象。<br>

            4. 箭头函数不可以当做构造函数。<br>
            <br>
            为什么不能用作构造函数： <br>

            构造函数是通过new关键字来生成对象实例，生成对象实例的过程也是通过构造函数给实例绑定this的过程，而箭头函数没有自己的this。创建对象过程，new
            首先会创建一个空对象，并将这个空对象的__proto__指向构造函数的prototype，从而继承原型上的方法，但是箭头函数没有prototype。因此不能使用箭头作为构造函数，也就不能通过new操作符来调用箭头函数。
        </div>
        <hr>
        <div class="_title">call、apply、bind方法的作用和区别？</div>
        <div class="_text">
            call、apply、bind都是用来改变this指向的， <br>

            call和apply调用时候立即执行，bind调用返回新的函数。<br>

            当需要传递参数时候，call直接写多个参数，apply将多个参数写成数组。<br>

            bind在绑定时候需要固定参数时候，也是直接写多个参数。
        </div>
        <hr>
        <div class="_title">防抖和节流</div>
        <div class="_text">
            <pre>
        /** 防抖函数
        * @param fn 事件触发的操作
        * @param delay 多少毫秒内连续触发事件，不会执行
        * @returns {Function}
        */
        function debounce(fn, delay = 500) {
            let timer = null; //通过闭包缓存了一个定时器
            return function () {
                const args = [...arguments];
                const that = this
                timer && clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(that, args);
                }, delay);
            }
        }

        /**
        * 节流函数
        * @param fn 事件触发的操作
        * @param delay 间隔多少毫秒需要触发一次事件
        * @returns {Function}
        */
        function throttle(fn, delay = 500) {
            let flag = true;
            return function () {
                if (!flag) return;
                const that = this
                const args = [...arguments];
                flag = false;
                setTimeout(() => {
                    fn.apply(that, args);
                    flag = true;
                }, delay);
            }
        }
                    </pre>
        </div>
        <hr>
        <div class="_title">js如何判断一个变量是数组？</div>
        <div class="_text">
            <pre>
        // ES6中增加的数组方法
        Array.isArray()
                
        // 方法借用
        function isType(arr) {
            return Object.prototype.toString.call(arr).slice(8, -1);
        }
    
        // 用instanceof判断
        function isArray(arr) {
            return arr instanceof Array;
        }
                </pre>
        </div>
        <hr>
        <div class="_title">如何理解闭包，为什么有这种特性？为什么需要闭包？闭包的缺点？</div>
        <div class="_text">
            对闭包的理解： <br>

            1. 什么是闭包？函数和函数内部能访问到的变量的总和，就是一个闭包。 <br>

            2. 如何生成闭包? 函数嵌套 + 内部函数被引用。 <br>

            3. 闭包作用？隐藏变量，避免放在全局有被篡改的风险。 <br>

            4. 使用闭包的注意事项？不用的时候解除引用，避免不必要的内存占用。 <br>
            <br>


            为什么有闭包的这种特性：如果形成闭包，外部函数执行完后，其中的局部变量可能被内部函数使用，所以不能销毁，因此内部函数能一致访问到这些局部变量，直到引用解除。 <br>

            <br>

            为什么需要闭包？隐藏变量，避免放在全局有被篡改的风险。 <br>

            <br>

            闭包的缺点：使用时候不注意的话，容易产生内存泄漏。
        </div>
        <hr>
        <div class="_title">如何理解原型与原型链</div>
        <div class="_text">
            构造函数有个prototype对象（原型），该对象有个“constructor”属性，指向构造函数。 <br>

            每个对象都有一个“proto”属性，指向它的构造函数的“prototype”属性。<br>

            构造函数的prototype对象，也有一个“proto”对象，它指向Object的prototype对象。<br>

            当我们访问对象中的属性时候，会先访问该对象中的本身的属性（私有属性），如果访问不到，会查找对象的“proto”指向的构造函数的prototype对象，如果其中有要访问的属性，就使用该值，否则继续访问prototype的“proto”，在其中查找要访问属性。这样一直上溯到Object对象。这个就是“原型链”。
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