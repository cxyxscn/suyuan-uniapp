<template>
	<view class="container">
		<view class="upp-box">
			<uni-forms label-position="top">
				<uni-forms-item label="账号" required><uni-easyinput v-model="formData.userAccount" placeholder="请输入账号"
						disabled /></uni-forms-item>
				<uni-forms-item label="姓名" required><uni-easyinput v-model="formData.username"
						placeholder="请输入姓名" /></uni-forms-item>
				<uni-forms-item label="性别" required><uni-data-checkbox v-model="formData.sex"
						:localdata="sexs" /></uni-forms-item>
				<uni-forms-item label="年龄" required><uni-easyinput v-model="formData.age"
						placeholder="请输入年龄" /></uni-forms-item>
				<uni-forms-item label="手机号" required><uni-easyinput v-model="formData.phone"
						placeholder="请输入手机号" /></uni-forms-item>
				<uni-forms-item>
					<button type="primary" @click="upp">确认修改</button>
				</uni-forms-item>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfoApi,
		uppUserInfoApi
	} from '@/api/index.js'

	export default {
		data() {
			return {
				sexs: [{
						text: '男',
						value: 0
					},
					{
						text: '女',
						value: 1
					}
				],
				uid: null,
				formData: {
					checkPassword: null
				}
			};
		},
		onShow() {
			this.uid = uni.getStorageSync("uid")
			this.getUserInfo()

		},
		methods: {
			async getUserInfo() {
				try {
					const res = await getUserInfoApi(this.uid)
					this.formData = {
						...this.formData,
						...res,
						userPassword: null
					}
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e.data.message
					});
				}
			},
			async upp() {
				try {
					await uppUserInfoApi(this.formData);
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.getUserInfo()
					uni.switchTab({
						url: "/pages/home/index"
					})
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e.data.message
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upp-box {
		padding: 40rpx;
	}
</style>