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
			this.msg = JSON.parse(e.detail)
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
			this.getData()
			
		},
		onUnload()
		{
			uni.$off('changeSupportOrFollow',((e)=>{}))
		}
		,
		methods:{
			changeTab(index){
				this.activeIndex = index;
				if(!this['firstLoad' + index]) this.getData()
			},
			getData() {
				let id = this.msg.id
				let index = this.activeIndex +1
				this.$http.get( '/topic/' + id +'/post/'+ this[ 'page' + index ] ).then(res=>{
					let list = res.list.map(v=>{
						return this.$U.helper(v)
					})
					if(this['firstLoad' + index])
					{
						this['list' + index ] = [...this['list' + index ],...list]
					}
					else
					{
						this['firstLoad' + index] = true
						this['list' + index] = list
						
					}
					if(list.length < 10) this[' loadMore'  + index] = '没有更多了'
					else this[' loadMore'  + index] = '上拉加载更多'
					
				}).catch(err=>{
					console.log(err)
					this[' page'  + index]--
				})
								
			},
			admire(e)
			{
				console.log(1111)
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
			follow(user_id) {
				this.list1.forEach((v)=>{
					if(v.user_id === user_id)
					{
						v.follow = true
					}
				})
				this.list2.forEach((v)=>{
					if(v.user_id === user_id)
					{
						v.follow = true
					}
				})
				uni.showToast({
					title:"关注成功"
				})
			},
			toLoad() {
				let index = this.activeIndex +1
				
				if(this.loadText == "没有更多了" ) return 
				this['loadMore' +  (this.activeIndex + 1)] = '加载中...'
				this['page' + index ] ++
				this.getData()
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
				page1:1,
				page2:1,
				firstLoad1:false,
				firstLoad2:false
			}
		}
		
		
	}
</script>

<style>
	.pink {
		color:#fc5779;
	}
</style>
