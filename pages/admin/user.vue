<template>
	<view class="container">
		<uni-section title="用户管理" type="line">
			<view class="allFarm">
				<uni-table border>
					<!-- 表头行 -->
					<uni-tr>
						<uni-th width="100" align="center">ID</uni-th>
						<uni-th width="100" align="center">账号</uni-th>
						<uni-th width="100" align="center">姓名</uni-th>
						<uni-th width="100" align="center">角色</uni-th>
						<uni-th width="100" align="center">操作</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr v-for="(item,index) in users" :key="index">
						<uni-td align="center">{{item.id}}</uni-td>
						<uni-td align="center">{{item.userAccount}}</uni-td>
						<uni-td align="center">{{item.username}}</uni-td>
						<uni-td align="center">
							<text v-if="item.userRole===0">普通用户</text>
							<text v-if="item.userRole===1">农场管理员</text>
							<text v-if="item.userRole===2">菜市场管理员</text>
							<text v-if="item.userRole===3">系统管理员</text>
						</uni-td>
						<uni-td align="center">
							<text @click="edite(item)" style="padding: 0 10rpx;">编辑</text>
							<text @click="del(item.id)" style="padding: 0 10rpx;">删除</text>
						</uni-td>
					</uni-tr>
				</uni-table>

				<view style="margin-top: 40rpx;">
					<button @click="open" type="primary">添加用户</button>
				</view>

			</view>

		</uni-section>


		<uni-popup ref="popup" type="bottom" background-color="#fff" :mask-click="false">
			<uni-section title="添加/修改" type="line">
				<view class="addFarm">
					<uni-forms ref="form" label-position="top" :rules="rules" :modelValue="userFormData">
						<uni-forms-item label="账号" required name="userAccount">
							<uni-easyinput v-model="userFormData.userAccount" placeholder="请输入账号" />
						</uni-forms-item>

						<uni-forms-item label="密码" required name="userPassword">
							<uni-easyinput v-model="userFormData.userPassword" placeholder="请输入密码" />
						</uni-forms-item>

						<uni-forms-item label="姓名" required name="username">
							<uni-easyinput v-model="userFormData.username" placeholder="请输入姓名" />
						</uni-forms-item>

						<uni-forms-item label="角色" required name="userRole">
							<uni-data-select v-model="userFormData.userRole" :clear="false"
								:localdata="range"></uni-data-select>
						</uni-forms-item>

						<view class="btn-box">
							<button type="primary" @click="addUser">提交</button>
							<button @click="close" type="primary">关闭</button>
						</view>

					</uni-forms>
				</view>
			</uni-section>
		</uni-popup>

	</view>
</template>

<script>
	import {
		addUserApi,
		delUserApi,
		getUserAllApi,
		uppUserApi
	} from '../../api';
	export default {
		data() {
			return {
				isUpp: false,
				uid: null,
				rules: {
					userAccount: {
						rules: [{
							required: true,
							errorMessage: '账号必填',
						}]
					},
					userPasswrod: {
						rules: [{
							required: true,
							errorMessage: '密码必填',
						}]
					},
					username: {
						rules: [{
							required: true,
							errorMessage: '姓名必填',
						}]
					},
					userRole: {
						rules: [{
							required: true,
							errorMessage: '角色必选',
						}]
					},
				},
				users: [],
				userFormData: {
					id: null,
					userAccount: '',
					userPasswrod: '',
					username: '',
					userRole: 0,
				},
				range: [{
						value: 0,
						text: "普通用户"
					},
					{
						value: 1,
						text: "农场管理员"
					},
					{
						value: 2,
						text: "菜市场管理员"
					},
					{
						value: 3,
						text: "系统管理员"
					}
				],
			};
		},
		methods: {
			open() {
				this.$refs.popup.open('center')
			},
			close() {
				this.userFormData = {
					id: null,
					userAccount: '',
					userPasswrod: '',
					username: '',
					userRole: 0,
				}

				this.$refs.popup.close()
			},
			edite(item) {
				this.userFormData = {
					id: item.id,
					userAccount: item.userAccount,
					userPasswrod: '',
					username: item.username,
					userRole: item.userRole,
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
							await delUserApi(id)
							this.getUserAll()
						}
					}
				})
			},
			async getUserAll() {
				const res = await getUserAllApi(this.uid)
				this.users = res
			},
			addUser() {
				this.$refs.form.validate().then(async () => {
					if (this.isUpp) {
						await uppUserApi(this.userFormData)
						this.isUpp = false
					} else {
						await addUserApi(this.userFormData)
					}
					this.getUserAll()
					this.close()
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		},
		onShow() {
			this.uid = uni.getStorageSync("uid")
			this.getUserAll()
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