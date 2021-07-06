<template>
	<view class="flex my-2" @click="navTo">
		<view class="flex justify-center align-center">
			<image :src="item.title_pic" style="width: 150rpx; height: 140rpx;" class="rounded"></image>
		</view>
		<view class="ml-2 flex flex-column">
			<view  style="font-size: 30rpx;">
				{{item.topicName}}
			</view>

			<view style="font-size: 26rpx;color: #a7a6a1;margin-top: 10rpx;">
				{{item.topicDesc}}
			</view>
			<view style="font-size: 26rpx;color: #a7a6a1;margin-top: 10rpx;">
				动态 {{item.news}} 今日 {{item.news_today}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			type:{
				type:String,
				default:''
			}
		},
		methods:{
			// 跳转到详情
			navTo() {
				if(this.type)
				{
					uni.$emit('chooseTopic',{
						id:this.item.id,
						title:this.item.topicName
						})
					uni.navigateBack({
						delta:1
					})
				}
					
				else{
					uni.navigateTo({
						url:"../detail/detail?detail=" + JSON.stringify(this.item)
					})
				}
				
			}
		}
	}
</script>

<style>
</style>
