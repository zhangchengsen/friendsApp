<template>
	<view class="fixed-bottom flex border-top">
		<view class=" w-100 m-2 flex align-center justify-center" >
			<input type="text" :focus="focus" @blur = "blur" v-model = "inputVal" :placeholder=" focus ? '回复他/她' : '写点什么给你的朋友吧' " style="background-color: #F7F7F7;" class="w-100 p-1 rounded"  value="" />
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
			},
			blur () {
				this.$emit('toBlur')
			}
		},
		computed:{
		}
		
	}
</script>

<style>
</style>
