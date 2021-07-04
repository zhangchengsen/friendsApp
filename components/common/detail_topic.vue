<template>
	<view class="">
		<view style="height: 300rpx;" class="position-relative">
			<image :src="msg.title_pic" mode="aspectFill" class="w-100" style="filter: blur(10px);height: 300rpx;"></image>
		</view>
		<view class="bg-white flex position-relative p-2" style="" >
			<view class="">
				<image :src="msg.title_pic"style="margin-top:-70rpx;height: 140rpx;width: 150rpx;" class="rounded"></image>
			</view>
			<view class="font-md pl-2">
				{{msg.topicName}}
			</view>
			
		</view>
		<view class="pl-2">
			<view class="font-sm" style="font-size: 25rpx;color: #4e4d48;">
				动态 {{msg.news}} 今日 {{msg.news_today}}
			</view>
			<view class="pb-2" style="color: #8c8c8c;">
				话题描述
			</view>
		</view>
	</view>
</template>

<script>
	export default
	{
		props:{
			msg:Object
		}
	}
</script>

<style>
</style>
