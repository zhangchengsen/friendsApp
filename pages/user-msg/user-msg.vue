<template>
	<view class="m-3">
		<!-- 导航头部 -->
		<uni-nav-bar style="height: 100rpx;" class="">
			<text slot="left" class="iconfont icon-fanhui text-center "  @click="navBack"></text>
			<view class="w-100 flex align-center justify-center">
				消息
			</view>
			<text slot = "right" class="iconfont icon-geren"></text>
		</uni-nav-bar>
		<!-- scroll消息内容 -->
		<scroll-view scroll-y="true"   class="mt-1" style="position: absolute;top: 100rpx;left: 0;right: 0;bottom: 100rpx;" scroll-with-animation="true" :scroll-into-view="scrollInto">
			<block v-for="(item,index) in chatList" :key="index">
				<!-- 消息组件 -->
				<view :id = '"tab" + index'>
					
					<cpn-msg-chat  :item = "item" :preTime = " index ? chatList[index - 1].create_time: 0  " ></cpn-msg-chat>		
				</view>
			</block>
			
			
		</scroll-view>
		<!-- 底部发送消息 -->
		<bottom-input @send = "send"></bottom-input>
	</view>
</template>

<script>
	import bottomInput from '@/components/msg/bottom_input.vue'
	import cpnMsgChat from '@/components/msg/cpn-msg-chat.vue'
	import uniNavBar from '@/static/uni-components/uni-nav-bar/uni-nav-bar.vue'
	export default{
		components:{
			uniNavBar,
			cpnMsgChat,
			bottomInput
		},
		onLoad(e)
		{
			console.log(e)
			if(!e.user){
				uni.navigateBack({
					delta:1
				});
				return uni.showToast({
					title:'聊天对象不存在',
					icon:'none'
				})
			}
			let ToUser = JSON.parse(e.user)
			//  创建聊天对象
			this.$store.commit('createToUser',ToUser)
			// 获取当前用户的聊天记录
			this.$store.dispatch('getChatDetailToUser').then(list=>{
				console.log(list)
				this.chatList = list
			})
			uni.$on('UserChat',(res)=>{
				console.log('user-msg对话页 接受到聊天信息',res)
				if(res.from_id == ToUser.user_id){
					this.renderPage({
						data:res,
						send:false
					})
				}
			})
			uni.getSystemInfo({
				success:(res)=>{
					this.scrollH = res.windowHeight - uni.upx2px(160) - 44
					console.log(this.scrollH)
				}
			})
			this.getData()
			this.toButtom()
		},
		mounted() {
			this.toButtom()
		},
		beforeDestroy(){
			this.$store.commit('closeToUser')
			uni.$off('UserChat',()=>{})
		}
		,
		data() {
			return {
				inputVal:'',
				chatList:[],
				scrollInto:""
			}
		},
		methods:{
			// 渲染
			renderPage(e) {
				this.$store.dispatch('formatChatDetailObject',e).then(msg=>{
					this.chatList.push(msg)
					this.toButtom()
				}).catch(err=>{
					console.log('user-msg $on',err.message)
				})
			},
			// 滚动
			toButtom() {
				setTimeout(()=>{
					if(this.chatList.length < 1) return
					this.scrollInto = 'tab' + (this.chatList.length - 1)
				},600)
				
			},
			// 发送信息
			async send(e) {
				this.inputVal = e.inputVal
				if(this.inputVal.trim() == '') return 
				let result = await this.$store.dispatch('sendChatMessage',{
					data:this.inputVal,
					type:'text'
				}) 
				this.$http.post('/chat/send',result,{
					token:true
				}).then(res=>{
					this.renderPage({
						data:result,
						send:true
					})
				})
				// this.chatList.push(obj)
				this.inputVal = ''
				// this.toButtom()
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
