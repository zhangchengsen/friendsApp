<template>
	<view class="">
		<uni-list-item title="头像" clickable @click="changeAvatar">
			<view class="flex align-center justify-center" slot="footer">
				<image :src="user.userpic" class="rounded-circle" style="width: 100rpx;height: 100rpx;"></image>
			</view>
			<text slot="rightIcon" class="iconfont icon-bianji1 pr-2"></text>
		</uni-list-item> 
		<uni-list-item title="昵称" clickable>
			<view class="flex align-center justify-center" slot="footer">
				<input type="text" v-model="username" class="text-right" />
			</view>
			<text slot="rightIcon" class="iconfont icon-bianji1 pr-2"></text>
		</uni-list-item> 
		<uni-list-item title="性别" clickable @click="changeSex()">
			<view  class="flex align-center justify-center" slot="footer">
				{{getSex}}
			</view>
			<text slot="rightIcon" class="iconfont icon-bianji1 pr-2"></text>
		</uni-list-item> 
		<picker class="picker" mode="date" :value="birthday"  @change="birthChange">
			<view class="flex align-center justify-between" >
				<view class="mx-3 my-1"> 生日</view>
				<view class="flex">
					<view class="mr-2">
						{{birthday}}
					</view>
					<view class="iconfont icon-bianji1 pr-2">
						
					</view>
				</view>
				
			</view>
		</picker>
		 
		<uni-list-item title="情感" clickable @click="changeEmotion">
			<view class="flex align-center justify-center" slot="footer">
				{{getEmotion}}
			</view>
			<text slot="rightIcon" class="iconfont icon-bianji1 pr-2"></text>
		</uni-list-item> 
		<uni-list-item title="职业" @click="changeWork" clickable>
			<view class="flex align-center justify-center" slot="footer">
				{{getWork}}
			</view>
			<text slot="rightIcon" class="iconfont icon-bianji1 pr-2"></text>
		</uni-list-item> 
		
		<uni-list-item title="家乡" clickable @click="showPicker">
			<view class="flex align-center justify-center" slot="footer">
				{{pickerText}}
			</view>
			<text slot="rightIcon" class="iconfont icon-bianji1 pr-2"></text>
		</uni-list-item> 
		<view @click="submit"  class="m-2 font-lg flex align-center justify-center rounded-circle" style="height: 110rpx;background-color: #fd597c;color: white;"  >
			完成
		</view>
		<city-picker ref="picker" :themeColor="themeColor"  :pickerValueDefault="cityPickerValueDefault"
		         @onCancel="onCancel" @onConfirm="onConfirm"></city-picker>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import cityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	export default{
		onShow(){
			let userinfo = this.user.userinfo
			console.log(userinfo)
			if(userinfo)
			{
				this.username = this.user.username
				this.pickerText = userinfo.path
				this.sex = userinfo.sex
				this.emotion = userinfo.qg
				this.work = userinfo.job
				this.birthday = userinfo.birthday
			}
		},
		components:{
			cityPicker
		},
		methods:{
			showPicker() {
				this.$refs.picker.showPickerView()
				
			},
			onConfirm(e){
				
				this.pickerText = e.label
				this.cityPickerValueDefault = e.value
			},
			onCancel(e){
				console.log('取消选择')
			},
			submit() {
				let obj = {
					name:this.username,
					sex:this.sex,
					qg:this.emotion,
					job:this.job,
					birthday:this.birthday,
					path:this.pickerText
				}
				this.$http.post('/edituserinfo',obj,{
					token:true
				}).then(res=>{
					console.log(res);
					this.$store.commit('editUserInfo',{
						key:"username",
						value:this.username
					})
					this.$store.commit('editUserUserInfo',obj)
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '修改资料成功',
						icon: 'none'
					});
				})
			},
			changeAvatar() {
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					sourceType:['album','camera'],
					success:(res)=>{
						this.$http.upload('/edituserpic',{
							filePath:res.tempFilePaths[0],
							name:'userpic',
							token:true
						}).then(result=>{
							
							this.$store.commit('editUserInfo',{
								key:"userpic",
								value:result.data
							})
							uni.setStorageSync('changeMes','userInfo')
							uni.showToast({
								title:'修改成功'
							})
						}).catch(err=>{console.log(err.message)})
					}
				})
			},
			changeSex() {
				const arr = ['男','女','保密']
				uni.showActionSheet({
					itemList:arr,
					success:res=>{
						this.sex = res.tapIndex
					}
				})
			},
			changeEmotion() {
				const arr = ['保密','已婚','未婚']
				uni.showActionSheet({
					itemList:arr,
					success:res=>{
						this.emotion = res.tapIndex
					}
				})
			},
			changeWork(){
				let JobArray = ['IT','教师','农名']
				uni.showActionSheet({
				    itemList: JobArray,
				    success:(res)=>{
				        this.job = JobArray[res.tapIndex]
				    }
				});
			},
			birthChange(e)
			{
				this.birthday = e.detail.value
			},
		},
		data() {
			return {
				username:'云梦她乡',
				sex:0,
				emotion:0,
				work:0,
				birthday:'2002-7-29',
				themeColor:'#007aff',
				cityPickerValueDefault:[0,0,1],
				pickerText:'浙江温州'
				
			}
		},
		computed:{
			...mapState({
				user:state=>state.user
			}),
			getSex() {
				if(!this.sex) return '男'
				else if(this.sex == 1) return '女'
				else return '保密'
			},
			getEmotion() {
				if(!this.emotion) return '保密'
				else if(this.emotion == 1) return '已婚'
				else return '未婚'
			},
			getWork(){
				if(!this.work) return 'IT'
				else if(this.work == 1) return '农民'
				else if(this.work == 2) return '教师'
				else if(this.work == 3) return '医生'
				else return '经商'
			}
		}
	}
</script>

<style>
	.picker {
		color: rgb(1, 1, 1);
		font-size: 28rpx;
	}
</style>
