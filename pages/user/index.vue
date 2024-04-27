<template>
	<view class="container" v-show="role!=null">
		<uni-list v-if="role===0">
			<uni-list-item v-for="(item, index) in userNav" :key="index" :show-extra-icon="true" :extra-icon="item.icon"
				:showArrow="true" :title="item.title" clickable @click="onClick(item.url)"></uni-list-item>
		</uni-list>

		<uni-list v-else>
			<uni-list-item v-for="(item, index) in adminNav" :key="index" :show-extra-icon="true"
				:extra-icon="item.icon" :showArrow="true" :title="item.title" clickable
				@click="onClick(item.url)"></uni-list-item>
		</uni-list>

		<view class="logout-box">
			<button type="primary" @click="logout">退出登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: null,
				adminNav: [{
						url: '/pages/user/upp',
						icon: {
							color: '',
							size: '18',
							type: 'gear'
						},
						title: '修改资料'
					},
					{
						url: '/pages/user/about',
						icon: {
							color: '',
							size: '18',
							type: 'info'
						},
						title: '关于软件'
					}
				],
				userNav: [{
						url: '/pages/user/upp',
						icon: {
							color: '',
							size: '18',
							type: 'gear'
						},
						title: '修改资料'
					}, {
						url: '/pages/user/smjl',
						icon: {
							color: '',
							size: '18',
							type: 'scan'
						},
						title: '扫码记录'
					}, {
						url: '/pages/user/sypl',
						icon: {
							color: '',
							size: '18',
							type: 'chat'
						},
						title: '我的评论'
					},
					{
						url: '/pages/user/about',
						icon: {
							color: '',
							size: '18',
							type: 'info'
						},
						title: '关于软件'
					}
				]
			};
		},
		onShow() {
			this.role = uni.getStorageSync("role")
		},
		methods: {
			onClick(url) {
				uni.navigateTo({
					url
				});
			},
			logout() {
				uni.removeStorageSync("uid")
				uni.removeStorageSync("role")
				uni.redirectTo({
					url: '/pages/login/index'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.logout-box {
		padding: 40rpx;
	}
</style>