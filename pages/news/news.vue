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
							<common-list :userList="newsList[0].list" @admire="admire" @follow = "follow"></common-list>
							<loadMore :load = "newsList[0].loadMore"></loadMore>
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
									<image :src='item' class="rounded" style="height: 300rpx;width: 715rpx;"></image>
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
				banner:['/static/images/banner3.jpg',"/static/images/banner2.jpg","/static/images/2.jpg"],
				topicList:[]
			}
		},
		onLoad() {
			this.getData()
			this.getTopicList()
		},
		components:{
			navBar,
			cates,
			commonList,
			topics
		},
		mounted() {
			let res = uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - res.statusBarHeight -44 
				}
			})
			
		},
		methods:{
			// 跳转到搜索
			toSearch() {
				uni.navigateTo({
					url:'../search/search?type=topic'
				})
			},
			//获取topicsList的数据
			getTopicList() {
				let arr = []
				for(var i = 0 ; i < 10 ; i++)
				{
					let obj = {
						topicName:"#话题名称哈哈哈哈",
						topicDesc:"话题描述",
						news:42,
						news_today:0
					}
					if(i == 3 || i ==4)
					{
						obj.topicDesc = "??????????"
						obj.news = 23
						obj.news_today = 4
					}
					arr.push(obj);
				}
				 this.topicList = arr;
			},
			// 获取假数据
			getData() {
				let arr = []
				for(var i = 0 ; i < 2 ; i ++)
				{
					let obj = {
						loadMore:"加载更多",
						list:[
							{
								follow:true,
								username:'云梦他乡',
								time:"2020-6-23 晚上 8.29",
								user_pic:"/static/images/2.jpg",
								title:"很随意的标题",
								title_pic:"/static/images/5.jpg",
								support:{
									type:"support",
									support:2,
									unSupport:1
								},
								remark_num:2,
								share_num:2
							},
							{
								follow:true,
								username:'hahaha',
								time:"2020-6-23 晚上 8.39",
								user_pic:"/static/images/3.jpg",
								title:"标题",
								title_pic:"/static/images/10.jpg",
								support:{
									type:"unSupport",
									support:2,
									unSupport:10
								},
								remark_num:2,
								share_num:1
							},
								{
									follow:true,
								username:'我是你蝶',
								time:"2020-6-24 下午 7.39",
								user_pic:"/static/images/4.jpg",
								title:"年轻的生命中骤然出现意思阴霾",
								title_pic:"/static/images/11.jpg",
								support:{
									type:"",
									support:15,
									unSupport:1
								},
								remark_num:5,
								share_num:7
							},
						]
					}
				
					arr.push(obj)
				}
				this.newsList = arr;
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
				let support = this.newsList[this.currentTab].list[e.index].support		//指针
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
				let obj = this.newsList[this.currentTab].list[e.index]		//指针
				obj.follow = true
				uni.showToast({
					title:"关注成功"
				})
			},
			toLoadMore(index) {
				let item = this.newsList[index]
				if(item.loadMore == "没有更多了") return
				item.loadMore = '加载中...'
				setTimeout(()=>{
					item.list = [...item.list,...item.list]
					item.loadMore = "下拉加载更多"
				},1500)
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
