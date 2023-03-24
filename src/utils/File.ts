import { $post } from '@/axios/index';
import { ElMessage } from 'element-plus'


// 导出方法
export const uploads = async (url: string, ...file: any) => {
    // 创建 FormData 对象
    let f = new FormData();
    // 通过 append() 方法来追加数据
    file.forEach((m: any) => {
        f.append("file", m)
    });
    const { data } = await $post(url, f);
    if (data.status !== 200) return
    ElMessage.success(data.msg)
}
