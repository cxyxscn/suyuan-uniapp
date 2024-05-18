<template>
	<view class="container">
		<uni-section title="产品列表" type="line">
			<view class="allPro">
				<uni-table border>

					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="100" align="center">ID</uni-th>
						<uni-th width="100" align="center">产品名称</uni-th>
						<uni-th width="200" align="center">种植时间</uni-th>
						<uni-th width="100" align="center">种植周期</uni-th>
						<uni-th width="100" align="center">农场名称</uni-th>
						<uni-th width="100" align="center">农场负责人</uni-th>
						<uni-th width="100" align="center">联系电话</uni-th>
						<uni-th width="200" align="center">农场位置</uni-th>
						<uni-th width="100" align="center">农场消毒</uni-th>
						<uni-th width="200" align="center">经过位置</uni-th>
						<uni-th width="200" align="center">出园时间</uni-th>
						<uni-th width="100" align="center">施肥状态</uni-th>
						<uni-th width="100" align="center">操作</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,index) in pros" :key="index">
						<uni-td align="center">{{item.id}}</uni-td>
						<uni-td align="center">{{item.name}}</uni-td>
						<uni-td align="center">{{getTime(item.plantTime)}}</uni-td>
						<uni-td align="center">{{item.weekly}}</uni-td>
						<uni-td align="center">{{item.farmName}}</uni-td>
						<uni-td align="center">{{item.farmer}}</uni-td>
						<uni-td align="center">{{item.farmerPhone}}</uni-td>
						<uni-td align="center">{{item.farmLocation}}</uni-td>
						<uni-td align="center">{{item.farmStatus==0?'是':'否'}}</uni-td>
						<uni-td align="center">{{item.passLocation}}</uni-td>
						<uni-td align="center">{{getTime(item.endTime)}}</uni-td>
						<uni-td align="center">{{item.status==0?'是':'否'}}</uni-td>
						<uni-td align="center">
							<text @click="edite(item)" style="padding: 0 10rpx;">编辑</text>
							<text @click="del(item.id)" style="padding: 0 10rpx;">删除</text>
						</uni-td>
					</uni-tr>
				</uni-table>

				<view style="margin-top: 40rpx;">
					<button @click="open" type="primary">添加产品</button>
				</view>
			</view>
		</uni-section>


		<uni-popup ref="popup" type="bottom" background-color="#fff" :mask-click="false">
			<uni-section title="添加/修改" type="line">
				<view class="addPro">
					<uni-forms ref="form" label-position="top" :rules="rules" :modelValue="proFormData">
						<uni-forms-item label="农产品名" required name="name">
							<uni-easyinput v-model="proFormData.name" placeholder="请输入产品名称" />
						</uni-forms-item>

						<uni-forms-item label="种植时间" required name="plantTime">
							<uni-datetime-picker type="datetime" v-model="proFormData.plantTime" />
						</uni-forms-item>

						<uni-forms-item label="种植周期" required name="weekly">
							<uni-easyinput v-model="proFormData.weekly" placeholder="请输入种植周期" />
						</uni-forms-item>

						<uni-forms-item label="农场名称" required name="farmId">
							<uni-data-select v-model="proFormData.farmId" :localdata="farms"
								:clear="false"></uni-data-select>
						</uni-forms-item>

						<uni-forms-item label="经过位置" required name="passLocation">
							<uni-easyinput v-model="proFormData.passLocation" placeholder="请输入经过位置" />
						</uni-forms-item>

						<uni-forms-item label="施肥状态">
							<uni-data-select v-model="proFormData.status" :localdata="range"
								:clear="false"></uni-data-select>
						</uni-forms-item>

						<uni-forms-item label="出园时间" required name="endTime">
							<uni-datetime-picker type="datetime" v-model="proFormData.endTime" />
						</uni-forms-item>
						
						<view class="btn-box">
							<button type="primary" @click="addPro">提交</button>
							<button type="primary" @click="close">关闭</button>
						</view>

					</uni-forms>
				</view>
			</uni-section>
		</uni-popup>

	</view>
</template>

<script>
	import {
		getProAllByIdApi,
		addProApi,
		delProApi,
		uppProApi,
		getFarmAllApi
	} from '@/api/index.js'
	import {
		log
	} from 'util';
	export default {
		data() {
			return {
				isUpp: false,
				farms: [],
				uid: null,
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '该项为必填',
						}]
					},
					passLocation: {
						rules: [{
							required: true,
							errorMessage: '该项为必填',
						}]
					},
					plantTime: {
						rules: [{
							required: true,
							errorMessage: '该项为必填',
						}]
					},
					weekly: {
						rules: [{
							required: true,
							errorMessage: '该项为必填',
						}]
					},
					endTime: {
						rules: [{
							required: true,
							errorMessage: '该项为必填',
						}]
					},
				},
				pros: [],
				proFormData: {
					farmId: null,
					name: "",
					passLocation: "",
					plantTime: null,
					status: 0,
					weekly: "",
					endTime: null,
				},
				range: [{
						value: 0,
						text: "是"
					},
					{
						value: 1,
						text: "否"
					}
				],
			};
		},
		methods: {
			getTime(date) {
				let str = date
				let arr = str.split('.')
				return arr[0].replace('T', ' ')
			},
			open() {
				this.$refs.popup.open('center')
			},
			close() {
				this.proFormData = {
					marker: uni.getStorageSync("uid"),
					farmId: null,
					name: "",
					passLocation: "",
					plantTime: null,
					status: 0,
					weekly: "",
					endTime: null,
				}
				this.$refs.popup.close()
			},
			edite(item) {
				console.log(item)
				this.proFormData = {
					id: item.id,
					marker: uni.getStorageSync("uid"),
					farmId: item.farmId,
					name: item.name,
					passLocation: item.passLocation,
					plantTime: item.plantTime,
					status: item.status,
					weekly: item.weekly,
					endTime: item.endTime
				}
				this.isUpp = true
				this.open()
			},
			del(id) {
				uni.showModal({
					title: '提示',
					content: '确认删除吗？',
					success: async (res) => {
						if (res.confirm) {
							await delProApi(id)
							this.getProAll()
						}
					}
				})
			},
			async getProAll() {
				const res = await getProAllByIdApi(this.uid)
				this.pros = res
			},
			async getFarmAll() {
				const res = await getFarmAllApi(this.uid)
				this.farms = res
			},
			addPro() {
				this.$refs.form.validate().then(async () => {
					if (this.isUpp) {
						await uppProApi(this.proFormData)
						this.isUpp = false
					} else {
						await addProApi(this.proFormData)
					}
					this.getProAll()
					this.close()
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		},
		onShow() {
			this.uid = uni.getStorageSync("uid")
			this.getProAll()
			this.getFarmAll()
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;

		.addPro {
			width: 600rpx;
			height: 1000rpx;
			padding: 40rpx;
			overflow: auto;
		}
	}
</style>