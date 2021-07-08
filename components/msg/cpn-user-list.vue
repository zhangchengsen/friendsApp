<template>
	<view class="">
		<view class="flex align-center  " style="justify-content: space-around;height: 100rpx;" >
			
			<view v-for="(item,index) in tabList" :key = "index"  class=" scroll-row-item px-2 py-2 " :id = '"tab" + index' style="line-height: 60rpx;" @click="changeTab(index)"  :class = "curIndex == index ? 'font-weight-bold font-lg active' : 'font-md' " :style =" curIndex == index ? 'color:pink;': '' ">
				{{item.name + ' ' + item.nums }} 
			</view>
		</view>
		<!-- 移动轮播 -->
		<swiper :current = "curIndex" @change = "swiperChange" :style=" 'height:' +swiperH +'px'  ">
			<block v-for = "(item,index) in tabList" :key = "index">
				<swiper-item>
						<scroll-view scroll-y="true"  :style=" 'height:' + swiperH +'px' " >
							<template  v-if="dataList[curIndex].list.length > 0">
								<block v-for="(item1,index1) in dataList[curIndex].list" :key = "index1">
									<cpn-cpn :index = "curIndex" :type='type' :item1 = "item1"></cpn-cpn>
								</block>
								
							</template>
							<template v-else>
								<nothing ></nothing>
							</template>
						</scroll-view>
					
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import uniBadge from '@/static/uni-components/uni-badge/uni-badge.vue'
	import cpnCpn from '@/components/msg/cpn-user-list-cpn.vue'
	export default{
		computed:{
			// loadText() {
			// 	return this['loadMore' + (this.curIndex + 1)]
			// }
		},
		components:{
			uniBadge,
			cpnCpn
		},
		props:{
			type:{
				type:String,
				default:'none'
			},
			dataList:{
				type:Array
			}
		}
		,
		
		// avatar:"/static/images/4.jpg",
		// sex:1,
		// username:'ymtx',
		// age:18,
		// isFollow:true
		mounted() {
			let res = uni.getSystemInfo({
				success: (res) => {
					this.swiperH = res.windowHeight -  uni.upx2px(100)
					
				}
			})
			this.getTab()
		}
	    ,
	    data() {
	        return {
	            curIndex:0,
				swiperH:600,
				topicList:[],
				
				tabList:[
					{
						name:'互关',
						nums:0,
						key:'friends'
					},
					{
						name:'关注',
						nums:0,
						key:'follows'
					},
					{
						name:'粉丝',
						nums:0,
						key:'fens'
					}
					
				]
	        }
	    },
	    methods:{
			
			cs(){
				console.log(1)
			},
	        swiperChange(e) {
				this.changeTab(e.detail.current )
			},
			changeTab(index)
			{
				if(index == this.curIndex) return
				this.curIndex = index
				this.$emit('index',{index:this.curIndex,key:this.tabList[this.curIndex].key})
				
			},
			getTab(){
				this.$http.get('/user/getcounts/'+this.user.id,{},{
					token:true,
					notoast:true
				}).then(res=>{
					console.log(res)
					this.tabList[0].nums = res.friend_count
					this.tabList[1].nums = res.withfollow_count
					this.tabList[2].nums = res.withfen_count
				}).catch(err=>{
					console.log(err.message)
				})
			}
	        
	    },
		computed:{
			...mapState({
				user:state=>state.user,
				change:state=>state.change
			})
		},
	}
</script>

<style>
</style>
