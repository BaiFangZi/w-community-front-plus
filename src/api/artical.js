import request from '@/utils/http'
// console.log(request)
export const getArticalLatest = () => request({
    url: '/api/v1/artical/latest',
    method: 'get',
})
export const getUserNote = (params) => request({
    url: '/api/v1/user/noteList',
    method: 'get',
    params,
})