<script setup lang='ts'>
import { $get } from '@/axios/index';
import m2AddOrEdit from './components/m2AddOrEdit.vue';
import type { TableColumnCtx } from 'element-plus';
export type User = {
    id: number
    name: string
    sex: string
    age: number
    tel: string
    ip: string
    bz: string
    copyBz: string
    isBz: boolean
    [key: string]: any
}
// 当前页
const currentPage = ref(1)
// 可选每页条数
const pageSizeArr = [10, 50, 100, 500]
// 当前每页条数
const pageSize = ref(pageSizeArr[0])
// 总条数
const total = ref<number>()
// 列表数据
const tableData = ref<User[]>([])
// 顶部搜索框
const SearchInput = ref<string | undefined>()
// 年龄排序方式
const ageSort = ref<string | null>(null)

// 引用弹窗模板(为了获取 m2AddOrEdit 的类型，首先需要通过 typeof 得到其类型，再使用 TypeScript 内置的 InstanceType 工具类型来获取其实例类型)
const m2AddOrEditRef = ref<InstanceType<typeof m2AddOrEdit> | null>(null)

// 获取列表数据
const getData = async () => {
    const { data } = await $get('/item/m2List', {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        SearchInput: SearchInput.value,
        ageSort: ageSort.value,
    })
    tableData.value = data.data.list
    total.value = data.data.total
}
getData()

// 顶部搜索
const Search = () => {
    currentPage.value = 1;
    getData()
}

// 添加用户
const addTableData = () => {
    m2AddOrEditRef.value!.title = '添加用户'
    m2AddOrEditRef.value!.PopUpIshow = true
    const obj = {} as User;
    Object.keys(tableData.value[0]).forEach((m) => obj[m] = '')
    m2AddOrEditRef.value!.ruleForm = obj;
}

// 修改备注
const handleChange = (index: number, row: User) => {
    if (row.isBz) {
        row.isBz = false;
        if (row.copyBz === row.bz) return;
        row.bz = row.copyBz;
        row.copyBz = '';
        m2AddOrEditRef.value?.submitData({
            type: 'XGBZ',
            id: row.id,
            bz: row.bz
        })
    } else {
        row.isBz = true;
        row.copyBz = row.bz
    }
}

// 取消备注修改
const handleChangeNo = (row: User) => {
    row.isBz = false
    row.copyBz = ''
}

// 编辑
const handleEdit = (index: number, row: User) => {
    m2AddOrEditRef.value!.title = '编辑信息'
    m2AddOrEditRef.value!.ruleForm = { ...row };
    m2AddOrEditRef.value!.PopUpIshow = true
}

// 删除
const handleDelete = (index: number, row: User) => {
    ElMessageBox.confirm(
        '是否删除',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            const d = {
                type: 'DEL',
                id: row.id,
            }
            m2AddOrEditRef.value?.submitData(d)
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消',
            })
        })

}
// 修改每页显示条数
const handleSizeChange = (val: number) => {
    pageSize.value = val;
    currentPage.value = 1;
    getData()
}
// 数字按钮和跳转指定页
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    getData()
}
// 性别筛选
const filterHandler = (
    value: string,
    row: User,
    column: TableColumnCtx<User>
) => {
    const property = column['property']
    return row[property] === value
}
// 按年龄排序
const sortChange = ({ order }: { order: string | null }) => {
    ageSort.value = order ? order === 'descending' ? 'DESC' : 'ASC' : null;
    currentPage.value = 1;
    getData()
}
</script>

<template>
    <div class="m2-box">
        <!-- 顶部搜索 -->
        <div class="Search">
            <el-input v-model="SearchInput" placeholder="请输入搜索内容" @keydown.enter="Search">
                <template #append>
                    <el-button icon="Search" @click="Search" />
                </template>
            </el-input>
            <el-button type="primary" @click="addTableData">添加用户</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" stripe style="width: 100%" :border="true" @sort-change="sortChange">
            <el-table-column label="序号" type="index" width="60" align="center" />
            <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="sex" label="性别" width="80" align="center" />
            <el-table-column prop="age" label="年龄" width="80" sortable="custom" align="center" />
            <el-table-column prop="tel" label="电话" width="150" />
            <el-table-column prop="ip" label="IP地址" width="150" />
            <el-table-column prop="bz" label="备注">
                <template #default="{ row }">
                    <span v-if="!row.isBz">{{ row.bz || '-' }}</span>
                    <el-input v-model="row.copyBz" clearable v-else>
                        <template #append>
                            <span class="cp" @click="handleChangeNo(row)">取消修改</span>
                        </template>
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="260" align="center">
                <template #default="scope">
                    <el-button size="small" :type="scope.row.isBz ? 'success' : 'primary'"
                        @click="handleChange(scope.$index, scope.row)">{{ scope.row.isBz
                            ? '修改完成' : '修改备注' }}</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizeArr" background
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        <!-- 弹窗 -->
        <m2AddOrEdit :getData="getData" ref="m2AddOrEditRef" />
    </div>
</template>


<style lang='less' scoped>
// .m2-box {
//     height: 100%;
// }


.Search {
    .f;
    margin-bottom: 20px;

    .el-input {
        width: 40%;
        margin-right: 10px
    }
}

.cp {
    cursor: pointer;
}

.el-pagination {
    justify-content: center;
    margin-top: 20px;
}
</style>