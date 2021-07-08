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
		<template v-if="searchList.length > 0 && type == 'post' ">
			<commonList :userList = "searchList"></commonList>
		</template>
		<template v-if="type == 'user' ">
			<block v-for="(item,index) in  searchList">
				<view class=""  @click.stop = "clickCpn(item.id)">
					<cpn-cpn :item1="item" type = "search"></cpn-cpn>
				</view>
				
			</block>
		</template>
		<template v-if="type == 'topic' ">
			<block v-for="(item,index) in  searchList">
				<topics class="pl-2" :item="item"></topics>
			</block>
		</template>
		<loadMore :load ="loadMore" v-if='searchList.length > 0'></loadMore>
		<nothing v-if="searchList.length == 0 && haveSearched"></nothing>
	</view>
</template>

<script>
	import cpnCpn from "@/components/msg/cpn-user-list-cpn.vue"
	import topics from "../../components/common/topics.vue"
	import commonList from '../../components/common/common.vue'
	export default {
		onUnload()
		{
			if(this.type == "post")
			uni.$off('changeSupportOrFollow',((e)=>{}))
		}
		,
		mounted(){
			if(this.type == "post")
			{
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
			}
		},
		
		onLoad(e) {
			this.type = e.type
			let pageTitle = ''
			let list = uni.getStorageSync('history')
			if(list)
			{
				this.historyList = JSON.parse(list)
			}
			if(this.type == 'post') pageTitle = '帖子'
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
				haveSearched:false,
				inputVal:"",
				searchList:[],
				page:1,
				loadMore:'上拉加载更多',
				preSearch:'',
				historyList:[],
				nothing:false
			}
		},
		onReachBottom()			
		{
			if(this.loadMore == '没有更多了') return
			this.loadMore = '加载中...'
			this.search()
		},
		onNavigationBarSearchInputChanged(e)
		{
		    this.inputVal = e.text
		},
		onNavigationBarButtonTap(e) {
		    //收起键盘
				//请求搜索
			uni.hideKeyboard()	//隐藏软键盘
			uni.showLoading({
				title:"加载中",
				mask:false    
			})
			this.search()
				
				
			
			
			
			
		   
		}
		,
		methods:{
			follow(user_id) {
				this.searchList.forEach((v)=>{
					if(v.user_id === user_id)
					{
						v.follow = true
					}
				})
				uni.showToast({
					title:"关注成功"
				})
			},
			 search () {
				let isRefresh = this.inputVal == this.preSearch ? true : false
				this.haveSearched = true
				if(!isRefresh) this.page = 1
				let type = this.type
				this.$http.post(`/search/${type}`,{
					keyword:this.inputVal,
					page:this.page
				}).then(res=>{
					if(res.list.length < 1) this.nothing = true
					else this.nothing = false
					let list = []
					if(this.type == 'post')
					 list = res.list.map(v=>{
						return this.$U.helper(v)
					})
					else if(this.type == 'topic')
					{
						list = res.list.map(v=>{
							return {
								 topicName:v.title,
								 topicDesc:v.desc,
								 news:v.post_count,
								 news_today:v.todaypost_count,
								 title_pic:v.titlepic,
								 id:v.id
							}
						})
					}
					else
					{
						list = res.list.map(v=>{
							return {
									id:v.id,
									avatar:v.userpic,
									sex:v.userinfo.sex,
									username:v.username,
									age:v.userinfo.age ? v.userinfo.age : 0 ,
									isFollow:false
									}
						})
					}
					
					if(!isRefresh) 
					{
						this.historyList = this.historyList.filter(v=> {
							return v !=this.inputVal
						})
						this.historyList.unshift(this.inputVal)
						this.searchList = list
						uni.setStorageSync('history',JSON.stringify(this.historyList))
					}
					else this.searchList = [...this.searchList,...list]
					this.page ++
					this.preSearch = this.inputVal
					if(list.length < 10) this.loadMore = '没有更多了'
					uni.hideLoading()
				}).catch(err=>{
					console.log(err.message)
					this.page--;
					uni.hideLoading()
				})
				
			},
			clickHis(item) {
				uni.hideKeyboard()	//隐藏软键盘
				uni.showLoading({
				    title:"加载中",
				    mask:false    
				})
				
				    uni.hideLoading()
				    //	拿到数据之后隐藏
				this.inputVal = item
				this.search()                                   
			},
			clickCpn(id)
			{
				
				uni.navigateTo({
					url:'../zone/zone?uid=' + id
				})
			}
			
		},
		
	}
</script>

<style>
</style>
