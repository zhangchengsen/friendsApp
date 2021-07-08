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
				
				<cpn-msg-chat @tof="tof"  :item = "item"  :preTime = " index ? remarkList[index - 1].create_time: 0  "></cpn-msg-chat>		
				<!--  -->
		</block>
		
		</template>
		<bottom-input @toBlur ="toBlur" :focus="focus" @send = "send"></bottom-input>
		<cpn-detail-share  ref = "share"></cpn-detail-share>
	</view>
</template>

<script>
	import cpnMsgChat from '@/components/msg/cpn-msg-chat.vue'
	import bottomInput from '@/components/msg/bottom_input.vue'
	import commonList from '@/components/common/common.vue'
	import cpnDetailShare from '@/components/common/cpn-detail-share.vue'
	import $T from '@/components/common/time.js'
	export default{
		onLoad(e) {
			this.passageData = JSON.parse(e.data)
			this.getDetail()
			this.getComment()
			this.setTtitle()
			uni.$on('changeSupportOrFollow',(e)=>{
				switch (e.type) {
					case 'follow':
						this.follow(e.data.user_id)
						break
					default:
						this.admire(e.data)
						break;
				}
			})
			
		},
		onUnload()
		{
			uni.$off('changeSupportOrFollow',((e)=>{}))
		}
		,
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
				content:'',
				focus:false,
				replyId:0
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
			toBlur(){
				this.focus = false
			},
			tof(e){
				this.focus = true
				this.replyId = e
			},
			// 整理格式
			__ArrSort(arr,id = 0){
				var temp = [],lev=0;
				var forFn = function(arr, id,lev){
					for (var i = 0; i < arr.length; i++) {
						var item = arr[i];
						if (item.fid==id) {
							item.lev=lev;
							temp.push({
								id:item.id,
								fid:item.fid,
								userid:item.user.id,
								userpic:item.user.userpic,
								username:item.user.username,
								time:$T.gettime(item.create_time),
								data:item.data,
								type:'remark'
							});
							forFn(arr,item.id,lev+1);
						}
					}
				};
				forFn(arr, id,lev);
				return temp;
			},
			async getDetail() {
				let res = await this.$http.get('/post/' + this.passageData.id )
				this.imageList = res.detail.images
				this.content = res.detail.content
			},
			async getComment() {
				this.$http.get('/post/' + this.passageData.id +'/comment' ).then(res=>{
					this.remarkList = this.__ArrSort(res.list)
				}).catch(err=>console.log(err.message))
				
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
				this.checkAuth(()=>{
					this.inputVal = e.inputVal
					this.$http.post('/post/comment',{
						fid:this.replyId,
						data:this.inputVal,
						post_id:this.passageData.id
					},{token:true}).then(res=>{
						uni.showToast({
							title:'评论成功'
						})
						this.getComment()
						this.inputVal = ''
						uni.$emit('addRemark',{id:this.passageData.id})
					}).catch(err=>{
						console.log(err)
					})
				})
				
				
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
			follow(user_id) {
				this.passageData.follow = true
				uni.showToast({
					title:"关注成功"
				})
			},
		}
	}
</script>

<style>
</style>
