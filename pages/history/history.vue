<template>
	<view class="">
		<common :type="type" v-if="dataList.length > 0" :userList="dataList"></common>
	</view>
</template>

<script>
	import common from '../../components/common/common.vue'
	export default {
		data() {
			return {
				dataList:[],
				type:'his'
			}
		},
		methods:{
			
		},
		onLoad() {
			let history = uni.getStorageSync('browser')
			
			if(history) this.dataList = JSON.parse(history)
			 
		},
		onNavigationBarButtonTap()
		{
			uni.showModal({
				content:'要清除最近浏览吗?',
				confirmText:'确定',
				cancelText:'取消',
				success: (res) => {
					if(res.confirm)
					{
						uni.removeStorageSync('browser')
						uni.showToast({
							title:'清除成功'
						})
						uni.navigateBack({
							delta:1
						})
					}
				}
			})
		}
	}
</script>

<style>
</style>
