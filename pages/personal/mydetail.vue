<template>
	<view>
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF">
				<navigator slot="left" animation-type="pop-out" animation-duration="300" open-type="navigateBack"><text class="iconfont iconleft f18"></text></navigator>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->

		<view class="detail ">
			<view class="f22 ">{{ infoObject.hotlineAppealTitle }}</view>
			<view class="flex mb20">
				<view class="desc">
					<text class="mrs f14">{{ infoObject.hotlineAppealPerson }}</text>
					<text class="time f14">{{ infoObject.hotlineAppealCreateTime}}</text>
				</view>
			</view>
			<view class="content color33 f16">{{ infoObject.hotlineAppealContent }}</view>
			<view class="mt15 f14 color33">
				<text>诉求编号：</text>
				{{ infoObject.hotlineAppealOrder }}
			</view>
			<view class="area f14 color33">
				<text>事件辖区：</text>
				{{ infoObject.hotlineAppealJurisdiction }}
			</view>
			<text>上传图片或视频：</text>
			<view class="uni-flex-list_img mt15" >				
				<view class="img" v-for="(itemson, index) in networkOfficeFile">
					<image v-if="handler_imgext(itemson)" :src="imgPath + itemson.url" alt="" class="wid220 hei220" mode="aspectFill" ></image>
					<video v-if="handler_extvedio(itemson)" class="uni-uploader__img" :src="imgPath + itemson.url" objectFit="fill"></video>					
				</view>
			</view>
			<view v-for="(itemson, index) in networkOfficeFile">
				<view v-if="handler_extfile(itemson)" class="mt15">
					<view >上传文件：</view>
					<view class="mt15 line-height uni-divider-line pb10">
						<text class="ico iconfont iconsuccess color_success"></text>
						<text class="pl8  pb10" >{{itemson.name}}</text>
					</view>
				</view>
			</view>
			<view class="replay all_color" v-if="!!infoObject.hotlineReplyTime">
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
			imgPath:'/',
			index: '',
			infoObject: {},
			networkOfficeFile:[],
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		console.log(options);
		this.index = options.index;
		this.hotlineAppealId = options.hotlineAppealId;
		this.loadData()
	},
	/*E 初始数据加载*/
	onShow() {},
	methods: {
		loadData() {
			if (this.index == 'my') {
				var _this = this;
				_this.$minApi.myOrderInfo({ hotlineAppealId: this.hotlineAppealId }).then(res => {
					if (res.code == 200) {
						this.infoObject = res.data;
						this.networkOfficeFile = JSON.parse(res.data.hotlineAppealExternal)
						console.log(this.networkOfficeFile)
					} else {
						uni.showToast({
							title: res.message
						});
					}
				});
			}
		},
		/* S 获取 文件后缀 */
		handler_imgext(res){
			//获取最后一个.的位置
			var index= res.name.lastIndexOf(".");
			//获取后缀
			var ext = res.name.substr(index+1);
			return [
			'png', 'jpg', 'jpeg', 'bmp', 'gif',  'tiff'].
			indexOf(ext.toLowerCase()) !== -1;
		},
		handler_extvedio(res){
			//获取最后一个.的位置
			var index= res.name.lastIndexOf(".");
			//获取后缀
			var ext = res.name.substr(index+1);
			return [
			'avi', 'wma', 'rmvb', 'mp4', '3gp',  'mid'].
			indexOf(ext.toLowerCase()) !== -1;
		},
		//判断文件后缀名
		handler_extfile(res){
			//获取最后一个.的位置
			var index= res.name.lastIndexOf(".");
			//获取后缀
			var ext = res.name.substr(index+1);
			 return [
			 'doc', 'txt'].
			 indexOf(ext.toLowerCase()) !== -1;
		},
		handler_file(item){
			
		},
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
			margin-bottom: 16upx;
		}
	}
	.wid220{
		width: 440upx;
	}
	.hei220{
		height: 440upx
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
}
</style>
