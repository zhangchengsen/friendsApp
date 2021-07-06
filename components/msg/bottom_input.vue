<template>
	<view class="fixed-bottom flex border-top">
		<view class=" w-100 m-2 flex align-center justify-center" >
			<input type="text" :focus="focus" v-model = "inputVal" placeholder="写点什么给你的朋友吧" style="background-color: #F7F7F7;" class="w-100 p-1 rounded"  value="" />
		</view>
		<view @click="send" class="animated iconfont icon-fabu flex align-center justify-center font-md mr-2" hover-class="pulse">
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			focus:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				inputVal:""
			}
		},
		methods:{
			send() {
				this.$emit("send",{inputVal:this.inputVal})
				this.inputVal = ""
			}
		},
		computed:{
			tof()
			{
				console.log(this.focus + "33")
			}
		}
		
	}
</script>

<style>
</style>
