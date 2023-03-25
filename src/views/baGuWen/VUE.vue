<script setup lang='ts'>
import { reactive, ref, onBeforeMount, onMounted } from 'vue'

</script>

<template>
    <div>
        <div class="_title">vue-router中的路由守卫有哪些</div>
        <div class="_text">
            全局守卫：
            router.beforeEach、
            router.beforeResolve、
            router.afterEach
        </div>
        <div class="_text">
            路由独享守卫：
            beforeEnter
        </div>
        <div class="_text">
            组件内守卫：
            beforeRouteEnter、
            beforeRouteUpdate、
            beforeRouteLeave
        </div>
        <hr>
        <div class="_title">讲讲vuex的作用和使用。
            mutation和action的区别？
            getters的作用？</div>
        <div class="_text">
            Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态。<br>

            它主要有以下API<br>

            1. state<br>

            2. getters<br>

            3. mutations<br>

            4. actions<br>

            5. module<br>

            6. 辅助函数：mapState、mapGetters、mapMutations、mapActions<br>

            7. createStore<br>

            其中state和getters用来保存状态；mutations和actions用来改变状态；监听状态用的是Vue组件中的computed属性；module是用来组织整个应用的状态管理代码，使状态划分模块，更易于管理；辅助函数用来在监听状态时候简化代码，createStore则用来创建状态管理对象。<br>

            mutations和actions有区别，mutations不应该用于异步修改状态，因为这样做的话，Vuex是无法知道修改state.count的时机的，因为它是在异步回调里面指定的，因此Vuex无法在调试工具中打印出我们实际改变state的操作。<br>

            而actions中可以异步更新状态。<br>

            getters和state的关系类似于Vue组件data属性和computed属性的关系，getters根据state或者其他getters计算出另一个变量的值，当其依赖的数据变化时候，它也会实时更新。<br>
        </div>
        <hr>
        <div class="_title">vue框架原理</div>
        <div class="_text">我们使用Vue开发应用，实际上是编写若干Vue组件，实现模板、data、生命周期钩子等，然后执行new
            Vue()，将根组件挂载到指定的DOM节点上面，当我们编写的组件中生命周期钩子里面的或者在模板的元素事件中改变数据时候，视图会响应地更新。这样就实现了应用。<br>

            那么Vue是如何实现上面的效果的呢？<br>

            new Vue()之后，Vue会从根组件开始，遍历整个组件树，对每个组件进行处理。<br>

            对于一个Vue组件，Vue首先会进行模板编译，将模板编译为render函数，render函数返回虚拟DOM，如果遇到子组件，也对子组件做同样操作，最终形成一个虚拟DOM树。<br>

            Vue会把虚拟DOM映射到真实DOM并渲染到指定节点上，这样就实现了视图的渲染。<br>

            Vue在组件初始化时候还会设置数据为响应式，并将依赖于数据的渲染方法、computed、watch收集起来。<br>

            当数据改变后，Vue会根据初始化时候收集的依赖，更新视图，这时候我们就看到最新的界面了。</div>
        <hr>
        <div class="_title">vue指令有哪些</div>
        <div class="_text">
            v-text <br>
            v-html<br>
            v-show<br>
            v-if<br>
            v-else<br>
            v-else-if<br>
            v-for<br>
            v-on<br>
            v-bind<br>
            v-model<br>
            v-once<br>
            v-slot<br>
            v-pre(跳过该元素及其所有子元素的编译，最常见的用例就是显示原始双大括号标签及内容) : 比如<span v-pre>{{ 这是原始内容 }}</span><br>
            v-memo(仅用于性能至上场景中的微小优化，应该很少需要。最常见的情况可能是有助于渲染海量 v-for 列表 (长度超过 1000 的情况))<br>
            v-cloak(用于隐藏尚未完成编译的 DOM 模板)<br>
        </div>
        <hr>
        <div class="_title">vue父子组件挂载顺序？</div>
        <div class="_text">
            加载渲染过程 <br>

            父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created ->子 beforeMount -> 子 mounted -> 父
            mounted<br>

            更新过程<br>

            父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated<br>

            销毁过程<br>

            父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed
        </div>
        <hr>
        <div class="_title">vue computed和watch的区别</div>
        <div class="_text">
            应用场景不同 <br>

            computed用在根据data属性或者其他computed计算得到一个新值的情况，computed的值一般被用在渲染中。<br>

            watch用在监听数据变化，然后做一些有副作用的操作的场景。<br>
            <br>


            执行过程不同<br>

            在依赖的data属性变化后，computed并不会重新计算新的值，而是等到访问的时候再判断，如果依赖的data有改动则重新计算并返回结果，如果依赖的data没有改动，就不计算，直接返回当前结果。
            <br>
            依赖的数据变化后就会执行watch的回调。
        </div>
        <hr>
        <div class="_title">vue组件data为什么是函数</div>
        <div class="_text">如果data不是一个函数，或者函数中不是返回一个对象字面量，那么实例化多个组件的话，不同组件间会共享同一个data，data的改变会影响到每个实例，这时不符合预期的。</div>
        <hr>
        <div class="_title">Vuex工作机制</div>
        <div class="_text">
            Vuex的数据流是组件中触发action，action提交mutations，mutations修改states。 组件根据 states或getters来渲染页面。<br>

            Vuex是个状态管理器。<br>

            它Vuex通过createStore创建了一个数据中心，然后通过发布-订阅模式来让订阅者监听到数据改变。<br>

            Vuex的store注入 vue的实例组件的方式，是通过vue的 mixin机制，借助vue组件的生命周期钩子beforeCreate 完成的。这样Vue组件就能通过this.$store获取到store了。<br>

            Vuex使用vue中的reactive方法将state设置为响应式，这样组件就可以通过computed来监听状态的改变了。
        </div>
        <hr>
        <div class="_title">vue-router原理以及两种模式区别</div>
        <div class="_text">
            前端路由有两种模式，HTML5和hash，这两种模式本质是不同的底层浏览器技术，但是上层Vue Router做了统一化的封装，因此在我们开发组件和配置路由时候使用这两种模式的区别并不大。默认是hash模式。<br>

            <br>

            这两种模式有几个主要区别<br>

            1. HTML5模式的路由没有"#"字符，而是在域名后直接写路径，更加优雅<br>

            2. 由于#后面的字符不会发给服务器，因此hash路由SEO比较差<br>

            3. HTML5需要服务器在访问不同的路径时候都能fallback到index.html，因此相对麻烦<br>
            <br>


            前端路由的原理关键有2点<br>

            1. 可以修改url，但不会引起刷新，从而在不刷新的页面的情况下跳转路由。<br>

            2. 监听url改变，根据url渲染对应组件。<br>

            <br>

            hash模式和history模式的原理都是基于这两点。<br>
            hash是通过浏览器提供的location API修改url，通过onhashchange方法监听hash改变；<br>
            history通过浏览器提供的history.pushState或者history.replacestate修改url，通过popState事件监听url改变。
        </div>
        <hr>
        <div class="_title">vue的compile过程</div>
        <div class="_text">
            Vue在实例化组件时候会生成虚拟DOM，Vue先判断是否有render函数，如果有的话调用render生成虚拟DOM；如果没有render函数，则获取template选项，template选项可以是选择器、模版字符串、dom元素，Vue根据template选项进行模板编译；如果没有template，则获取el以及其子内容作为模版。
            <br>

            <br>

            模板编译有三个步骤<br>

            1. 将模板解析为AST。（Abstract Syntax Tree，抽象语法树）。<br>

            2. 遍历AST标记静态节点。<br>

            3. 使用AST生成渲染函数。
        </div>
        <hr>
        <div class="_title">process.nextTick和Vue.nextTick的区别？</div>
        <div class="_text">
            Vue.nextTick是将任务加入到宏任务队列或者微任务队列。 <br>

            process.nextTick并未将任务加入到宏任务队列或者微任务队列，它是将任务加到下次事件循环之前。
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
    </div>
</template>


<style lang='less' scoped></style>