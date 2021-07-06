import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		loginStatus:false,
		user:{},
		token:false,
		change:false
	},
	mutations:{
		changeLoginStatus(state,user)
		{
			state.loginStatus = true
			state.user = user
			state.token = state.user.token
			uni.setStorageSync('user', JSON.stringify(user));
			state.change = true
		},
		initStatus(state)
		{
			let user = uni.getStorageSync('user')
			if(!user) return 
			state.loginStatus = true
			state.user = JSON.parse(user)
			state.change = true
			state.token = state.user.token
		},
		logOut(state)
		{
			state.change = true
			state.loginStatus = false
			state.user = {}
			state.token = false
			uni.removeStorageSync('user');
		},
		editUserInfo(state,{ key,value }){
			state.user[key] = value
			uni.setStorageSync('user', JSON.stringify(state.user));
			console.log(state.user)
		},
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
		change(state){
			state.change = false
		},
	}
})