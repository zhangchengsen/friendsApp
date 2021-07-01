<template>
	<view class="">
		<view class="flex align-center  " style="justify-content: space-around;height: 100rpx;" >
			
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
								<cpn-cpn :item1 = "item1"></cpn-cpn>
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
	import cpnCpn from '@/components/msg/cpn-user-list-cpn.vue'
	export default{
		computed:{
			loadText() {
				return this['loadMore' + (this.curIndex + 1)]
			}
		},
		components:{
			uniBadge,
			cpnCpn
		},
		props:{
			dataList:{
				type:Array
			}
		}
		,
		
		
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
