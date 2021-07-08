<template>
	<view class="">
		<template v-if="list.length > 0">
			<block v-for ="(item,index) in list" :key = "index">
				<msg-list :item="item"></msg-list>
			</block>
		</template>
		<template v-else>
			<nothing></nothing>
			<view class="text-center mt-2">
				点击他人头像 点击右上角 就能开启和他人的聊天啦
			</view>
			<view class="text-center mt-2">
				同时在线 更可开启实时聊天
			</view>
		</template>
		<!-- <uni-popup ref="popup"  type="top">
			<view class="p-2 flex align-center justify-center" style="background-color: rgba(255,255,255,.93);">
					<text class="iconfont icon-sousuo"></text>
					<text class = "font-md ml-2">添加好友</text>
			</view>
			<view class="p-2 flex align-center justify-center" style="background-color: rgba(255,255,255,.93);">
					<text class="iconfont icon-shanchu "></text>
					<text  class = "font-md ml-2" @click="clear">清除列表</text>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	// {
	// 	username:'哈哈哈哈',
	// 	update_time:1574718427,
	// 	data:'odj',
	// 	avatar:"/static/images/5.jpg",
	// 	noread:20
	// }
	import {mapState} from 'vuex'
	import msgList from '../../components/common/msgList.vue'
	export default{
		data() {
			return {
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
			
		}
		,
		methods:{
			navTo() {
				uni.navigateTo({
					url:"../user-list/user-list",
					
				})
			},
			refresh() {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				},1200) 	
				
			},
			
		},
		computed:{
			...mapState({
				list:state=>state.chatList
			})
		}
	} 
</script>

<style>
</style>
