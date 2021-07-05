<template>
	<view class="">
		
		<view class="text-center" style="color: #64635e; font-size: 50rpx;padding-top: 190rpx;padding-bottom: 100rpx;" >
			手机验证码
		</view>
		<view class="border-bottom m-2">
			<view class="flex align-center">
				<text>+86</text>
				<input type="text" class="p-2" placeholder="手机号" v-model="number" />
				</view>
			</view>
			
		<view class="border-bottom m-2 flex align-center">
			<input type="text" class="p-2 flex-1" v-model="valueNum" placeholder="请输入收到的验证码" />
			<text  @click="getNum" :disabled="!canGetNum" class="p-1 rounded flex align-center justify-center" style="min-width: 160rpx;color:white;background-color: #fd597c;" :style=" canGetNum ? 'color: #ffffff;' : 'color:#dcdcdc;'   ">{{ canGetNum ?  '发送验证码' : this.time+'s' }}</text>
		</view>
		<view @click="submit" class="m-2 font-lg flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c;" :style="disabled ? 'color: #fff;' :'color:#b5b5b5' " >
			绑定
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data() {
			return {
				valueNum:'',
				number:'',
				time:0
			}
		},
	
		methods:{
			submit() {
				if(!this.disabled) return
				this.$http.post('/user/bindphone',{
					phone:this.number,
					code:this.valueNum
				},{
					token:true
				}).then(res=>{
					console.log(res)
					this.$store.commit('editUserInfo',{
						key:'phone',
						value:this.number
					})
					
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '绑定成功',
						icon: 'none'
					});
				}).catch(err=>{
					console.log(err)
				})
			},
			getNum () {
				if(!(/^1[3456789]\d{9}$/.test(this.number))){ 
					return uni.showToast({
						icon:"none",
						title:"手机号码有误"
					});  
				} 
				if(!this.canGetNum) return
				
				this.time = 60
				let timer = setInterval(()=>{
					if(this.time) this.time--;
					else 
					{
						this.time = 0
						clearInterval(timer)
					}
				},1000)
				this.$http.post('/user/sendcode',{
					phone:this.number
				},{
					native:true,
				}).then(res=>{
					uni.showToast({
						title:res.data.msg,
						duration:3000,
						icon:'none'
					})
				})
				
			}
		},
		computed:{
			canGetNum() {
				
				if(!this.time) return true
				else return false
			},
			disabled() {
				return this.valueNum.trim() && this.number.trim()
			},
			...mapState({
				token:state=>state.token
			}),
			
		},
		onShow(){
			console.log(this.token)
		}
	}
</script>

<style>
	
</style>
