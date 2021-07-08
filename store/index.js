/**
 * 原理：
 * 
 * 接收信息（假如当前消息的 from_id = 12，当前用户id=17）
 * 场景一：与当前用户12处于聊天界面
 * 		  (1) 渲染到页面
 * 		  (2) 存储到本地存储
 * 			  a. chatdetail_17_12
 * 			  b. chatlist17（将当前会话置顶，修改chatlist中当前会话的data和time显示）
 * 
 * 场景二：与当前用户12不处于聊天界面
 *		  (1) 渲染到页面（处于paper页，留个接口）
 * 		  (2) 存储到本地存储
 * 			  a. chatdetail_17_12
 * 			  b. chatlist17
 * 			（将当前会话置顶，修改chatlist中当前会话的data和time显示 和 当前会话未读数+1）
 * 			  c. 总未读数+1（显示在tabbar上）
 * 接收到的消息格式：
{
	to_id:1,      // 接收人 
	from_id:12,	  // 发送人
	from_username:"某某",  // 发送人昵称
	from_userpic:"http://pic136.nipic.com/file/20170725/10673188_152559977000_2.jpg",
	type:"text",	 // 发送类型
	data:"你好啊",	 // 发送内容
	time:151235451   // 接收到的时间
}
 * 
 * 发送消息
 * 		(1) 写入存储
 * 			chatdetail_17_12
 * 			chatlist17（将当前会话置顶，修改chatlist中当前会话的data和time显示）
 * 		(2) 请求ajax发送消息
 * 		(3) 渲染到页面（user-chat页面实现）
 * 
 * 读取消息
 * 		(1) 写入存储
 * 			chatlist_17：获取将当前会话的未读数设为0，减少总未读数，渲染tabbar
 * 
 * */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import $C from '@/common/config.js';
import $http from '@/common/request.js';
import $U from '@/common/util.js';

export default new Vuex.Store({
	state:{
		// 登录
		
		loginStatus:false,
		token:false,
		user:{
			// "id": 7,
			// "username": "zcmcss",
			// "userpic": "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/userpic/1.jpg",
			// "password": true,
			// "phone": "13450772004",
			// "email": "123@qq.com",
			// "status": 1,
			// "create_time": null,
			// "logintype": "username",
			// "token": "a8bb3f6f50ff5049d70b6022b48e1f45c24a96f8",
			// "userinfo": {
			// 	"id": 1,
			// 	"user_id": 7,
			// 	"age": 23,
			// 	"sex": 1,
			// 	"qg": 1,
			// 	"job": "IT",
			// 	"path": "北京市-市辖区-朝阳区",
			// 	"birthday": "1996-06-12"
			// },
			// user_bind:{
			// 	"qq": {
			// 		"id": 229,
			// 		"nickname": "airson"
			// 	}
			// }
		},
		change:false,
		// Socket连接状态
		IsOpen:false,
		// SocketTask
		SocketTask:false,
		// 是否上线（会员id绑定客户端id，验证用户身份，通过则绑定）
		IsOnline:false, 
		// 当前聊天对象（进入聊天页面获取）
		ToUser:{
			user_id:0, // 通过判断user_id是否为0，当前用户处在什么场景下
			username:"",
			userpic:""
		},
		// 聊天会话列表
		chatList:[]
	},
	getters:{
		// 总未读数
		totalNoread(state){
			let total = 0
			state.chatList.forEach(item=>{
				total += item.noread
			})
			return total
		}
	},
	mutations:{
		
		initStatus(state)
		{
			let user = uni.getStorageSync('user')
			if(!user) return 
			state.loginStatus = true
			state.user = JSON.parse(user)
			state.change = true
			state.token = state.user.token
		},
		// 创建聊天对象
		createToUser(state,ToUser){
			state.ToUser = ToUser
		},
		change(state){
			state.change = false
		},
		// 关闭聊天对象
		closeToUser(state){
			state.ToUser = {
				user_id:0, 
				username:"",
				userpic:""
			}
		},
		// 登录
		changeLoginStatus(state,user){
			state.loginStatus = true
			state.user = user
			state.token = state.user.token
			uni.setStorageSync('user', JSON.stringify(user));
			state.change = true
		},
		// 退出登录
		logOut(state){
			state.loginStatus = false
			state.user = {}
			state.token = false
			uni.removeStorageSync('user');
			state.change = true
		},
		// 修改用户信息(手机号,邮箱,密码)
		editUserInfo(state,{ key,value }){
			state.user[key] = value
			uni.setStorageSync('user', JSON.stringify(state.user));
		},
		// 修改资料
		editUserUserInfo(state,obj){
			if(state.user.userinfo){
				state.user.userinfo.sex = obj.sex
				state.user.userinfo.qg = obj.qg
				state.user.userinfo.job = obj.job
				state.user.userinfo.path = obj.path
				state.user.userinfo.birthday = obj.birthday
				uni.setStorageSync('user', JSON.stringify(state.user));
			}
		},
		// 存储会话列表
		saveChatList(state,list){
			uni.setStorageSync('chatlist_'+state.user.id,JSON.stringify(list))
		},
		// 删除会话列表
		clearChatList(state,list){
			uni.removeStorageSync('chatlist_'+state.user.id)
			state.chatList = []
		},
		// 存储与某个用户聊天内容列表
		saveChatDetail(state,{list,toId}){
			// chatdetail_[当前用户id]_[聊天对象id]
			let myId = state.user.id
			toId = toId ? toId : state.ToUser.user_id
			let key = 'chatdetail_'+myId+'_'+toId
			uni.setStorageSync(key,JSON.stringify(list))
		},
	},
	actions:{
		// 初始化登录状态
		initUser({state,dispatch}){
			let user = uni.getStorageSync('user');
			if(user){
				state.user = JSON.parse(user)
				state.loginStatus = true
				state.token = state.user.token
				// 打开socket
				dispatch('openSocket')
			}
		},
		// 关闭socket
		closeSocket({state}){
			if (state.IsOpen){
				state.SocketTask.close();
			}
		},
		// 打开socket
		openSocket({ state,dispatch }){
			// 防止重复连接
			if(state.IsOpen) return
			// 连接
			state.SocketTask = uni.connectSocket({
			    url: $C.websocketUrl,
			    complete: ()=> {
					console.log('连接')
				}
			});
			if (!state.SocketTask) return;
			// 监听开启
			state.SocketTask.onOpen(()=>{
				// 将连接状态设为已连接
				console.log('将连接状态设为已连接');
				state.IsOpen = true
			})
			// 监听关闭
			state.SocketTask.onClose(()=>{
				console.log('连接已关闭');
				state.IsOpen = false;
				state.SocketTask = false;
				state.IsOnline = false
				// 清空会话列表
				// 更新未读数提示
			})
			// 监听错误
			state.SocketTask.onError((err)=>{
				console.log('连接错误',err);
				state.IsOpen = false;
				state.SocketTask = false;
				state.IsOnline = false
			})
			// 监听接收信息
			state.SocketTask.onMessage((e)=>{
				console.log('接收消息',e.data);
				// 字符串转json
				let res = JSON.parse(e.data);
				console.log(res)
				// 绑定返回结果
				if (res.type == 'bind'){
					// 用户绑定
					console.log('res.data',res.data)
					return dispatch('userBind',res.data)
				}
				// 处理接收信息
				if (res.type !== 'text') return;
				/*
				{
					to_id:1,      // 接收人 
					from_id:12,	  // 发送人id
					from_username:"某某",  // 发送人昵称
					from_userpic:"http://pic136.nipic.com/file/20170725/10673188_152559977000_2.jpg",
					type:"text",	 // 发送类型
					data:"你好啊",	 // 发送内容
					time:151235451   // 接收到的时间
				}
				*/
			   // 处理接收消息
			   dispatch('handleChatMessage',res)
			})
		},
		// 用户绑定
		userBind({state,dispatch},client_id){
			$http.post('/chat/bind',{
				type:"bind",
				client_id:client_id
			},{
				token:true
			}).then(data=>{
				/*
					{
						"type":"bind",
						"status":true
					}
				*/
				console.log('绑定成功',data);
				// 开始上线
				if(data.status && data.type === 'bind'){
					// 改为上线状态
					state.IsOnline = true
					// 初始化会话列表
					dispatch('initChatList')
					// 获取未读信息
					dispatch('getUnreadMessages')
				}
			}).catch(err=>{
				// 失败 退出登录，重新链接等处理
				console.log('错误',err)
			})
		},
		// 获取未读信息
		getUnreadMessages({state,dispatch}){
			console.log('获取未读信息中...');
			$http.post('/chat/get',{},{
				token:true,
			}).then((data)=>{
				console.log('获取未读信息成功',data);
				data.forEach(msg=>{
					// 处理接收消息
					dispatch('handleChatMessage',msg)
				})
			});
		},
		// 初始化会话列表
		async initChatList({state,dispatch,commit}){
			state.chatList = await dispatch('getChatList')
			console.log('初始化会话列表',state.chatList);
			dispatch('updateTabbarBadge')
		},
		// 处理接收消息
		handleChatMessage({state,dispatch},data){
			console.log('处理接收消息',data);
			// 全局通知接口
			uni.$emit('UserChat',data);
			// 存储到chatdetail
			dispatch('updateChatDetailToUser',{
				data,
				send:false
			})
			// 更新会话列表
			dispatch('updateChatList',{
				data,
				send:false
			})
		},
		// 更新聊天会话列表
		async updateChatList({state,dispatch,commit},{data,send}){
			console.log('更新聊天会话列表',data);
			// 是否是本人发送
			let isMySend = send
			console.log(isMySend ? '本人发送的信息' : '不是本人发送的');
			// 获取之前会话
			let chatList = await dispatch('getChatList')
			// 判断是否已存在该会话，存在：将当前会话置顶；不存在：创建并追加至头部
			let i = chatList.findIndex((v)=>{
				return v.user_id == data.to_id || v.user_id == data.from_id;
			})
			// 不存在,创建会话
			if(i === -1){
				// 接收到的消息转会话
				let obj = await dispatch('formatChatListObject',{
					data,
					send
				})
				// 忽略本人发送
				if (!isMySend) {
					obj.noread = 1;
				}
				console.log('不存在当前会话,创建',obj);
				// 追加头部
				chatList.unshift(obj);
			} else {
				// 存在：将当前会话置顶,修改当前会话的data和time显示
				let item = chatList[i]
				item.data = data.data
				item.type = data.type
				item.time = data.time
				item.avatar = data.from_userpic
				// 当前聊天对象不是该id，未读数+1（排除本人发送消息）
				if(!isMySend && state.ToUser.user_id !== item.user_id){
					item.noread++
				}
				console.log('存在当前会话',item);
				// 置顶当前会话
				chatList = $U.__toFirst(chatList,i)
			}
			// 存储到本地存储
			state.chatList = chatList
			commit('saveChatList',chatList)
			// 不处于聊天当中,更新未读数
			if(data.from_id !== state.ToUser.user_id && !isMySend){
				await dispatch('updateTabbarBadge')
			}
		},
		// 获取所有聊天会话列表
		getChatList({state}){
			let list = uni.getStorageSync('chatlist_'+state.user.id);
			return list ? JSON.parse(list) : []
		},
		// 获取与某个用户聊天内容列表
		getChatDetailToUser({state},toId = 0){
			// chatdetail_[当前用户id]_[聊天对象id]
			let myId = state.user.id
			toId = toId ? toId : state.ToUser.user_id
			let key = 'chatdetail_'+myId+'_'+toId
			let list = uni.getStorageSync(key)
			return list ? JSON.parse(list) : []
		},
		// 消息转聊天会话对象
		formatChatListObject({state},{data,send}){
			// 接收消息
			return {
				user_id:send ? state.ToUser.user_id : data.from_id,
				avatar:send ? state.ToUser.avatar : data.from_userpic,
				username:send ? state.ToUser.username : data.from_username,
				update_time:data.time, // 最新消息时间戳
				data:data.data,
				noread:0  // 未读数
			}
		},
		// 消息转对话对象
		formatChatDetailObject({state},e){
			let data = e.data
			console.log('formatChatDetailObject');
			console.log(e);
			return {
				user_id:e.send ? state.user.id : data.from_id,
				avatar:e.send ? state.user.userpic : data.from_userpic,
				username:e.send ? state.user.username:data.from_username,
				data:data.data,
				type:data.type, 
				create_time:new Date().getTime()
			}
		},
		// 更新未读数
		updateTabbarBadge({state,getters}){
			let total = getters.totalNoread
			console.log('更新未读数',total);
			// 未读数为0,移除
			if(total === 0){
				console.log('移除未读数');
				return uni.removeTabBarBadge({
					index:2
				})
			}
			console.log('设置未读数',total);
			uni.setTabBarBadge({
				index:2,
				text: total > 99 ? '99+' : total.toString()
			});
		},
		// 更新与某个用户聊天内容列表
		async updateChatDetailToUser({state,dispatch,commit},e){
			 console.log('更新与某个用户聊天内容列表',e);
			 let data = e.data
			 let toId = e.send ? state.ToUser.user_id : data.from_id
			 // 获取与某个用户聊天内容的历史记录
			 let list = await dispatch('getChatDetailToUser',toId)
			 list.push(await dispatch('formatChatDetailObject',e))
			 // 存储到本地存储
			 commit('saveChatDetail',{
			 	list,toId
			 })
		},
		// 发送消息
		async sendChatMessage({dispatch},data){
			/*
			{
				data:"发送内容",
				type:"text"
			}
			*/
			console.log('发送消息');
			// 组织发送消息格式
			let sendData = await dispatch('formatSendData',data)
			console.log('发送消息数据格式',sendData);
			/*
			{
				to_id:1,      // 接收人 
				from_id:12,	  // 发送人id
				from_username:"某某",  // 发送人昵称
				from_userpic:"http://pic136.nipic.com/file/20170725/10673188_152559977000_2.jpg",
				type:"text",	 // 发送类型
				data:"你好啊",	 // 发送内容
				time:151235451   // 接收到的时间
			}
			*/
		   // 更新与某个用户的消息历史记录
		   dispatch('updateChatDetailToUser',{
		   	 data:sendData,
		   	 send:true
		   })
		   // 更新会话列表
		   dispatch('updateChatList',{
			   data:sendData,
			   send:true
		   })
		   return sendData
		},
		// 组织发送格式
		formatSendData({state},data){
			return {
				to_id:state.ToUser.user_id,
				from_id:state.user.id,
				from_username:state.user.username,
				from_userpic:state.user.userpic ? state.user.userpic : '/static/default.jpg',
				type:data.type,
				data:data.data,
				time:new Date().getTime()
			}
		},
		// 读取当前会话(去除未读数,更新tabbar)
		readChatMessage({state,commit,dispatch},item){
			/*
			{
				"user_id": 331,
				"avatar": "/static/default.jpg",
				"username": "13450772004",
				"update_time": 1578216988,
				"data": "看看有么有移除",
				"noread": 0,
				"type": "text",
				"time": 1578226151777
			}
			*/
			console.log('读取当前会话(去除未读数,更新tabbar)',item);
			// 没有未读信息
			if (item.noread === 0) return;
			// 拿到当前会话 设置未读数为0
			state.chatList.forEach((v)=>{
				if(v.user_id == item.user_id){
					v.noread = 0
				}
			})
			// 存储
			commit('saveChatList',state.chatList)
			// 更新未读数
			dispatch('updateTabbarBadge')
		},
	}
})