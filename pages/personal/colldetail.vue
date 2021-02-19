<template>
	<view>
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF">
				<navigator slot="left" animation-type="pop-out" animation-duration="300" open-type="navigateBack"><text class="iconfont iconleft f18"></text></navigator>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->

		<view class="detail">
			<text class="title f22">{{ infoObject.articleTitle }}</text>
			<view class="flex mt15 f12">
				<view class="mr16 f12">
					来源：
					<text>{{ infoObject.articleSource }}</text>
				</view>
				<text>{{ infoObject.articleLatestTime.substring(0, 11) }}</text>
				<!-- <view class="collect collect_active all_color" @click="handler_addcollect(infoObject.articleId)">
				<text class="iconfont iconcollect f12 icon_coll"></text>
				收藏
			</view>
			<view class="collect" @click="handler_cancelCollect(infoObject.articleId)">
				已收藏
			</view> -->
			</view>
			<view class="article f16 color33"><rich-text :nodes="infoObject.articleContent"></rich-text></view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			articleId: '',
			infoObject: {
				articleContent: '',
				articleLatestTime: '',
				articleTitle: ''
			}
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		this.articleId = JSON.parse(options.articleId);
		console.log(options, this.articleId);
		this.loadData();
	},
	/*E 初始数据加载*/
	onShow() {},
	methods: {
		loadData() {
			var _this = this;
			_this.$minApi.articleinfo({ articleId: _this.articleId }).then(res => {
				if (res.code == 200) {
					_this.infoObject = res.data;
				} else {
					uni.showToast({
						title: res.message
					});
				}
			});
		},
		/* S 收藏文章 */
		handler_addcollect(id) {
			var _this = this;
			_this.$minApi.addArticle({ articleId: id }).then(res => {
				if (res.code == 200) {
					_this.infoObject = res.data;
				} else {
					uni.showToast({
						title: res.message
					});
				}
			});
		},
		/* S 取消文章 */
		handler_cancelCollect(id) {
			var _this = this;
			_this.$minApi.cancelArticle({ wechatArticleId: id }).then(res => {
				if (res.code == 200) {
					uni.showToast({
						title: res.message
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
.detail {
	background-color: #ffffff;
	padding: 20upx 32upx;
	.title {
		color: #060606;
		line-height: 1.5;
	}
	.flex {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #979899;
	}
	.article {
		margin-top: 48upx;
		line-height: 2;
	}
	.collect {
		width: 128upx;
		height: 52upx;
		line-height: 52upx;
		text-align: center;
		background: #ffffff;
		border-radius: 26upx;
		background-color: #f5f5f5;
		color: #999999;
	}
	.collect_active {
		border: 2upx solid #ca3c3e;
		background-color: #ffffff;
		.icon_coll {
			padding-right: 4upx;
		}
	}
}
</style>
