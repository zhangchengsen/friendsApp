<template>
	<view class="">
		<uni-list-item :clickable="true" :showArrow="true" title="账号与安全" class="font-lg" @click="toChange('changePwd')"></uni-list-item>
		<uni-list-item @click="toChange('email')" :clickable="true" :showArrow="true" title="绑定邮箱" class="font-lg"></uni-list-item>
		<uni-list-item @click="toChange('userInfo')" :clickable="true" :showArrow="true" title="资料编辑" class="font-lg"></uni-list-item>
		<uni-list-item  @click="toChange('suggest')" :clickable="true" :showArrow="true" title="意见反馈" class="font-lg"></uni-list-item>
		<uni-list-item  @click="clear" :clickable="true"  title="清除缓存" class="font-lg">
			<text slot="rightIcon" class="mr-2">{{buffer | format}}</text>
		</uni-list-item>
		<uni-list-item  @click="toChange('about')" :clickable="true" :showArrow="true" title="关于社区" class="font-lg mb-2" ></uni-list-item>
		<view class="m-2 font-lg flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c;color: #fff;"  >
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getBuffer()
		},
		data() {
			return {
				buffer:0
			}
		},
		methods:{
			getBuffer() {
				let res = uni.getStorageInfoSync()
				this.buffer = res.currentSize
			},
			clear() {
				if(this.buffer == 0) return uni.showToast({title:'很干净啦,不需要清理',icon:'none',duration:2500})
				uni.showModal({
					title:"要清除缓存吗",
					confirmText:"确定",
					confirmColor:'#79bbff',
					cancelText:'取消',
					success: (res) => {
						if(res.confirm) 
						{
							uni.clearStorageSync()
							this.getBuffer()
						}
						
					}
				})
			},
			toChange(to) {
				uni.navigateTo({
					url:`../${to}/${to}`
				})
			}
		},
		filters:{
			format(value) {
				return value > 1024 ? (value/1024).toFixed(2) + 'MB' : value.toFixed(2) + 'KB' 
			}
		}
	}
</script>

<style>
</style>
