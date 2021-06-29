<template>
	<view>
		<!-- 导航头部 -->
		<uni-nav-bar style="height: 100rpx;">
			<text slot="left" class="iconfont icon-fanhui text-center ml-2"  @click="navBack"></text>
			<view class="w-100 flex align-center justify-center">
				消息
			</view>
			<text slot = "right" class="iconfont icon-geren"></text>
		</uni-nav-bar>
		<!-- scroll消息内容 -->
		<scroll-view scroll-y="true"  class="" style="position: absolute;top: 100rpx;left: 0;right: 0;bottom: 100rpx;" scroll-with-animation="true" :scroll-into-view="scrollInto">
			<block v-for="(item,index) in chatList" :key="index">
				<view :id = '"tab" + index'>
					
					<cpn-msg-chat  :item = "item" :preTime = " index ? chatList[index - 1].create_time: 0  " ></cpn-msg-chat>		
				</view>
			</block>
			
			
		</scroll-view>
		<!-- 底部发送消息 -->
		<view class="fixed-bottom flex border-top">
			<view class=" w-100 m-2 flex align-center justify-center" >
				<input type="text" v-model = "inputVal" placeholder="写点什么给你的朋友吧" style="background-color: #F7F7F7;" class="w-100 p-1 rounded"  value="" />
			</view>
			<view @click="send" class="animated iconfont icon-fabu flex align-center justify-center font-md mr-2" hover-class="pulse">
				
			</view>
		</view>
	</view>
</template>

<script>
	import cpnMsgChat from '@/components/msg/cpn-msg-chat.vue'
	import uniNavBar from '@/static/uni-components/uni-nav-bar/uni-nav-bar.vue'
	export default{
		components:{
			uniNavBar,
			cpnMsgChat
		},
		onLoad(e)
		{
			console.log(e)
			uni.getSystemInfo({
				success:(res)=>{
					this.scrollH = res.windowHeight - uni.upx2px(160) - 44
					console.log(this.scrollH)
				}
			})
			this.getData()
			this.toButtom()
		},
		data() {
			return {
				inputVal:'',
				chatList:[],
				scrollInto:""
			}
		},
		methods:{
			// 滚动
			toButtom() {
				if(this.chatList.length < 1) return 
				
				this.scrollInto = 'tab' + (this.chatList.length - 1)
				console.log(this.scrollInto)
			},
			// 发送信息
			send() {
				if(this.inputVal.trim() == '') return 
				let obj = {
					user_id:1,
					avatar:'../../static/images/2.jpg',
					username:'IT黑马',
					type:'text',
					data:this.inputVal,
					create_time: Date.now()
				}
				this.chatList.push(obj)
				this.inputVal = ''
				this.toButtom()
			}
			,
			// 返回
			navBack() {
				uni.navigateBack({
					delta:1
				})
			},
			getData() {
				let arr = []
				for(var i = 0 ; i < 2 ; i ++)
				{
					let obj = {
						avatar:"../../static/images/20210508440280_qMJDnX.jpg",
						username:"ymtx",
						data:"hello",
						type:"text",
						create_time:15070783530,
						user_id:0
					}
					arr.push(obj)
				}
				for(var i = 0 ; i < 3 ; i ++)
				{
					let obj = {
						avatar:"../../static/images/2.jpg",
						username:"IT黑马",
						data:"收到等我一下下下下下",
						type:"text",
						create_time:15070783530,
						user_id:1
					}
					if(i == 2) 
					{
						obj.create_time = 15090783530
						obj.data = '啊哈哈哈哈哈 久等了'
					}
					arr.push(obj)
					
				}
				this.chatList = arr
			}
		}
	}
</script>

<style>
</style>
