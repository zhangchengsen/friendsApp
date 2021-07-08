<template>
	
	<view class="p-3">
		<view class="flex">
			<view class="flex align-center justify-center ">
				<image :src="userInfo.userpic ? userInfo.userpic : '/static/images/default.jpg' " class="rounded-circle" style="width: 160rpx;height: 160rpx;"></image>
			</view>
			<view class="flex-1">
				<view class="flex">
					<!-- 3个 -->
					<view class="flex-1 flex flex-column align-center justify-center">
						<view class="font-weight-bold font-lg">
							{{count.tiezi | formatNum}}
						</view>
						<text>帖子</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<view class="font-weight-bold font-lg">
							{{count.follow | formatNum}}
						</view>
						<text>关注</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<view class="font-weight-bold font-lg">
							{{count.fens | formatNum}}
						</view>
						<text>粉丝</text>
					</view>
				</view>
				<view v-if = "user_id != local_user.id" :style="!userInfo.isFollow ? 'background-color: #fd597c;color:#fff;' : 'background-color: #dddddd;color:black;' " class="rounded p-2 text-center mx-auto " style="width: 70%;margin-top: 30rpx;" @click="f">
					{{!userInfo.isFollow ? '关注' : '取消关注' }}
				</view>
				<view v-else class="" class="rounded p-2 text-center mx-auto " style="width: 70%;margin-top: 30rpx;background-color: #71cfdd;color:black;" @click="navToData">
					编辑资料
				</view>
				
			</view>
		</view>
		<!-- tab栏 -->
		<template v-if="!userInfo.isblack">
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
							账号年龄: {{userInfo.regtime}}
						</view>
						<view class="mt-2 mb-2">
							账号id: {{user_id}}
						</view>
					</view>
					<view class="border-bottom">
						<view class="mt-2" style="font-size: 36rpx;">
							个人信息
						</view>
						<view class="mt-2">
							星座: {{userInfo.birthday}}
						</view>
						<view class="mt-2">
							职业: {{userInfo.job ? userInfo.job : '保密' }}
						</view>
						<view class="mt-2">
							故乡: {{userInfo.path ? userInfo.path : '保密' }}
						</view>
						<view class="mt-2 mb-2">
							情感: {{getEmotion}}
						</view>
					</view>
				</view>
			</template>
			<template v-else-if="activeIndex == 1">
				<!--  帖子 -->
					<common-list  :userList="user[0].list" type="zone" @admire = "admire"  @follow ="follow"  ></common-list>
					<loadMore :load="user[0].loadMore"></loadMore>
			</template>
			<template v-else>
				<!-- 动态 -->
				<common-list  :userList="user[1].list" type="zone" @admire = "admire"  @follow ="follow"  ></common-list>
				<loadMore :load= "user[1].loadMore"></loadMore>
			</template>
			
	</template>
	<template v-else>
		<view class="text-center mt-4">此用户已被您拉黑</view>
	</template>
	<uni-popup ref="popup" type="top">
		<view class="flex align-center justify-center bg-white p-2">
			<view class="iconfont icon-sousuo mr-2">
			</view>
			<view class="" @click="blackList">
				{{userInfo.isblack ? '取消拉黑' : '加入黑名单' }}
			</view>
		</view>
		<view class="flex align-center justify-center bg-white p-2">
			<view class="iconfont icon-xiaoxi mr-2">
			</view>
			<view class="" @click="openChat">
				聊天
			</view>
		</view>
			
	</uni-popup>
	</view>
</template>

<script>
	const arr = ['保密','已婚','未婚']
	import {mapState} from 'vuex'
	import $T from '@/components/common/time.js'
	import commonList from '../../components/common/common.vue'
	export default{
		data() {
			return {
				tabList:[{name:'主页'},{name:"帖子"},{name:'动态'}],
				activeIndex:0,
				user:[],
				user_id:0,
				userInfo:{},
				count:{
					fens:0,
					tiezi:0,
					follow:0
				},
				change:0
			}
		},
		components:{
			commonList
		}
		,
		onLoad(e) {
			this.user_id = e.uid
			this.getCount()
			this.getUserInfo()
			this.getData()
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
				this.user[this.activeIndex].list.forEach(item=>{
					if(item.id == e.id)
					{
							item.remark_num += 1
							return
					}
				})
			})
		},
		onShow() {
			let haveChange = uni.getStorageSync('changeMes')
			if(haveChange == 'userInfo')
			{
				this.getUserInfo()
				uni.removeStorage({
					key:'changeMes'
				})
			}
		}
		,
		onUnload()
		{
			uni.$off('changeSupportOrFollow',(e)=>{})
			uni.$off('addRemark',(e)=>{})
		}
		,
		onReachBottom(){
			let index = this.activeIndex - 1
			if(this.user[index].loadMore == '没有更多了') return
			this.user[index].page++
			this.user[index].loadMore = '加载中'
			this.getList()
		}
		
		,
		onNavigationBarButtonTap() {
			this.$refs.popup.open()
		},
		methods:{
			openChat() {
				this.checkAuth(()=>{
					let user = {
						user_id:this.user_id,
						username:this.userInfo.username,
						userpic:this.userInfo.userpic
					}
					uni.navigateTo({
						url:'/pages/user-msg/user-msg?user='+JSON.stringify(user)
					})
				})
			},
			// 黑名单
			blackList()
			{
				let black = this.userInfo.isblack
				let msg =  black ? '是否要取消拉黑' : '是否拉黑'
				//true是拉黑了
				let url = black ? '/removeblack' : '/addblack'
				uni.showModal({
					content: msg + '该用户',
					confirmText:'确定',
					cancelText:'取消',
					success: (ret) => {
						if(ret.confirm)
						{
							this.$http.post(url,{
								id:this.user_id
							},{token:true}).then(res=>{
								console.log(res)
								uni.showToast({
									title:"操作成功"
								})
								this.userInfo.isblack = !this.userInfo.isblack
							}).catch(err=>{
								console.log(err)
							})
						}
					}
				})
				
			}
			,
			// 编辑个人资料
			navToData()
			{
				uni.navigateTo({
					url:'../userInfo/userInfo'
				})
			}
			,
			admire(e)
			{
				if(this.activeIndex == 1)
				{
					this.user[this.activeIndex ].firstLoad = false
					this.user[this.activeIndex ].page = 1
				}
				else 
				{
					this.user[this.activeIndex -2 ].firstLoad = false
					this.user[this.activeIndex -2 ].page = 1
				}
				
				let support = this.user[this.activeIndex - 1].list[e.index].support		//指针
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
			
			changeTab(index)
			{
				this.activeIndex = index
				if(this.activeIndex || [this.activeIndex-1]) this.getList()
			},
			getData() {
					for(var i = 0 ; i < 2 ; i++)
					{
						let obj = {
							loadMore:'上拉加载更多',
							list:[],
							page:1,
							firstLoad:false
						}
						this.user.push(obj)
					}
					
					
					
				}
				,
				getUserInfo() {
					this.$http.post('/getuserinfo',{
						user_id:this.user_id
					},{token:false,notoast:true})
					.then(res=>{
						this.userInfo = {
							userpic:res.userpic,
							username:res.username,
							sex:res.userinfo.sex,
							age:res.userinfo.age,
							isFollow:res.fens.length > 0,
							isblack:res.blacklist.length > 0,
							regtime:$T.dateFormat(new Date(res.create_time * 1000),'{Y}-{MM}-{DD}'),
							birthday:$T.getHoroscope(res.userinfo.birthday),
							job:res.userinfo.job,
							path:res.userinfo.path,
							qg:res.userinfo.qg
						}
					}).catch(err=>{
						console.log(err.message)
					})
				},
				follow(user_id) {
					uni.setStorageSync('dChange','123')
					uni.setStorageSync('followed','123')
					//出去刷新
					this.user.forEach((v)=>{
						v.list.forEach(item=>{
							item.follow = true
						})
					})
					uni.showToast({
						title:"关注成功"
					})
					this.userInfo.isFollow = true
				},
				getCount() {
					this.$http.get('/user/getcounts/' + this.user_id).then(res=>{
						this.count.tiezi = res.post_count
						this.count.fens = res.withfen_count
						this.count.follow = res.withfollow_count
						console.log(this.count)
					}).catch(err=>{console.log(err.message)})
				},
				 getList() {
					let index = this.activeIndex - 1
					let page = this.user[index].page
					let isRefresh = page == 1 
					this.$http.get('/user/'+ this.user_id +'/post/'+ page )
					.then(msg=>{
						let list = msg.list.map(v=>{
							return this.$U.helper(v)
						})
						console.log(list)
						this.user[index].list = !this.user[index].firstLoad ? list : [...this.user[index].list,...list],
						this.user[index].firstLoad = true
						this.user[index].loadMore = list.length < 10 ? '没有更多了' : '上拉加载更多'
					}).catch(err=>console.log(err.message))
					
					 
				},
				f()
				{
					if(this.userInfo.isFollow)
					{
						
						this.$http.post('/unfollow',{
							follow_id:this.user_id
						},{token:true}).then(res=>{
							uni.showToast({
								title:'取消关注成功'
							})
							this.user[0].firstLoad = false
							this.user[0].page = 1
							this.user[1].firstLoad = false
							this.user[1].page = 1
							uni.setStorageSync('uid','pub')
							console.log(uni.getStorageSync('uid'))
							this.getList()
						}).catch(err=>console.log(err.message))
						
					}
					else 
					{
						this.$http.post('/follow',{
							follow_id:this.user_id
						},{token:true}).then(res=>{
							uni.showToast({
								title:'关注成功'
							})
							this.user[0].firstLoad = false
							this.user[0].page = 1
							this.user[1].firstLoad = false
							this.user[1].page = 1
							uni.setStorageSync('uid','pub')
							let uid = uni.getStorageSync('uid')
							if(this.activeIndex) this.getList()
						}).catch(err=>{console.log(err.message)})
					}
					this.userInfo.isFollow = !this.userInfo.isFollow
					uni.setStorageSync('dChange','123')
				}
				
			},
		computed:{
			...mapState({
				local_user:state=>state.user,
			}),
			getEmotion()
			{
				return arr[this.userInfo.qg]
			}
		},
		filters:{
			formatNum(value){
				if(value > 99) return '99+'
				else return value
			}
		}
	}
</script>

<style>
</style>
