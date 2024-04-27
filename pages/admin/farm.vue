<template>
	<view class="container">
		<uni-section title="我的农场" type="line">
			<view class="allFarm">
				<uni-table border>
					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="100" align="center">ID</uni-th>
						<uni-th width="100" align="center">名称</uni-th>
						<uni-th width="100" align="center">位置</uni-th>
						<uni-th width="100" align="center">负责人</uni-th>
						<uni-th width="100" align="center">联系电话</uni-th>
						<uni-th width="100" align="center">操作</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,index) in farms" :key="index">
						<uni-td align="center">{{item.id}}</uni-td>
						<uni-td align="center">{{item.name}}</uni-td>
						<uni-td align="center">{{item.location}}</uni-td>
						<uni-td align="center">{{item.username}}</uni-td>
						<uni-td align="center">{{item.phone}}</uni-td>
						<uni-td align="center">
							<text @click="edite(item)" style="padding: 0 10rpx;">编辑</text>
							<text @click="del(item.id)" style="padding: 0 10rpx;">删除</text>
						</uni-td>
					</uni-tr>
				</uni-table>

				<view style="margin-top: 40rpx;">
					<button @click="open" type="primary">添加农场</button>
				</view>

			</view>

		</uni-section>


		<uni-popup ref="popup" type="bottom" background-color="#fff" :mask-click="false">
			<uni-section title="添加/修改" type="line">
				<view class="addFarm">
					<uni-forms ref="form" label-position="top" :rules="rules" :modelValue="farmFormData">
						<uni-forms-item label="名称" required name="name">
							<uni-easyinput v-model="farmFormData.name" placeholder="请输入农场名称" />
						</uni-forms-item>

						<uni-forms-item label="位置" required name="location">
							<uni-easyinput v-model="farmFormData.location" placeholder="请输入农场位置" />
						</uni-forms-item>

						<uni-forms-item label="消毒">
							<uni-data-select v-model="farmFormData.status" :clear="false"
								:localdata="range"></uni-data-select>
						</uni-forms-item>

						<uni-forms-item>
							<button type="primary" @click="addFarm">提交</button>
						</uni-forms-item>

						<uni-forms-item>
							<button @click="close" type="primary">关闭</button>
						</uni-forms-item>
					</uni-forms>
				</view>
			</uni-section>
		</uni-popup>

	</view>
</template>

<script>
	import {
		getFarmAllByIdApi,
		addFarmApi,
		delFarmApi,
		uppFarmApi
	} from '@/api/index.js'

	export default {
		data() {
			return {
				isUpp: false,
				uid: null,
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '农场名称必填',
						}]
					},
					location: {
						rules: [{
							required: true,
							errorMessage: '农场地址必填',
						}]
					},
				},
				farms: [],
				farmFormData: {
					farmer: uni.getStorageSync("uid"),
					name: '',
					location: '',
					status: 0
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
			open() {
				this.$refs.popup.open('center')
			},
			close() {
				this.farmFormData = {
					farmer: uni.getStorageSync("uid"),
					name: '',
					location: '',
					status: 0
				}
				this.$refs.popup.close()
			},
			edite(item) {
				this.farmFormData = {
					...this.farmFormData,
					...item
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
							await delFarmApi(id)
							this.getFarmAll()
						}
					}
				})
			},
			async getFarmAll() {
				const res = await getFarmAllByIdApi(this.uid)
				this.farms = res
			},
			addFarm() {
				this.$refs.form.validate().then(async () => {
					if (this.isUpp) {
						await uppFarmApi(this.farmFormData)
						this.isUpp = false
					} else {
						await addFarmApi(this.farmFormData)
					}
					this.getFarmAll()
					this.close()
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		},
		onShow() {
			this.uid = uni.getStorageSync("uid")
			this.getFarmAll()
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;

		.allFarm {
			padding: 20rpx;
		}

		.addFarm {
			width: 600rpx;
			padding: 20rpx;
		}
	}
</style>