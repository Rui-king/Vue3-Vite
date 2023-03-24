<script setup lang="ts">
const data = reactive({
  num1: 1,
  num2: 5,
});
const count = ref(0);
function f1() {
  data.num1++;
}
function f2() {
  count.value++;
}
let f3 = computed(() => { });
console.log(data, count);
</script>

<template>
  <div>
    <h2 class="_title">reactive</h2>
    <div class="_text">
      1. 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对
      string、number 和 boolean 这样的 原始类型 无效。 <br>
      2. 对原始值解构将失去响应式,引用时请确保为一个对象
    </div>
    <hr />

    <h2 class="_title">ref</h2>
    <div class="_text">
      1.如传入的是一个原始数据类型，则会包装成一个含有value属性的ref对象，访问 .value 即可获取其值 <br>
      2.如传入的是一个对象类型，则会借用 reactive 就行包装
    </div>
    <hr />

  </div>
</template>

<style lang="less" scoped></style>
