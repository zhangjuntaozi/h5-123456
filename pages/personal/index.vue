<template>
	<view>
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF" left-icon="back" @clickLeft="handleBack">
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->

		<view class="personal p16">
			<view class="header">
				<image class="image" src="../../static/images/personal.png" mode="aspectFill"></image>
				<view class="uni-flex introduction">
					<image class="portrait" :src="userInfo.headimgurl" mode="aspectFill"></image>
					<text class="block f18">{{ userInfo.nickname }}</text>					
				</view>
			</view>
			<view class="list mt15">
				<navigator url="info">
					<view class="list_l">
						<view>
							<image class="per_ico" src="../../static/images/information.png" mode="aspectFill"></image>
							<text class="title">个人信息</text>
						</view>

						<text class="iconfont iconright"></text>
					</view>
				</navigator>
				<!-- <navigator url="collection">
					<view class="list_l">
						<view>
							<image class="per_ico collect_ico" src="../../static/images/collect.png" mode="aspectFill"></image>
							<text class="title">我的收藏</text>
						</view>
						<text class="iconfont iconright"></text>
					</view>
				</navigator> -->
				<navigator url="myorder">
					<view class="list_l">
						<view>
							<image class="per_ico order_ico" src="../../static/images/order.png" mode="aspectFill"></image>
							<text class="title">我的工单</text>
						</view>
						<text class="iconfont iconright"></text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			userInfo: {
				nickname: '',
				headimgurl: ''
			}
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		if(options.openid){
			this.openId = options.openid;
		}
		if(this.openId){
			//获取用户信息		
			this.getInfoUser()
		}else{
			this.userInfo = uni.getStorageSync('userInfo');
			if (this.userInfo) {
				var before = (new Date()).getTime() - 24*3600*1000;
				if(before < this.userInfo.startTime){
					
				}else{
					uni.removeStorageSync('userInfo');
					this.goOauth();
				}
			}else{
				this.goOauth();
			}
		}
	},
	/*E 初始数据加载*/
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
		if(this.userInfo){
			this.handler_info()
		}
	},
	methods: {
		/* S 初始 */
		handler_info(){
			var _this = this
			_this.$minApi.infouser({
					wechatOpenId:_this.userInfo.openid
				})
				.then(res => {
					if(res.code == '200'){	
						console.log(!!res.data)
						if(!!res.data){ //修改过
							_this.userInfo = {
								nickname: res.data.wechatUserName,
							}
							console.log(_this.userInfo)
						}else{ // 没有修改过
							
						}
					}
				});
		},
		/* E 初始 */
		handleBack(){
			uni.navigateTo({
				url:'../home/index'
			})
		},
	
		/* E  是否取到个人信息*/
		/* S 获取 code */
		goOauth() {
			const callbackURL = encodeURIComponent('http://seats.easy8in.top/login/test'); //测试
			const wechatId = 'wx731bbb761b6df538'; //测试
			const redirectURI = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatId}&redirect_uri=${callbackURL}&response_type=code&scope=snsapi_userinfo&state=STATE`;
			window.location.href = redirectURI;
		},
		getCode(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURI(r[2]);
			return null;
		},
		
		// S 获取用户信息
		getInfoUser() {
			var _this = this;
			this.$minApi
				.wanteng_userinfo({
					openid: _this.openId
				})
				.then(res => {
					res.startTime = (new Date()).getTime(); //获取时间	
					uni.setStorageSync('userInfo', res);
					_this.userInfo = res;
				});
		}
		/* S 授权 */
	}
};
</script>

<style lang="scss">
.personal {
	background-color: #ffffff;
	min-height: calc(100vh - 72px);
	max-height: calc(100vh - 94px);
	.header {
		height: 212upx;
		position: relative;
		background: linear-gradient(311deg, #f05138 0%, #ff9751 100%);
		border-radius: 20upx;
		.introduction {
			position: absolute;
			top: 30upx;
			left:-24upx;
			bottom: 30upx;
			color: #ffffff;
			align-items: center;
			.block {
				width: 384upx;
				margin-left: 30upx;
				display: block;
			}
		}
		.image {
			width: 100%;
			height: 100%;
		}
		.portrait {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
			margin-left: 84upx;
		}
	}
	.list_l {
		height: 128upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2upx solid #e6e6e6;
		padding: 0upx 10upx;
		.all_color {
			color: #ff623e;
		}
		.title {
			color: #323233;
			padding-left: 20upx;
			font-size: 32upx;
			vertical-align: middle;
		}
	}
	.per_ico {
		width: 26upx;
		height: 36upx;
		vertical-align: middle;
	}
	.collect_ico {
		width: 36upx;
		height: 36upx;
	}
	.order_ico {
		width: 34upx;
		height: 34upx;
	}
}
</style>
