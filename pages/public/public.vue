<template>
	<view class="mt-3">
		<!-- 头部导航栏 -->
		<navBar :border="false" @clickLeft="clickLeft" leftIcon="back" leftText="返回"  rightIcon="菜单" >
			<view class="flex align-center justify-center w-100">
				所有人可见<view class="iconfont icon-shezhi"></view>
			</view>
		</navBar>
		<!-- 文本域 -->
		<textarea v-model="inputVal" placeholder="写下点什么吧" class="border-bottom w-100 mt-1 px-2"  />
		<!-- 图片组件 -->
		<uploadImage ref = "upload" @chooseImg = "chooseImg" :list = "imageList"></uploadImage>
		<!-- 按钮 -->
		<view class="fixed-bottom border-top flex justify-between" style="height: 85rpx;">
			<view class="flex">
				<view @click="iconClick('upload')" class="iconfont icon-caidan flex justify-center align-center" style="height: 80rpx;width: 85rpx; font-size: 45rpx;"></view>
				<view class="iconfont icon-huati flex justify-center align-center" style="height: 80rpx;width: 85rpx;font-size: 45rpx;"></view>
				<view class="iconfont icon-tupian flex justify-center align-center" style="height: 80rpx;width: 85rpx;font-size: 45rpx;"></view>
			</view>
			<view class="flex align-center justify-center mr-2" >
				<view class="animated faster" hover-class="rubberBand"  style="border-radius: 8rpx;text-align: center;line-height: 60rpx; background-color: #fd597c;width: 140rpx;height: 60rpx;color: #fff;">
					发送
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import navBar from "../../static/uni-components/uni-nav-bar/uni-nav-bar.vue"
	
	export default{
		onLoad() {
			uni.getStorage({
				key:"public",
				success:(res)=>{
					let data = JSON.parse(res.data)
					this.inputVal = data.inputVal
					this.imageList = data.imageList
					console.log(data)
				},
				
			})
		},
		components:{
			navBar
		},
		data() {
			return {
				inputVal:'',
				imageList:[]
			}
		},
		methods:{
			// 点击icon图标
			iconClick(info)
			{
				if(info == 'upload')
				{
					this.$refs.upload.chooseImage()
				}
			},
			// 接受子组件传递过来的图片
			chooseImg(e) {
				this.imageList = e.imageList
			},
			clickLeft() {
				//返回 保存
				uni.showModal({
					cancelText:"不保存",
					confirmText:"保存",
					title:"提醒",
					confirmColor:"#E6A23C",
					content:"是否保存草稿",
					success: (res) => {
						let data = {
							inputVal:this.inputVal,
							imageList:this.imageList
						}
						if(res.confirm)
						uni.setStorage({
							key:"public",
							data:JSON.stringify(data)
						})
						else{
							uni.removeStorage({
								key:"public"
							})
						}
					},
					complete: () => {
						uni.navigateBack({
							delta:1
						})
					}
				})
				
			}
		}
		
	}
</script>

<style>
	
</style>
