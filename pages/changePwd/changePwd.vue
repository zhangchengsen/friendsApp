<template>
	<view class="">
		<input type="text"  v-model="oldPwd" placeholder="输入旧密码" class="uni-input" />
		<input type="text"  v-model="newPwd" placeholder="输入旧密码" class="uni-input" />
		<input type="text"  v-model="renewPwd" placeholder="输入旧密码" class="uni-input" />
		<view @click="submit" class="m-2 font-lg flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c;" :style="disabled ? 'color: #fff;' :'color:#b5b5b5' " >
			设置密码
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				oldPwd:'',
				newPwd:'',
				renewPwd:''
			}
		},
		computed:{
			disabled() {
				return this.oldPwd && this.newPwd && this.renewPwd
			}
		},
		methods:{
			submit() {
				if(this.renewPwd != this.newPwd )
				{
					return uni.showToast({
						title:'两次密码不一致',
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style>
	
</style>
