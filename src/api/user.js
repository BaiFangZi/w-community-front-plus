import request from '@/utils/http'


//用户登陆
export const login = userInfo => request({
	url: '/api/v1/login',
	method: 'post',
	data: userInfo,
})


//用户注册
export const regist = userInfo => request({
	url: '/api/v1/regist',
	method: 'post',
	data: userInfo,
})



//普通请求 /api/v1/xxx
//用户操作 /api/v1/user/xxx

//后台匹配 api中含有user，不传token，让后台直接去解析， 然后做验证  -->auth?  401  
//
