<template>
	<view class="container">
		<view class="form-box">
			<block v-if="isLogin">
				<uni-forms label-position="top">
					<uni-forms-item label="账号" required>
						<uni-easyinput v-model="loginFormData.userAccount" placeholder="请输入账号" />
					</uni-forms-item>

					<uni-forms-item label="密码" required>
						<uni-easyinput type="password" v-model="loginFormData.userPassword" placeholder="请输入密码" />
					</uni-forms-item>

					<uni-forms-item>
						<button type="primary" @click="login">登录</button>
					</uni-forms-item>

					<uni-forms-item>
						<button type="primary" @click="toReg">没有账号，去注册</button>
					</uni-forms-item>
				</uni-forms>
			</block>

			<block v-else>
				<uni-forms label-position="top">
					<uni-forms-item label="账号" required>
						<uni-easyinput v-model="regFormData.userAccount" placeholder="请输入账号" />
					</uni-forms-item>
					<uni-forms-item label="密码" required>
						<uni-easyinput type="password" v-model="regFormData.userPassword" placeholder="请输入密码" />
					</uni-forms-item>
					<uni-forms-item label="确认密码" required>
						<uni-easyinput type="password" v-model="regFormData.checkPassword" placeholder="请确认密码" />
					</uni-forms-item>

					<uni-forms-item>
						<button type="primary" @click="register">注册</button>
					</uni-forms-item>

					<uni-forms-item>
						<button type="primary" @click="toLogin">有账号，去登录</button>
					</uni-forms-item>
				</uni-forms>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		loginApi,
		registerApi
	} from '@/api/index.js';

	export default {
		data() {
			return {
				isLogin: true,
				loginFormData: {
					userAccount: '',
					userPassword: ''
				},
				regFormData: {
					userAccount: '',
					userPassword: '',
					checkPassword: ''
				}
			};
		},
		methods: {
			toReg() {
				this.isLogin = false
			},
			toLogin() {
				this.isLogin = true
			},
			async login() {
				const {
					id,
					userRole
				} = await loginApi(this.loginFormData)


				uni.setStorageSync('uid', id)
				uni.setStorageSync('role', userRole)

				uni.switchTab({
					url: '/pages/home/index'
				})
			},
			async register() {
				await registerApi(this.regFormData)
				this.toLogin()
			}
		},
		onShow() {
			if (uni.getStorageSync("uid")) {
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		.form-box {
			padding: 40px;
		}
	}
</style>