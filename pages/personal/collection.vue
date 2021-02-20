<template>
	<view class="">
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="transparent"  @clickLeft="handleBack">
				<block slot="left"><text class="iconfont iconleft f18 leftback"></text></block>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->

		<view class="hot_main" v-if="articleList.length>0">
			<view class="list" v-for="item in articleList" @click="handler_detail(item)">
				<text class="f18">{{ item.articleTitle }}</text>
				<view class="list_b">
					<text class="f12 time">{{ item.articleCreateTime }}</text>
				</view>
			</view>
			<view class="" v-if="showLoadMore"><uni-load-more :status="loadStatus"></uni-load-more></view>
		</view>
		<view v-else class="nomore pt50"><uni-load-more :status="nomoreStatus"></uni-load-more></view>
		
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			articleList: [],
			params: {
				wechatOpenId: '',
				pageNum: 1,
				count: 10
			},
			showLoadMore: true,
			loadStatus: 'loading',
			nomoreStatus: 'nomore'
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		this.params.wechatOpenId = uni.getStorageSync('userInfo').openid;
		this.handler_loadData();
	},
	/*E 初始数据加载*/
	onShow() {},
	//下拉刷新
	onPullDownRefresh() {
		this.articleList = [];
		this.params.pageNum = 1;
		this.handler_loadData();
		uni.stopPullDownRefresh();
	},
	//加载更多
	onReachBottom() {
		//阻止重复加载
		if (!this.showLoadMore) {
			this.showLoadMore = true;
			this.params.pageNum += 1;
			this.handler_loadData();
		}
	},
	methods: {
		handleBack() {
			uni.navigateTo({
				url: '/pages/personal/index'
			});
		},
		/*S  加载初始数据 */
		handler_loadData() {
			
			var _this = this;
			_this.$minApi.articlePage({ ..._this.params }).then(res => {
				uni.showLoading({
					title: '请耐心等待哦'
				});
				if (res.code == 200) {
					uni.hideLoading();
					if (res.data.resultList.length > 0) {
						if (res.data.resultList.length < _this.params.count) {
							_this.showLoadMore = true;
							_this.loadStatus = 'nomore';
						} else {
							_this.showLoadMore = false;
						}
						_this.articleList = _this.articleList.concat(res.data.resultList);
					}
				} else {
					_this.loadStatus = 'nomore';
					uni.hideLoading();
					uni.showToast({
						title: res.message
					});
				}
			});
		},
		/* E 加载初始数据 */
		handler_detail(e) {
			console.log(e.articleId);
			uni.navigateTo({
				url: 'colldetail?articleId=' + JSON.stringify(e.articleId)
			});
		}
	}
};
</script>

<style lang="scss">
.hot_main {
	height: auto;
	background-color: #ffffff;
	padding: 0upx 32upx;
	.list {
		padding: 20upx 0upx;
		line-height: 1.5;
		border-bottom: 2upx solid #e6e6e6;
		.labels {
			color: #ca3c3e;
			padding: 4upx 12upx;
			background: #ffe7e7;
			border-radius: 4upx;
			display: inline-block;
			margin-right: 20upx;
		}
		.time {
			color: #8f8f92;
		}
		.list_b {
			margin-top: 20upx;
		}
	}
	.nomore {
		text-align: center;
	}
}
</style>
