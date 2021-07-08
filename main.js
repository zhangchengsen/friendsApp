import Vue from 'vue'
import App from './App'
import store from './store/index.js'
Vue.config.productionTip = false
import divider from 'components/common/divider.vue'
import loadMore from 'components/common/load_more.vue'
import nothing from 'components/common/nothing.vue'
import upload_image from "components/common/upload_img.vue"
import $http from './common/request.js'
Vue.prototype.$store = store
import $C from './common/config.js'
import $U from './common/util.js'
Vue.prototype.$C = $C
Vue.prototype.$U = $U
Vue.prototype.$http = $http
Vue.component('divider',divider)
Vue.component('loadMore',loadMore)
Vue.component('nothing',nothing)
Vue.component('uploadImage',upload_image)
App.mpType = 'app'
//vuex封装验证
Vue.prototype.checkAuth = (callback,checkPhone = true)=>{
	if(!store.state.loginStatus)
	{
		return uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	if(checkPhone && !store.state.user.phone)
	{
		uni.showToast({
			icon:'none',
			title:'请先绑定手机号'
		})
		uni.navigateTo({
			url:'/pages/phone/phone'
		})
		
	}
	callback()
}
Vue.prototype.navigation = (opt,checkPhone = true)=>{
	if(!store.state.loginStatus)
	{
		return uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	uni.navigateTo({
		url:`/pages/${opt}/${opt}`
	})
}

const app = new Vue({
	store,
    ...App
})
app.$mount()
