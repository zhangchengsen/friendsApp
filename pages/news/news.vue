<template>
	<view class="mt-3">
		<nav-bar>
			<view class="flex justify-center align-center w-100">
				<block v-for="(item,index) in tabList">
					<view class="mx-2" @click="clickTab(index)" :class="currentTab == index ? 'font-lg pink' : 'font-md'" >
						{{item}}
					</view>
				</block>
			</view>
			<text  @click="public" slot = "right" class="iconfont icon-fatie_icon"></text>
		</nav-bar>
		<!-- 轮播部分 -->
		<template>
			<swiper :current = "currentTab" @change = "swiperChange" :style=" 'height:' +scrollH +'px'  ">
					<swiper-item>
					<scroll-view  @scrolltolower="toLoadMore(0)" scroll-y="true" :style=" 'height:' +scrollH +'px'" >
							<template v-if="newsList[0].list.length > 0">
								<common-list :userList="newsList[0].list" @admire="admire" ></common-list>
								<loadMore :load = "newsList[0].loadMore"></loadMore>
							</template>
							<template v-else>
								<nothing></nothing>
								<view class="text-center">是没关注别人还是关注的人没有发动态呢。。。</view>
							</template>
					</scroll-view>
						
					</swiper-item>
						<scroll-view   scroll-y="true" :style=" 'height:' +scrollH +'px'  " >
						</scroll-view>
					<swiper-item>
						<!-- 话题分页 -->
						<scroll-view  @scrolltolower="toLoadMore(0)" scroll-y="true" :style=" 'height:' +scrollH +'px'" >
						<cates :topics="topics"></cates>
							<!-- 搜索框 -->
						<view class="p-2" style="">
							<view @click="toSearch" class="flex align-center justify-center rounded" style="background-color: #f5f4f2;height: 85rpx;">
								<text  class="iconfont icon-sousuo" style="color: #62615c;"></text>
								<text class="ml-2" style="color: #62615c;">搜索话题</text>
							</view>
						</view>
							<!-- 轮播图 -->
							<swiper style="text-align: center;height: 300rpx;margin-bottom: 20rpx;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<block v-for="(item,index) in banner" :key = "index">
								<swiper-item style="height: 300rpx;">
									<image :src='item.src' class="rounded" style="height: 300rpx;width: 715rpx;"></image>
								</swiper-item>
							</block>
							</swiper>
							<!-- 分割线 -->
							<divider></divider>
							<!-- 话题列表 -->
							<view class="p-2">
								<view class="my-1 font-lg">
									最近更新
								</view>
								<view class="">
									<!-- 话题区域 -->
									<block v-for="(item,index) in topicList" :key = "index">
										<topics :item="item"></topics>
									</block>
								</view>
							</view>
							</scroll-view>
					</swiper-item>
					
			</swiper>
		</template>
		
		
	</view>
</template>

<script>
	import navBar from "../../static/uni-components/uni-nav-bar/uni-nav-bar.vue"
	import commonList from '../../components/common/common.vue'
	import cates from '../../components/common/cate.vue'
	import topics from "../../components/common/topics.vue"
	export default {
		data() {
			return {
				tabList:['动态',"话题"],
				currentTab:0,
				scrollH:600,
				newsList:[],
				topics:['关注','推荐','体育','热点','财经','娱乐'],
				banner:[],
				topicList:[]
			}
		},
		onLoad() {
			let obj = {
				firstLoad:false,
				page:1,
				list:[],
				loadMore:'下拉加载更多'
			}
			
			this.newsList.push(obj);
			this.getList()
			this.getTopicList()
		},
		components:{
			navBar,
			cates,
			commonList,
			topics
		},
		onShow()
		{
			let data = uni.getStorageSync('followed')
			if(data)
			{
				this.getList()
				uni.removeStorage({
					key:'followed'
				})
			}
		}
		,
		mounted() {
			let res = uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - res.statusBarHeight -44 
				}
			})
			
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
			uni.$on('addRemark',(e)=>{
				this.newsList[0].list.forEach(item=>{
					if(item.id == e.id)
					{
							item.remark_num += 1
							return
					}
				})
			})
			
		},
		onUnload()
		{
			uni.$off('changeSupportOrFollow')
			uni.$off('addRemark')
		}
		,
		methods:{
			// 跳转到搜索
			toSearch() {
				uni.navigateTo({
					url:'../search/search?type=topic'
				})
			},
			//获取topicsList的数据
			getTopicList() {
				this.$http.get('/topicclass').then(res=>{
					this.topics = res.list
				}).catch(err=>{console.log(err.message)})
				this.$http.get('/hottopic').then(res=>{
					let list = res.list.map(v=>{
						return {
							topicName:v.title,
							topicDesc:v.desc,
							news:v.post_count,
							news_today:v.todaypost_count,
							title_pic:v.titlepic,
							id:v.id
						}
					})
					this.topicList = list;
				}).catch(err=>{console.log(err.message)})
				this.$http.get('/adsense/0').then(res=>{
					this.banner = res.list
				}).catch(err=>{console.log(err.message)})
			},

			 getList() {
				
				let index = 0
				let page = this.newsList[index].page
				let isRefresh = page == 1 
				this.$http.get('/followpost/'+ page,{},{
					token:true,
					notoast:true
				}).then(msg=>{
					let list = msg.list.map(v=>{
						return this.$U.helper(v)
					})
					this.newsList[index].list = isRefresh? list : [...this.newsList[index].list,...list],
					this.newsList[index].firstLoad = true 
					this.newsList[index].loadMore = list.length < 10 ? '没有更多了' : '上拉加载更多'
				}).catch(err=>{
					page--
					console.log(err.message)
				})
				
				 
			},
			// 改变tab栏
			clickTab(index) {
				this.currentTab = index
			},
			// 轮播图改变
			swiperChange(e) {
				this.currentTab = e.detail.current
			// 点赞
			},
			admire(e)
			{
				let support = this.newsList[0].list[e.index].support		//指针
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
				this.newsList.forEach(item=>{
					item.list.forEach((v)=>{
						if(v.user_id === user_id)
						{
							v.follow = true
						}
					})
				})
				uni.showToast({
					title:"关注成功"
				})
			},
			toLoadMore(index) {
				let item = this.newsList[index]
				if(item.loadMore == "没有更多了") return
				item.loadMore = '加载中...'
				item.page ++
				this.getList()
			},
			public() {
				uni.navigateTo({
					url:'../public/public'
				})
			}
		}
	}
</script>

<style>
	.pink {
		color: #fd728f;
	}
</style>
