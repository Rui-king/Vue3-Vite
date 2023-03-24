<script setup lang="ts">
const data = reactive({
  num1: 1,
  num2: 5,
});
watch(() => data.num1, (n, o) => {
  console.log('watch', n, o);
}, {
  deep: true,
  // flush: 'post'
});

let unwatch = watchEffect(() => {
  data.num2
  console.log('watchEffect');
}, {
  // flush: 'post'
})
//  unwatch()  人为移除监听

// watchPostEffect(() => {
//   /* 在 Vue 更新后执行 */
// })

function f1() {
  data.num1++;
  data.num2++;
}
</script>

<template>
  <div>
    <h2 class="_title" @click="f1">侦听器-watch</h2>
    <div class="_text">1. 当watch 侦听一个基础数据时，需要用函数返回其 getter 函数 <br>
      2. 当watch 侦听一个对象时，无需函数返回且默认开启深度侦听， 注意：`newValue` 此处和 `oldValue` 是相等的 <br>
      3. 如需同时侦听多个值可用数组 <br>
      4. 如需手动开启深度侦听可最后传入一个配置项</div>
    <hr>
    <h2 class="_title" @click="f1">侦听器-watchEffect</h2>
    <div class="_text">watchEffect 会立即执行一次，后续所依赖的值发生变化就触发侦听(类似计算属性)</div>
    <hr>
    <h2 class="_title" @click="f1">注意</h2>
    <div class="_text">默认情况下，侦听回调会在Vue 组件更新之前被调用，意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态，如果想在侦听器回调中能访问被 Vue 更新之后的DOM，你需要指明
      flush: 'post' 选项 <br>
      后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect() <br>
      以上所有的侦听器都是同步创建的，如需异步创建参考官网(极少情况)，且异步创建的侦听器在组件销毁不会自动移除，需人为调用侦听器返回的函数来停止侦听，以防内存泄漏</div>
  </div>
</template>

<style scoped></style>



