<template>
	<view class="">
		<block v-for ="(item,index) in msgList" :key = "index">
			<msg-list :item="item"></msg-list>
		</block>
		<uni-popup ref="popup"  type="top">
			<view class="p-2 flex align-center justify-center" style="background-color: rgba(255,255,255,.93);">
					<text class="iconfont icon-sousuo"></text>
					<text class = "font-md ml-2">添加好友</text>
			</view>
			<view class="p-2 flex align-center justify-center" style="background-color: rgba(255,255,255,.93);">
					<text class="iconfont icon-shanchu "></text>
					<text  class = "font-md ml-2">清除列表</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import msgList from '../../components/common/msgList.vue'
	export default{
		data() {
			return {
				msgList:[]
			}
		},
		components:{
			msgList
		}
		,
		// 监听下拉刷新事件
		onPullDownRefresh() {
			this.refresh();
		}
		,
		onLoad() {
			this.getMesList()
		},
		// 监听原生按钮被点击事件
		onNavigationBarButtonTap(e) {
			if(!e.index) 
			{
				this.navTo()
				this.$refs.popup.close() //左
			}
			else{					//右
				this.$refs.popup.open('top')
			}
		}
		,
		methods:{
			navTo() {
				uni.navigateTo({
					url:"../user-list/user-list"
				})
				console.log(1)
			},
			refresh() {
				setTimeout(() => {
					this.getMesList()
					uni.stopPullDownRefresh()
				},1200) 	
				
			},
			getMesList() {
				let data = [
					{
						username:'小居居',
						update_time:Date.now(),
						data:'好滴哈哈哈gggggggggggg哈',
						avatar:"/static/images/demo5.jpg",
						noread:20
					},
					{
						username:'大褂皮',
						update_time:Date.now(),
						data:'好滴',
						avatar:"/static/images/demo6.jpg",
						noread:20
						
					},
					{
						username:'哈哈哈哈',
						update_time:1574718427,
						data:'odj',
						avatar:"/static/images/5.jpg",
						noread:20
					},
					{
						username:'aaaaa',
						update_time:1574748427,
						data:'hello',
						avatar:"/static/images/2.jpg",
						noread:20
					},
				]
				this.msgList = data
			}
		},
		
	} 
</script>

<style>
</style>
