<template>
	<view class="mt-3">
		<block v-for="(item,index) in all">
			<uni-list-item  @click="toChange(item)" clickable :showArrow="true" :title="item.name" class="font-lg" clickable>
				<view slot='rightIcon' class="mb-2 pr-2 text-muted font-sm" style="height: 100%;">
					{{item.data}}
				</view>
			</uni-list-item>
			
		</block>
		<uni-notice-bar single="true" scrollable text="=== 提示 ===   微博绑定可能不兼容哦"></uni-notice-bar>
	</view>
	
</template>

<script>
	import {mapState} from 'vuex'
	export default {
			methods:{
				toChange(item) {
					if(item.to == 'weixin' || item.to == 'weibo' || item.to =='qq') 
					{
						if(item.data != '未绑定') return 
						return this.bindOther(item)
					}
					uni.navigateTo({
						url:`../${item.to}/${item.to}`
					})
			},
				__init(){
					this.all = [
						{name:'手机号',to:"phone",data: this.user.phone ? this.user.phone : '未绑定'  },
						{name:'登录密码',to:"password",data: this.user.password ? '修改密码' : '未设置 '  },
						{name:'邮箱绑定',to:"email",data: this.user.email ? this.user.email : '未绑定'  }
					]
					let data = this.$http.get('/user/getuserbind',{},{token:true})
					.then(res=>{
						this.$store.commit('editUserInfo',{
							key:'user_bind',
							value:res
						})
						let other = [
							{name:'微信绑定',to:"weixin",data:this.user.user_bind.weixin ? this.user.user_bind.weixin.nickname : '未绑定'},
							{name:'微博绑定',to:"sinaweibo",data:this.user.user_bind.sinaweibo ? this.user.user_bind.sinaweibo.nickname : '未绑定'},
							{name:'QQ账号',to:"qq",data:this.user.user_bind.qq ? this.user.user_bind.qq.nickname : '未绑定'},
						]
						this.all = [...this.all,...other]
					}).catch(err=>{
						console.log(err.message)
					})
				},
			bindOther(item) {
				uni.login({
					
					provider:item.to,
					success: ret =>{
						uni.getUserInfo({
							provider:item.to,
							success:(res)=>{
								let obj = {
									provider:item.to,
									openid:res.userInfo.openId,
									nickName:res.userInfo.nickName,
									avatarUrl:res.userInfo.avatarUrl
								}
								this.$http.post('/user/bindother',obj,{
									token:true
								}).then(results=>{
									if(results &&results.data && results.data.errorCode)
									{
										uni.showToast({
											icon:'none',
											title:results.data.msg
										})
									}
									this.__init()
								}).catch(err=>{
									console.log(err)
								})
							}
						})
					}
				})
			}
		},
		computed:{
			...mapState({
				user:state=>state.user
			})
		},
		data() {
			return {
				all:[
					
				]
			}
			
		},
		onShow()
		{
			this.__init()
			
		}
	}
</script>

<style>
</style>
