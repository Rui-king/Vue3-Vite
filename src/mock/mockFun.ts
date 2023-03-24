import Mock from 'mockjs'

let token = '5a9sZXVIjwbJHgZI6W5O';

// encodeURIComponent(str);  编码
// decodeURIComponent(str);  解码
// Object.fromEntries(new URLSearchParams(urlStr))  提取路径参数

// 二次封装mock
export default (url: string, method: string, fun: (req: { [key: string]: any }) => { status: number, [k: string]: any }) => {
    const _url = method === 'get' ? new RegExp(url + '.*') : url;
    Mock.mock(_url, method, (req) => {
        if (method === 'get' && req.url.includes('?')) {
            // 由于 mock 原因需要手动提取 get 请求参数
            let str = decodeURIComponent(req.url).replace(/.*\?/, '');
            req.body = Object.fromEntries(new URLSearchParams(str));
        } else if (method === 'post') {
            // json 转对象
            req.body = JSON.parse(req.body);
        };
        const obj = fun(req);
        // 登录页判断
        if (_url === '/login') {
            if (obj.status === 401) return obj;
            obj!.__token = token;
            return obj;
        };
        // 非登录页判断
        if (req?.body?.__token !== token) {
            return {
                msg: '登录过期, 请重新登录',
                status: 403
            }
        } else {
            if (obj.status !== 401 && obj.status !== 403) obj!.__token = token;
            return obj
        }


    })
}