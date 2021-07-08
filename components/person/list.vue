<template>
	<view class="">
		<uni-list-item title="浏览历史" clickable="" showExtraIcon :showArrow="true" @click="history">
			 <text slot="icon" class="iconfont icon-liulan"></text>
		 </uni-list-item>
		<!-- <uni-list-item title="社区认证" clickable showExtraIcon :showArrow="true" >
					 <text slot="icon" class="iconfont icon-huiyuanvip"></text>
		</uni-list-item> -->
		<uni-list-item title="综合问题" @click="navTo" clickable showExtraIcon :showArrow="true" >
					 <text slot="icon" class="iconfont icon-icon_im_keyboard"></text>
		</uni-list-item>
		
	</view>
</template>

<script>
	export default{
		methods:{
			history() {
				uni.navigateTo({
					url:"../../pages/history/history"
				})
			},
			navTo() {
				uni.navigateTo({
					url:'../../pages/problems/problems'
				})
			}
		}
	}
</script>

<style>
</style>
