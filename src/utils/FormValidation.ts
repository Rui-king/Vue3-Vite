// 验证手机号
export const validateTel = (rule: any, value: any, callback: any) => {
    if (value === '') return callback(new Error('请输入手机号'))
    const re = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (re.test(value)) return callback()
    callback(new Error('请输入合法手机号'))
}

// 验证年龄
export const validateAge = (min: number, max: number) => {
    return (rule: any, value: any, callback: any) => {
        if (value === '') return callback(new Error('请输入年龄'))
        const re = /^[1-9]\d*$/
        if (!re.test(value)) return callback(new Error('请输入正确年龄'))
        if (value >= min && value <= max) return callback()
        callback(new Error(`请输入合法年龄：范围 ${min} ~ ${max}岁`))
    }
}
// 验证汉字
export const validateName = (rule: any, value: any, callback: any) => {
    if (value === '') return callback(new Error('请输入姓名'))
    const re = /^[\u4e00-\u9fa5]{2,}$/
    if (re.test(value)) return callback()
    callback(new Error('请输入中文名称'))
}

// 验证邮箱
export const validateEmail = (rule: any, value: any, callback: any) => {
    if (value === '') return callback(new Error('请输入邮箱'))
    const re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (re.test(value)) return callback();
    callback(new Error("请输入合法邮箱"));
};