<template>
	<view class="position-relative">
		<view class="iconfont icon-guanbi position-absolute right-0 font-lg" style="left: 20rpx;" :style="'top:' + statusHigh+'px;' "  @click="goBack">
			
		</view>
		<template v-if ="!status">
			<view class="text-center" style="color: #64635e; font-size: 50rpx;padding-top: 190rpx;padding-bottom: 100rpx;" >
				账号密码登录
			</view>
			<view class="border-bottom m-2">
				<input type="text" class="p-2" placeholder="昵称/邮箱/手机" v-model="username" />
			</view>
			<view class="border-bottom m-2 flex align-center">
				<input type="text" class="p-2 flex-1" v-model="password" placeholder="请输入密码" />
				<text class="pr-1" style="color: #6d6c67;">忘记密码?</text>
			</view>
			<view @click="toLogin" :style="disabled ? 'color:#dcdcdc;' : 'color:#ffffff;' " class=" font-lg mx-3 flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c; margin-top: 80rpx;"  >
				登录
			</view>
			<view class="flex align-center justify-center m-4">
				<view class="" @click="changeStatus" style="color: #3d7275;">
					验证码登录
				</view>
				<text class="m-1">丨</text>
				<view class="" style="color: #3d7275;">
					登录遇到问题
				</view>
			</view>
		</template>
		<template v-else>
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
			<view @click="toLogin" :style="disabled ? 'color:#dcdcdc;' : 'color:#ffffff;' " class=" font-lg mx-3 flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c; margin-top: 80rpx;"  >
				登录
			</view>
			<view class="flex align-center justify-center m-4">
				<view class="" @click="changeStatus" style="color: #3d7275;">
					其他登录方式
				</view>
				<text class="m-1">丨</text>
				<view class="" style="color: #3d7275;">
					登录遇到问题
				</view>
			</view>
		</template>
		<view class="flex justify-center align-center">
			<view class="" style="height: 1rpx;background-color: #cacaca;width: 100rpx;">
				
			</view>
			<view class="mx-1" style="color: #cacaca;">
				社交账号登录
			</view>
			<view class="" style="height: 1rpx;background-color: #cacaca;width: 100rpx;">
				
			</view>
		</view>
		<!-- <view class="flex justify-center align-center p-2">
			<view class="iconfont icon-QQ m-2 flex align-center justify-center  bg-primary  rounded-circle font-lg text-white" style="width: 100rpx;height: 100rpx;">
			</view>
			<view class="iconfont icon-weixin m-2 flex align-center justify-center  bg-success  rounded-circle font-lg text-white" style="width: 100rpx;height: 100rpx;">
			</view>
			<view class="iconfont icon-xinlangweibo m-2 flex align-center justify-center  bg-danger  rounded-circle font-lg text-white" style="width: 100rpx;height: 100rpx;">
			</view>
		</view> -->
		<login></login>
		<view class="text-center">
			<text style="color: #cacaca;">注册代表您同意</text><text style="color: #007AFF;">《XXX社区协议》</text>
		</view>
	</view>
</template>

<script>
	import login from '@/components/login/other_login.vue'
	export default{
		components:{
			login
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusHigh = res.statusBarHeight
				}
			})
		},
		methods:{
			goBack() {
				uni.navigateBack({
					delta:1
				})
			},
			changeStatus() {
				this.status = !this.status
				this.valueNum = ''
				this.password = ''
			},
			toLogin() {
				if(this.disabled) return 
				else return uni.showToast({
					title:'登录成功'
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
				this.time = 5
				let timer = setInterval(()=>{
					if(this.time) this.time--;
					else 
					{
						this.time = 0
						clearInterval(timer)
					}
				},1000)
				
			}
		},
		data() {
			return {
				statusHigh:0,
				status:false,
				username:'',
				password:'',
				number:'',
				valueNum:'',
				time:0
			}
		},
		computed:{
			disabled() {
				if((this.username && this.password) || (this.valueNum && this.number) )
				return false;
				else return true
			},
			canGetNum()
			{
				if(!this.time) return true;
				 else return false;
			}
		}
	}
</script>

<style>
</style>
