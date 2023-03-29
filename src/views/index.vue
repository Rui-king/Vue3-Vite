<script setup lang="ts">
import { codeRain2 } from '@/utils/codeRain';
import { dzj } from '@/utils/daZiJi';

const toLeft: boolean[] = reactive([]),
  $router = useRouter();

// 首页导航点击事件
function navClick(path: string): void {
  $router.push(path)
}

onMounted(() => {
  // 导航入场动画
  for (let i = 0, n = $router.options.routes.length; i < n; i++) {
    setTimeout(() => {
      toLeft[i] = true;
    }, 100 * i);
  }
  // 代码雨
  codeRain2({
    el: '#codeRainCanvas',
  })
  // 打字
  setTimeout(() => {
    dzj('.wrap>.t', '欢迎来到Vue科技大学')
  }, 1000);
})

</script>

<template>
  <div class="wrap">
    <canvas id="codeRainCanvas"></canvas>
    <div class="t"></div>
    <ul class="homeNav">
      <template v-for="({ meta, path }, i) in $router.options.routes" :key="i">
        <li :class="{ toLeft: !toLeft[i] }" @click="navClick(path)" v-if="!meta?.isHomeHide">{{ meta?.title }}
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="less" scoped>
@ulW : 80vw;
@liW : (@ulW / 5) - 2;

.wrap {
  position: relative;
  width: 100%;
  height: 100%;

  .t {
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    font-size: 5vw;
    color: #fff;
    text-align: center;
    letter-spacing: 0.1em;
  }
}

.homeNav {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  width: @ulW;
  transform: translate(-50%, -50%);

  >li {
    width: @liW;
    line-height: @liW * .618;
    font-size: @liW * .2;
    color: rgb(0, 250, 75);
    text-align: center;
    transition: transform .3s, box-shadow .3s, background-color .3s;
    cursor: pointer;
    border-radius: @liW * 0.1;
    background: #999;
    margin: 1vw;

    &.toLeft {
      transform: translateX(100vw);
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.384);
      background-color: #fff;
    }
  }
}
</style>
