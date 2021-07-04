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
				<cpn-cpn :item1="item"></cpn-cpn>
			</block>
		</template>
		<template v-if="type == 'topic' ">
			<block v-for="(item,index) in  searchList">
				<topics :item="item"></topics>
			</block>
		</template>
		<loadMore :load ="loadMore" v-if='searchList.length > 0'></loadMore>
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
				
				inputVal:"",
				searchList:[],
				page:1,
				loadMore:'上拉加载更多',
				preSearch:'',
				historyList:[]
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
				
				
			// {
			// 	avatar:"/static/images/4.jpg",
			// 	sex:1,
			// 	username:'ymtx',
			// 	age:18,
			// 	isFollow:true
			// },
			
			
			
		    // topicName:"#话题名称哈哈哈哈",
		    // topicDesc:"话题描述",
		    // news:42,
		    // news_today:0
		}
		,
		methods:{
			
			async search () {
				let isRefresh = this.inputVal == this.preSearch ? true : false
				if(!isRefresh) this.page = 1
				let res =  await this.$http.post('/search/post',{
					keyword:this.inputVal,
					page:this.page
				})
				

				if(!res)
				{
					this.page--;
					uni.showToast({
						icon:'none',
						title:'请求失败'
					})
					uni.hideLoading()
				}
				let list = res.list.map(v=>{
					return this.$U.helper(v)
				})
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
				
			}
		},
		
	}
</script>

<style>
</style>
