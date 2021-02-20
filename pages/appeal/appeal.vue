<template>
	<view>
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="transparent"  @clickLeft="handleBack">
				<block slot="left"><text class="iconfont iconleft f18 leftback"></text></block>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->
		<view class="contain">
			<view class="columns">
				<view class="uni-column  column">
					<span class="xh">*</span>
					<view class="uni-label label f16">查询码</view>
					<input class="uni-input input f16" v-model="param.code" type="input" placeholder="请输入查询码" placeholder-class="placeholder_class" />
				</view>
				<view class="uni-column  column">
					<span class="xh">*</span>
					<view class="uni-label label f16">验证码</view>
					<input class="uni-input input f16" placeholder-class="placeholder_class" v-model="param.captcha" @blur="handler_blur" @confirm="handler_blur" type="input" placeholder="请输入验证码" />
					<image :src="validateCodePath" mode="aspectFill" class="code_img" @click="validateCode"></image>
				</view>
			</view>
			<view class="btn f16" @click="handler_query">查询</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			validateCodePath:this.$config.validateCodePath,
			param: {
				code: '', //查询码
				captcha: '' //验证码
			}
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		
	},
	/*E 初始数据加载*/
	onShow() {
		this.validateCode()
	},
	methods: {
		handleBack(){
			uni.navigateTo({
				url:'../home/index'
			})
		},
		/* S 验证码 */
		validateCode() {
			this.validateCodePath = this.validateCodePath + '?d=' + Math.random();
			this.param.captcha = '';
		},
		/* E 验证码 */
		/* S 校验验证码匹配 */
		handler_blur(e){
			this.param.captcha = e.detail.value;
		},
		/* E 校验验证码匹配 */
		/* S 查询 */
		handler_query(){
			if(!this.param.code){
				uni.showToast({
					title:'请输入查询码',
					icon:'none'
				})
				return;
			}
			if(!this.param.captcha){
				uni.showToast({
					title:'请输入验证码',
					icon:'none'
				})
				return
			}
			this.$minApi.searchByCode({code:this.param.code,cache:this.param.captcha}).then(res => {
				if (res.code == 200) {
					var infoDate=res.data
					uni.navigateTo({
						url:'detail?list=' + JSON.stringify(infoDate)
					})
				}else if(res.code == 400){
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}else{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
			});
		},
	}
};
</script>

<style lang="scss">
.contain {
	border-top: 1px solid #e6e6e6;
}
.columns {
	padding: 0px 32upx;
	background-color: #ffffff;
	margin-bottom: 48px;
}
</style>
