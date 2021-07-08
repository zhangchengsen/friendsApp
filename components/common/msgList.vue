<template>
	<view class="mx-2 py-2 flex border-bottom" @click="navTo(item)">
		<view class="" >
			<image :src="item.avatar" style="width: 80rpx;height: 80rpx;border-radius: 50%;" class=""></image>
		</view> 
		<view class="flex justify-between w-100 flex-column">
			<!-- -->
				<view class="flex flex-row justify-between w-100">
					<view class="font-md" >
						{{item.username}}
					</view>
					<view class="" style="color: #7e7b76;">
						{{item.update_time | formatTime}} 
					</view>
				</view>
				<view class="flex justify-between w-100">
					<view style="color: #b0aba8;max-width: 450rpx;" class="text-secondary text-ellipsis">{{item.data}}</view>
					<uni-badge :text="item.noread" type="error"></uni-badge>
				</view>
				
		</view>
	</view>
</template>

<script>
	import uniBadge from '../../static/uni-components/uni-badge/uni-badge.vue'
	import  $T from '@/components/common/time.js'
	export default{
		props:{
			item:{
				type:Object
			}
		},
		components:{
			uniBadge
		},
		filters:{
			formatTime(value){
				return $T.gettime(value);
			}
		},
		methods:{
			navTo(item)
			{
				let user = {
					user_id:this.item.user_id,
					username:this.item.username,
					userpic:this.item.avatar
				}
				uni.navigateTo({
					url:'../../pages/user-msg/user-msg?user='+JSON.stringify(user),
					success: () => {
						this.$store.dispatch('readChatMessage',item)
					}
				})
			}
		}
	}
</script>

<style>
</style>
