<script>
	export default {
		onLaunch: function() {
			this.$store.commit('initStatus')
			console.log('App Launch')
			this.$U.onNetwork()
			this.$U.update()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "./static/uni.css";
	@import "./static/icon.css";
	@import "./static/animate.min.css";
	@import "./static/free.css"

	/*每个页面公共css */
</style>
