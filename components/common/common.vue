<template>
	<view class="list animated fadeIn faster">
		<block v-for="(item,index) in userList" :key = "index" >
		<view class="" @click.stop="navTo(item)">
			<view class="user">
				<view class="img_u" >
						<image :src="item.user_pic"  @click.stop="toZone(item.user_id)"></image>
					<view class="name_time">
						<view class="name">
							{{item.username}}
						</view>
						<view class="time">
							{{item.time | formatTime}}
						</view>
					</view>
				</view>
				<view v-if = "!item.follow && (user.id != item.user_id) && type != 'his' "  class="button animated animate__fast" hover-class="pulse" @click.stop = "follow(item,index)">
					关注
				</view>
				<view v-else >
					
					<view class="" style="color:#FFFFFF">
						关注
					</view>
				</view>
			</view>
			<!-- 上部分 -->
			<view class="p-2" @click="passage">
				{{item.title}}
			</view>
			<view class="content mt-1 mb-1" @click="passage">
				<slot>
					<image :src="item.title_pic" class="border" v-if ="item.title_pic" ></image>
				</slot>
			</view>
			<!-- 文字图标 -->
			<template v-if = "type != 'his'">
			<view class="flex m-2">
				<!-- 支持 -->
				<view class="flex flex-1 justify-center p-1 animated" hover-class="rubberBand" @click.stop="operation(item,'support',index)" :style=" item.support.type == 'support' ? 'color:pink;' : ''   ">
					<text class="iconfont icon-dianzan2 " style="margin-top:7rpx;" ></text>
					<text class="ml-1">{{item.support.support}}</text>
				</view>
				<!-- 踩 -->
				<view class="flex flex-1 justify-center p-1 animated " hover-class="swing" @click.stop="operation(item,'unSupport',index)" :style=" item.support.type == 'unSupport' ? 'color:pink;' : ''   ">
					<text class="iconfont icon-cai" style="margin-top:7rpx;"></text>
					<text class="ml-1">{{item.support.unSupport}}</text>
				</view>
				<view class="flex flex-1 justify-center p-1 animated" hover-class="pulse" @click="remark">
					<text class="iconfont icon-pinglun2" style="margin-top:7rpx; "></text>
					<text class="ml-1">{{item.remark_num}}</text>
				</view>
				<view class="flex flex-1 justify-center p-1 animated" hover-class="pulse" @click = "share">
					<text class="iconfont icon-zhuanfa1" style="margin-top:7rpx;" ></text>
					<text class="ml-1">{{item.share_num}}</text>
				</view>
				
			</view>
			</template>
		</view>
		
		<divider></divider>
		</block>
	</view>
</template>

<script>
	import $T from './time.js'
	import {mapState} from 'vuex'
	export default {
		
		filters:{
			formatTime (value){
				return $T.gettime(value)
			}
		},
		props:
		{
			userList:Array,
			type:String
		},
		data() {
			return {
			}
		},
		mounted() {
			let his = uni.getStorageSync('browser') || JSON.stringify([])
			let data = []
			if(his) data =  JSON.parse(his)
			// let history = JSON.parse(his) 
			
			this.userList.forEach(v=>{
				let index = data.findIndex(item=>{
					return item.id == v.id
				})
				if(index != -1) data.splice(index,1)
				data.unshift(v)
			})
			// uni.setStorageSync('browser',JSON.stringify(data))
			uni.setStorage({
				key:'browser',
				data:JSON.stringify(data),
				success: () => {
					console.log(1)
				},
				fail: (err) => {
					console.log(err)
				}
			})
			
		},
		computed:{
			...mapState({
				user:state=>state.user,
			})
		},
		methods: {
			// 到个人空间
			toZone(id) {
				uni.navigateTo({
					url:'../../pages/zone/zone?uid='+id	
				})
			},
			// 到详情页
			navTo(data) {
				if(this.type) return
				data.type = "detail"
				uni.navigateTo({
					url:'../../pages/common_detail/common_detail?data=' + JSON.stringify(data)
				})
			},
			//关注
			follow(item,index) {
				console.log(item.user_id)
				this.$http.post('/follow',{
					follow_id:item.user_id
				},{token:true})
				.then(res=>{
					uni.setStorageSync('followed','1')
					console.log(23)
					uni.$emit('changeSupportOrFollow',{
						type:"follow",
						data:{
							user_id:item.user_id
						}
					})
					if(this.type == 'detail') uni.setStorageSync('uid',item.user_id)
				}).catch(err=>console.log(err.message))
			},
			//点赞
			operation(item,type,index) {
				this.checkAuth(()=>{
					this.$http.post('/support',{
						post_id:item.id,
						type: type == 'support' ? 0 : 1
					},{
						token:true,
						native:true
					}).then(res=>{
						console.log(res)
					}).catch(err=>{console.log('错误 '+err.message)})
					uni.$emit('changeSupportOrFollow',{
						type:"support",
						data:{
							type:type,
							index:index
						}
					})
					// this.$emit('admire',{
					// 	type,
					// 	index
					// })
				})
 				
			},
			//踩
			unAdmire(index) {
			},
			//用户详情
			user_detail() {
			},
			//文章详情
			passage() {
			},
			// 评论
			remark () {
			},
			//分享
			share() {
			}
			
		}
	}
</script>

<style scoped lang="less">
	.user{
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.img_u{
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
			.name_time{
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				.name{
					font-size: 28rpx;
					color: #171717;
				}
				.time{
					font-size:22rpx;
					color: #93908b;
				}
			}
		}
		
		.button{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			width: 96rpx;
			height: 56rpx;
			background-color: #fd597c;
			color: #fff;
			border-radius: 10rpx;
		}
		
	} 
	.content {
		text-align: center;
		image{
			height: 450rpx;
			width: 710rpx;
		}
		
	}
</style>
