<template>
	<view>
		<view class="flex align-center " style="justify-content: space-around;height: 100rpx;" >
			
			<view v-for="(item,index) in tabList" :key = "index"  class=" scroll-row-item px-2 py-2 " :id = '"tab" + index' style="line-height: 60rpx;" @click="changeTab(index)"  :class = "curIndex == index ? 'font-weight-bold font-lg active' : 'font-md' " :style =" curIndex == index ? 'color:pink;': '' ">
				{{item.name}}
			</view>
		</view>
		<!-- 移动轮播 -->
		<swiper :current = "curIndex" @change = "swiperChange" :style=" 'height:' +swiperH +'px'  ">
			<block v-for = "(item,index) in tabList" :key = "index">
				<swiper-item>
						<scroll-view scroll-y="true"  :style=" 'height:' + swiperH +'px' " >
							<block v-for="(item1,index1) in dataList[curIndex]" :key = "index1">
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
							
	                        </block>
							<loadMore :load = "loadText" ></loadMore>
						</scroll-view>
					
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	import uniBadge from '@/static/uni-components/uni-badge/uni-badge.vue'
	export default{
		computed:{
			loadText() {
				return this['loadMore' + (this.curIndex + 1)]
			}
		},
		components:{
			uniBadge
		},
		props:{
			dataList:{
				type:Array
			}
		}
		,
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			});
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:"../search/search"
			})
		},
		
		onLoad() {
			let res = uni.getSystemInfo({
				success: (res) => {
					this.swiperH = res.windowHeight -  uni.upx2px(100)
					
				}
			})
		}
	    ,
	    data() {
	        return {
	            curIndex:0,
				swiperH:600,
				topicList:[],
				loadMore1:"上拉加载更多",
				loadMore2:"上拉加载更多",
				loadMore3:"上拉加载更多",
				tabList:[
					{
						name:'互关',
					},
					{
						name:'关注 2',
					},
					{
						name:'粉丝 30',
					}
					
				]
	        }
	    },
	    methods:{
	        swiperChange(e) {
				this.changeTab(e.detail.current )
			},
			changeTab(index)
			{
				if(index == this.curIndex) return
				this.curIndex = index
				this.$emit('index',{index:this.curIndex})
				
			},
	        
	    }
	}
</script>

<style>
</style>
