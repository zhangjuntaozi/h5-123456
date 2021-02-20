<template>
	<view class="">
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="transparent">
				<navigator slot="left" animation-type="pop-out" animation-duration="300" open-type="navigateBack"><text class="iconfont iconleft f18"></text></navigator>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->

		<view class="detail ">
			<view class="f22 ">{{objectInfo.hotlineAppealTitle}}</view>
			<view class="flex mb20">
				<view class="desc">
					<text class="mrs f12">{{handler_hide(objectInfo.hotlineAppealPerson)}}</text>
					<text class="time f12">{{objectInfo.hotlineAppealCreateTime}}</text>
				</view>
				<!-- <view class="collect collect_active all_color" @click="handler_addcollect(infoObject.articleId)">
				<text class="iconfont iconcollect f12 icon_coll"></text>
				收藏
			</view>
			<view class="collect" @click="handler_cancelCollect(infoObject.articleId)">
				已收藏
			</view> -->
			</view>
			<view class="content color33 f16">{{objectInfo.hotlineAppealContent}}</view>
			<view class="mt15 f12 color33">
				<text>诉求编号：</text>
				{{objectInfo.hotlineAppealOrder}}
			</view>
			<view class="area f12 color33">
				<text>事件辖区：</text>
				{{objectInfo.hotlineAppealJurisdiction}}
			</view>
			<view class="replay all_color">
				<text class="">处办回复：</text>
				<view class="re_content f16 mb15">{{objectInfo.hotlineReplyContent}}</view>
				<!-- <view class="mt15 rep_area f12">
					<text>处办单位：</text>
					<text></text>
				</view> -->
				<view class="f12 color93">{{objectInfo.hotlineReplyTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			objectInfo:{
				hotlineAppealTitle:''
			},
			
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		this.objectInfo = JSON.parse( options.list);
		uni.setNavigationBarTitle({
			title: this.objectInfo.hotlineAppealTitle
		});
		uni.setNavigationBarColor({
		    frontColor: '#000000',
		    backgroundColor: '#000000',
		    animation: {
		        duration: 400,
		        timingFunc: 'easeIn'
		    }
		})
	},
	/*E 初始数据加载*/
	onShow() {},
	methods: {
		/*S 名字隐藏字符*/
		handler_hide(string) {
			if (string) {
				let arrBox = [...string];
				var str = '';
				arrBox.map((res, index) => {
					if (index > 0) {
						str += '*';
					} else {
						str += res;
					}
				});
				return str;
			}
		},
		/*E 名字隐藏字符*/
	}
};
</script>

<style lang="scss">
.detail {
	height: calc(100vh);
	background-color: #ffffff;
	padding: 20upx 32upx;
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 32upx;
	}
	.desc {
		.mrs {
			color: #333333;
			padding-right: 32upx;
		}
		.time {
			color: #939393;
		}
	}

	.content {
		line-height: 2;
	}
	.area {
		margin-top: 16upx;
		margin-bottom: 48upx;
	}
	.replay {
		padding: 32upx;
		background-color: #fff6f6;
		.re_content {
			color: #414141;
			margin-top: 16upx;
			line-height: 1.5;
		}
		.rep_area {
			color: #404040;
			margin-bottom: 16upx;
		}
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
