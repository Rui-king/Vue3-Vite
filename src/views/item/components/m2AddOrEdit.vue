<script setup lang='ts'>
import type { FormInstance, FormRules } from 'element-plus'
import type { User } from '../m2.vue';
import { validateTel, validateAge, validateName } from '@/utils/FormValidation';
import { $post } from '@/axios/index';

const props = defineProps<{
    getData: () => void
}>()

// 弹窗标题
const title = ref('')
// 弹窗状态
let PopUpIshow = ref(false)
// 表单ref
const ruleFormRef = ref<FormInstance>()
// 表单数据
let ruleForm = ref<User>({} as User)
// 表单验证规则
const rules = reactive<FormRules>({
    name: [
        // { required: true, message: '请输入姓名', trigger: 'blur' },
        { required: true, validator: validateName, trigger: 'blur' }
    ],
    sex: [
        {
            required: true,
            message: '请选择性别',
            trigger: 'blur',
        },
    ],
    age: [
        { required: true, validator: validateAge(18, 65), trigger: 'blur' }
    ],
    tel: [
        { required: true, validator: validateTel, trigger: 'blur' }
    ],

})
// 增删改API
const submitData = async (d: { [key: string]: any }) => {
    const { data } = await $post('/item/m2ListChange', d)
    if (data.status !== 200) return
    props.getData() // 更新数据
    PopUpIshow.value = false
    ElMessage.success(data.msg)
}
// 提交表单验证
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (!valid) return console.log('error submit!', fields)
        if (!ruleForm.value.ip) {
            // 模拟ip地址
            const r = () => ~~(Math.random() * 256)
            ruleForm.value.ip = `${r()}.${r()}.${r()}.${r()}`
            ruleForm.value.type = 'ADD'
        } else {
            ruleForm.value.type = 'UPDATE'
        }
        console.log('提价数据》》', ruleForm.value)
        submitData(ruleForm.value)
    })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
// 弹窗关闭回调，需返回一个布尔值
const close = () => {
    ruleFormRef.value?.clearValidate()
    return true
};

// 向外暴露方法供父组件通过ref使用
defineExpose({ PopUpIshow, title, ruleForm, submitData })
</script>

<template>
    <PopUp :title="title" v-model="PopUpIshow" :close="close">
        <pre>{{ ruleForm }}</pre>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" status-icon>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio label="男" />
                    <el-radio label="女" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age" />
            </el-form-item>
            <el-form-item label="电话" prop="tel">
                <el-input v-model="ruleForm.tel" />
            </el-form-item>
            <el-form-item label="ip地址" prop="ip" v-if="title === '编辑信息'">
                <el-input v-model="ruleForm.ip" disabled />
            </el-form-item>
            <el-form-item label="备注" prop="bz">
                <el-input v-model="ruleForm.bz" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确认
                </el-button>
                <el-button @click="resetForm(ruleFormRef)" v-if="title === '添加用户'">重置</el-button>
            </el-form-item>
        </el-form>

    </PopUp>
</template>


<style lang='less' scoped></style>