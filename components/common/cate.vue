<template>
	<view class="mt-2 border-bottom">
		<view class="flex justify-between align-center p-2">
			<view class="">
				热门分类
			</view>
			<view class="" @click="more">
				<text style="color:#5a5955 ;">更多</text>
				<text class="iconfont icon-jinru"></text>
			</view>
		</view>
		<view class="flex justify-center">
			<block v-for = "(item,index) in topics" :key = "index">
				<view class=" flex justify-center align-center border rounded " style="padding-left: 20rpx;padding-right: 20rpx;padding-top: 10rpx;margin: 15rpx;margin-bottom: 35rpx;padding-bottom: 10rpx;background-color:#F1F1F1;color: #5a5955;font-size: 26rpx;">
					{{item}}
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			topics:{
				type:Array
			}
		},
		data() {
			
			return {
			}
		},
		methods:{
			more(){
				uni.navigateTo({
					url:"../../pages/cates/cates"
				})
			}
		} 
			
	}
</script>

<style>
</style>
