<template>
	<view class="container">
		<uni-list>
			<uni-list-item v-for="(item,index) in sypj" :key="index" :title="'评价内容：'+item.comment"
				:rightText="'溯源编号：' +item.syid" />
		</uni-list>
	</view>
</template>

<script>
	import {
		getSypjAllByIdApi
	} from '@/api/index.js'

	export default {
		data() {
			return {
				uid: Number,
				sypj: []
			}
		},
		methods: {
			async getSypjById() {
				const res = await getSypjAllByIdApi(this.uid)
				this.sypj = res
			}
		},
		onShow() {
			this.uid = uni.getStorageSync("uid")
			this.getSypjById()
		}
	}
</script>

<style>

</style>