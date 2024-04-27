<template>
	<view class="container">
		<uni-list>
			<uni-list-item v-for="(item,index) in smjl" :key="index" clickable showArrow @click="goToSy(item.syid)"
				:title="'溯源编号：'+item.syid" rightText="查看详细" />
		</uni-list>
	</view>
</template>

<script>
	import {
		getSmjlApi
	} from '@/api/index.js'

	export default {
		data() {
			return {
				uid: Number,
				smjl: []
			}
		},
		methods: {
			async getSmjl() {
				const res = await getSmjlApi(this.uid)
				this.smjl = res
			},
			goToSy(id) {
				uni.navigateTo({
					url: "/pages/ncpsy/index?id=" + id
				})
			}
		},
		onShow() {
			this.uid = uni.getStorageSync("uid")
			this.getSmjl()
		}
	}
</script>

<style lang="scss" scoped>

</style>