<template>
	
	<view class="">
		<view class="text-center mt-5 mb-5">
			<image src="/static/images/31.png" style="width: 320rpx; height: 320rpx;" class="rounded-circle" ></image>
			<view class="" style="color: #D9D9D9;">
				version 1.0.1
			</view>
		</view>
		<uni-list-item @click="newVersion" showArrow clickable title="新版本检测" ></uni-list-item>
		<uni-list-item showArrow clickable title="社区用户协议" ></uni-list-item>
		<uni-list-item @click="navTo" showArrow clickable title="支持我们" ></uni-list-item>
	</view>
</template>

<script>
	export default{
		methods:{
			netWork() {
				
			},
			navTo() {
				uni.navigateTo({
					url:'../support/support'
				})
			},
			newVersion() {
				uni.showToast({
					icon:'none',
					title:'当前已经是最新版本啦!'
				})
			}
		}
	}
</script>

<style>
</style>
