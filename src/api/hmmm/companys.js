/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:32:40
 *
 * 企业管理
 */

import { createAPI } from '@/utils/request'

export const list = data => createAPI('/companys', 'get', data) // 获取列表
export const add = data => createAPI('/companys', 'post', data) // 添加
export const update = data => createAPI(`/companys/${data.id}`, 'put', data) // 编辑
export const remove = data => createAPI(`/companys/${data.id}`, 'delete', data)// 删除
export const detail = data => createAPI(`/companys/${data.id}`, 'get', data)
export const disabled = data => createAPI(`/companys/${data.id}/${data.state}`, 'post', data)// 改变状态
