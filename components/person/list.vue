<template>
	<view class="">
		<uni-list-item title="浏览历史" showExtraIcon :showArrow="true">
			 <text slot="icon" class="iconfont icon-liulan"></text>
		 </uni-list-item>
		<uni-list-item title="社区认证" showExtraIcon :showArrow="true">
					 <text slot="icon" class="iconfont icon-huiyuanvip"></text>
		</uni-list-item>
		<uni-list-item title="审核帖子" showExtraIcon :showArrow="true">
					 <text slot="icon" class="iconfont icon-icon_im_keyboard"></text>
		</uni-list-item>
		<uni-list-item title="登录"  :showArrow="true" clickable @click="login">
					 <text slot="icon" class="iconfont icon-icon_im_keyboard"></text>
		</uni-list-item>
	</view>
</template>

<script>
	export default{
		methods:{
			login() {
				uni.navigateTo({
					url:'../../pages/login/login'
				})
			}
		}
	}
</script>

<style>
</style>
