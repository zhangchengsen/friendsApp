<template>
	<view>
		<template v-if = "!searchList.length && !demoU.length && !demoT.length ">
			
			<view class="p-2 font-md" >
				搜索历史
			</view>
			<block v-for="(item,index) in historyList" :key = "index">
				
					<view class="border d-inline-block mt-1 ml-2 p-1 font-sm " style="border-radius: 8rpx;" @click="clickHis(item)">
						{{item}}
					</view>
				
				
				
				
			</block>
			
			
		</template>
		<template v-if="searchList.length > 0 && type == 'tieZi' ">
			<commonList :userList = "searchList"></commonList>
		</template>
		<template v-if="type == 'user' ">
			<block v-for="(item,index) in  demoU">
				<cpn-cpn :item1="item"></cpn-cpn>
			</block>
		</template>
		<template v-if="type == 'topic' ">
			<block v-for="(item,index) in  demoT">
				<topics :item="item"></topics>
			</block>
		</template>
	</view>
</template>

<script>
	import cpnCpn from "@/components/msg/cpn-user-list-cpn.vue"
	import topics from "../../components/common/topics.vue"
	import commonList from '../../components/common/common.vue'
	export default {
		
				
		onLoad(e) {
			this.type = e.type
			let pageTitle = ''
			if(this.type == 'tieZi') pageTitle = '帖子'
			else if(this.type == 'topic') pageTitle = "话题"
			else pageTitle = "用户"
			// #ifdef APP-PLUS
				const currentWebview = this.$mp.page.$getAppWebview()
				let tn = currentWebview.getStyle().titleNView
				tn.searchInput.placeholder = '搜索' + pageTitle 
				currentWebview.setStyle({
					titleNView:tn
				})
			// #endif
			
		},
		components:{
			commonList,
			cpnCpn,
			topics
		},
		data() {
			return{
				demoU:[],
				demoT:[],
				type:'',
				historyList:['友类app','我是IT黑马',"加油加油加油加油","好耶","静止好耶","我太懒了","内卷内卷内卷内卷内卷内卷"],
				inputVal:"",
				searchList:[]
			}
		},
		onNavigationBarSearchInputChanged(e)
		{
		    this.inputVal = e.text
		},
		onNavigationBarButtonTap(e) {
		    //收起键盘
			if(this.type == 'tieZi')
			{
				//请求搜索
				uni.hideKeyboard()	//隐藏软键盘
				uni.showLoading({
				    title:"加载中",
				    mask:false    
				})
				setTimeout(() =>{
				    this.searchList = [
							{
								follow:false,
								username:'abcd',
								time:"2020-6-23 晚上 8.29",
								user_pic:"/static/images/10.jpg",
								title:"很随意的标题",
								title_pic:"/static/images/41.jpg",
								support:{
									type:"support",
									support:2,
									unSupport:1
								},
								remark_num:2,
								share_num:2
							},
							{
								follow:false,
								username:'hahaha',
								time:"2020-6-23 晚上 8.39",
								user_pic:"/static/images/12.jpg",
								title:"标题",
								title_pic:"/static/images/10.jpg",
								support:{
									type:"unSupport",
									support:2,
									unSupport:11
								},
								remark_num:11,
								share_num:1
							},
							{
								follow:true,
								username:'我是你蝶',
								time:"2020-6-24 下午 7.39",
								user_pic:"/static/images/31.png",
								title:"年轻的生命中骤然出现意思阴霾",
								title_pic:"/static/images/2.jpg",
								support:{
									type:"",
									support:12,
									unSupport:1
								},
								remark_num:5,
								share_num:7
							},
						]
				    uni.hideLoading()
				    //	拿到数据之后隐藏
				                                    
				},1000)
			}
			else if(this.type =='user') {
				this.demoU = [
						
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
			}
			else {
				let arr = []
				for(var i = 0 ; i < 5 ; i++)
				{
					let obj = {
						topicName:"#话题名称哈哈哈哈",
						topicDesc:"话题描述",
						news:42,
						news_today:0
					}
					arr.push(obj)
				}
				this.demoT = arr
				console.log(this.demoT)
			}
			
		    
		}
		,
		methods:{
			clickHis(item) {
				uni.hideKeyboard()	//隐藏软键盘
				uni.showLoading({
				    title:"加载中",
				    mask:false    
				})
				setTimeout(() =>{
				    this.searchList = [
							{
								follow:false,
								username:'abcd',
								time:"2020-6-23 晚上 8.29",
								user_pic:"/static/images/10.jpg",
								title:"很随意的标题",
								title_pic:"/static/images/41.jpg",
								support:{
									type:"support",
									support:2,
									unSupport:1
								},
								remark_num:2,
								share_num:2
							},
							{
								follow:false,
								username:'hahaha',
								time:"2020-6-23 晚上 8.39",
								user_pic:"/static/images/12.jpg",
								title:"标题",
								title_pic:"/static/images/10.jpg",
								support:{
									type:"unSupport",
									support:2,
									unSupport:11
								},
								remark_num:11,
								share_num:1
							},
							{
								follow:true,
								username:'我是你蝶',
								time:"2020-6-24 下午 7.39",
								user_pic:"/static/images/31.png",
								title:"年轻的生命中骤然出现意思阴霾",
								title_pic:"/static/images/2.jpg",
								support:{
									type:"",
									support:12,
									unSupport:1
								},
								remark_num:5,
								share_num:7
							},
						]
				    uni.hideLoading()
				    //	拿到数据之后隐藏
				                                    
				},1000)
			}
		},
		
	}
</script>

<style>
</style>
