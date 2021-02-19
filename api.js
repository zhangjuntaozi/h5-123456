import MinRequest from './MinRequest'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
  return request
},(Error)=>{
	uni.showToast({
		title: '服务开小差啦,请重新进入哦',
		content: '请稍后哦',
		icon: 'none'
	})
})

// 响应拦截器

minRequest.interceptors.response((response) => {
	if (response.data.code == '-1') {
		uni.showToast({
			title: '服务开小差啦,请重新进入哦',
			content: '请稍后哦',
			icon: 'none'
		})
	}
	if (response.data.code == '999999999') {
		uni.showToast({
			title: '服务开小差啦,请重新进入哦',
			content: '请重新进入哦',
			icon: 'none'
		})
	}
	if(response.statusCode == 502){
		uni.showModal({
			title:'温馨提示',
			content:'系统正在维护，请稍后访问哦',
			icon: 'none',
			showCancel:false
		})
	}
	return response.data
},(Error)=>{
	uni.showToast({
		title: '服务开小差啦,请重新进入哦',
		content: '请稍后哦',
		icon: 'none'
	})
})


// 设置默认配置
minRequest.setConfig((config) => {
    // config.baseURL = '/hotline-data-exchange-open-platform-web'
   
  return config
})

const project_name = '/hotline-data-exchange-open-platform-web'
const wechat_name = 'http://seats.easy8in.top/user'
const new12345 = 'http://www.dt.gov.cn/new12345'
export default {	
  apis: {	 
	  /* S 授权 */
	  authorization(data) { 
		return minRequest.postAuthorization(`${project_name}/openApi/app/authorization`, { ...data,
			// noIcrypto: false
		})
	}, 
	/* E 授权 */
	  /* S  查询码*/
	searchByCode (data) { 
		return minRequest.get(`${project_name}/wechat/appeal/searchByCode`, { ...data,
			// noIcrypto: false
		})
	},  
	/* E 查询码 */
	/* S  短信验证码*/
	verificationCode(data) { 
		return minRequest.postAuthorization(`${project_name}/openApi/send/verificationCode`, { ...data,
			// noIcrypto: false
		})
	},
	/* E  短信验证码*/
	/* S 图形验证码 */
	wechat_matchPic(data) { 
		return minRequest.get(`${project_name}/wechat/matchPic`, { ...data,
			// noIcrypto: false
		})
	},
	/* E  图形验证码*/
	/* S 微页面提交诉求 */
	saveOpenApiAppeal (data) { 
		return minRequest.postAuthorization(`${project_name}/wechat/appeal/save`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E  微页面提交诉求*/
	/*  S  诉求类型  */ 
	getAppealCategory (data) { 
		return minRequest.get(`${project_name}/openApi/hotlineAppealCategory/list`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E  诉求类型*/
	
	/* S 诉求类别 */
	getAppealType (data) {
		return minRequest.get(`${project_name}/openApi/hotLineAppealType/list`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 诉求类别 */
	/* S 事件辖区  */
	getAppealJurisdiction (data) {
		return minRequest.get(`${project_name}/openApi/hotLineAppealJurisdiction/list`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 事件辖区  */
	/* S 微提交 - 我的工单 */
	addHotlineToWechat (data) {
		return minRequest.postAuthorization(`${project_name}/wechat/addHotlineToWechat`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E  微提交 - 我的工单*/
	/* S 热点动态 */
	articlelist (data) {
		return minRequest.postAuthorization(`${project_name}/openApi/article/list`, { ...data,
			// noIcrypto: false
		})	
	},
	articleinfo (data) {
		return minRequest.get(`${project_name}/openApi/article/info`, { ...data,
			// noIcrypto: false
		})	
	},
	articleTypelist (data) {
		return minRequest.postAuthorization(`${project_name}/openApi/articleType/list`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 热点动态 */
	/* S 微信授权 */
	wanteng_wechat (data) {
		return minRequest.get(`${wechat_name}/login/test`, { ...data,
			// noIcrypto: false
		})	
	},
	// 用户信息
	wanteng_userinfo (data) {
		return minRequest.getuser(`${wechat_name}/${data.openid}`, {})	
	},
	/* E 微信授权 */
	/* S 个人信息-添加 */
	addWechatUser (data) {
		return minRequest.postAuthorization(`${project_name}/wechat/addWechatUser`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 个人信息 添加*/
	/* S 个人信息-修改 */
	updateWechatUser (data) {
		return minRequest.put(`${project_name}/wechat/updateWechatUser`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 个人信息 修改*/
	/* S 个人信息获取 */
	infouser (data) {
		return minRequest.get(`${project_name}/wechat/info/user`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E  个人信息获取 */
	/* S 我的工单 */
	hotlinePage (data) {
		return minRequest.postAuthorization(`${project_name}/wechat/hotlinePage`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E  我的工单*/
	/* S 我的工单详情 */
	myOrderInfo (data) {
		return minRequest.get(`${project_name}/wechat/hotline/info`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E  我的工单详情 */
	/* S  我的收藏*/
	articlePage (data) {
		return minRequest.postAuthorization(`${project_name}/wechat/articlePage`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 我的收藏 */
	/* S  收藏*/
	addArticle (data) {
		return minRequest.postAuthorization(`${project_name}/wechat/addArticle`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 收藏 */
	/* S  取消收藏*/
	cancelArticle (data) {
		return minRequest.put(`${project_name}/wechat/cancelArticle`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 取消收藏 */
	/* S 热点问题 */
	hotQuestionApi (data) {
		return minRequest.post(`${new12345}/hotQuestionApi`, { ...data,
			// noIcrypto: false
		})	
	},
	/* E 热点问题 */
  }
}
