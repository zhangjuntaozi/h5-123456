<template>
	<view class="info">
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF"  @clickLeft="handleBack">
				<block slot="left"><text class="iconfont iconleft f18 leftback"></text></block>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->
		<view class="contain">
			<view class="columns">
				<view class="uni-column  column">
					<span class="xh">*</span>
					<view class="uni-label label f16">姓名</view>
					<input class="uni-input input f16" v-model="param.wechatUserName" type="input" placeholder="请输入姓名" placeholder-class="placeholder_class" />
				</view>
				<view class="uni-column  column">
					<span class="xh">*</span>
					<view class="uni-label label f16">性别</view>
					<picker class="uni_picker input " mode="selector" :range="pickerDate_sex" :range-key="'label'" :value="index" @change="handlerPicker_sex">
						<view class="f16 all_picker" :class="!param_sex ? 'pickerCategory' : 'picker_active'">{{ param_sex ? sex : '请选择性别' }}</view>
						
					</picker>
				</view>
				<view class="uni-column  column">
					<span class="xh">*</span>
					<view class="uni-label label f16">手机号</view>
					<input
						class="uni-input input f16"
						placeholder-class="placeholder_class"
						v-model="param.wechatUserPhone   "
						@blur="handler_phone"
						@confirm="handler_phone"
						type="input"
						placeholder="请输入手机号"
					/>
				</view>
			</view>
			<view class="btn f16" @click="handler_btn">绑定</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			pickerDate_sex: this.$configType.sex_enum, //性别
			index: 0,
			param: {
				wechatUserName  : '',
				wechatUserSex : '',
				wechatUserPhone   : '',
				wechatOpenId:''
			},
			sex: '',
			param_sex: false,
			wechatUserId :'',
		};
	},
	/*S 监听页面滚动*/
	onPageScroll(e) {},
	/*E 监听页面滚动*/
	/*S 初始数据加载*/
	onLoad(options) {
		if(uni.getStorageSync('userInfo')){
			this.param.wechatOpenId = uni.getStorageSync('userInfo').openid;
			if(this.param.wechatOpenId)	{
				var data = uni.getStorageSync('userInfo')
				this.param_sex=true;
				this.param ={
					wechatUserName  : data.nickname,
					wechatUserSex : data.sex,
					wechatUserPhone   : '',
					wechatOpenId:data.openid
				}
				this.sex = this.handler_gender(data.sex)
				this.handler_info();
			}
		}else{
			uni.showModal({
				title:'温馨提示',
				content:'请绑定个人信息哦！',
				showCancel:false,
				confirmText:'知道啦！'
			})
		}
	},
	/*E 初始数据加载*/
	onShow() {},
	methods: {
		handleBack(){
			uni.navigateTo({
				url:'/pages/personal/index'
			})
		},
		/* S 初始 */
		handler_info(){
			var _this = this
			_this.$minApi.infouser({
					wechatOpenId:_this.param.wechatOpenId
				})
				.then(res => {
					if(res.code == '200'){	
						console.log(!!res.data)
						if(!!res.data){ //修改过
							_this.wechatUserId = res.data.wechatUserId;
							_this.param = res.data;
							_this.handler_gender(res.data.wechatUserSex)
						}else{ // 没有修改过
							_this.wechatUserId = res.data;
							_this.handler_gender(_this.param.wechatUserSex);
						}
					}
				});
		},
		/* E 初始 */
		/* S 性别转化 */
		handler_gender(data){
			var wechatUserSex='';
			if(data==0){
				wechatUserSex = '未知';
			}else if(data==1){
				wechatUserSex = '男';
			}else{
				wechatUserSex = '女';
			}
			this.param_sex = true;
			this.sex = wechatUserSex;
			this.param.wechatUserSex = data;
		},
		/* E 性别转化 */
		/* S 性别选择 */
		handlerPicker_sex(e) {
			var sexObject = this.pickerDate_sex[e.detail.value];
			this.param.wechatUserSex  = sexObject.value;
			this.sex = sexObject.label;
			this.param_sex = true;
		},
		/* E 性别选择 */
		/* S 手机号 */
		handler_phone(e) {
			if (e.detail.value) {
				this.param.wechatUserPhone  = e.detail.value;
				var regexp = /^(13[0-9]|14[1579]|15[0-3,5-9]|16[6]|17[0123456789]|18[0-9]|19[89])\d{8}$/;
				if (!regexp.test(e.detail.value)) {
					uni.showToast({
						title: '手机号码不正确',
						icon: 'none'
					});
				}
			}
		},
		/* E 手机号 */
		/* S 绑定 */
		handler_btn() {
			console.log(this.param)
			if (!this.param.wechatUserName) {
				uni.showToast({
					title: '请输入姓名',
					icon:'none'
				});
				return;
			}
			if (!this.param_sex ) {
				uni.showToast({
					title: '请选择性别',
					icon:'none'
				});
				return;
			}
			if (!this.param.wechatUserPhone ) {
				uni.showToast({
					title: '请输入手机号',
					icon:'none'
				});
				return;
			}else{
				if(!!this.wechatUserId){
					this.handler_update()
				}else{
					this.handler_success()
				}
			}
		},
		// 添加个人信息
		handler_success(){
			this.param.wechatOpenId  = uni.getStorageSync('userInfo').openid
			this.$minApi.addWechatUser({
					...this.param
				})
				.then(res => {
					if(res.code == '200'){
						uni.showModal({
							title:'温馨提示',
							content:'绑定成功,有需要您可以去提交诉求哦!',
							showCancel:false,
							confirmText:'知道啦!'
						})
					}
				});
		},
		// 修改个人信息 updateWechatUser
		handler_update(){
			this.$minApi.updateWechatUser ({
					...this.param
				})
				.then(res => {
					if(res.code == '200'){
						uni.showModal({
							title:'温馨提示',
							content:'绑定成功,有需要您可以去提交诉求哦!',
							showCancel:false,
							confirmText:'知道啦!'
						})
					}
				});
		},
		/* E 绑定 */
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
.leftback{
	width: 100%;
}
</style>
