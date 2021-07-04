<template>
	<view class="">
		<view class="flex align-center justify-center" v-if = "item.type != 'remark' " >
			{{getTime}}
		</view>
		<view class="flex m-2 p-1" :class="item.user_id ? 'flex-row-reverse' : '' ">
			<view class="">
				<image   style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #d8d8d8;"  :src="item.avatar"></image>
			</view>
			<view class="rounded mx-2" >
				<view class="my-1 ml-2" v-if ="item.uid">
					{{item.username }}
				</view>
				<view  class="p-2  font-md mx-2" :class="item.user_id ? 'blue' : 'bgc' " style="border-radius: 15rpx;min-width: 60rpx;">
					{{item.data}}
				</view>
				<view class="text-muted font-sm ml-2 mt-1" v-if="item.uid">
					{{item.create_time | formatTime}}
				</view>
			</view>
			
		</view>
	</view>
	
</template>

<script>
	import $T from '../common/time.js'
	export default {
		props:{
			item:{
				type:Object
			},
			preTime:[String,Number]
		},
		data() {
			return {
				
			}
		},
		computed:
		{
			getTime() {
				if(this.item.type == 'remark') return 
				return $T.getChatTime(this.item.create_time,this.preTime)
			},
			
		},
		mounted() {
			console.log(this. item)
		},
		filters:{
			formatTime(value) {
				return $T.gettime(value)
			}
		}
			
	}
</script>

<style>
	.blue {
		background-color: #79bbff;
		
	}
	.bgc{
		background-color: #f4f4f4;
	}
</style>
