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
				<block v-for = "(item,index) in newsList"  :key = "index">
					<swiper-item>
						<scroll-view  @scrolltolower="toLoadMore(index)" scroll-y="true" :style=" 'height:' +scrollH +'px'  " >
							<common-list :userList="item.list" @admire="admire" @follow = "follow"></common-list>
							<loadMore :load = "item.loadMore"></loadMore>
						</scroll-view>
						
					</swiper-item>
				</block>
			</swiper>
		</template>
		
		
	</view>
</template>

<script>
	import navBar from "../../static/uni-components/uni-nav-bar/uni-nav-bar.vue"
	import commonList from '../../components/common/common.vue'
	export default {
		data() {
			return {
				tabList:['动态',"话题"],
				currentTab:0,
				scrollH:600,
				newsList:[]
			}
		},
		
		components:{
			navBar,
			commonList
		},
		mounted() {
			this.getData()
			let res = uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - res.statusBarHeight -44 - uni.upx2px(30)
					console.log(this.scrollH)
				}
			})
			
		},
		methods:{
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
				console.log(this.newsList)
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
					console.log(2)
					if(e.type == 'support') support.support += 1
					else support.unSupport += 1
					support.type = e.type
				}
				else if(support.type == "support" && e.type == 'unSupport')
				{
					console.log(3)
					support.support -= 1
					support.unSupport += 1
					support.type = 'unSupport'
				}
				else if(support.type == "unSupport" && e.type == "support"){
					console.log(4)
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
