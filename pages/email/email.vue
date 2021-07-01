<template>
	<view class="">
		<input type="text"  v-model="email" placeholder="你要绑定的邮箱" class="uni-input" />
		<input type="text"  v-model="ePassword" placeholder="邮箱的密码" class="uni-input" />
		<view @click="submit"  class="m-2 font-lg flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c;" :style="disabled ? 'color: #fff;' :'color:#b5b5b5' " >
			去绑定
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				email:'',
				ePassword:''
				
			}
		},
		computed:{
			disabled() {
				return this.email && this.ePassword
			}
		},
		methods:{
			submit() {
				if(!this.disabled) return
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(!reg.test(this.email)) return uni.showToast({
					title:'邮箱格式错误',
					icon:'none'
				})
				
			
				uni.showToast({
					title:'提交成功'
				})
			}
		}
	}
</script>

<style>
</style>
