
axios.interceptors.request.use(function(conifg){
	console.log(conifg)
	return conifg
},function(err){
	console.log(err)
	return Promise.reject(err)
})

axios.interceptors.response.use(function(res){
	
	//对响应的数据做些什么
	
	console.log(res)
	console.log(res.config.url)
	return res
},function(err){
	
	//对响应错误做些什么
	
	console.log(err)
	return Promise.reject(err)
})