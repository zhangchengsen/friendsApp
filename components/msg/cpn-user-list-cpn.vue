<template>
	<view class="border-bottom flex p-2">
		<view class="">
				<image :src="item1.avatar" style="width: 80rpx;height: 80rpx;border-radius: 50%;"></image>
		</view> 
		<view class="w-100 flex justify-between align-center ml-2">
			<view>
				<view class="">
					{{item1.username}}
				</view>
				<view class="font-sm mt-2">
					<uni-badge :text="item1.age" :type="item1.sex == 1 ? 'primary' : 'error' " ><text>{{item1.sex == '1 ' ? '♂' : '' }}{{item1.sex == '2' ? '♀' : '' }}</text></uni-badge>
				</view>
			</view>
			<view class="uni-icon uni-icon-checkbox-filled" :style="item1.isFollow ? 'color: #ff698f;' : 'color: #999'   ">
				
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/static/uni-components/uni-badge/uni-badge.vue'
	export default{
		props:{
			item1:Object
		},
		components:{
			uniBadge
		}
	}
</script>

<style>
</style>
