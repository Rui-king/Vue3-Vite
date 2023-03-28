<script setup lang='ts'>
import { $post } from '@/axios/index';
import type { FormInstance } from 'element-plus'

const $router = useRouter();
const $route = useRoute();
const ruleFormRef = ref<FormInstance>();
let ruleForm = reactive({
    user: '',
    password: '',
});
const rules = reactive({
    user: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 11, message: '请输入正确手机号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 18, message: '请输入6至18位密码', trigger: 'blur' },
    ],
});

// 登录请求
const isLogin = async () => {
    const { data } = await $post('/login', ruleForm);
    if (data.status !== 200) return;
    ElMessage.success(data.msg);
    $router.push({
        path: $route.query.to as string || '/',
    });
}
// 表单验证
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (!valid) return;
        isLogin()
    })
}
// 未开发提示
const noDev = () => ElMessage('暂未开发')
</script>

<template>
    <div class="login-wrap">
        <div class="loginBox">
            <h2 class="title">vue科技大学</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
                <el-form-item prop="user">
                    <el-input v-model="ruleForm.user" placeholder="请输入账号" prefix-icon="User"
                        @keyup.enter="submitForm(ruleFormRef)" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock"
                        show-password @keyup.enter="submitForm(ruleFormRef)" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                    <div class="cz">
                        <span class="t" @click="noDev">注册账号</span>
                        <span class="t" @click="noDev">忘记密码</span>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<style lang='less' scoped>
.login-wrap {
    .f2;
    width: 100%;
    height: 100%;
    background: url(@/assets/images/img1.png);
    background-size: cover;

    .loginBox {
        width: 500px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.5);
        padding: 30px 80px;

        .cz {
            .f1;
            width: 100%;
            margin-top: 5px;

            .t {
                cursor: pointer;
                color: rgba(255, 255, 255, 0.623);
            }
        }
    }

    .title {
        font-size: 36px;
        color: #fff;
        text-align: center;
        font-weight: 550;
        letter-spacing: 2px;
        margin-bottom: 20px;
    }

}

.el-button {
    width: 100%;
    margin: auto;
}
</style>