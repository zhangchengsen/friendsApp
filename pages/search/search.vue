<template>
	<view>
		<template v-if = "!searchList.length">
			
			<view class="p-2 font-md" >
				搜索历史
			</view>
			<block v-for="(item,index) in historyList" :key = "index">
				<view class="border d-inline-block mt-1 ml-2 p-1 font-sm " style="border-radius: 8rpx;" @click="clickHis(item)">
					{{item}}
				</view>
			</block>
			
			
		</template>
		<template v-else>
			<commonList :userList = "searchList"></commonList>
		</template>
	</view>
</template>

<script>
	import commonList from '../../components/common/common.vue'
	export default {
		components:{
			commonList
		},
		data() {
			return{
				historyList:['友类app','我是IT黑马',"加油加油加油加油","好耶","静止好耶","我太懒了","内卷内卷内卷内卷内卷内卷"],
				inputVal:"",
				searchList:[]
			}
		},
		onNavigationBarSearchInputChanged(e)
		{
		    this.inputVal = e.text
		},
		onNavigationBarButtonTap(e) {
		    //收起键盘
		    //请求搜索
		    uni.hideKeyboard()	//隐藏软键盘
		    uni.showLoading({
		        title:"加载中",
		        mask:false    
		    })
		    setTimeout(() =>{
		        this.searchList = [
						{
							follow:false,
							username:'abcd',
							time:"2020-6-23 晚上 8.29",
							user_pic:"/static/images/10.jpg",
							title:"很随意的标题",
							title_pic:"/static/images/41.jpg",
							support:{
								type:"support",
								support:2,
								unSupport:1
							},
							remark_num:2,
							share_num:2
						},
						{
							follow:false,
							username:'hahaha',
							time:"2020-6-23 晚上 8.39",
							user_pic:"/static/images/12.jpg",
							title:"标题",
							title_pic:"/static/images/10.jpg",
							support:{
								type:"unSupport",
								support:2,
								unSupport:11
							},
							remark_num:11,
							share_num:1
						},
						{
							follow:true,
							username:'我是你蝶',
							time:"2020-6-24 下午 7.39",
							user_pic:"/static/images/31.png",
							title:"年轻的生命中骤然出现意思阴霾",
							title_pic:"/static/images/2.jpg",
							support:{
								type:"",
								support:12,
								unSupport:1
							},
							remark_num:5,
							share_num:7
						},
					]
		        uni.hideLoading()
		        //	拿到数据之后隐藏
		                                        
		    },1000)
		}
		,
		methods:{
			clickHis(item) {
				uni.hideKeyboard()	//隐藏软键盘
				uni.showLoading({
				    title:"加载中",
				    mask:false    
				})
				setTimeout(() =>{
				    this.searchList = [
							{
								follow:false,
								username:'abcd',
								time:"2020-6-23 晚上 8.29",
								user_pic:"/static/images/10.jpg",
								title:"很随意的标题",
								title_pic:"/static/images/41.jpg",
								support:{
									type:"support",
									support:2,
									unSupport:1
								},
								remark_num:2,
								share_num:2
							},
							{
								follow:false,
								username:'hahaha',
								time:"2020-6-23 晚上 8.39",
								user_pic:"/static/images/12.jpg",
								title:"标题",
								title_pic:"/static/images/10.jpg",
								support:{
									type:"unSupport",
									support:2,
									unSupport:11
								},
								remark_num:11,
								share_num:1
							},
							{
								follow:true,
								username:'我是你蝶',
								time:"2020-6-24 下午 7.39",
								user_pic:"/static/images/31.png",
								title:"年轻的生命中骤然出现意思阴霾",
								title_pic:"/static/images/2.jpg",
								support:{
									type:"",
									support:12,
									unSupport:1
								},
								remark_num:5,
								share_num:7
							},
						]
				    uni.hideLoading()
				    //	拿到数据之后隐藏
				                                    
				},1000)
			}
		},
		
	}
</script>

<style>
</style>
