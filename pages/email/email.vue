<template>
	<view class="p-2">
		<input type="text"  v-model="email" placeholder="你要绑定的邮箱" class="uni-input" />
		<view @click="submit"  class="m-3 font-lg flex align-center justify-center rounded-circle" style="height: 100rpx;background-color: #fd597c;" :style="disabled ? 'color: #fff;' :'color:#b5b5b5' " >
			去绑定
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				email:'',
				
			}
		},
		computed:{
			disabled() {
				return this.email 
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
				this.$http.post('/user/bindemail',{
					email:this.email
				},{token:true})
				.then(res=>{
					this.$store.commit('editUserInfo',{
						key:'email',
						value:true
					})
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '邮箱绑定成功',
						icon: 'none'
					});
				}).catch(err=>{
					console.log(err.message)
				})
				
			}
		}
	}
</script>

<style>
</style>
