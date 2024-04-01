import request from '@/utils/request'

/**
 * 传入excel，通过设备编号解析设备类型，传入设备类型名称使用addEquipment
 * @param data
 * @returns {*}
 */
export function importExcel(data) {
  return request({
    url: '/home/inforesources/AddExcel',
    method: 'post',
    // timeout: 120 * 1000,
    data
  })
}
