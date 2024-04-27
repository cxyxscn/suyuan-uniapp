import env from '@/utils/evn.js';

function service(options = {}) {
	options.url = `${env.baseUrl}${options.url}`;

	options.header = {
		'content-type': 'application/json',
	};

	// resolved是返回成功数据，rejected返回错误数据
	return new Promise((resolved, rejected) => {
		uni.showLoading({
			title: "加载中...",
			mask: true
		})
		options.success = (res) => {
			uni.hideLoading()
			// 如果请求回来的状态码不是0则执行以下操作
			if (res.data.code !== 0) {
				// 非成功状态码弹窗
				uni.showToast({
					icon: 'none',
					duration: 1000,
					title: `${res.data.message}`
				})
				// 这里可以做一些状态码判断以及操作
				// 返回错误信息
				// rejected(res)
			} else {
				// 请求回来的状态码为0则返回内容
				uni.showToast({
					icon: 'none',
					duration: 1000,
					title: '操作成功'
				})
				resolved(res.data.data)
			}
		};
		options.fail = (err) => {
			// 请求失败弹窗
			uni.showToast({
				icon: 'none',
				duration: 3000,
				title: '服务器错误,请稍后再试'
			});
			// rejected(err)
		};
		uni.request(options)
	});
}

export default service;