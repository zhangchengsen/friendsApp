<template>
	<view class="">
		<user class="p-2" :dataList="dataList" ></user>
		<list></list>
	</view>
</template>

<script>
	import user from '@/components/person/user.vue'
	import list from '@/components/person/list.vue'
	export default {
		onNavigationBarButtonTap() {
			console.log(1)
			uni.navigateTo({
				url:'../user-set/user-set'
			})
		},
		components:{
			user,
			list
		},
		data() {
			return {
				dataList:[]
			}
		},
		onLoad() {
			this.getDataList()
		},
		methods:{
			getDataList() {
				let data = [
					{
						name:'帖子',
						nums:1
					},
					{
						name:'动态',
						nums:2
					},
					{
						name:'评测',
						nums:6
					},
					{
						name:'粉丝',
						nums:0
					}
				]
				this.dataList = data
			}
		}
	}
</script>

<style>
</style>
