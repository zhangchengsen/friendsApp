<template>
	<view class="list">
		
		<block v-for="(item,index) in userList" :key = "index" >
		<view class="user">
			<view class="img_u" >
				<image :src="item.user_pic" @click="user_detail" ></image>
				<view class="name_time">
					<view class="name">
						{{item.username}}
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
			</view>
			<view v-if = "!item.follow"  class="button animated animate__fast" hover-class="pulse" @click = "follow(index)">
				关注
			</view>
			<view v-else style="color:#FFFFFF">
				关注
			</view>
		</view>
		<!-- 上部分 -->
		<view class="p-2" @click="passage">
			{{item.title}}
		</view>
		<view class="content mt-1 mb-1" @click="passage">
			<image :src="item.title_pic" class="border" ></image>
		</view>
		<!-- 文字图标 -->
		<view class="flex m-2">
			<!-- 支持 -->
			<view class="flex flex-1 justify-center p-1 animated" hover-class="rubberBand" @click="operation('support',index)" :style=" item.support.type == 'support' ? 'color:pink;' : ''   ">
				<text class="iconfont icon-dianzan2 " style="margin-top:7rpx;" ></text>
				<text class="ml-1">{{item.support.support}}</text>
			</view>
			<!-- 踩 -->
			<view class="flex flex-1 justify-center p-1 animated " hover-class="swing" @click="operation('unSupport',index)" :style=" item.support.type == 'unSupport' ? 'color:pink;' : ''   ">
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
		<divider></divider>
		</block>
	</view>
</template>

<script>
	export default {
		props:
		{
			userList:Array
		},
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			//关注
			follow(index) {
				this.$emit('follow',{index})
			},
			//点赞
			operation(type,index) {
				this.$emit('admire',{
					type,
					index
				})
			},
			//踩
			unAdmire(index) {
				console.log('踩')
			},
			//用户详情
			user_detail() {
				console.log('用户详情')
			},
			//文章详情
			passage() {
				console.log('文章详情')
			},
			// 评论
			remark () {
				console.log('评论')
			},
			//分享
			share() {
				console.log("分享")
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
