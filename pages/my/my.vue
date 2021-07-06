<template>
	<view class="">
		<user class="p-2" :dataList="dataList" ></user>
		<list></list>
	</view>
</template>

<script>
	import  {mapState} from 'vuex'
	import user from '@/components/person/user.vue'
	import list from '@/components/person/list.vue'
	export default {
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../user-set/user-set'
			})
		},
		components:{
			user,
			list
		},
		data() {
			return {
				dataList:[]
			}
		},
		onLoad() {
		},
		mounted(){
			if(this.user) this.getDataList()
		},
		methods:{
			getDataList() {
				 this.dataList = [
					{
						name:'帖子',
						nums:0
					},
					{
						name:'动态',
						nums:0
					},
					{
						name:'评测',
						nums:0
					},
					{
						name:'粉丝',
						nums:0
					}
				]
				this.$http.get('/user/getcounts/'+this.user.id,{},{
					token:true,
					native:true
				}).then(res=>{
					console.log(res)
					this.dataList[0].nums = res.data.data.post_count
					this.dataList[1].nums = res.data.data.today_posts_count
					this.dataList[2].nums = res.data.data.comments_count
					this.dataList[3].nums = res.data.data.withfollow_count
					
					console.log(this.dataList)
					
				}).catch(err=>{
					console.log(err.message)
				})
				
			}
		},
		computed:{
			...mapState({
				user:state=>state.user
			})
		}
	}
</script>

<style>
</style>
