<template>
	<uni-popup ref="popup"  type="bottom" style="z-index: 9998;">
		<view class="p-2 text-center" style="background-color: #fff;border-bottom:1rpx solid #fff">
			分享到↓
		</view>
		
			<view>
				<!-- #ifdef APP-PLUS -->
				
				<view class="  flex bg-white" v-if="providerList.length > 0">
					<block v-for="(value,index) in providerList" :key="index">
						<view style="" v-if="value" :disabled="isDisableButton(value)" @tap="share(value)" class=" flex-1 flex-column flex align-center  justify-center bg-white">
							
							<view  style="height: 80rpx;width: 80rpx;" class="iconfont rounded-circle flex align-center justify-center" :class="value.icon +' '+'bg-'+value.color "  >
							</view>
							<text>{{value.name}}</text>
						</view>
					</block>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP || QUICKAPP-WEBVIEW -->
				<view class="">
					<button type="primary" open-type="share">分享</button>
				</view>
				<!-- #endif -->
			</view>
			<view class="bg-white flex align-center justify-center" style="height: 80rpx;" @click="close">
				关闭
			</view>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				title: 'share',
				shareText: '电商后台管理系统 账号admin 密码123456',
				href:"http://39.96.217.68/#/login",
				image: '',
				shareType:0,
				providerList: []
			}
		},
		computed:{
			isDisableButton() {
				return function(item) {
					if(this.shareType === 0 && item.id === 'qq'){
						return true;
					}
					if(this.shareType === 5 && item.name !== '分享到微信好友'){
						return true;
					}
					return false;
				}
			}
		},
		onShareAppMessage() {
			return {
				title: this.shareText ? this.shareText : "欢迎体验uni-app",
				path: '/pages/tabBar/component/component',
				imageUrl:this.image ? this.image : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png'
			}
		},
		beforeDestroy:function(){
			this.shareText='电商后台管理系统 账号admin 密码123456！',
			this.href = 'http://39.96.217.68/#/login',
			this.image='';
		},
		beforeMount: function () {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					console.log('success', e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									icon:'icon-weixin',
									color:'success',
									name: '微信好友',
									id: 'weixin',
									sort:0
								})
								data.push({
									icon:'icon-faxian',
									color:'success',
									name: '朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									icon:"icon-xinlangweibo",
									color:'danger',
									name: '新浪微博',
									id: 'sinaweibo',
									sort:2
								})
								break;
							case 'qq':
								data.push({
									icon:"icon-QQ",
									color:'primary',
									name: 'QQ好友',
									id: 'qq',
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
		},
		methods: {
			open(e) {
				this.shareText = e.shareText
				this.image = e.image
				this.href = e.href || 'http://39.96.217.68/#/login'
				this.title = e.title
				console.log(this.shareText)
				console.log(this.image)
				console.log(this.href)
				console.log(this.title)
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			}
			,
			async share(e) {
				console.log('分享通道:'+ e.id +'； 分享类型:' + this.shareType);
				
				if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
					uni.showModal({
						content:'分享内容不能为空',
						showCancel:false
					})
					return;
				}
				
				if(!this.image && (this.shareType === 2 || this.shareType === 0)){
					uni.showModal({
						content:'分享图片不能为空',
						showCancel:false
					})
					return;
				}
				
				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel:false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel:false
						})
					},
					complete:function(){
						console.log('分享操作结束!')
					}
				}
				
				switch (this.shareType){
					case 0:
						shareOPtions.summary = this.shareText;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = this.title;
						shareOPtions.href = this.href;
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.image ? this.image : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png'
						shareOPtions.title = this.title;
						shareOPtions.miniProgram = {
							id:'gh_33446d7f7a26',
							path:'/pages/tabBar/component/component',
							webUrl:this.href,
							type:0
						};
						break;
					default:
						break;
				}
				
				if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = this.href;
					shareOPtions.title = this.title;
				}
				uni.share(shareOPtions);
			},
			radioChange(e){
				console.log('type:' + e.detail.value);
				this.shareType = parseInt(e.detail.value);
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						this.image = res.tempFilePaths[0];
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			compress(){//压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:'分享图片太大,需要请重新选择图片!',
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content:'分享图片太大,需要请重新选择图片!',
							showCancel:false
						})
					})
				})
			}
		}
	}
</script>

<style>
</style>
