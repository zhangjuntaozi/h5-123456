<template>
	<view>
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="transparent">
				<navigator slot="left" animation-type="pop-out" animation-duration="300" open-type="navigateBack"><text class="iconfont iconleft f18"></text></navigator>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->

		<view class="detail ">
			<view class="f22 ">{{ infoObject.hotlineAppealTitle }}</view>
			<view class="flex mb20">
				<view class="desc">
					<text class="mrs f14">{{ infoObject.hotlineAppealPerson }}</text>
					<text class="time f14">{{ infoObject.hotlineAppealCreateTime }}</text>
				</view>
			</view>
			<view class="content color33 f18">{{ infoObject.hotlineAppealContent }}</view>
			<view class="mt15 f14 color33" v-if="!!infoObject.hotlineAppealReplyTime">
				<text>诉求编号：</text>
				{{ infoObject.hotlineAppealOrder }}
			</view>
			<view class="area f14 color33">
				<text>事件辖区：</text>
				{{ infoObject.hotlineAppealJurisdiction }}
			</view>
			<text>上传图片或视频：</text>
			<view class="uni-flex-list_img mt15">
				<view class="img" v-for="(itemson, index) in networkOfficeFile">
					<image v-if="handler_imgext(itemson)" :src="imgPath + itemson.url" alt="" class="wid220 hei220" mode="aspectFill" @tap="previewImage"></image>
					<view v-if="handler_extvedio(itemson)" class="vedio_box">
						<video
							:data-id="'video' + index"
							:key="index"
							:id="'video' + index"
							class="wid220 hei220"
							:src="imgPath + itemson.url"
							object-fit="fill"
							controls
							:show-center-play-btn="false"
							:controls="contimg"
							@play="playFun(itemson)"
							@pause="pauseFun(itemson)"
							@ended="endedFun(itemson)"
							@fullscreenchange="fullscreenchange(val,e)"
						></video>
						<view class="video-img" @tap="videoPlay(itemson, index)" v-show="itemson.show"><text class="iconfont iconplay f45 colorfff"></text></view>
					</view>
				</view>
			</view>
			<view v-for="(itemson, index) in networkOfficeFile">
				<view v-if="handler_extfile(itemson)" class="mt15">
					<view>上传文件：</view>
					<view class="mt15 line-height uni-divider-line pb10">
						<text class="ico iconfont iconsuccess color_success"></text>
						<text class="pl8  pb10">{{ itemson.name }}</text>
					</view>
				</view>
			</view>
			<view class="replay all_color mt20" v-if="!!infoObject.hotlineReplyTime">
				<text class="">处办回复：</text>
				<view class="re_content f16 mb15">{{ infoObject.hotlineReplyContent }}</view>

				<view class="mt15 rep_area f12">
					<text>处办单位：</text>
					<text>{{ infoObject.hotlineReplyAccountName }}</text>
				</view>
				<view class="f12 color93">{{ infoObject.hotlineReplyTime }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			imgPath: '/',
			index: '',
			infoObject: {},
			banner: {
				title: ''
			},
			networkOfficeFile: [],
			contimg: false //隐藏原生视频播放按钮
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		this.index = options.index;
		this.hotlineAppealId = options.hotlineAppealId;
		this.loadData();
	},
	/*E 初始数据加载*/
	onShow() {},
	onReady() {
		this.videoContext = uni.createVideoContext('myVideo', this);
	},
	methods: {
		/* S 初始加载数据 */
		loadData() {
			if (this.index == 'my') {
				var _this = this;
				_this.$minApi.myOrderInfo({ hotlineAppealId: this.hotlineAppealId }).then(res => {
					if (res.code == 200) {
						this.infoObject = res.data;
						this.networkOfficeFile = JSON.parse(res.data.hotlineAppealExternal);
						this.networkOfficeFile.forEach((v, i) => {
							v.show = true;
						});
						this.banner.title = this.infoObject.hotlineAppealTitle;
						uni.setNavigationBarTitle({
							title: this.banner.title
						});
					} else {
						uni.showToast({
							title: res.message
						});
					}
				});
			}
		},
		/* E 初始加载数据结束 */
		/* S 获取 文件后缀 */
		handler_imgext(res) {
			//获取最后一个.的位置
			var index = res.name.lastIndexOf('.');
			//获取后缀
			var ext = res.name.substr(index + 1);
			return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
		},
		handler_extvedio(res) {
			//获取最后一个.的位置
			var index = res.name.lastIndexOf('.');
			//获取后缀
			var ext = res.name.substr(index + 1);
			return ['avi', 'wma', 'rmvb', 'mp4', '3gp', 'mid'].indexOf(ext.toLowerCase()) !== -1;
		},
		//判断文件后缀名
		handler_extfile(res) {
			//获取最后一个.的位置
			var index = res.name.lastIndexOf('.');
			//获取后缀
			var ext = res.name.substr(index + 1);
			return ['doc', 'txt'].indexOf(ext.toLowerCase()) !== -1;
		},
		/*S 预览*/
		previewImage: function(e) {
			var current = e.target.dataset.src;
			console.log(current);
			var array = [];
			this.networkOfficeFile.map(i => {
				if (this.handler_imgext(i)) {
					array.push('/' + i.url);
				}
			});
			uni.previewImage({
				current: current,
				urls: array
			});
		},
		/*E 预览*/
		/* S 视频自定义按钮 开始 */
		// 点击自定义播放按钮
		videoPlay(val, index) {
			let _this = this;
			let currentId = 'video' + index; // 获取当前视频id
			this.videoContent = uni.createVideoContext(currentId, _this).play();
			// 获取视频列表
			val.show = false;
			this.$forceUpdate();
			let trailer = this.networkOfficeFile;
			trailer.forEach((item, index) => {
				if (_this.handler_extvedio(item)) {
					// 获取json对象并遍历, 停止非当前视频
					if (item.url != null && item.url != '') {
						let temp = 'video' + item.id;
						if (temp != currentId) {
							// 暂停其余视频
							uni.createVideoContext(temp, _this).pause(); //暂停视频播放事件
						}
					}
				}
			});
		},
		playFun(val) {
			val.show = false;
			this.$forceUpdate();
		},
		pauseFun(val) {
			val.show = true;
			this.$forceUpdate();
		},
		endedFun(val) {
			val.show = true;
			this.$forceUpdate();
		},
		fullscreenchange(val,e) {
			alert(e.detail.fullScreen)
			if (e.detail.fullScreen) {
				//全屏
				val.show = false;
				this.$forceUpdate();
			} else {
				//非全屏
				val.show = true;
				this.$forceUpdate();
			}
		}
		/* E 视频自定义按钮结束 */
	}
};
</script>

<style lang="scss">
.detail {
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
			margin-bottom: 10upx;
		}
	}
	.wid220 {
		width: 440upx;
	}
	.hei220 {
		height: 440upx;
	}
	.uni-flex-list_img {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		align-items: center;
	}
	.img {
		margin-bottom: 10upx;
		margin-right: 5upx;
	}
	.img:nth-child(3n) {
		margin-right: -2upx;
	}
	.vedio_box {
		position: relative;
	}
	.video-img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
