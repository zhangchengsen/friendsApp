export default {
	
	onNetwork()  {
		let a = (res) => {
				if(res.networkType == 'none')
				{
					uni.showToast({
						icon:'none',
						title:'当前处于断网状态'
					})
				}
			}
		uni.getNetworkType({
			success: a
		})
		uni.onNetworkStatusChange(a)
		
	},
	update() {
		// #ifdef APP-PLUS  
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
		    uni.request({  
		        url: 'http://ceshi.dishait/api/v1/update',  
		        data: {  
		            version: widgetInfo.version,  
		            name: widgetInfo.name  
		        },  
		        success: (result) => {  
		            var data = result.data;  
		            if (data.update && data.wgtUrl) {  
		                uni.downloadFile({  
		                    url: data.wgtUrl,  
		                    success: (downloadResult) => {  
		                        if (downloadResult.statusCode === 200) {  
		                            plus.runtime.install(downloadResult.tempFilePath, {  
		                                force: false  
		                            }, function() {  
		                                console.log('install success...');  
		                                plus.runtime.restart();  
		                            }, function(e) {  
		                                console.error('install fail...');  
		                            });  
		                        }  
		                    }  
		                });  
		            }  
		        }  
		    });  
		});  
		// #endif
	},
	helper(v) {
		let isFollow = (v.user.fens.length > 0)
		let support = ''
		if(v.support.length > 0){
			support = v.support[0].type === 0 ? 'support' : 'unSupport'
		}
		return {
			id:v.id,
			user_id:v.user_id,
			follow:isFollow,
			username:v.user.username,
			time:v.create_time,
			user_pic:v.user.userpic,
			title:v.title,
			title_pic:v.titlepic,
			support:{
				type:support,
				support:v.ding_count,
				unSupport:v.cai_count
			},
			remark_num:v.comment_count,
			share_num:v.sharenum
		}
	},
	formatUserinfo(obj){
			// 第三方登录（已绑定）
			if (obj.user && obj.user_id > 0) {
				return {
					id: obj.user.id,
					username: obj.user.username || obj.nickname,
					userpic: obj.user.userpic || obj.avatarurl,
					phone: obj.user.phone,
					email: obj.user.email,
					status: obj.user.status,
					create_time: obj.user.create_time,
					logintype: obj.logintype,
					password:obj.user.password,
					token: obj.token,
					userinfo: {
						id: obj.user.userinfo.id,
						user_id: obj.user.userinfo.user_id,
						age: obj.user.userinfo.age,
						sex: obj.user.userinfo.sex,
						qg: obj.user.userinfo.qg,
						job: obj.user.userinfo.job,
						path: obj.user.userinfo.path,
						birthday: obj.user.userinfo.birthday,
					}
				}
			}
			// 第三方登录（未绑定）
			return {
				id: obj.user_id,
				username: obj.nickname,
				userpic: obj.avatarurl,
				phone: false,
				email: false,
				status: 1,
				create_time: false,
				logintype: obj.logintype,
				token: obj.token,
				userinfo: false
			}
		},
	__toFirst(arr,index){
		if (index != 0) {
			arr.unshift(arr.splice(index,1)[0]);
		}
		return arr;
	},
	
	
}
