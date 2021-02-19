<template>
	<view class="success">
		<image class="suc_img" src="../../static/images/seccess.png" mode="aspectFill"></image>
		<view class="suc_tip">
			<text class="f16 fontwei6 color33 ">登记成功</text>
			<text class="color33 f12 ">已收到您的诉求，我们将及时为您处理</text>
		</view>
		<view class="suc_btn f16" @tap="handler_home">回到微首页</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {},
	/*E 初始数据加载*/
	onShow() {},
	methods: {
		/* S 回到微首页 */
		handler_home(){
			uni.navigateTo({
				url:'../home/index'
			})
		},
		/* S 回到微首页 */
	}
};
</script>

<style lang="scss">
.success{
	height: 100vh;
	background-color: #F7F7F7;
	padding:128upx 64upx 0upx;
	// overflow-y: hidden;
	.suc_img{
		width: 402upx;
		height: 318upx;
		margin:0upx 108upx;
	}
	.suc_tip{
		margin-top: 48upx;
		text-align: center;
		text{
			display: block;
			padding-bottom: 16upx;
		}
	}
	.suc_btn{
		width: 622upx;
		height: 88upx;
		line-height: 88upx;
		background: #CA3C3E;
		border: 2upx solid #CA3C3E;
		border-radius: 44upx;
		text-align: center;
		color: #FFFFFF;
		margin-top: 112upx;
	}
}
</style>
