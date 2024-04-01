/**
 * @Description: 有关生命周期的接口
 * @Author:  wr
 * @Date: 2022-11-5 15:13:06
 * @LastEditTime: 2022-11-05 23:29:06
 * @LastEditors:
 */
import request from '@/utils/request'

export function updatePosition(params) {
  return request({
    params,
    url: '/home/cycle/updatePosition',
    method: 'post',
    responseType: 'json'
  })
}

export function updateDepartment(params) {
    return request({
      params,
      url: '/home/cycle/updateDepartment',
      method: 'post',
      responseType: 'json'
    })
  }


export function batchUpdateDepartment(params) {
  return request({
    params,
    url: '/home/cycle/batchUpdateDepartment',
    method: 'post',
    responseType: 'json'
  })
}


