<template>
	<view style="margin-bottom: 30rpx;" class="animated fadeIn">
		
			<scroll-view scroll-x class="scroll-row" scroll-with-animation="true" :scroll-into-view="scrollInto" style="height: 100rpx;">
				<view v-for="(item,index) in tabList" :key = "index"  class="scroll-row-item px-2 py-2 font-md" :id = '"tab" + index' style="line-height: 60rpx;" @click="changeTab(index)"  :class = "activeIndex == index ? 'font-weight-bold font-lg active' : '' " :style =" activeIndex == index ? 'color:pink;': '' ">
					{{item.classname}}
				</view>
			</scroll-view>
			<swiper :current = "activeIndex" @change = "swiperChange" :style=" 'height:' +swiperH +'px'  ">
				<block v-for = "(item,index) in newsList" :key = "index">
					<swiper-item>
						<template v-if ="item.list.length > 0">
							<scroll-view scroll-y="true"  :style=" 'height:' + swiperH +'px' " @scrolltolower="toLoadMore(index)">
								<commonList :userList = "item.list" @admire = "admire"  @follow ="follow"></commonList>
								<loadMore :load = "item.loadMore"></loadMore>
							</scroll-view>
						</template>
						<template v-else>
							<nothing></nothing>
						</template>
						
					</swiper-item>
				</block>
			</swiper>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
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
				tabList:[]
			}
		},
		onShow()
		{
			if(this.change)
			{
				this.$store.commit('change')
				this.getData()
			}
			let uid = uni.getStorageSync('uid')
			if(uid) 
			{
				if(uid == 'pub') this.getData()
				else {
					this.newsList.forEach(item=>{
						item.list.forEach((v)=>{
							if(v.user_id === user_id)
							{
								v.follow = true
							}
						})
					})
				}
				
				uni.removeStorage({
					key:'uid'
				})
			}
			
		},
		onLoad() {
			
			let res = uni.getSystemInfo({
				success: (res) => {
					this.swiperH = res.windowHeight - uni.upx2px(100) - res.statusBarHeight 
					
				}
			})
			// 全局监听
			uni.$on('changeSupportOrFollow',(e)=>{
				switch (e.type) {
					case 'follow':
						this.follow(e.data.user_id)
						break
					case 'support' :
						this.admire(e.data)
						break;
				}
			})
			uni.$on('addRemark',(e)=>{
				this.newsList[this.activeIndex].list.forEach(item=>{
					if(item.id == e.id)
					{
							item.remark_num += 1
							return
					}
				})
			})
			this.getData()
			
		},
		onUnload()
		{
			uni.$off('changeSupportOrFollow',(e)=>{})
			uni.$off('addRemark',(e)=>{})
		}
		,
		onNavigationBarSearchInputClicked() {
			
			uni.navigateTo({
				url:"../search/search?type=post"
			})
		},
		onNavigationBarButtonTap(e) {
			this.navigation('public')
			
		}
		,	
		computed:{
			...mapState({
				user:state=>state.user,
				change:state=>state.change
			})
		},
		methods: {
			
			async getData() {
				let res = await this.$http.get('/postclass')
				this.tabList = res.list
				
				// 获得信息
				let arr = []
				for (var i = 0 ; i < this.tabList.length ; i ++)
				{
					let obj = {
						loadMore:'上拉加载更多',
						list:[],
						page:1,
						firstLoad:false,
						}
					arr.push(obj)
				}
				this.newsList = arr
				this.getList()
			},
			// 请求文章
			async getList() {
				let index = this.activeIndex
				let id = this.tabList[index].id
				let page = this.newsList[index].page
				let isRefresh = page == 1 
				let msg = await  this.$http.get('/postclass/'+ id +'/post/'+ page )
				let list = msg.list.map(v=>{
					return this.$U.helper(v)
				})
				this.newsList[index].list = isRefresh? list : [...this.newsList[index].list,...list],
				this.newsList[index].firstLoad = true
				this.newsList[index].loadMore = list.length < 10 ? '没有更多了' : '上拉加载更多'
				 
			}
			,
			changeTab(index) {
				if(index == this.activeIndex) return 
				this.activeIndex = index
				
				this.scrollInto = "tab" + index
				if(!this.newsList[this.activeIndex].firstLoad)
				this.getList()
			}
			,
			swiperChange(e) {
				this.changeTab(e.detail.current )
			}
			,
			// 顶
			admire(e)
			{
				let support = this.newsList[this.activeIndex].list[e.index].support		//指针
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
				item.page++;
				if(item.loadMore == "没有更多了") return
				item.loadMore = '加载中'
				this.getList()

			}
		}
	}
</script>
	
<style scoped lang="less">
	
</style>
