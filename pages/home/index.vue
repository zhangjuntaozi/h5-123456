<template>
	<view class="home_main ">
		<view class="home_top">
			<view class="location"><image class="logo" src="../../static/images/logo.png" mode="aspectFill"></image></view>
			<view class="f33 title">大同市市民热线</view>
			<text class="line"></text>
			<text class="Subhead pl8 pr8">专业 · 热情 · 服务 · 24小时</text>
			<text class="line"></text>
		</view>
		<view class="home_b">
			<view class="home_list">
				<navigator class="navigator" url="../index/index">
					<image class="ico_image" src="../../static/images/submit.png" mode="aspectFill"></image>
					<view class="color312 mt15 icon_title">微提交</view>
				</navigator>
			</view>
			<view class="home_list">
				<navigator class="navigator" url="../appeal/appeal">
					<image class="ico_image ico_search" src="../../static/images/search.png" mode="aspectFill"></image>
					<view class="color312 mt15 icon_title">诉求查询</view>
				</navigator>
			</view>
			<view class="home_list">
				<view class="navigator" @click="handler_presonal">
					<image class="ico_image " src="../../static/images/broadcast.png" mode="aspectFill"></image>
					<view class="color312 mt15 icon_title">数据播报</view>
				</view>
			</view>
			<view class="home_list">
				<navigator class="navigator" url="../personal/index">
					<image class="ico_image" src="../../static/images/per_ico.png" mode="aspectFill"></image>
					<view class="color312 mt15 icon_title">个人中心</view>
				</navigator>
			</view>
			<view class="home_list">
				<navigator class="navigator" url="../hotspot/index">
					<image class="ico_image" src="../../static/images/problem.png" mode="aspectFill"></image>
					<view class="color312 mt15 icon_title">热点问题</view>
				</navigator>
			</view>
			<view class="home_list">
				<navigator class="navigator" url="../hotnews/index">
					<image class="ico_image ico_dynamic" src="../../static/images/dynamic.png" mode="aspectFill"></image>
					<view class="color312 mt15 icon_title">热线动态</view>
				</navigator>
			</view>
		</view>
		<view class="home_horn"></view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			redirectCode: '',
			openId: '',
			startTime: '',
			endTime: ''
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {		
		if (options.openid) {
			this.openId = options.openid;
		}
		if (this.openId) {
			//获取用户信息
			this.getInfoUser();
		} else {
			var userInfo = uni.getStorageSync('userInfo');
			if (userInfo.openid) {
				var before = (new Date()).getTime() - 24*3600*1000;
				if(before < userInfo.startTime){
					this.handler_auth();
				}else{
					uni.removeStorageSync('userInfo');
					this.goOauth();
				}
			} else {
				this.goOauth();
			}
		}
	},
	/*E 初始数据加载*/
	onShow() {
		this.handler_auth();
	},
	created() {
		
	},
	methods: {
		/*S  获取 微信用户信息 */
		/* S 获取 code */
		goOauth() {
			const callbackURL = encodeURIComponent('http://seats.easy8in.top/login/test'); //测试
			const wechatId = 'wx731bbb761b6df538'; //测试
			const redirectURI = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatId}&redirect_uri=${callbackURL}&response_type=code&scope=snsapi_userinfo&state=STATE`;
			window.location.href = redirectURI;
		},
		getInfoUser() {
			var _this = this;
			this.$minApi
				.wanteng_userinfo({
					openid: _this.openId
				})
				.then(res => {	
					res.startTime = (new Date()).getTime(); //获取时间	
					uni.setStorageSync('userInfo', res);
				});
		},
		/* E 获取 微信用户信息 */
		/* S 授权 */
		handler_auth() {
			this.$minApi
				.authorization({
					applicationAppKey: 'bea00620-c83a-4ecf-b762-b7dc7f8cf387',
					applicationAppSecret: '2835268052358449330564851535334193308346662441761957035157096666'
				})
				.then(res => {
					if (res.code == 200) {
						uni.setStorageSync('WT-APP-TOKEN', res.data);
					} else {
						uni.showToast({
							title: res.message,
							icon:'none'
						});
					}
				});
		},
		/* S便民服务 */
		handler_presonal() {			
			window.location.href =  'https://' + 'www.baidu.com';
		}
		/* E 便民服务 */
	}
};
</script>

<style lang="scss">
.home_main {
	height: 100vh;
	position: relative;
	color: #ffffff;
	background: linear-gradient(90deg, #ebedf0 0%, #f5eee8 100%);
	.home_top {
		height: 470upx;
		text-align: center;
		background: url(../../static/images/banner.png) no-repeat;
		background-size: cover;
		.title {
			display: block;
			padding: 16upx 0px;
			line-height: 1.5;
		}
		.line {
			display: inline-block;
			vertical-align: middle;
			width: 54upx;
			height: 2upx;
			background: #ffffff;
		}
		.Subhead {
			display: inline-block;
			vertical-align: middle;
		}
	}
	.icon_title {
		text-align: center;
	}
	.location {
		text-align: center;
		padding-top: 70upx;
	}
	.logo {
		width: 76upx;
		height: 66upx;
	}
	.icon_dt {
		margin-right: 12upx;
	}
	.home_b {
		position: absolute;
		z-index: 10;
		top: 332upx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		padding: 0upx 48upx;
		.navigator {
			width: 312upx;
			padding: 50upx 0upx;
			text-align: center;
		}
		.home_list {
			width: 312upx;
			height: 206upx;
			margin-bottom: 32upx;
			line-height: 1;
			background: #ffffff;
			box-shadow: 0upx 2upx 20upx rgba(241, 206, 206, 0.4);
			border-radius: 20upx;
		}
	}
	.home_horn {
		position: fixed;
		z-index: 1;
		bottom: 0upx;
		right: 0upx;
		width: 100%;
		height: 516upx;
		background: url(../../static/images/bg.png) no-repeat;
		background-size: cover;
	}
}
</style>
