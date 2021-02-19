<template>
	<view>
		<!-- S 自定义头部 -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF" @clickLeft="handleBack">
				<block slot="left"><text class="iconfont iconleft f18 leftback"></text></block>
			</uni-nav-bar>
		</view>
		<!-- E 自定义头部 -->
		<view class="main">
			<view class="uni-column column">
				<span class="xh">*</span>
				<view class="uni-label label">姓名</view>
				<input
					class="uni-input input f16"
					placeholder-class="placeholder_class"
					v-model="param.hotlineAppealPerson"
					type="input"
					@blur="handler_person"
					@confirm="handler_person"
					placeholder="请填写姓名"
				/>
			</view>
			<view class="uni-column column">
				<span class="xh">*</span>
				<view class="uni-label label">性别</view>
				<picker class="uni_picker input " mode="selector" :range="pickerDate_sex" :range-key="'label'" :value="index" @change="handlerPicker_sex">
					<view class="f16 all_picker" :class="!param_hotlineAppealPersonSex ? 'pickerCategory' : 'picker_active'">
						{{ !!param_hotlineAppealPersonSex ? hotlineAppealPersonSex : '请选择性别' }}
					</view>
				</picker>
			</view>
			<view class="uni-column column">
				<span class="xh">*</span>
				<view class="uni-label label">手机号</view>
				<input
					class="uni-input input f16"
					placeholder-class="placeholder_class"
					v-model="param.hotlineAppealPersonPhone"
					type="input"
					@blur="handler_phone"
					@confirm="handler_phone"
					placeholder="请填写"
					maxlength="11"
				/>
			</view>
			<view class="uni-column column">
				<span class="xh">*</span>
				<view class="uni-label label">图形验证码</view>
				<input
					class="uni-input input f16"
					placeholder-class="placeholder_class"
					v-model="param.captcha"
					type="input"
					@blur="handler_captcha"
					@confirm="handler_captcha"
					placeholder="请填写"
				/>
				<image :src="validateCodePath" mode="aspectFill" class="code_img" @click="validateCode"></image>
			</view>
			<view class="uni-column column">
				<span class="xh">*</span>
				<view class="uni-label label">短信验证码</view>
				<input class="uni-input input f16" placeholder-class="placeholder_class" v-model="param.queryCode" type="input" placeholder="请填写" />
				<view class="all_color f16 back_fff" :class="code_disabled ? '':'color93'" :disabled="code_disabled" @click="handler_queryCode">获取验证码</view>
			</view>
			<!-- <view class="uni-column column colum_email">
				<span class="xh"></span>
				<view class="uni-label label">邮箱</view>
				<input class="uni-input input f16" placeholder-class="placeholder_class" v-model="param.hotlineAppealPersonEmail" type="input" placeholder="请填写" />
			</view> -->
		</view>
		<view class="back_f7 "></view>
		<view class="main mt10">
			<view class="uni-column column">
				<span class="xh">*</span>
				<view class="uni-label label">诉求标题</view>
				<input class="uni-input input f16 " placeholder-class="placeholder_class" v-model="param.hotlineAppealTitle" type="input" placeholder="请填写" />
			</view>
			<view class="question_radio  uni-divider-line">
				<view class="flex-type">
					<span class="xh">*</span>
					<view class="uni-label mb15 f16 mt14">诉求类型</view>
				</view>
				<view class="list_type ">
					<template v-for="item in hotlineAppealTypeDate">
						<button
							type="default"
							:class="param.hotlineAppealCategoryCode != item.hotlineAppealCategoryCode ? 'uni_question_btntype' : 'quset_active'"
							class="uni_question_btntype f16 mb15"
							@click="handleBtnType(item)"
						>
							{{ item.hotlineAppealCategory }}
						</button>
					</template>
				</view>
			</view>
			<view class="uni-column column">
				<span class="xh">*</span>
				<view class="uni-label f16">诉求类别</view>
				<picker class="uni_picker" mode="selector" :range="pickerDate" :range-key="'hotlineAppealType'" :value="param.hotlineAppealTypeCode" @change="handlerPicker">
					<view class="f16 all_picker" :class="!param.hotlineAppealTypeCode ? 'pickerCategory' : 'picker_active'">
						{{ !!param.hotlineAppealTypeCode ? param.hotlineAppealType : '请选择诉求类别' }}
					</view>
				</picker>
			</view>
			<view class="uni-column column">
				<span class="xh">*</span>
				<view class="uni-label f16">事件辖区</view>
				<picker
					class="uni_picker"
					mode="selector"
					:range="pickerDate_area"
					:range-key="'hotlineAppealJurisdiction'"
					:value="param.hotlineAppealJurisdictionCode"
					@change="handlerPicker_area"
				>
					<view class="f16 all_picker" :class="!param.hotlineAppealJurisdictionCode ? 'pickerCategory' : 'picker_active'">
						{{ !!param.hotlineAppealJurisdictionCode ? param.hotlineAppealJurisdiction : '请选择事件发生的区域' }}
					</view>
				</picker>
			</view>
			<view class="appealContent uni-divider-line  mt14">
				<view class="flex-type mb10">
					<span class="xh">*</span>
					<view class="uni-label  f16">诉求内容</view>
				</view>
				<textarea
					class="textarea f16"
					disable-default-padding="true"
					v-model="param.hotlineAppealContent"
					value=""
					:placeholder="placeholder"
					placeholder-class="placeholder_class"
					@input="handler_textarea"
					@focus="handler_textarea"
					@blur="handler_content"
					maxlength="100"
				/>
				<view class="appealContent_num f14 ">{{ appealContent_num }}</view>
			</view>

			<view class="upload_main  mt14">
				<view class="upload_title mb15 f16">上传图片</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<view v-for="(image, index) in imageList" :key="index">
							<view class="uni-uploader__file" style="position: relative;">
								<image class="uni-uploader__img" :src="img_url + image.url" :data-src="img_url + image.url" mode="aspectFill" @tap="previewImage"></image>

								<image @click="handle_delete_img(image, index)" class="iconfont_dele" src="../../static/images/clear.png" mode=""></image>
							</view>
						</view>
						<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="handler_maxcount(0)"></view></view>
					</view>
				</view>
			</view>
			<view class="upload_main  mt14">
				<view class="upload_title mb15 f16">上传视频</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<view v-for="(image, index) in videoList" :key="index">
							<view class="uni-uploader__file" style="position: relative;">
								<video class="uni-uploader__img" :src="img_url + image.url" ></video>
								<image @click="handle_delete_video(image, index)" class="iconfont_dele" src="../../static/images/clear.png" mode=""></image>
							</view>
						</view>
						<view class="uni-uploader__input-box"><view class="uni-uploader__input" @tap="handler_maxcount(1)"></view></view>
					</view>
				</view>
			</view>
			<view class="upload_main mt14 attachment">
				<view class="upload_title mb15 f16 ">上传附件</view>
				<view v-for="(file, index) in fileList">
					<view class="file_colum column">
						<view class="column">
							<view v-if="fileStatus" class="ico iconfont iconsuccess color_success"></view>
							<view v-if="!fileStatus" class="ico iconfont iconfail color_fail"></view>
							<text class="pl8 text_ellipsis file_width">{{ file.name }}</text>
						</view>
						<view class="iconfont icondelete" @click="handle_delete_file(file, index)"></view>
					</view>
				</view>
				<view class="upload_file mb15 mt15" @tap="handler_maxcount(2)"><view class="iconfont iconupload ">上传</view></view>
			</view>
		</view>
		<view class="back_f7 "></view>
		<view class=" main mt10 switch-box ">
			<view class="uni-list-cell uni-list-cell-pd switch-box">
				<view class="uni-list-cell-db">是否公开</view>
				<switch type="switch" :checked="hotlineAppealIspublic" @change="handle_swith" style="transform:scale(0.8)" />
			</view>
		</view>
		<view class="back_f7 ">
			<view class="tip mt10 pb50">请填写您的真实姓名及有效的联系方式，否则工单可能因无法与您联系而无效。</view>
			<view class="btn f16 mb40" @tap="handler_register">登记</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			img_url: this.$config.imgPath,
			validateCodePath: this.$config.validateCodePath,
			param: {
				hotlineAppealPerson: '', //姓名
				hotlineAppealPersonSex: '', //性别
				hotlineAppealPersonPhone: '', //手机号
				queryCode: '', // 短信验证码
				captcha: '', //图形验证码
				hotlineAppealTitle: '', //诉求标题
				hotlineAppealContent: '', //诉求内容
				hotlineAppealCategoryCode: '1', // 诉求类型
				hotlineAppealTypeCode: '', // 诉求类别
				hotlineAppealType: '', //诉求类别
				hotlineAppealJurisdictionCode: '', //事件管辖code
				hotlineAppealJurisdiction: '', // 事件管辖
				hotlineAppealPersonEmail: '', //邮箱
				hotlineAppealExternal: '', //附件
				hotlineAppealIspublic: 0 //诉求公开状态 0 true 1 false
			},
			param_hotlineAppealPersonSex: false,
			index: 0, //性别下标
			hotlineAppealPersonSex: '', // 性别显示
			pickerDate_sex: this.$configType.sex_enum, //性别
			hotlineAppealTypeDate: [], //诉求类型
			pickerDate: [], // 诉求类别
			pickerDate_area: [], // 事件辖区
			hotlineAppealTypeId: '1',
			hotlineAppealType: '咨询',
			placeholder: '请填写诉求内容，诉求内容不能超过100字',
			appealContent_num: '0/100',
			imageList: [], //上传图片
			videoList: [], //上传视频
			fileList: [], //上传文件
			
			userInfo: {
				nickname: '',
				sex: '',
				openid: ''
			},
			openId: '',
			checkRes: false, //是否必填项完成
			fileStatus: true, //文件状态
			cacheStatus: true, //图形验证码是否正确
			hotlineAppealIspublic: true,
			code_disabled:true, //获取验证码
		};
	},
	onLoad(options) {
		/* S 判断 openid 是否存在  不存在 则 微信授权  存在则 获取个人信息*/
		if (options.openid) {
			this.openId = options.openid;
		}
		if (this.openId) {
			//获取用户信息
			this.getInfoUser();
		} else {
			this.userInfo = uni.getStorageSync('userInfo');
			if (this.userInfo.openid) {
				var before = new Date().getTime() - 24 * 3600 * 1000;
				if (before < this.userInfo.startTime) {
					this.param.hotlineAppealPerson = this.userInfo.nickname;
					this.param_hotlineAppealPersonSex = true;
					this.handler_gender(this.userInfo.sex);
					this.handler_info();
				} else {
					uni.removeStorageSync('userInfo');
					this.goOauth();
				}
			} else {
				this.goOauth();
			}
		}
		this.handler_auth();
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
		if (this.userInfo.openid) {
			this.handler_userinfo();
		}
	},
	methods: {
		handleBack() {
			uni.navigateTo({
				url: '../home/index'
			});
		},
		/*S  获取 微信用户信息 */
		/* S 获取 code */
		goOauth() {
			const callbackURL = encodeURIComponent('http://seats.easy8in.top/login/test'); //测试
			const wechatId = 'wx731bbb761b6df538'; //测试
			const redirectURI = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechatId}&redirect_uri=${callbackURL}&response_type=code&scope=snsapi_userinfo&state=STATE`;
			window.location.href = redirectURI;
		},
		getInfoUser() {
			var _this = this;
			this.$minApi
				.wanteng_userinfo({
					openid: _this.openId
				})
				.then(res => {
					res.startTime = new Date().getTime(); //获取时间
					uni.setStorageSync('userInfo', res);
					_this.param.hotlineAppealPerson = res.nickname;
					_this.handler_gender(res.sex);
					_this.handler_info();
				})
				.then(rej => {});
		},
		/* E 获取 微信用户信息 */
		/* S 性别转化 */
		handler_gender(data) {
			this.param_hotlineAppealPersonSex = true;
			this.param.hotlineAppealPersonSex = data;
			var wechatUserSex = '';
			if (data == 0) {
				wechatUserSex = '未知';
			} else if (data == 1) {
				wechatUserSex = '男';
			} else {
				wechatUserSex = '女';
			}
			this.hotlineAppealPersonSex = wechatUserSex;
		},
		/* E 性别转化 */
		/* S  是否取到个人信息*/
		handler_info(options) {
			this.appealContent_num = '0/100';
			this.handler_appealType(); //诉求类型
			this.handler_appealCategory(); //诉求类别
			this.getAppealJurisdiction(); //事件辖区
			this.validateCode();
		},
		/* S 授权 */
		handler_auth() {
			this.$minApi
				.authorization({
					/* applicationAppKey: '5dd6631e-4a28-4b5c-aa0d-cc21f89d83d8',
					applicationAppSecret: '5985097316498578588852607792443512769076941291289741597384282823' */
					applicationAppKey: 'bea00620-c83a-4ecf-b762-b7dc7f8cf387',
					applicationAppSecret: '2835268052358449330564851535334193308346662441761957035157096666'
				})
				.then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.setStorageSync('WT-APP-TOKEN', res.data);
					} else {
						uni.showToast({
							title: res.message
						});
					}
				});
		},
		/* S 初始 获取绑定个人信息*/
		handler_userinfo() {
			var _this = this;
			_this.$minApi
				.infouser({
					wechatOpenId: _this.userInfo.openid
				})
				.then(res => {
					if (res.code == '200') {
						if (!!res.data) {
							//修改过
							_this.param.hotlineAppealPerson = res.data.wechatUserName;
							_this.param.hotlineAppealPersonSex = res.data.wechatUserSex;
							_this.param.hotlineAppealPersonPhone = res.data.wechatUserPhone;
							_this.handler_gender(res.data.wechatUserSex);
						}
					}
				});
		},
		/* E 初始 */
		/* S 姓名 */
		handler_person(e) {
			this.param.hotlineAppealPerson = e.detail.value;
		},
		/* E 姓名 */
		/* S 性别选择 */
		handlerPicker_sex(e) {
			var sexObject = this.pickerDate_sex[e.detail.value];
			this.param.hotlineAppealPersonSex = sexObject.value;
			this.hotlineAppealPersonSex = sexObject.label;
			this.param_hotlineAppealPersonSex = true;
		},
		/* E 性别选择 */
		/* S 手机号 */
		handler_phone(e) {
			if (e.detail.value) {
				this.param.hotlineAppealPersonPhone = e.detail.value;
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
		/* S 图形验证码 */
		handler_captcha(e) {
			if (!e.detail.value) {
				uni.showToast({
					title: '图形验证码为空',
					icon: 'none'
				});
				return;
			}
			this.param.captcha = e.detail.value;
			this.$minApi.wechat_matchPic({ cache: this.param.captcha }).then(res => {
				if (res.code == 200) {
					this.cacheStatus = true;
				} else if (res.code == 400) {
					uni.showToast({
						title: res.message,
						icon: 'none'
					});
					this.cacheStatus = false;
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none'
					});
					this.cacheStatus = false;
				}
			});
		},
		// S 获取图形验证码
		validateCode() {
			this.validateCodePath = this.validateCodePath + '?d=' + Math.random();
			this.param.captcha = '';
		},
		/* E 图形验证码 */
		/* S 短信验证码 */
		handler_queryCode() {
			if (!this.param.hotlineAppealPersonPhone) {
				uni.showToast({
					title: '手机号为空',
					icon: 'none'
				});
				return;
			}
			if(!this.code_disabled){
				uni.showToast({
					title: '请耐心等待',
					icon: 'none'
				});
				return;
			}
			this.code_disabled = false;
			this.$minApi.verificationCode({ phoneNumber: this.param.hotlineAppealPersonPhone }).then(res => {
				if (res.code == 200) {
					uni.showModal({
						title: '温馨提示',
						content: '请注意查收短信验证码哦',
						showCancel: false,
						confirmText: '知道啦'
					});
					this.code_disabled = true
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none'
					});
					this.code_disabled = true
				}
			});
		},
		/* E 短信验证码 */
		/* S 诉求类型 */
		handler_appealType() {
			this.$minApi.getAppealCategory().then(res => {
				if (res.code == 200) {
					if (res.data.length > 0) {
						this.hotlineAppealTypeDate = res.data;
					}
				}
			});
		},
		// 诉求类型
		handleBtnType(date) {
			this.param.hotlineAppealCategoryCode = date.hotlineAppealCategoryCode;
		},
		/* E 诉求类型 */
		/* S 诉求类别 */
		handler_appealCategory() {
			this.$minApi.getAppealType().then(res => {
				if (res.code == 200) {
					if (res.data.length > 0) {
						this.pickerDate = res.data;
					}
				}
			});
		},
		handlerPicker(val) {
			this.param.hotlineAppealTypeCode = this.pickerDate[val.detail.value].hotlineAppealTypeCode;
			this.param.hotlineAppealType = this.pickerDate[val.detail.value].hotlineAppealType;
		},
		/* E 诉求类别  */
		/* S 事件辖区 */
		getAppealJurisdiction() {
			this.$minApi.getAppealJurisdiction().then(res => {
				if (res.code == 200) {
					if (res.data.length > 0) {
						this.pickerDate_area = res.data;
					}
				}
			});
		},
		handlerPicker_area(val) {
			this.param.hotlineAppealJurisdictionCode = this.pickerDate_area[val.detail.value].hotlineAppealJurisdictionCode;
			this.param.hotlineAppealJurisdiction = this.pickerDate_area[val.detail.value].hotlineAppealJurisdiction;
		},
		/* E 事件辖区 */
		/* S 诉求内容 */
		handler_textarea(val) {
			if (val.type == 'input') {
				this.appealContent_num = val.detail.cursor + '/100';
			}
			this.param.hotlineAppealContent = val.detail.value;
		},
		/* E 诉求内容 */
		handler_content(val) {
			if (val.type == 'blur') {
				this.appealContent_num = val.detail.cursor + '/100';
			}
			this.param.hotlineAppealContent = val.detail.value;
		},
		/* 判断上传图片 视频 附件 个数 */
		handler_maxcount(index) {
			if (this.imageList.length + this.videoList.length + this.fileList.length >= 5) {
				uni.showModal({
					title: '提示',
					content: '图片和视频和附件最多上传5张',
					showCancel: false,
					confirmText: '知道啦'
				});
				return;
			} else {
				if (index == 0) {
					this.chooseImage();
				} else if (index == 1) {
					this.chooseVideo();
				} else {
					this.chooseFile();
				}
			}
		},
		/* S 上传照片 */
		chooseImage() {
			var _this = this;
			uni.chooseImage({
				sourceType: ['album'], //从相册选择,
				extension: ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.tiff'],
				count: 5,
				success: res => {
					const tempFilePaths = res.tempFilePaths;
					//获取最后一个.的位置
					var index = res.tempFiles[0].name.lastIndexOf('.');
					//获取后缀
					var ext = res.tempFiles[0].name.substr(index + 1);
					console.log(_this.getPhotoSize(ext));
					if (_this.getPhotoSize(ext)) {
					} else {
						uni.showModal({
							title: '温馨提示',
							content: '图片格式为:.jpg、.jpeg、.bmp、.gif、.png、.tiff',
							showCancel: false,
							confirmText: '知道啦'
						});
						return;
					}
					uni.showLoading({
						title: '加载中'
					});
					const uploadTask = uni.uploadFile({
						url: '/picture-web/outer/photo/uploadFile',
						filePath: res.tempFilePaths[0],
						formData: {
							user: res.tempFiles[0],
							file: res.tempFiles[0]
						},
						name: 'file',
						success: function(uploadFileRes) {
							uni.hideLoading();
							let path = JSON.parse(uploadFileRes.data);
							if (path.code == '0') {
								var object = {
									name: path.data.fileName + '.' + path.data.contentType,
									url: path.data.filePath
								};
								_this.imageList.push(object);
								console.log(_this.imageList);
							}
						},
						fail: function(err) {
							uni.hideLoading();
							uni.showToast({
								title:  '上传失败'
							});
						}
					});
				},
				fail: err => {
					uni.hideLoading();
				}
			});
		},
		/*S 删除*/
		handle_delete_img(item, index) {
			// 图片
			this.imageList.splice(index, 1);
		},
		handle_delete_video(item, index) {
			//视频
			this.videoList.splice(index, 1);
		},
		handle_delete_file(item, index) {
			//文件
			this.fileList.splice(index, 1);
		},
		/*E 删除*/
		/*S 预览*/
		previewImage: function(e) {
			var current = e.target.dataset.src;
			console.log(current);
			var array = [];
			this.imageList.map(i => {
				array.push('/' + i.url);
			});
			uni.previewImage({
				current: current,
				urls: array
			});
		},
		/*E 预览*/
		/*  */
		chooseVideo() {
			var _this = this;
			uni.chooseVideo({
				count: 5,
				extension: ['.avi', '.wma', '.rmvb', '.mp4', '.3gp', '.mid'],
				success: function(res) {
					const tempFilePaths = res.tempFilePaths;
					//获取最后一个.的位置
					var index = res.tempFile.name.lastIndexOf('.');
					//获取后缀
					var ext = res.tempFile.name.substr(index + 1);
					if (_this.getvedioSize(ext)) {
					} else {
						uni.showModal({
							title: '温馨提示',
							content: '视频格式为: .avi, .wma .rmvb .mp4 .3gp .mid',
							showCancel: false,
							confirmText: '知道啦'
						});
						return;
					}
					uni.showLoading({
						title: '加载中'
					});
					console.log(res.tempFilePath, res.tempFiles);
					const uploadTask = uni.uploadFile({
						url: '/picture-web/outer/photo/uploadFile',
						filePath: res.tempFilePath,
						formData: {
							user: res.tempFiles,
							file: res.tempFiles
						},
						name: 'file',
						success: function(uploadFileRes) {
							uni.hideLoading();
							let path = JSON.parse(uploadFileRes.data);
							console.log(path);
							if (path.code == '0') {
								var object = {
									name: path.data.fileName + '.' + path.data.contentType,
									url: path.data.filePath
								};
								_this.videoList.push(object);
								console.log(_this.videoList);
							}
						},
						fail: function(err) {
							uni.hideLoading();
						}
					});
				}
			});
		},
		chooseFile() {
			var _this = this;
			uni.chooseFile({
				count: 5,
				extension: ['.doc', '.txt'],
				success: function(res) {
					const tempFilePaths = res.tempFilePaths;
					//获取最后一个.的位置
					console.log(res);
					var index = res.tempFiles[0].name.lastIndexOf('.');
					//获取后缀
					var ext = res.tempFiles[0].name.substr(index + 1);
					if (_this.getfileSize(ext)) {
					} else {
						uni.showModal({
							title: '温馨提示',
							content: '文件格式为: .doc, .txt',
							showCancel: false,
							confirmText: '知道啦'
						});
						return;
					}
					uni.showLoading({
						title: '加载中'
					});
					const uploadTask = uni.uploadFile({
						url: '/picture-web/outer/photo/uploadFile',
						filePath: res.tempFilePath,
						formData: {
							user: res.tempFiles[0],
							file: res.tempFiles[0]
						},
						name: 'file',
						success: function(uploadFileRes) {
							uni.hideLoading();
							let path = JSON.parse(uploadFileRes.data);
							console.log(path);
							if (path.code == '0') {
								this.fileStatus = true;
								let object = {
									url: path.data.filePath,
									name: path.data.fileName + '.' + path.data.contentType
								};
								_this.fileList.push(object);
								console.log(_this.fileList);
							}
						},
						fail: function(err) {
							uni.hideLoading();
							this.fileStatus = false;
						}
					});
				}
			});
		},
		//判断照片后缀名
		getPhotoSize(obj) {
			return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'tiff'].indexOf(obj.toLowerCase()) !== -1;
		},
		//判断视频后缀名
		getvedioSize(obj) {
			return ['avi', 'wma', 'rmvb', 'mp4', '3gp', 'mid'].indexOf(obj.toLowerCase()) !== -1;
		},
		//判断文件后缀名
		getfileSize(obj) {
			return ['doc', 'txt'].indexOf(obj.toLowerCase()) !== -1;
		},
		/* S 是否公开 */
		handle_swith(e) {
			if (e.detail.value == false) {
				this.hotlineAppealIspublic = false;
				this.param.hotlineAppealIspublic = 1;
			} else {
				this.hotlineAppealIspublic = true;
				this.param.hotlineAppealIspublic = 0;
			}
		},
		/* E 是否公开 */
		/* S 登记 */
		handler_register() {
			if (!this.param.hotlineAppealPerson) {
				uni.showToast({ title: '姓名为空', icon: 'none' });
				return;
			}
			console.log(this.param_hotlineAppealPersonSex);
			if (!this.param_hotlineAppealPersonSex) {
				uni.showToast({ title: '性别为空', icon: 'none' });
				return;
			}
			if (!this.param.hotlineAppealPersonPhone) {
				uni.showToast({ title: '手机号为空', icon: 'none' });
				return;
			}
			if (!this.param.captcha) {
				uni.showToast({ title: '图形验证码为空', icon: 'none' });
				return;
			}
			if (!this.param.queryCode) {
				uni.showToast({ title: '短信验证码为空', icon: 'none' });
				return;
			}
			if (!this.param.hotlineAppealTitle) {
				uni.showToast({ title: '诉求标题为空', icon: 'none' });
				return;
			}
			if (!this.param.hotlineAppealTypeCode) {
				uni.showToast({ title: '诉求类别为空', icon: 'none' });
				return;
			}
			if (!this.param.hotlineAppealJurisdictionCode) {
				uni.showToast({ title: '事件辖区为空', icon: 'none' });
				return;
			}
			if (!this.param.hotlineAppealContent) {
				uni.showToast({ title: '诉求内容为空', icon: 'none' });
				return;
			} else {
				var hotlineAppealExternal = this.imageList.concat(this.videoList, this.fileList);
				this.param.hotlineAppealExternal = JSON.stringify(hotlineAppealExternal);
				this.checkRes = true;
				this.handler_btn();
			}
		},
		handler_btn() {
			var _this = this;
			if (_this.checkRes) {
				var date = _this.param;
				_this.$minApi.saveOpenApiAppeal(date).then(res => {
					if (res.code == 200) {
						_this.handler_myorder(res.data);
					} else if (res.code == 400) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				});
			}
		},
		/* E 登记 */
		/* S 我的工单 记录 */
		handler_myorder(id) {
			var _this = this;
			var object = {
				wechatOpenId: uni.getStorageSync('userInfo').openid,
				hotlineAppealId: id
			};
			_this.$minApi.addHotlineToWechat({ ...object }).then(res => {
				if (res.code == 200) {
					uni.navigateTo({
						url: 'success'
					});
				}
			});
		},
		/* E 我的工单记录  */
		/* S 清空数据 */
		handler_clear() {
			this.param = {
				hotlineAppealPerson: '', //姓名
				hotlineAppealPersonSex: '', //性别
				hotlineAppealPersonPhone: '', //手机号
				queryCode: '', // 短信验证码
				captcha: '', //图形验证码
				hotlineAppealTitle: '', //诉求标题
				hotlineAppealContent: '', //诉求内容
				hotlineAppealTypeCode: '', // 诉求类别
				hotlineAppealType: '', //诉求类别
				hotlineAppealJurisdictionCode: '', //事件管辖code
				hotlineAppealJurisdiction: '', // 事件管辖
				hotlineAppealPersonEmail: '', //邮箱
				hotlineAppealExternal: '', //附件
				hotlineAppealIspublic: true //诉求公开状态 0 true 1 false
			};
			this.appealContent_num = '0/100';
			this.imageList = [];
			this.videoList = [];
			this.fileList = [];
		}
		/* E 清空数据 */
	}
};
</script>

<style lang="scss">
.main {
	// background-color: #ffffff;
	padding: 0upx 32upx;
	.label {
		width: 180upx;
		color: #333333;
	}
	.verification {
		color: #3894f0;
	}
	.colum_email {
		border-bottom: none;
	}
	.list_type {
		display: flex;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		flex-wrap: wrap;
		.uni_question_btntype {
			line-height: 36upx;
			padding: 16upx 62upx;
			border-radius: 36upx;
			color: #6c6c6c;
			background-color: #f1f1f1;
			margin-left: 0;
		}
		.quset_active {
			color: #ca3c3e;
			background-color: #ffecec;
		}
	}
	.flex-type {
		display: flex;
		align-items: center;
	}
	uni-textarea {
		width: 100%;
		padding-left: 32upx;
	}
	.appealContent_num {
		color: #939393;
		text-align: right;
		padding-bottom: 30upx;
	}
	.upload_main {
		padding: 14upx 32upx;
		border-bottom: 2upx solid #e6e6e6;
		.upload_title {
			color: #333333;
		}
	}
	.attachment {
		border-bottom: none;
	}
	.file_colum {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icon-success:before {
			color: #55b433;
		}
		.icon-fail:before {
			color: #f14646;
		}
	}
	.upload_file {
		color: #ca3c3e;
		text-align: center;
		.iconupload:before {
			color: #ca3c3e;
			font-size: 40upx;
		}
	}
	.switch-box {
		border-bottom: none;
	}
	.file_width {
		width: 330upx;
	}
}
.tip {
	padding: 0upx 32upx;
	color: #c52626;
	line-height: 1.5;
}
.iconfont_dele {
	width: 44upx;
	height: 44upx;
	position: absolute;
	right: -18upx;
	top: -20upx;
}
</style>
