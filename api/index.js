// 引用网络请求中间件
import request from '@/utils/request';

export function loginApi(data) {
	return request({
		url: '/api/user/login',
		method: 'POST',
		data
	});
}

export function registerApi(data) {
	return request({
		url: '/api/user/register',
		method: 'POST',
		data
	});
}

export function getUserInfoApi(id) {
	return request({
		url: '/api/user/select/' + id,
		method: 'GET'
	});
}

export function uppUserInfoApi(data) {
	return request({
		url: '/api/user/upp',
		method: 'POST',
		data
	});
}

export function getSyInfoApi(id) {
	return request({
		url: '/api/ncpsy/select/' + id,
		method: 'GET'
	});
}

export function addSmjlApi(data) {
	return request({
		url: '/api/smjl/add',
		method: 'POST',
		data
	});
}

export function getSmjlApi(id) {
	return request({
		url: '/api/smjl/selectAll/' + id,
		method: 'GET'
	});
}

export function getSypjApi(data) {
	return request({
		url: '/api/sypj/find',
		method: 'POST',
		data
	});
}

export function addSypjApi(data) {
	return request({
		url: '/api/sypj/add',
		method: 'POST',
		data
	});
}

export function getSypjAllByIdApi(id) {
	return request({
		url: '/api/sypj/selectAll/' + id,
		method: 'GET'
	});
}

export function getFarmAllByIdApi(id) {
	return request({
		url: '/api/farm/selectAll/' + id,
		method: 'GET'
	});
}

export function getFarmAllApi() {
	return request({
		url: '/api/farm/selectAll',
		method: 'GET'
	});
}

export function addFarmApi(data) {
	return request({
		url: '/api/farm/add',
		method: 'POST',
		data
	});
}

export function uppFarmApi(data) {
	return request({
		url: '/api/farm/upp',
		method: 'POST',
		data
	});
}

export function delFarmApi(id) {
	return request({
		url: '/api/farm/del/' + id,
		method: 'GET'
	});
}

export function getProAllByIdApi(id) {
	return request({
		url: '/api/produce/selectAll/' + id,
		method: 'GET'
	});
}

export function getProAllApi() {
	return request({
		url: '/api/produce/selectAll',
		method: 'GET'
	});
}

export function addProApi(data) {
	return request({
		url: '/api/produce/add',
		method: 'POST',
		data
	});
}

export function uppProApi(data) {
	return request({
		url: '/api/produce/upp',
		method: 'POST',
		data
	});
}

export function delProApi(id) {
	return request({
		url: '/api/produce/del/' + id,
		method: 'GET'
	});
}

export function getSyAllApi() {
	return request({
		url: '/api/ncpsy/selectAll',
		method: 'GET'
	});
}

export function uppSyApi(data) {
	return request({
		url: '/api/ncpsy/upp',
		method: 'POST',
		data
	});
}

export function addSyApi(data) {
	return request({
		url: '/api/ncpsy/add',
		method: 'POST',
		data
	});
}


export function delSyApi(id) {
	return request({
		url: '/api/ncpsy/del/' + id,
		method: 'GET'
	});
}