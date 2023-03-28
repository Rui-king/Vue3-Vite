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
        <div class="_title">写出代码的执行结果</div>
        <div class="_text">
            <pre>
                         题目  
                         function Foo() {
                           getName = function () {
                             console.log(1)
                           }
                           console.log('this is ' + this)
                           return this
                         }


                         Foo.getName = function () {
                           console.log(2)
                         }
                         Foo.prototype.getName = function () {
                           console.log(3)
                         }
                         var getName = function () {
                           console.log(4)
                         }
                         function getName () {
                           console.log(5)
                         }


                         Foo.getName();
                         getName();
                         Foo().getName();
                         getName();
                         new Foo.getName();
                         new Foo().getName();
                         new new Foo().getName();

                         结果：
                         Foo.getName(); // 2
                         getName(); // 4
                         Foo().getName(); // this is [object Window], 1
                         getName();  // 1
                         new Foo.getName(); // 2
                         new Foo().getName(); // this is [object Object], 3
                         new new Foo().getName(); // this is [object Object], 3
                         </pre>
            <br>
            整段代码分为声明和执行两部分。 <br>

            首先声明了一个类Foo，并给Foo添加了一个静态方法getName和一个原型方法getName

            然后有一个函数表达式getName和一个函数声明getName，js会先将函数声明提升，然后执行函数表达式，覆盖了函数声明，因此全局作用域的getName会打印4。<br>

            接下来看执行部分。<br>

            Foo.getName() 调用Foo的静态方法，因此打印2。<br>

            getName() 调用了全局作用域的getName方法，因此打印4。<br>

            Foo().getName() 在全局作用域调用Foo，因此Foo内的this指向window，Foo内执行getName = function ()
            {console.log(1)}，覆盖了全局作用域的getName方法，因此全局作用域的getName会打印1了。调用Foo()打印this is [object
            Window]，由于Foo返回的this指向window，因此getName是window.getName，即全局的getName，打印1。<br>

            getName() 再次调用时候已经被上面Foo内部的代码覆盖，因此打印1。<br>

            new Foo.getName() 等价于 new (Foo.getName())，先执行 Foo.getName()，输出 2，然后new一个实例<br>

            new Foo().getName() 等价于 (new Foo()).getName(),将Foo作为一个构造函数，使用new调用，会创建一个对象并返回，因此打印this is [object
            Object]，然后调用这个实例的getName()，就是Foo的原型方法，因此打印3。<br>

            new new Foo().getName() 等价于new (new Foo().getName());然后和上一句原理相同。
        </div>
        <hr>
        <div class="_title">写出代码的执行结果</div>
        <div class="_text">
            <pre>
                            window.name = 'ByteDance';
                            function A () {
                              this.name = 123;
                            }
                            A.prototype.getA = function(){
                              console.log(this);
                              return this.name + 1;
                            }
                            let a = new A();
                            let funcA = a.getA;
                            funcA(); //this = window; return 'ByteDance1'
                                                                                                                                                    </pre>
        </div>
        <hr>
        <div class="_title">说出代码的执行结果？如果只改最后一行怎么让它也能输出aaa？</div>
        <div class="_text">
            <pre>
                            var obj = { 
                              name: 'aaa',
                              getName: function() {
                                  console.log(this.name);
                              }
                            }
                            var get = obj.getName;
                            obj.getName();
                            get();
                                                                                                                                </pre>
            参考答案 <br>
            obj.getName() 通过obj调用，因此getName内部this指向obj，所以打印'aaa'。<br>

            get() 因为在全局调用，因此this指向window，所以打印''。<br>

            可以使用apply或者call或bind改变get指向：get.call(obj);或者get.apply(obj);或者get.bind(obj)()
        </div>
        <hr>
        <div class="_title">写出代码的执行结果</div>
        <div class="_text">
            <pre>
                            var name = 'win';
                            const obj = {
                                name: 'obj',
                                a: () => {
                                    console.log(this.name);
                                }
                            };
                            const obj1 = {
                                name: 'obj1'
                            };
                            obj.a.call(obj1);
                                                                                                            </pre>
            参考答案 <br>
            结果是打印'win'。<br>

            因为箭头函数声明时候所在的作用域是全局，因此指向window，call并不能改变箭头函数指向。
        </div>
        <hr>
        <div class="_title">new 关键字做了哪些事</div>
        <div class="_text">
            1, 创建一个空对象(即 {}) <br>
            2, 将新创建的对象属性 __proto__指向构造函数的原型对象(即:prototype)<br>
            3, 将新创建的对象作为 this 的上下文；<br>
            4, 判断构造函数是否有返回值且为对象，有则直接返回(相对于 new 无效)，无则返回新创建的对象
        </div>
        <hr>
        <div class="_title">说一下你对回流和重绘的理解，什么时候会重绘？减少回流和重绘的方式有哪些？修改样式一定导致重绘吗？重绘一定导致重排吗？</div>
        <div class="_text">
            如果JavaScript做了修改DOM元素的几何属性（位置、尺寸）等操作，将会重新计算style，并且需要更新布局树，然后执行后面的渲染操作，即从1~9的步骤需要重新执行一遍。这个过程叫“重排”。
            <br><br>
            如果JavaScript修改了DOM的非几何属性，如修改了元素的背景颜色，不需要更新布局树和重新构建分层树，只需要重新绘制。<br>

            在页面运行中，应该尽量避免重排和重绘，以提升渲染性能。<br>



            减少回流和重绘的方式有<br>

            1、避免元素影响到所在文档流<br>

            用绝对定位（position: absolute;）使元素脱离文档流。<br>



            如果使用CSS的transform属性实现动画，则不需要重排和重绘，直接在合成线程合成动画操作，即省略了3、4、5三个阶段。由于没有占用主线程资源，并且跳过重排和重绘阶段，因此这样性能最高。<br>



            2、读写分离<br>

            如果需要写样式之后再读取，应该先批量写完，然后再一起读取，防止频繁回流。<br>

            如果需要根据当前的样式设置新样式，应该先缓存当前样式，然后批量更新样式。<br>



            3、集中改变样式<br>

            避免多次修改元素样式，最好集中一次修改元素的style text，或者通过class name来控制样式。防止频繁触发回流。<br>



            4、离线改变DOM<br>

            如果需要进行多个DOM操作（添加、删除、修改），不要在当前的DOM中连续操作（如循环插入li）。<br>



            在要操作DOM之前，通过display隐藏DOM，当操作完成之后，才将元素的display属性为可见，因为不可见的元素不会触发重排和重绘。<br>



            通过使用DocumentFragment创建一个dom碎片,在它上面批量操作DOM，操作完成之后，再添加到文档中，这样只会触发一次重排。<br>

            复制节点，在副本上操作，然后替换原节点。<br>

            重绘不一定导致重排，重排一定导致重绘。
        </div>
        <hr>
        <div class="_title">js的函数有哪几种调用形式？</div>
        <div class="_text">
            fn(); <br>
            obj.fn();<br>
            new Fn();<br>
            fn.call() / apply();<br>
            (function () { })();<br>
            eval('fn()');<br>
            let a = new Function('', 'fn()');
        </div>
        <hr>
        <div class="_title"></div>
        <div class="_text"></div>
        <hr>
        <div class="_title"></div>
        <div class="_text"></div>
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