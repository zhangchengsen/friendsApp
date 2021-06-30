<template>
<!-- 关联导航 -->
    <view>
		<!-- loadMore -->
		<cpn-user-list :dataList = "dataList" @index = "getIndex"   ></cpn-user-list>
    </view>

</template>


<script>
	import cpnUserList from '@/components/msg/cpn-user-list.vue'
	export default{
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			});
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:"../search/search?" + 'type=user'
			})
		},
		data() {
			return {
				dataList:[]
			}
		},
		components:{
			cpnUserList
		},
		onLoad() {
			this.getDataList()
		},
		onReachBottom() {
		}
		,
		methods:{
			getIndex(e) {
				console.log(e)
			},
			toLoadMore(e) {
				console.log(e)
			},
			getDataList() {
				for (var i = 0 ; i < 3 ; i++)
				{
					let data = [
						
						{
							avatar:"/static/images/4.jpg",
							sex:1,
							username:'ymtx',
							age:18,
							isFollow:true
						},
						{
							avatar:"/static/images/4.jpg",
							sex:0,
							username:'ymtx',
							age:18,
							isFollow:false
						},
						{
							avatar:"/static/images/2.jpg",
							sex:1,
							username:'强力小猪',
							age:18,
							isFollow:true
						},
						{
							avatar:"/static/images/4.jpg",
							sex:1,
							username:'heiheih',
							age:18,
							isFollow:true
						},
						{
							avatar:"/static/images/demo4.jpg",
							sex:1,
							username:'ymtx',
							age:18,
							isFollow:true
						},
						{
							avatar:"/static/images/7.jpg",
							sex:2,
							username:'迪特',
							age:18,
							isFollow:false
						},
						{
							avatar:"/static/images/demo6.jpg",
							sex:1,
							username:'小可爱',
							age:18,
							isFollow:false
						},
						{
							avatar:"/static/images/demo5.jpg",
							sex:2,
							username:'瓜皮人',
							age:18,
							isFollow:false
						},
						{
							avatar:"/static/images/demo5.jpg",
							sex:2,
							username:'瓜皮人',
							age:18,
							isFollow:false
						},
						{
							avatar:"/static/images/demo5.jpg",
							sex:2,
							username:'瓜皮人',
							age:18,
							isFollow:false
						},
						{
							avatar:"/static/images/demo5.jpg",
							sex:2,
							username:'瓜皮人',
							age:18,
							isFollow:false
						},
						{
							avatar:"/static/images/demo5.jpg",
							sex:2,
							username:'瓜皮人',
							age:18,
							isFollow:false
						},
						
					]
					this.dataList.push(data)
				}
				
				
			}
		}
	}
</script>

<style>
</style>
