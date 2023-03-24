<script setup lang='ts'>

let s = reactive({
    color: 'red',
});

// console.log(useCssModule('a'));


setTimeout(() => {
    s.color = '#000'
}, 2000);
</script>

<template>
    <div>
        <p :class="a.red">1</p>
        <p :class="a.red2">2</p>
    </div>
</template>


<style module = 'a'>
.red {
    color: v-bind('s.color');
}

.red2 {
    color: #000;
}
</style>