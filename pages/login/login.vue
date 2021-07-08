<template>
	<view class="position-relative animated fadeIn">
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
				<input type="password" class="p-2 flex-1" v-model="password" placeholder="请输入密码" />
				<text class="pr-1" style="color: #6d6c67;">忘记密码?</text>
			</view>
			<view @click="toLogin" :style="disabled ? 'color:#dcdcdc;' : 'color:#ffffff;' " class=" font-lg mx-3 flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c; margin-top: 80rpx;"  >
				登录
			</view>
			<view class="flex align-center justify-center m-4">
				<view class="" @click="changeStatus" style="color: #3d7275;">
					<text style="color: #F56C6C;">(推荐)</text>验证码快速登录
				</view>
				<text class="m-1">丨</text>
				<view class="" style="color: #3d7275;" @click="toProblems">
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
				<view class="" style="color: #3d7275;" @click="toProblems">
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
			//登录遇到问题
			toProblems()
			{
				uni.navigateTo({
					url:'../problems/problems'
				})
			},
			goBack() {
				uni.navigateBack({
					delta:1
				})
			},
			// 切换
			changeStatus() {
				this.status = !this.status
				this.valueNum = ''
				this.password = ''
			},
			// 登录
			toLogin() {
				if(this.disabled) return 
				if(!this.status)
				{
					console.log(this.username + this.password)
					this.$http.post('/user/login',{
						username:this.username,
						password:this.password
					}).then(res=>{
						this.$store.commit('changeLoginStatus',res)
						this.$store.dispatch('openSocket')
					}).catch(err=>{console.log(err.message)})
				}
				else
				{
					this.$http.post('/user/phonelogin',{
						code:this.valueNum,
						phone:this.number
					}).then(res=>{
						
						this.$store.commit('changeLoginStatus',res)
						this.$store.dispatch('openSocket')
						uni.navigateBack({
							delta:1
						})
						uni.showToast({
							title:'登录成功'
						})
						
					}).catch(err=>{console.log(err)})
				}
			},
			// 发送验证码
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
