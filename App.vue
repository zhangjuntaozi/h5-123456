<script>
/**
 * vuex管理登陆状态，具体可以参考官方登陆模板示例
 */
import { mapMutations } from 'vuex';
import jwx from 'until/auth.js';
export default {
	methods: {
		...mapMutations(['login'])
	},
	onLaunch: function() {},
	onShow: function(e) {},
	onHide: function(e) {
		console.log(e);
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/uni.css';
@import './common/font.css';
@import './common/style.css';

body {
	// background: #F7F7F7;
	height: auto;
}
.uni-navbar--border {
	border-bottom-color: #e6e6e6 !important;
}
uni-switch .uni-switch-input {
	border: none !important;
}
uni-switch .uni-checkbox-input {
	border: none !important;
}
.uni-list-cell::after {
	background-color: #ffffff;
}
uni-view {
	line-height: 1;
}
uni-rich-text {
	img {
		width: 100%;
	}
}
</style>
