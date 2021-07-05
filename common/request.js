import $C from './config.js';
import $store from '../store/index.js'
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
		if(options.token){
			options.header.token = $store.state.token
			if(!options.noCheck && !options.header.token && !options.notoast){
				return uni.showToast({
					title: '非法token,请重新登录',
					icon: 'none'
				});
			}
		}
		return new Promise ((resolve,reject)=>{
			uni.request({
				...options,
				success: (res) => {
					
					if(options.native) return resolve(res)
					if(res.statusCode != 200)
					{
						uni.showToast({
							icon:'none',
							title:res.data.msg || '请求失败'
						})
						return reject(res.data)
					}
					return resolve(res.data.data || res)
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
	},
	upload(url,options = {}){
		options.url = $C.webUrl + url
		options.header = options.header || {}
		// 验证权限token
		if(options.token){
			options.header.token = $store.state.token
			if(!options.header.token){
				return uni.showToast({
					title: '非法token,请重新登录',
					icon: 'none'
				});
			}
		}
		
		return new Promise((res,rej)=>{
			uni.uploadFile({
				...options,
				success: (uploadFileRes) => {
					if(uploadFileRes.statusCode !== 200){
						return uni.showToast({
							title: '上传图片失败',
							icon: 'none'
						});
					}
					let data = JSON.parse(uploadFileRes.data)
					res(data)
				},
				fail:(err)=>{
					rej(err)
				}
			});
		})
		
	}
	
	
}