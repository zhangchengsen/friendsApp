<template>
	<view class="">
		<uni-collapse accordion="true">
		<uni-collapse-item title="登录问题" showAnimation>
		    <view style="padding: 30rpx;" class="ml-1">
				Q:没有注册的路口啊 
				<br/>
				A:可以直接验证码登录以及第三方登录(正在向外部申请,原生测试已可)
				<br/>
		        Q:绑定了密码 但是用密码登录不进去
				<br/>
				A:不建议用密码登录 同时容易出现问题 建议用验证码登录
				<br/>
		    </view>
		</uni-collapse-item>
		<uni-collapse-item title="绑定问题" showAnimation>
		    <view style="padding: 30rpx;" class="ml-1">
		        Q:微博绑定不了啊
				<br/>
				A:这边微博不太兼容
				<br/>
		    </view>
		</uni-collapse-item>
		<uni-collapse-item title="聊天问题" showAnimation>
		    <view style="padding: 30rpx;" class="ml-1">
		        Q:聊天是实时的吗
				<br/>
				A:是的
				<br/>
				Q:我的聊天用户对象不存在
				<br/>
				A:亲 部分苹果用户会出现这些问题
		    </view>
		</uni-collapse-item>
		<uni-collapse-item title="提示问题" showAnimation>
		    <view style="padding: 30rpx;" class="ml-1">
		        Q:提示token错误,请重新登录
				<br/>
				A:亲 每次进入app先点击我的 这样能减少提示和提高用户的体验
				<br/>
		    </view>
		</uni-collapse-item>
		<uni-collapse-item title="分享问题" showAnimation>
		    <view style="padding: 30rpx;" class="ml-1">
		        Q: 为什么我分享出去的是电商后台管理系统
				<br/>
				A: 亲 暂时还没给 分享出去的内容做页面呢 这也是一个项目 账号admin 密码123456 既可以体验项目
				<br/>
		    </view>
		</uni-collapse-item>
		<uni-collapse-item title="操作问题" showAnimation>
		    <view style="padding: 30rpx;" class="ml-1">
		        Q: 关注了怎么没用
				<br/>
				A: 亲 可能是网络问题  亲亲重新登录一下即可查看到
				<br/>
				Q: 怎么取关
				<br/>
				A: 亲 在个人详情中哦
				<br/>
		    </view>
		</uni-collapse-item>
		<uni-collapse-item title="图片问题" showAnimation>
		    <view style="padding: 30rpx;" class="ml-1">
		        Q: 有些图片怎么是空白的
				<br/>
				A: 亲 是很久之前测试的图片哦 看最新的内容即可
				<br/>
				Q: 图片加载很慢
				<br/>
				A: 亲 云服务器不在内陆 速度稍慢 请谅解
				<br/>
				Q: 头像怎么是空白的 
				<br/>
				A: 在 我的 右上角 资料编辑中设置头像哦！ 第三方登录的头像是没有存入数据库的哦
				<br/>
		    </view>
		</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default{}
</script>

<style>
</style>
