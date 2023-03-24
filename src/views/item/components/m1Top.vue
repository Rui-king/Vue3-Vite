<script setup lang='ts'>
import { $get } from '@/axios/index';

let topList = ref<{
    id: number,
    href: string,
    img: string,
    title: string,
}[]>([]);

let getItemList = async () => {
    const { data } = await $get('/item/m1TopList');
    topList.value = data.data;
}
getItemList()

</script>

<template>
    <div class="m1top">
        <div class="l">
            <el-icon :size="50">
                <UserFilled />
            </el-icon>
            <div class="userName">您好, Root</div>
        </div>
        <ul class="list">
            <li v-for="m in topList" :key="m.id">
                <a :href="m.href" target="_blank">
                    <img :src="m.img" alt="" />
                    <span>{{ m.title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>



<style scoped lang='less'>
.m1top {
    display: flex;
    height: 90px;

    >.l {
        .f;
        flex: 1;
        border-radius: 10px;
        background-color: rgba(64, 160, 255, 0.2);
        padding: 10px;

        .userName {
            font-size: 32px;
            color: #333;
            font-weight: bold;
            margin-left: 10px;
        }
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        width: 69%;
        margin-left: 1%;

        li {
            width: 19%;
            border-radius: 5px;
            transition: all 0.3s;
            background-color: rgba(64, 160, 255, 0.2);

            a {
                display: flex;
                align-content: center;
                width: 100%;
                height: 100%;
                padding: 10px 10px 10px 20px;

                img {
                    width: 20px;
                    height: 20px;
                }

                span {
                    font-size: 16px;
                    color: #338cec;
                    margin-left: 10px;
                }
            }

            &:hover {
                transform: translate(-1px, -1px);
                box-shadow: 2px 2px 5px #969494;
            }
        }
    }
}
</style>