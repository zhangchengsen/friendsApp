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
		return {
			id:v.id,
			user_id:v.user_id,
			follow:false,
			username:v.user.username,
			time:v.create_time,
			user_pic:v.user.userpic,
			title:v.title,
			title_pic:v.titlepic,
			support:{
				type:'support',
				support:2,
				unSupport:1
			},
			remark_num:v.comment_count,
			share_num:v.sharenum
		}
	}
	
	
}
