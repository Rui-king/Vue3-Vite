<script setup lang='ts'>

const router = useRouter();
const route = useRoute();

// 侧边栏状态
const isHide = ref(false)

const url = route.path.match(/.*(?=\/)/)?.[0];
// 获取侧边栏列表
const tabList = router.options.routes.find(m => m.path === url)?.children;
// 点击切换
const clickTab = (path: string) => router.push(url + '/' + path);
</script>

<template>
    <div id="item">
        <!-- <audio :src="src" autoplay controls loop></audio> -->
        <div class="l" :style="{
            width: `${isHide ? 0 : 200}px`,
        }">
            <ul class="tab" :style="{
                transform: `translateX(${isHide ? -200 : 0}px)`
            }">
                <li v-for="m in tabList" :key="m.path" :class="{ on: m.path === route.path.replace(/.*\//, '') }"
                    @click="clickTab(m.path)">
                    {{ m?.meta?.title }}
                </li>
            </ul>
            <div class="toggleBtn" @click="isHide = !isHide">
                <el-icon>
                    <Expand v-if="isHide" />
                    <Fold v-else />
                </el-icon>
            </div>
            <!-- <div class="toggleBtn" @click="isHide = !isHide">{{ isHide ? '+' : '-' }}</div> -->
        </div>
        <div class="r">
            <RouterViewTransition />
        </div>
    </div>
</template>


<style lang='less' scoped>
#item {
    display: flex;
    width: 100vw;
    height: 100vh;

    >.l {
        position: relative;
        transition: width .3s;
        // border-right: 1px solid #333;
        background: rgb(241, 239, 239);

        .toggleBtn {
            position: absolute;
            right: -30px;
            top: calc(50% - 40px);
            .f2;
            width: 30px;
            height: 80px;
            font-size: 22px;
            cursor: pointer;
            color: #409eff;
            border-radius: 0 50% 50% 0;
            background: rgb(241, 239, 239);
        }
    }

    >.r {
        flex: 1;
        height: calc(100% - 40px);
        border-radius: 8px;
        box-shadow: 0 0 15px 0px rgba(0, 0, 0, .2);
        overflow-y: auto;
        background: #fff;
        margin: 20px;
        padding: 20px;

        &::-webkit-scrollbar {
            width: 0;
        }

    }
}

.tab {
    transition: transform .3s;

    >li {
        font-size: 20px;
        cursor: pointer;
        line-height: 50px;
        border-bottom: 1px solid #999;
        padding: 0 20px;

        &.on {
            background: #9999994f;
        }
    }
}
</style>