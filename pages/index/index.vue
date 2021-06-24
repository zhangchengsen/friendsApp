<template>
	<view style="margin-bottom: 30rpx;">
		
			<scroll-view scroll-x class="scroll-row" scroll-with-animation="true" :scroll-into-view="scrollInto" style="height: 100rpx;">
				<view v-for="(item,index) in tabList" class="scroll-row-item px-2 py-2 font-md" :id = '"tab" + index'  @click="changeTab(index)"  :class = "activeIndex == index ? 'font-weight-bold font-lg active' : '' " :style =" activeIndex == index ? 'color:pink;': '' ">
					{{item.name}}
				</view>
			</scroll-view>
			<swiper :current = "activeIndex" @change = "swiperChange" :style=" 'height:' +swiperH +'px'  ">
				<block v-for = "(item,index) in newsList" :key = "index">
					<swiper-item >
						<scroll-view scroll-y="true"  :style=" 'height:' +swiperH +'px' " @scrolltolower="toLoadMore(index)">
							<commonList :userList = "item.list" @admire = "admire"  @follow ="follow"></commonList>
							<loadMore :load = "item.loadMore"></loadMore>
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>
	</view>
</template>

<script>
	import commonList from '../../components/common/common.vue'
	export default {
		components:{
			commonList
		}
		,
		data()	 {
			return {
				scrollInto:"",
				activeIndex:0,
				swiperH:600,
				newsList:[],
				cur_swiper:0,
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
		},
		
		onLoad() {
			let res = uni.getSystemInfo({
				success: (res) => {
					this.swiperH = res.windowHeight - uni.upx2px(100)
					
				}
			})
			this.getData()
		},
		methods: {
			getData() {
				let arr = []
				for (var i = 0 ; i < this.tabList.length ; i ++)
				{
					let obj = {
						loadMore:'上拉加载更多',
						list:[
							{
								follow:false,
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
								follow:false,
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
				this.newsList = arr
			},
			changeTab(index) {
				if(index == this.activeIndex) return 
				this.activeIndex = index
				
				this.scrollInto = "tab" + index
			}
			,
			swiperChange(e) {
				this.changeTab(e.detail.current )
			}
			,
			admire(e)
			{
				let support = this.newsList[this.activeIndex].list[e.index].support		//指针
				if(support.type == e.type) return 
				else if(!support.type)
				{
					console.log(2)
					if(e.type == 'support') support.support += 1
					else support.unSupport += 1
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
				let obj = this.newsList[this.activeIndex].list[e.index]		//指针
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
			}
		}
	}
</script>
	
<style scoped lang="less">
	
</style>
