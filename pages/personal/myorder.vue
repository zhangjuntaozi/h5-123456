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
			<text class="f18">{{item.hotlineAppealTitle}}</text>
			<view class="list_b">
				<text class="labels f10">{{item.hotlineAppealCategory}}</text>
				<text class="f12 time">{{item.hotlineAppealCreateTime}}</text>
			</view>
		</view>
		<view v-if="showLoadMore" class="nomore pt50"><uni-load-more :status="loadStatus"></uni-load-more></view>
	</view>
	<view v-else class="nomore pt50"><uni-load-more :status="nomoreStatus"></uni-load-more></view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			articleList:[],
			params:{
				pageNum :1,
				count:10,
				wechatOpenId :''
			},
			nomoreStatus: 'nomore'
		};
	},
	onLoad(options) {
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
		handleBack(){
			uni.navigateTo({
				url:'/pages/personal/index'
			})
		},
		/*S  加载初始数据 */
		handler_loadData() {
			uni.showLoading({
				title: '请耐心等待哦'
			});
			this.params.wechatOpenId  = uni.getStorageSync('userInfo').openid
			var _this = this;
			_this.$minApi.hotlinePage({ ..._this.params }).then(res => {
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
					}else{
						_this.showLoadMore = true;
						_this.loadStatus = 'nomore';
					}
				} else {
					uni.showToast({
						title: '网络开小差啦！',
						icon:'none'
					});
					uni.hideLoading();
				}
			});
		},
		/* E 加载初始数据 */
		handler_detail(date){
			var index = 'my';
			var hotlineAppealId = date.hotlineAppealId
			uni.navigateTo({
				url:'mydetail?index=' +index + "&hotlineAppealId="+hotlineAppealId
			})
		}
	}
};
</script>

<style lang="scss">
.hot_main{
	height: calc(100vh);
	background-color: #FFFFFF;
	padding:0upx 32upx;
	.list{
		padding:20upx 0upx;
		border-bottom: 2upx solid #E6E6E6;
		.labels{
			color:#CA3C3E ;
			padding:4upx 12upx;
			background: #FFE7E7;
			border-radius: 4upx;
			display: inline-block;
			margin-right: 20upx;
		}
		.time{
			color:#939393 ;
		}
		.list_b{
			margin-top: 20upx;
		}
	}
}
</style>
