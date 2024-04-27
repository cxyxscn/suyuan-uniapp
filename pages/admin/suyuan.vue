<template>
	<view class="container">
		<uni-section title="产品列表" type="line">
			<view class="allSy">
				<uni-table border>
					<uni-tr>
						<uni-th width="100" align="center">ID</uni-th>
						<uni-th width="100" align="center">产品名称</uni-th>
						<uni-th width="200" align="center">市场名称</uni-th>
						<uni-th width="200" align="center">市场地址</uni-th>
						<uni-th width="100" align="center">二维码</uni-th>
						<uni-th width="100" align="center">操作</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,index) in sys" :key="index">
						<uni-td align="center">{{item.id}}</uni-td>
						<uni-td align="center">{{item.produceName}}</uni-td>
						<uni-td align="center">{{item.markName}}</uni-td>
						<uni-td align="center">{{item.markAddress}}</uni-td>
						<uni-td align="center">
							<text @click="openEwm(baseUrl + item.ewm)">查看二维码</text>
						</uni-td>
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
				<view class="addSy">
					<uni-forms ref="form" label-position="top" :rules="rules" :modelValue="syFormData">
						<uni-forms-item label="选择产品" required name="produceId">
							<uni-data-select v-model="syFormData.produceId" :localdata="pros"
								:clear="false"></uni-data-select>
						</uni-forms-item>

						<uni-forms-item label="市场名称" required name="markName">
							<uni-easyinput v-model="syFormData.markName" placeholder="请输入市场名称" />
						</uni-forms-item>

						<uni-forms-item label="市场地址" required name="markAddress">
							<uni-easyinput v-model="syFormData.markAddress" placeholder="请输入市场地址" />
						</uni-forms-item>

						<uni-forms-item>
							<button type="primary" @click="addSy">提交</button>
						</uni-forms-item>

						<uni-forms-item>
							<button class="uni-mt-8" @click="close" type="primary">关闭</button>
						</uni-forms-item>
					</uni-forms>
				</view>
			</uni-section>
		</uni-popup>

	</view>
</template>

<script>
	import {
		getProAllApi,
		getSyAllApi,
		addSyApi,
		delSyApi,
		uppSyApi
	} from '@/api/index.js'
	import evn from '../../utils/evn';


	export default {
		data() {
			return {

				baseUrl: evn.baseUrl + '/api',
				uid: null,
				isUpp: false,
				sys: [],
				pros: [],
				rules: {
					produceId: {
						rules: [{
							required: true,
							errorMessage: '该项为必填',
						}]
					},
					markName: {
						rules: [{
							required: true,
							errorMessage: '该项为必填',
						}]
					},
					markAddress: {
						rules: [{
							required: true,
							errorMessage: '该项为必填',
						}]
					},
				},
				syFormData: {
					markAddress: "",
					markName: "",
					produceId: null,
				}
			};
		},
		methods: {
			openEwm(url) {
				console.log(url)
				uni.previewImage({
					urls: [url]
				})
			},
			open() {
				this.$refs.popup.open('center')
			},
			close() {
				this.syFormData = {
					markAddress: "",
					markName: "",
					produceId: null
				}
				this.$refs.popup.close()
			},
			edite(item) {
				this.syFormData = {
					id: item.id,
					markAddress: item.markAddress,
					markName: item.markName,
					produceId: item.produceId
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
							await delSyApi(id)
							this.getSyAll()
						}
					}
				})
			},
			async getSyAll() {
				const res = await getSyAllApi()
				this.sys = res
			},
			async getProAll() {
				const res = await getProAllApi()
				this.pros = res
			},
			addSy() {
				this.$refs.form.validate().then(async () => {
					if (this.isUpp) {
						await uppSyApi(this.syFormData)
						this.isUpp = false
					} else {
						await addSyApi(this.syFormData)
					}
					this.getSyAll()
					this.close()
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		},
		onShow() {
			this.uid = uni.getStorageSync("uid")
			this.getSyAll()
			this.getProAll()
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;

		.addSy {
			width: 600rpx;
			padding: 40rpx;
		}

		.ewm {
			width: 400rpx;
			height: 400rpx;
		}
	}
</style>