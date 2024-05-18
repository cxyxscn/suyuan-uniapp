<template>
	<view class="container" v-show="role!=null">
		<view class="scan-box" v-if="role===0">
			<image class="scan" src="@/static/image/scan.png" mode="aspectFit" @click="scan"></image>
			<view>扫一扫溯源</view>
		</view>

		<view v-if="role===1">
			<uni-card>
				<view class="uni-h4 title">农产品溯源管理平台</view>
			</uni-card>
			<view class="btn-box">
				<button type="primary" @click="goToFarm">农场管理</button>
				<button type="primary" @click="goToPro">农产品管理</button>
			</view>
		</view>

		<view v-if="role===2">
			<uni-card>
				<view class="uni-h4 title">农产品溯源管理平台</view>
			</uni-card>
			<view class="btn-box">
				<button type="primary" @click="goToSy">农产品溯源管理</button>
			</view>
		</view>

		<view v-if="role===3">
			<uni-card>
				<view class="uni-h4 title">农产品溯源管理平台</view>
			</uni-card>
			<view class="btn-box">
				<button type="primary" @click="goToUser">用户管理</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addSmjlApi
	} from '@/api/index.js'

	export default {
		data() {
			return {
				role: null,
				data: {
					uid: null,
					syid: null
				}
			}
		},
		onShow() {
			this.role = uni.getStorageSync("role")
			this.data.uid = uni.getStorageSync("uid")
			if (uni.getStorageSync("role") !== 0) {
				uni.setTabBarBadge({
					text:'农产品溯源管理系统'
				})
			}
		},
		methods: {
			goToFarm() {
				uni.navigateTo({
					url: '/pages/admin/farm'
				})
			},
			goToPro() {
				uni.navigateTo({
					url: '/pages/admin/produce'
				})
			},
			goToSy() {
				uni.navigateTo({
					url: '/pages/admin/suyuan'
				})
			},
			goToUser() {
				uni.navigateTo({
					url: '/pages/admin/user'
				})
			},
			async addSmjlApi() {
				await addSmjlApi(this.data)
			},
			scan() {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: (res) => {
						let {
							id
						} = JSON.parse(res.result)

						this.data.syid = id
						this.addSmjlApi(this.data)

						uni.navigateTo({
							url: "/pages/ncpsy/index?id=" + id
						})
					}
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		.scan-box {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			font-size: 50rpx;
			font-weight: 700;

			.scan {
				width: 250rpx;
				height: 250rpx;
				margin-bottom: 20rpx;
			}
		}

		.title {
			font-weight: 700;
			text-align: center;
		}

		.btn-box {
			padding: 0 40rpx;

			button {
				margin: 40rpx 0;
			}
		}
	}
</style>