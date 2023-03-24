<script setup lang='ts'>
import { uploads } from '@/utils/File';
import type { UploadProps, UploadUserFile } from 'element-plus'
// 上传文件列表
const fileList = ref<UploadUserFile[]>([
    {
        name: 'element-plus-logo.svg',
        url: 'https://element-plus.org/images/element-plus-logo.svg',
    },
])
// 限制上传文件最大数量
const limit = 2;
// 允许的文件类型
const fileType = ["pdf", "doc", "docx", "xls", "xlsx", "txt", "png", "jpg", "bmp", "jpeg"];
// 最大上传文件，单位 
const fileSize = '5M';
// 检测选择的文件是否复合规则，比如文件大小，文件类型
const handleUpload = () => {

}
// 文件列表移除文件时的钩子
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    // 发请求删除文件
    console.log('文件已删除', file, uploadFiles)
    ElMessage({
        type: 'success',
        message: '删除成功',
    })
}
// 点击已上传文件回调
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log('文件信息', uploadFile)
}
// 超出限制上传文件数量时的提示
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    console.log(files, uploadFiles);
    ElMessage.warning(`最多可上传${limit}个文件`)
}
// 删除文件提示
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
        `是否删除 ${uploadFile.name} ?`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(
            () => true,
            () => false
        )
}

const uploadFile = (file: any) => {
    console.log('选择文件成功', file);
    return uploads('/file', file.file)
};

const inputFile = ref<{ files: any[] } | null>(null)
const uploadFile2 = () => {
    // 通过 input[type='file'] 选择的文件会存在本身 files 类数组中
    console.log('选择文件成功', inputFile.value!.files);
    uploads('/file', inputFile.value!.files[0])
}
</script>

<template>
    <div>
        <h2>上传</h2>
        <h4>1, 使用 element plus upload组件</h4>
        <el-upload v-model:file-list="fileList" class="upload-demo" action="#" :http-request="uploadFile" ref="upload"
            multiple :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="limit"
            :on-exceed="handleExceed" :before-upload="handleUpload">
            <el-button type="primary">选择上传文件</el-button>
            <template #tip>
                <div class="el-upload__tip">
                    文件大小限制{{ fileSize }}以下,可上传文件类型有：{{ fileType }}
                </div>
            </template>
        </el-upload>
        <h4>2, 使用原生input[type='file'] + js上传</h4>
        <input type="file" name="file" multiple ref="inputFile">
        <span class="sunmit" @click="uploadFile2">上传</span>
        <hr>
        <h2>下载</h2>
        <h4>1, 使用原生a标签</h4>
        <a href="../../assets/images/img1.png" download="img.png">下载文件</a>
    </div>
</template>


<style lang='less' scoped>
h2 {
    font-size: 25px;
    font-weight: bold;
    margin: 20px 0;
}

h4 {
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
}

.sunmit {
    display: inline-block;
    line-height: 25px;
    cursor: pointer;
    border-radius: 3px;
    background: rgb(201, 195, 195);
    padding: 0 10px;
}
</style>