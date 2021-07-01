<template>
	
	<view class="p-3">
		<view class="flex">
			<view class="flex align-center justify-center ">
				<image src="/static/images/200.jpg" class="rounded-circle" style="width: 160rpx;height: 160rpx;"></image>
			</view>
			<view class="flex-1">
				<view class="flex">
					<!-- 3个 -->
					<view class="flex-1 flex flex-column align-center justify-center">
						<view class="font-weight-bold font-lg">
							1
						</view>
						<text>获赞</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<view class="font-weight-bold font-lg">
							4
						</view>
						<text>关注</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<view class="font-weight-bold font-lg">
							2
						</view>
						<text>粉丝</text>
					</view>
				</view>
				<view  class="rounded p-2 text-center mx-auto text-white" style="background-color: #fd597c;width: 70%;margin-top: 30rpx;">
					关注
				</view>
				
			</view>
		</view>
		<!-- tab栏 -->
		<view class="flex align-center border-top mt-2" style="justify-content: space-around;height: 100rpx;" >
			
			<view v-for="(item,index) in tabList" :key = "index"  class=" scroll-row-item px-2 py-2 " :id = '"tab" + index' style="line-height: 60rpx;" @click="changeTab(index)"  :class = "activeIndex == index ? 'font-weight-bold font-lg active' : 'font-md' " :style =" activeIndex == index ? 'color:pink;': '' ">
				{{item.name}}
			</view>
		</view>
			<template v-if="!activeIndex">
				<!-- 主页 -->
				<view class="animated fadeIn">
					<view class="border-bottom">
						<view class="" style="font-size: 36rpx;">
							账号信息
						</view>
						<view class="mt-2">
							账号年龄: 12个月
						</view>
						<view class="mt-2 mb-2">
							账号id: 1
						</view>
					</view>
					<view class="border-bottom">
						<view class="mt-2" style="font-size: 36rpx;">
							个人信息
						</view>
						<view class="mt-2">
							星座: 12个月
						</view>
						<view class="mt-2">
							职业: IT
						</view>
						<view class="mt-2">
							故乡:浙江温州
						</view>
						<view class="mt-2 mb-2">
							情感: 已婚
						</view>
					</view>
				</view>
			</template>
			<template v-else-if="activeIndex == 1">
				<!--  帖子 -->
					<common-list  :userList="user.list" type="zone" @admire = "admire"  @follow ="follow"  ></common-list>
					
			</template>
			<template v-else>
				<!-- 动态 -->
				<view class="animated fadeIn">3</view>
			</template>
			<uni-popup ref="popup" type="top">
				<view class="flex align-center justify-center bg-white p-2">
					<view class="iconfont icon-sousuo mr-2">
					</view>
					<view class="">
						加入黑名单
					</view>
				</view>
				<view class="flex align-center justify-center bg-white p-2">
					<view class="iconfont icon-xiaoxi mr-2">
					</view>
					<view class="">
						聊天
					</view>
				</view>
					
			</uni-popup>
	</view>
</template>

<script>
	import commonList from '../../components/common/common.vue'
	export default{
		data() {
			return {
				tabList:[{name:'主页'},{name:"帖子"},{name:'动态'}],
				activeIndex:0,
				user:{}
			}
		},
		components:{
			commonList
		}
		,
		onLoad() {
			this.getData()
		}
		,
		onNavigationBarButtonTap() {
			this.$refs.popup.open()
		},
		methods:{
			admire(e)
			{
				let support = this.user.list[e.index].support		//指针
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
				let obj = this.user.list[e.index]		//指针
				obj.follow = true
				uni.showToast({
					title:"关注成功"
				})
				console.log(obj.follow)
			},
			changeTab(index)
			{
				this.activeIndex = index
			},
			getData() {
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
					this.user = obj
					
				}
			}
		}
</script>

<style>
</style>
