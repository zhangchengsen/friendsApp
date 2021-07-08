<template>
<!-- 关联导航 -->
    <view class="animated fadeIn ">
		<!-- loadMore -->
		<cpn-user-list type="list" ref='son'   :dataList = "dataList" @index = "getIndex"   ></cpn-user-list>
		<loadMore  v-if="dataList[index].list.length > 0" :load="dataList[index].loadMore" ></loadMore>
    </view>

</template>


<script>
	import cpnUserList from '@/components/msg/cpn-user-list.vue'
	export default{
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			});
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:"../search/search?" + 'type=user'
			})
		},
		data() {
			return {
				dataList:[],	
				index:0,
				key:'friends'
			}
		},
		components:{
			cpnUserList
		},
		onLoad() {
			this.getDataList()
		},
		onShow()
		{
			let change = uni.getStorageSync('dChange')
			if(change)
			{
				this.dataList = []
				this.getDataList()
				uni.removeStorage({
					key:'dChange'
				})
				this.$refs.son.getTab()
			}
		}
		,
		onReachBottom() {
			console.log(1233)
			this.toLoadMore()
		}
		,
		methods:{
			// 得到最新的下表
			getIndex(e) {
				this.index = e.index
				this.key = e.key
				if(!this.dataList[this.index].firstLoad) this.getData()
			},
			
			// avatar:"/static/images/4.jpg",
			// sex:1,
			// username:'ymtx',
			// age:18,
			// isFollow:true
			getDataList() {
				for (var i = 0 ; i < 3 ; i++)
				{
					let obj = {
						list:[
							
						],
						loadMore:'上拉加载更多',
						firstLoad:false,
						page:1
					}
					this.dataList.push(obj)
				}
				this.getData()
				
			},
			getData(){
				let index = this.index
				let page = this.dataList[index].page
				this.$http.get('/'+this.key+ '/'+page,{},{
					token:true,
					noCheck:true
				}).then(res=>{
					let list = res.list.map(v=>{
						return {
								id:v.id,
								avatar:v.userpic,
								sex:v.userinfo.sex,
								username:v.username,
								age:v.userinfo.age ? v.userinfo.age : 0 ,
								isFollow:index != 2
						}
					})
					if(page == 1) this.dataList[index].list = list
					 else this.dataList[index].list = [...this.dataList[index].list,...list]
					 if (list.length < 10 ) this.dataList[index].loadMore = '没有更多了'
					 else this.dataList[index].loadMore = '上拉加载更多'
					this.dataList[index].firstLoad = true
				}).catch(err=>{console.log(err)})
			},
			toLoadMore() {
				console.log(1)
				let item = this.dataList[this.index]
				item.page++;
				if(item.loadMore == "没有更多了") return
				item.loadMore = '加载中...'
				this.getData()
			}
		}
	}
</script>

<style>
</style>
