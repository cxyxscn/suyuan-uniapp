<template>
	<view class="container" v-if="Object.keys(info).length != 0">
		<uni-section title="溯源信息" type="line">
			<uni-list>
				<uni-list-item title="产品名称" :rightText="info.name" />
				<uni-list-item title="产品施肥" :rightText="info.status==0?'是':'否'" />
				<uni-list-item title="种植时间" :rightText="getTime(info.plantTime)" />
				<uni-list-item title="种植周次" :rightText="info.weekly" />
				<uni-list-item title="途径位置" :rightText="info.passLocation" />
				<uni-list-item title="出园时间" :rightText="getTime(info.endTime)" />
				<uni-list-item title="农场名称" :rightText="info.farmName" />
				<uni-list-item title="农场位置" :rightText="info.farmLocation" />
				<uni-list-item title="农村负责" :rightText="info.farmer" />
				<uni-list-item title="农场电话" :rightText="info.farmerPhone" />
				<uni-list-item title="农场消毒" :rightText="info.farmStatus==0?'是':'否'" />
				<uni-list-item title="市场名称" :rightText="info.markName" />
				<uni-list-item title="市场负责" :rightText="info.marker" />
				<uni-list-item title="市场电话" :rightText="info.markerPhone" />
				<uni-list-item title="市场地址" :rightText="info.markAddress" />
			</uni-list>
		</uni-section>

		<uni-section title="评论列表" type="line">
			<uni-list>
				<uni-list-item v-for="(item,index) in comments" :key="index" :title="'评论内容：'+item.comment"
					:rightText="'用户ID：' + item.uid" key="index" />
			</uni-list>
		</uni-section>

		<uni-section title="发表评论" type="line">
			<view class="comment">
				<uni-forms-item>
					<uni-easyinput type="textarea" :disabled="isFlag" v-model="formData.comment" :placeholder="tip" />
				</uni-forms-item>
				<button type="primary" @click="addComment" :disabled="isFlag">发表评论</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import {
		getSyInfoApi,
		getSypjApi,
		addSypjApi
	} from '@/api/index.js'
	import {
		log
	} from 'util'
	export default {
		data() {
			return {
				isFlag: false,
				tip: '请输入评价内容',
				info: {},
				comments: [],
				formData: {
					syid: null,
					comment: "",
					uid: null,
				},
				sypjFind: {
					uid: null,
					syid: null,
				}
			}
		},
		onLoad(options) {
			const {
				id
			} = options
			this.sypjFind.uid = uni.getStorageSync("uid")
			this.sypjFind.syid = id
			this.formData.uid = uni.getStorageSync("uid")
			this.formData.syid = id
			this.getSyInfo()
			this.getComment()
		},
		methods: {
			async addComment() {
				if (this.formData.comment.length === 0) {
					return uni.showToast({
						icon: 'none',
						title: "评论内容不允许为空"
					})
				}

				await addSypjApi(this.formData)
				this.isFlag = true
				this.tip = '你已评论'

				this.getComment()

				uni.showToast({
					icon: 'none',
					title: "评价成功"
				})
			},
			async getSyInfo() {
				const res = await getSyInfoApi(this.formData.syid)
				this.info = res
			},
			async getComment() {
				const res = await getSypjApi(this.sypjFind)
				this.comments = res
			},
			getTime(date) {
				let str = date
				let arr = str.split('.')
				return arr[0].replace('T', ' ')
			},
		}
	}
</script>

<style lang="scss" scoped`>
	.container {
		.comment {
			padding: 40rpx;
		}
	}
</style>