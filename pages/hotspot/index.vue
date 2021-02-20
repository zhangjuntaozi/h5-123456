<template>
	<view>
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="transparent" @clickLeft="handleBack">
				<block slot="left"><text class="iconfont iconleft f18 leftback"></text></block>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->
		<view class="hot_main" v-if="list.length > 0">
			<view class="list" v-for="item in list" @click="handler_detail(item)">
				<text class="f18">{{ item.hotlineAppealTitle }}</text>
				<view class="list_b">
					<text class="labels f10">{{ item.hotlineAppealCategory }}</text>
					<text class="f12 time">{{ item.hotlineAppealCreateTime.substring(0, 11) }}</text>
				</view>
			</view>
			<view class="nomore mt15 mb15"><uni-load-more :status="loadStatus"></uni-load-more></view>
		</view>
		<view v-else class="nomore pt50"><uni-load-more :status="nomoreStatus"></uni-load-more></view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			list: [],
			param: {
				page: 1
			},
			pageTotal:1,
			showLoadMore:true,
			nomoreStatus: 'nomore',
			loadStatus:'loading'
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		var _this = this;
		setTimeout(function() {
			_this.loadData();
		}, 1000);
		uni.startPullDownRefresh();
	},
	/*E 初始数据加载*/
	onPullDownRefresh() {
		var _this = this;
		setTimeout(function() {
			uni.stopPullDownRefresh();
			_this.list = [];
			_this.param.page=1
			_this.loadData();
		}, 1000);
	},
	//加载更多
	onReachBottom() {
		//阻止重复加载
		if (!this.showLoadMore) {
			this.showLoadMore = true;
			this.param.page += 1;
			this.loadData();
		}
	},
	onShow() {},
	methods: {
		/* S 初始数据 */
		loadData() {
			uni.showLoading({
				title: '请耐心等待哦'
			});
			var _this = this;
			
			_this.$minApi.hotQuestionApi({ ..._this.param }).then(res => {
				if (res.pageTotal != '0') {
					uni.hideLoading();
					if ( res.pageTotal < _this.param.page || res.list.length<=0) {
						_this.showLoadMore = true;
						_this.loadStatus = 'nomore';
					} else {
						_this.showLoadMore = false;
						_this.loadStatus = 'more'
					}
					_this.pageTotal = res.pageTotal;
					_this.list = _this.list.concat(res.list);
				} else {
					uni.showToast({
						title: res.message
					});
				}
			});
		},
		/* E 初始数据结束  */
		handleBack() {
			uni.navigateTo({
				url: '/pages/home/index'
			});
		},
		handler_detail(item) {
			uni.navigateTo({
				url: 'detail?list=' + JSON.stringify(item)
			});
		}
	}
};
</script>

<style lang="scss">
.hot_main {
	height: calc(100vh);
	background-color: #ffffff;
	padding: 0upx 32upx;
	.list {
		padding: 20upx 0upx;
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
			color: #939393;
		}
		.list_b {
			margin-top: 20upx;
		}
	}
}
</style>
