<template>
	<view class="mt-3">
		<!-- 头部导航栏 -->
		<navBar :border="false" @clickLeft="clickLeft" leftIcon="back" leftText="返回"  rightIcon="菜单" >
			<view class="flex align-center justify-center w-100" @click="chooseWhoCanSee">
				{{whoCanSee}}<view class="iconfont icon-shezhi"></view>
			</view>
		</navBar>
		<!-- 文本域 -->
		<textarea v-model="inputVal" placeholder="写下点什么吧" class="border-bottom w-100 mt-1 px-2"  />
		<!-- 分类 -->
		<picker mode="selector" :range="range" @change="changePicker">
			<view class="font-md px-2 py-1 flex">
				<view class="border px-3 py main-color main-border-color flex align-center justify-center" style="border-radius: 50rpx;">
					<text class="iconfont icon-huati mr-1" style="color: #fc507c;"></text>
					{{getCate}}
				</view>
			</view>
		</picker>
		<!-- 话题 -->
		<view class="font-md px-2 py-1 flex">
			<view @click="iconClick('topic')" class="border px-3 py main-color main-border-color flex align-center justify-center" style="border-radius: 50rpx;">
				<text class="iconfont icon-huati mr-1" style="color: #fc507c;"></text>
				{{getTopic}}
			</view>
		</view>
		<uploadImage  ref = "upload" @chooseImg = "chooseImg" :list = "imageList"></uploadImage>
		<!-- 按钮 -->
		<view class="fixed-bottom border-top flex justify-between" style="height: 85rpx;">
			<view class="flex">
				<view @click="iconClick" class="iconfont icon-caidan flex justify-center align-center" style="height: 80rpx;width: 85rpx; font-size: 45rpx;"></view>
				<view @click="iconClick('topic')" class="iconfont icon-huati flex justify-center align-center" style="height: 80rpx;width: 85rpx;font-size: 45rpx;"></view>
				<view @click="iconClick('upload')" class="iconfont icon-tupian flex justify-center align-center" style="height: 80rpx;width: 85rpx;font-size: 45rpx;"></view>
			</view>
			<view class="flex align-center justify-center mr-2" >
				<view class="animated faster" hover-class="rubberBand"  style="border-radius: 8rpx;text-align: center;line-height: 60rpx; background-color: #fd597c;width: 140rpx;height: 60rpx;color: #fff;" @click="public">
					发送
				</view>
			</view>
		</view>
		<uni-notice-bar v-if="!user.phone" single="true" scrollable text="发布图片和发布都必须绑定手机号码哦~"></uni-notice-bar>
	</view>
	
</template>

<script>
	import {mapState} from 'vuex'
	import navBar from "../../static/uni-components/uni-nav-bar/uni-nav-bar.vue"
	const Arr = ['仅自己可见','所有人可见']
	export default{
		onLoad() {
			uni.$on('chooseTopic',(e)=>{
			 
				this.topic_id = e.id
				this.topic_title = e.title

			})
			uni.getStorage({
				key:"public",
				success:(res)=>{
					let data = JSON.parse(res.data)
					this.inputVal = data.inputVal
					this.imageList = data.imageList
				},
				
			})
			this.$http.get('/postclass').then(res=>{
				this.cateList = res.list
			})
		},
		components:{
			navBar
		},
		computed:{
			...mapState({
				user:state=>state.user
			}),
			imageId()
			{
				return this.imageList.map(item=>{
					return {
						id:item.id
					}
				})
				
			},
			whoCanSee()
			{
				return Arr[this.isopen]
			},
			getTopic()
			{
				return this.topic_title ? "所属话题："+ this.topic_title : "请选择话题"
			},
			getCate()
			{
				return this.cateIndex != -1 ? "所属分类："+ this.cateList[this.cateIndex].classname : "请选择分类"
			},
			getCateId()
			{
				if(this.cateIndex != -1)
				return  this.cateList[this.cateIndex].id 
			}
			,
			range()
			{
				return this.cateList.map(v=>v.classname)
			}
		}
		,
		data() {
			return {
				inputVal:'',
				imageList:[],
				isopen:1,
				topic_title:'',
				topic_id:-1,
				cateList:[],
				cateIndex:-1
			}
		},
		beforeDestroy()
		{
			this.$off('chooseTopic',(e=>{}))
		},
		methods:{
			public()
			{
				if(this.getCateId < 1 || this.topic_id < 1)
				return uni.showToast({
					title:'话题或分类未选择'
				})
				uni.showLoading({
					title:'发布中'
				})
				
				this.$http.post('/post/create',{
					imglist:JSON.stringify(this.imageId),
					text:this.inputVal,
					isopen:this.isopen,
					topic_id:this.topic_id,
					post_class_id:this.getCateId
				},{token:true}).then(res=>{
					console.log(res)
					uni.hideLoading()
					this.imageList = []
					this.inputVal = []
					uni.setStorageSync('uid','pub')
					uni.navigateBack({
						delta:1
					})
				}).catch(err=>{
					uni.hideLoading()
					console.log(err)
					console.log(err.message)
				})
			},
			// 选择分类
			changePicker(e)
			{
				this.cateIndex = e.detail.value
			}
			,
			//选择谁能看见
			chooseWhoCanSee()
			{
				uni.showActionSheet({
					itemList:Arr,
					success:(res)=>{
						this.isopen = res.tapIndex
					}
				})
			},
			// 点击icon图标
			iconClick(info)
			{
				if(info == 'topic')
				{
					
					uni.navigateTo({
						url:"../../pages/cates/cates?type='choose'"
					})
				}
				if(info == 'upload')
				{
					this.$refs.upload.chooseImage()
				}
			},
			// 接受子组件传递过来的图片
			chooseImg(e) {
				
				
				this.imageList = e
				console.log(this.imageId)
			},
			clickLeft() {
				//返回 保存
				if(this.inputVal || this.imageList)
				{
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
				else 
				{
					uni.navigateBack({
						delta:1
					})
				}
				
				
			}
		}
		
	}
</script>

<style>
	
</style>
