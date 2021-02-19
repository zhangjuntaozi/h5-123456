<template>
	<view>
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF" >
				<navigator slot="left" animation-type="pop-out" animation-duration="300" open-type="navigateBack"><text class="iconfont iconleft f18"></text></navigator>
				
			</uni-nav-bar>
		</view>
	
	<view class="detail ">
		<view class="f22 ">
			{{infoDate.hotlineAppealTitle}}
		</view>		
		<view class="flex mb20">
			<view class="desc">
				<text class="mrs f12">{{infoDate.hotlineAppealPerson}}</text>
				<text class="time f12">{{infoDate.hotlineAppealCreateTime}}</text>
			</view>
		</view>
		<view class="content color33 f16">
			{{infoDate.hotlineAppealContent}}
		</view>
		<view class="mt15 f14 color33">
			<text>诉求编号：</text>{{infoDate.hotlineAppealOrder}}
		</view>
		<view class="area mt15 f14 color33">
			<text>事件辖区：</text>{{infoDate.hotlineAppealJurisdiction}}
		</view>
		<view class="replay all_color mt40">
			<text class="">处办回复：</text>
			<view class="re_content f16 mb15">
				{{infoDate.hotlineReplyContent}}
			</view>
			<view class="mt20 rep_area f14">
				<text>处办单位：</text>
				<text>{{infoDate.hotlineReplyJurisdiction}}</text>
			</view>
			<view class="f12 color93 mt15">
				{{infoDate.hotlineReplyTime}}
			</view>
		</view>
	</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			infoDate:{
				hotlineAppealTitle:'',
				hotlineAppealPerson:'',
				hotlineAppealContent:'',
				hotlineAppealOrder:'',
				hotlineAppealCreateTime:'',
				hotlineAppealOrder:'',
				hotlineAppealJurisdiction:'',
				hotlineReplyContent:'',
				hotlineReplyJurisdiction:'',
				hotlineReplyTime:'',
			}
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		if(options.list){
			this.infoDate = JSON.parse(options.list)
		}else{
			uni.showModal({
				title:'温馨提示',
				content:'网络开小差啦!请重新查询哦',
				showCancel:false,
				confirmText:'知道啦',
				success(res) {
					 if (res.confirm) {
					     uni.navigateTo({
					     	url:'appeal'
					     })
					 }
				}
			})
		}
	},
	/*E 初始数据加载*/
	onShow() {},
	methods: {
		
	}
};
</script>

<style lang="scss">
.detail{
	height: calc(100vh);
	background-color: #FFFFFF;
	padding:20upx 32upx;
	.flex{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 32upx;
	}
	.desc{		
		.mrs{
			color: #333333;
			padding-right: 32upx;
		}
		.time{
			color: #939393;
		}
	}
	.collect{
		width: 128upx;
		height: 52upx;
		line-height: 52upx;
		text-align: center;
		background: #FFFFFF;		
		border-radius: 26upx;
		background-color: #F5F5F5;
		color: #999999;
	}
	.collect_active{
		border: 2upx solid #CA3C3E;
		background-color: #FFFFFF;
		.icon_coll{
			padding-right: 4upx;
		}
	}
	.content{
		line-height: 2;
	}
	.area{
		margin-top: 16upx;
		margin-bottom: 48upx;
	}
	.replay{
		padding:32upx;
		background-color: #FFF6F6;
		.re_content{
			color:#414141;
			margin-top: 16upx;
			line-height:1.5;
		}
		.rep_area{
			color:#404040 ;
			margin-bottom: 16upx;
		}
	}
}
</style>
