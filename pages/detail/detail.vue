<template>
	<view class="">
		<detail :msg = "msg"></detail>
		<divider></divider>
		<view class="flex p-2 align-center border-bottom">
			<view class="text-center">
				<image src="@/static/images/32.jpg" style="width: 26rpx;height: 26rpx;"></image>
			</view>
			<view class="text-ellipsis font-md">
				【新人必读】 内卷王 天天就知道内卷
			</view>
		</view>
		<view class="flex p-2 align-center border-bottom">
			<view class="text-center">
				<image src="@/static/images/32.jpg" style="width: 26rpx;height: 26rpx;"></image>
			</view>
			<view class="text-ellipsis font-md">
				【新人必读】 吃了一个月的泡面 小伙的身体竟然发生了这样的变hua
			</view>
		</view>
		<divider></divider>
		<!-- tab栏 -->
		<view class="p-2 flex">
			<block v-for="(item,index) in tabList" :key = "index" >
				<view @click = "changeTab(index)" class="flex-1 flex align-center justify-center" :class=" activeIndex == index? 'font-lg pink' : 'font-md' "  >
					{{item}}
				</view>
			</block>
		</view>
		
		<!-- <common-list v-if="activeIndex == 0" :userList="newsList[activeIndex].list"@admire = "admire"  @follow ="follow"></common-list> -->
		<template v-if = "listData.length > 0">
			<common-list v-if="activeIndex == 0" :userList="listData" @admire = "admire"  @follow ="follow"></common-list>
			<loadMore :load = "loadText"></loadMore>
		</template>
		<template v-else>
			<nothing></nothing>
		</template>
	</view>
</template>

<script>
	import commonList from '../../components/common/common.vue'
	import detail from "../../components/common/detail_topic.vue"
	export default{
		computed:{
			listData() {
				return this['list' + (this.activeIndex + 1)]
			},
			loadText() {
				return this['loadMore' +  (this.activeIndex + 1)]
			}
		},
		components:{
			detail,
			commonList
		},
		onLoad(e) {
			this.getData()
			this.msg = JSON.parse(e.detail)
		},
		methods:{
			changeTab(index){
				this.activeIndex = index;
			},
			getData() {
				
					
						let list=[
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
					
				
				this.list1 = list
			},
			admire(e)
			{
				let support = this.list1[e.index].support		//指针
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
				let obj = this.list1[e.index]		//指针
				obj.follow = true
				uni.showToast({
					title:"关注成功"
				})
			}, 
			toLoad() {
				// this['loadMore' +  (this.activeIndex + 1)]
				// this['list' + (this.activeIndex + 1)]
				if(this.loadText != "上拉加载更多" ) return 
				this['loadMore' +  (this.activeIndex + 1)] = '加载中...'
				setTimeout(()=>{
					this['list' + (this.activeIndex + 1)]  = [...this['list' + (this.activeIndex + 1)],...this['list' + (this.activeIndex + 1)]]
					this['loadMore' +  (this.activeIndex + 1)] = '上拉加载更多'
					// 拿到数据
					// 更新loadText的状态
				},2000)
			}
			
		},
		onReachBottom() {
			this.toLoad() 
		}
		,
		data() {
			return {
				msg:{},
				tabList:['默认','最新'],
				activeIndex:0,
				list1:[],
				list2:[],
				loadMore1:"上拉加载更多",
				loadMore2:"上拉加载更多",
			}
		}
		
		
	}
</script>

<style>
	.pink {
		color:#fc5779;
	}
</style>
