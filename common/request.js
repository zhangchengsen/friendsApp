import $C from './config.js';
export default {
	common :{
		method:"GET",
		header:{
			"content-type":"application/json"
		},
		data:{}
	},
	request(options = {})
	{
		options.url = $C.webUrl + options.url
		options.method = options.method || this.common.method
		options.header = options.header || this.common.header
		return new Promise ((resolve,reject)=>{
			uni.request({
				...options,
				success: (res) => {
					if(res.statusCode != 200)
					{
						uni.showToast({
							icon:'none',
							title:res.data.msg || '请求失败'
						})
						return reject(res.data)
					}
					return resolve(res.data.data)
				},
				fail: (err) => {
					uni.showToast({
						icon:'none',
						title:res.message || '请求失败'
					})
					return reject('获取失败')
				}
			})
		})
		
	},
	get(url,data = {},options = {}) {
			options.url = url
			options.data = data
			options.method = 'GET'
			return this.request(options)
	},
	post(url,data = {},options = {}) {
			options.url = url
			options.data = data
			options.method = 'POST'
			return this.request(options)
	}
	
	
}