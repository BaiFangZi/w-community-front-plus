import request from '@/utils/http'
// console.log(request)
export const getArticalLatest = () => request({
    url: '/api/v1/artical/latest',
    method: 'get',
})