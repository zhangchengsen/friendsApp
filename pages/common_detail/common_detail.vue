<template>
	<view class="" style="padding-bottom: 70rpx;">
		<common-list :userList="[passageData]" :type="passageData.type" @admire = "admire"  @follow ="follow" >
			<view class="">
				
				<view class=" m-2 p-2 text-left rounded" style="background-color: #EEEEEE;">
					{{content}}
				</view>
				<block v-for="(item,index) in imageList" :key = "index" >
					<image :src="item.url"  @click = 'preview(index)' ></image>
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
			this.getDetail()
			this.getComment()
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
				imageList:[],
				content:''
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index != 0) return 
			 
			this.$refs.share.open({
				title: this.passageData.title,
				shareText: this.content,
				href:"",
				image: this.passageData.title_pic
			})
		}
		,
		methods:{
			async getDetail() {
				let res = await this.$http.get('/post/' + this.passageData.id )
				this.imageList = res.detail.images
				this.content = res.detail.content
			},
			async getComment() {
				let res = await this.$http.get('/post/' + this.passageData.id +'/comment' )
				this.remarkList = res.list.map((v) =>{
					return {
						create_time:v.create_time,
						data:v.data,
						type:'remark',
						uid:v.user_id,	//用户id
						avatar:v.user.userpic,
						username:v.user.username
					}
				})
			}
			,
			
			// 预览图片
			preview(index)
			{
				let list = this.imageList.map(v=>v.url)
				 uni.previewImage({
							current:index,
				            urls: list,
				           
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
