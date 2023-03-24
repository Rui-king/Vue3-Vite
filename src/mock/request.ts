import m from './mockFun';

// 是否登录
m('/login', 'post', ({ body }) => {
    if (body.user === '123' && body.password === '123') {
        return {
            msg: '登录成功',
            status: 200
        }
    }
    return {
        msg: '登录失败',
        status: 401
    }
})

// 随机音乐
const musicList = [
    // {
    //     name: '光年之外',
    //     id: '449818741'
    // },
    // {
    //     name: '起风了',
    //     id: '1330348068'
    // },
    {
        name: '怎么了',
        id: '1336990251'
    }
];
m('/music', 'get', (a) => {
    const id = musicList[~~(musicList.length * Math.random())].id
    return {
        data: 'https://music.163.com/song/media/outer/url?id=' + id,
        status: 200
    }
})

