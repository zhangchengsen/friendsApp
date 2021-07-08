<template>
	<view class="text-center mt-4">
		<view class="p-3">
			您的使用就是对我们最大的支持
		</view>
		<view class="animated iconfont icon-dianzan" hover-class="rubberBand" style="font-size: 100rpx;" :style="clicked ? 'color:#fd597c;' : 'color:#333;' " @click="clicked = true">
			
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				clicked:false
			}
		}
	}
</script>

<style>
</style>
