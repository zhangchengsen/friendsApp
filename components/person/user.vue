<template>
	<view class="animated fadeIn">
		<view class="flex" v-if="loginStatus">
			<!-- 头像 -->
			<view class="">
				<image :src='user.userpic ? user.userpic: "/static/images/default.jpg" ' style="width: 100rpx;height: 100rpx;" class="rounded-circle" ></image>
			</view>
			<!-- 左右 -->
			<view class="w-100 flex justify-between align-center mx-2">
				<view class="">
					<view class="font-lg" style="color: #333333;font-weight: 600;">
						{{user.username}}
					</view>
					<view class="font-md" style="color: #484742;margin-top: 5rpx;"  >
						总帖子 1 今日发帖 0
					</view>
				</view>
				<view class="iconfont icon-jinru font-md">
				</view>
			</view>
		</view>
		<!-- 未登录 -->
		<view class="text-center mt-2" v-else >
			<text class="font-lg">点击登录 体验更多功能哦</text>
			<view @click="login" class="p-2 text-white mt-2 rounded mx-auto" style="background-color: #fd597c;width: 90%;">
				去登录<text class="font-sm ml-1">(第三方/账号密码/手机验证码)</text>
			</view>
		</view>
		<view class="flex align-center justify-center m-2">
			<block  v-for="(item,index) in dataList" >
				<view class="flex-1 p-2">
					<view class="font-weight-bold font-lg text-center">
						{{item.nums}}
					</view>
					<view class="text-center mt-1" style="color: #555650;">
						{{item.name}}
					</view>
				</view>
			</block>
			
			
		</view>
		<view class="text-center p-2">
			<image src="/static/images/52.png" mode="aspectFill"  style="width: 700rpx; height: 170rpx;" class="rounded"></image>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		props:{
			dataList:Array
		},
		data() {
			return {
			}
		},
		methods:{
			login() {
				uni.navigateTo({
					url:'../../pages/login/login'
				})
			}
		},
		computed:{
			...mapState({
				loginStatus:state=>state.loginStatus,
				user:state=>state.user
			})
		},
		mounted() {
			this.$store.commit('initStatus')
		}
	}
</script>

<style>
</style>
