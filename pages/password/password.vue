<template>
	<view class="">
		<view class="border-bottom m-2" v-if="user.password">
			<input type="password" class="p-2" placeholder="输入旧密码" v-model="oldPwd" />
		</view>
		<view class="border-bottom m-2">
			<input type="password" class="p-2" placeholder="输入新密码" v-model="password" />
		</view>
		<view class="border-bottom m-2 flex align-center">
			<input type="password" class="p-2 flex-1" v-model="exactPwd" placeholder="请输入密码" />
		</view>
		<view @click="sub" :style="disabled ? 'color:#dcdcdc;' : 'color:#ffffff;' " class=" font-lg mx-3 flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c; margin-top: 80rpx;"  >
			确定
		</view>
	</view>
	
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		methods:{
			sub() 
			{
				if(this.disabled) return
				if(this.password != this.exactPwd)
				return uni.showToast({
					icon:"none",
					title:"输入的两次密码不一致"
				})
				this.$http.post('/repassword',{
					oldpassword:this.oldpassword,
					newpassword:this.password,
					renewpassword:this.exactPwd,
				},{
					token:true
				}).then(res=>{
					console.log(res)
					this.$store.commit('editUserInfo',{
						key:'password',
						value:true
					})
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '修改密码成功',
						icon: 'none'
					});
				}).catch(err=>{
					console.log(err.message)
				})
			}
		},
		computed:{
			...mapState({
				user:state=>state.user
			}),
			disabled()
			{
				if(this.user.password) return !(this.password.trim() && this.exactPwd.trim() && this.oldPwd)
				return !(this.password.trim() && this.exactPwd.trim())
			}
		},
		data() {
			return {
				password:"",
				exactPwd:"",
				oldPwd:"."
			}
		}
		
	}
</script>

<style>
</style>
