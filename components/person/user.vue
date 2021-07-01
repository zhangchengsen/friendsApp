<template>
	<view class="">
		<view class="flex">
			<!-- 头像 -->
			<view class="">
				<image src='@/static/images/44.jpg' style="width: 100rpx;height: 100rpx;" class="rounded-circle" ></image>
			</view>
			<!-- 左右 -->
			<view class="w-100 flex justify-between align-center mx-2">
				<view class="">
					<view class="font-lg" style="color: #333333;font-weight: 600;">
						15641651654
					</view>
					<view class="font-md" style="color: #484742;margin-top: 5rpx;"  >
						总帖子 1 今日发帖 0
					</view>
				</view>
				<view class="iconfont icon-jinru font-md">
				</view>
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
	export default {
		props:{
			dataList:Array
		},
		data() {
			return {
			}
		},
		methods:{
		}
	}
</script>

<style>
</style>
