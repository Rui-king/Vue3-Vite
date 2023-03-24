<script setup lang='ts'>

</script>

<template>
    <RouterView v-slot="{ Component }">
        <transition name='slide' appear mode="out-in">
            <component :is="Component" />
        </transition>
    </RouterView>
</template>


<style lang='less'>
@sliceOffset: 50px;
@t: .3s;

.slide-enter-from {
    transform: translateX(@sliceOffset);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(-@sliceOffset);
    opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform @t linear, opacity @t linear;
}
</style>