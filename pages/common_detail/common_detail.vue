<template>
	<view class="" style="padding-bottom: 70rpx;">
		<common-list :userList="[passageData]" :type="passageData.type" @admire = "admire"  @follow ="follow" >
			<view class="">
				
				<view class=" m-2 p-2 text-left rounded" style="background-color: #EEEEEE;">
					{{content}}
				</view>
				<block v-for="(item,index) in imageList" :key = "index" >
					<image :src="item"  @click = 'preview(index)' ></image>
				</block>
			</view>
		</common-list>
		<template v-if ="remarkList.length > 0 ">
		<block v-for="(item,index) in remarkList" :key="index">
			<!-- 消息组件 -->
				
				<cpn-msg-chat  :item = "item"  :preTime = " index ? remarkList[index - 1].create_time: 0  "></cpn-msg-chat>		
				<!--  -->
		</block>
		</template>
		<bottom-input @send = "send"></bottom-input>
		<cpn-detail-share ref = "share"></cpn-detail-share>
	</view>
</template>

<script>
	import cpnMsgChat from '@/components/msg/cpn-msg-chat.vue'
	import bottomInput from '@/components/msg/bottom_input.vue'
	import commonList from '@/components/common/common.vue'
	import cpnDetailShare from '@/components/common/cpn-detail-share.vue'
	export default{
		onLoad(e) {
			this.passageData = JSON.parse(e.data)
			this.setTtitle()
			
		},
		components:{
			commonList,
			bottomInput,
			cpnMsgChat,
			cpnDetailShare
		}
		,
		data() {
			return {
				passageData:{},
				info:{},
				inputVal:"",
				remarkList:[],
				imageList:['/static/images/11.jpg','/static/images/12.jpg','/static/images/10.jpg'],
				content:'内容啊啊啊啊扩多军奥扩多军爱偶多军奥搜ID骄傲搜我加大搜我煎熬时间的awdawd;aw djawkd文件袋的骄傲我jawID节哀就打我我金无怠嘉爱爱神的箭阿斯 加速面积卅'
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index != 0) return 
			this.$refs.share.open()
			// {
			// 	title:this.passageData.title,
			// 	shareText:this.content,
			// 	href:"http://www.dishaxy.com",
			// 	image:'/static/images/easy.jpg'
			// }
		}
		,
		methods:{
			// 预览图片
			preview(index)
			{
				 uni.previewImage({
							current:index,
				            urls: this.imageList,
				           
				        });
				fail:(res)=>{
				}
			},
			// 发送评论
			send(e) {
				this.inputVal = e.inputVal
				if(this.inputVal.trim() == '') return 
				let obj = {
					user_id:0,
					avatar:'../../static/images/2.jpg',
					username:'IT黑马',
					type:'remark',
					data:this.inputVal,
					create_time: Date.now()
				}
				this.remarkList.push(obj)
				this.inputVal = ''
				// uni.getSystemInfo({
				// 	success: (res) => {
				// 		console.log(res)
				// 	}
				// })
				// uni.pageScrollTo({
				// 	scrollTop:800,
				// 	fail: (res) => {
				// 		console.log(res)
				// 	}
				// })
			},
			// 设置标题头
			setTtitle() {
				uni.setNavigationBarTitle({
				    title:this.passageData.title
				})
			},
			admire(e)
			{
				let support = this.passageData.support		//指针
				if(support.type == e.type) return 
				else if(!support.type)
				{
					if(e.type == 'support') support.support += 1
					else support.unSupport += 1
					support.type = e.type
				}
				else if(support.type == "support" && e.type == 'unSupport')
				{
					support.support -= 1
					support.unSupport += 1
					support.type = 'unSupport'
				}
				else if(support.type == "unSupport" && e.type == "support"){
					support.support += 1
					support.unSupport -= 1
					support.type = 'support'
				}
				
			},
			follow(e) {
				let obj = this.passageData		//指针
				obj.follow = true
				uni.showToast({
					title:"关注成功"
				})
			},
		}
	}
</script>

<style>
</style>
