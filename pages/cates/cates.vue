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
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 移动轮播 -->
		<swiper :current = "curIndex" @change = "swiperChange" :style=" 'height:' +swiperH +'px'  ">
			<block v-for = "(item,index) in tabList" :key = "index">
				<swiper-item>
						<scroll-view scroll-y="true"  :style=" 'height:' + swiperH +'px' " >
							<block v-for="(item1,index1) in topicList[index]" :key = "index1">
								<topics :item= "item1"></topics>
							</block>
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
			getTopicList() {
				let arr = []
				for(var i = 0 ; i < 10 ; i++)
				{
					let obj = {
						topicName:"#话题名称哈哈哈哈",
						topicDesc:"话题描述",
						news:42,
						news_today:0,
						scrollInto:'tab1'
					}
					if(i == 3 || i ==4)
					{
						obj.topicDesc = "??????????"
						obj.news = 23
						obj.news_today = 4
					}
					arr.push(obj);
				}
				for(var i = 0 ; i < 12 ; i++)
				{
					this.topicList.push(arr);
				}
				 
			},
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
			}
		},
		onLoad() {
			let res = uni.getSystemInfo({
				success: (res) => {
					this.swiperH = res.windowHeight - uni.upx2px(100) - res.statusBarHeight 
					
				}
			})
			this.getTopicList()
		},
		data() {
			return {
				curIndex:0,
				swiperH:600,
				topicList:[],
				scrollInto:"",
				tabList:[
					{
						name:'关注',
					},
					{
						name:'推荐',
					},
					{
						name:'体育',
					},
					{
						name:'热点',
					},
					{
						name:'财经',
					},
					{
						name:'娱乐',
					},
					{
						name:'军事',
					},
					{
						name:'历史',
					},
					{
						name:'本地',
					}
					
				]
			}
		}
	}
</script>

<style>
</style>
