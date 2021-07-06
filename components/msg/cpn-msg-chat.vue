<template>
	
	<view class="">
		<view class="flex align-center justify-center" v-if = "item.type != 'remark' " >
			{{getTime}}
		</view>
		<view class="flex m-2 p-1" :class="item.user_id ? 'flex-row-reverse' : '' ">
			<view class="">
				<image   style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #d8d8d8;"  :src="item.avatar ? item.avatar : item.userpic"></image>
			</view>
			<view class="rounded mx-2"  >
				<block v-if="item.type =='remark'">
					<view :class="item.fid ? 'bg-light rounded p-2' : '' " @click="focus(item.id)">
						<view class="my-1 ml-2" >
							{{item.username }}
						</view>
						<view  class="p-2  font-md mx-2" :class="item.user_id ? 'blue' : 'bgc' " style="border-radius: 15rpx;min-width: 60rpx;">
							{{item.data}}
						</view>
						<view class="text-muted font-sm ml-2 mt-1" >
							{{item.time}}
						</view>
					</view>
					
					<!-- 子 -->
					
				</block>
				<!-- id:item.id,
				fid:item.fid,
				userid:item.user.id,
				userpic:item.user.userpic,
				username:item.user.username,
				time:$T.gettime(item.create_time),
				data:item.data, -->
				<block v-else>
					<view  class="p-2  font-md mx-2" :class="item.user_id ? 'blue' : 'bgc' " style="border-radius: 15rpx;min-width: 60rpx;">
						{{item.data}}
					</view>
				</block>
				
			</view>
			
		</view>
	</view>
	
</template>

<script>
	import $T from '../common/time.js'
	export default {
		methods:{
			focus(id){
				console.log(id)
				this.$emit('tof',id)
			}
		},
		props:{
			item:{
				type:Object
			},
			preTime:[String,Number],
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
		},
		filters:{
			formatTime(value) {
				if(this.item.type == "remark") return value
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
