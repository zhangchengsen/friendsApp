<template>
	<view class="mt-3">
		<nav-bar>
			<text slot="left" class="iconfont icon-fanhui flex justify-center align-center font-md" @click="goBack"></text>
			<view class="w-100 flex align-center justify-center">
				话题分类
			</view>
		</nav-bar>
		<!-- 关联导航 -->
		<scroll-view scroll-x class="scroll-row" scroll-with-animation="true" :scroll-into-view="scrollInto" style="height: 100rpx;">
			<view v-for="(item,index) in tabList" :key = "index"  class="scroll-row-item px-2 py-2 font-md" :id = '"tab" + index' style="line-height: 60rpx;" @click="changeTab(index)"  :class = "curIndex == index ? 'font-weight-bold font-lg active' : '' " :style =" curIndex == index ? 'color:pink;': '' ">
				{{item.classname}}
			</view>
		</scroll-view>
		<!-- 移动轮播 -->
		<swiper :current = "curIndex" @change = "swiperChange" :style=" 'height:' +swiperH +'px'  ">
			<block v-for = "(item,index) in tabList" :key = "index">
				<swiper-item>
						<scroll-view scroll-y="true"  :style=" 'height:' + swiperH +'px' " >
							<template v-if="topicList[curIndex].list.length > 0">
								<block v-for="(item1,index1) in topicList[index].list" :key = "index1">
									<topics :item= "item1"></topics>
								</block>
								<loadMore :load = "topicList[curIndex].loadMore" ></loadMore>
							</template>
							<template v-else>
								<nothing></nothing>
							</template>
							
						</scroll-view>
					
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	import topics from '../../components/common/topics.vue'
	import navBar from "../../static/uni-components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		components:{
			navBar,
			topics
		},
		methods:{
			 getClass()
			{
				this.$http.get('/topicclass').then(res=>{
					this.tabList = res.list
					
					let arr = []
					for(var i = 0 ; i < this.tabList.length ; i++)
					{
						let obj = {
							loadMore:'上拉加载更多',
							list:[],
							page:1,
							firstLoad:false
						}
						arr.push(obj)
					}
					this.topicList = arr
					this.getData()
				}).catch(err=>console.log(err.message))
				
			},
			 getData() {
				let index = this.curIndex
				let id = this.tabList[index].id
				let page = this.topicList[index].page
				let isRefresh = page == 1 
				// 请求数据
				if(this.topicList[index].firstLoad) return 
				 this.$http.get('/topicclass/'+ id +'/topic/'+ page ).then(res=>{
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
					if(isRefresh)
						this.topicList[index].list = list
					else 
						this.topicList[index].list = [...this.topicList[index].list,...list]
						console.log(this.topicList[index].list)
					if(list.length < 10) this.topicList[index].loadMore = '没有更多了'
					else this.topicList[index].loadMore = '上拉加载更多'
					this.topicList[index].firstLoad = true
				}).catch(err=>{
					page--
				})
				
			},
			toLoadMore(index) {
				let item = this.topicList[this.curIndex]
				item.page++
				if(item.loadMore == "没有更多了") return
				item.loadMore = '加载中...'
				this.getData()
				
			
			}
			,
			goBack() {
				uni.navigateBack({
					delta:1
				})
			},
			swiperChange(e) {
				this.changeTab(e.detail.current )
			},
			changeTab(index)
			{
				if(index == this.curIndex) return
				this.curIndex = index
				
				this.scrollInto = "tab" + index
				if(!this.topicList[index].loadMore)
				this.getData()
			}
		},
		onLoad() {
			this.getClass()
			let res = uni.getSystemInfo({
				success: (res) => {
					this.swiperH = res.windowHeight - uni.upx2px(100) - res.statusBarHeight 
					
				}
			})
		},
		data() {
			return {
				curIndex:0,
				swiperH:600,
				topicList:[],
				scrollInto:"",
				loadMore:'上拉加载更多',
				tabList:[
					
				]
			}
		},
		onReachBottom() {
			this.toLoadMore()
		}
	}
</script>

<style>
</style>
