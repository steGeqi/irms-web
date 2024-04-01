import request from '@/utils/request'

export function getDepartmentAllCountData() {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  // var params = JSON.parse(JSON.stringify(obj))
  let params = ''

  return request({
    params,
    url: '/home/inforesources/getDepartmentAllCountData',
    method: 'get',
    responseType: 'json'
  })
}

export function getDepartmentBusinessSonSystemAllCount() {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  // var params = JSON.parse(JSON.stringify(obj))
  let params = ''

  return request({
    params,
    url: '/home/baseparameter/getDepartmentBusinessSonSystemAllCount',
    method: 'get',
    responseType: 'json'
  })
}

//---------田累积----------------
export function getInfo(obj) {
  let params = JSON.parse(JSON.stringify(obj))
  return request({
    params,
    url: '/home/inforesources/getInfo',
    method: 'get',
    responseType: 'json'
  })
}
export function getEquipmentNum(obj){
  let params = JSON.parse(JSON.stringify(obj))
  return request({
    params,
    url: '/home/inforesources/getEquipmentNum',
    method: 'get',
    responseType: 'json'
  })
}

export function getEquipmentAllCountData(obj) {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  let params = JSON.parse(JSON.stringify(obj))
  //console.log(params)
  // //console.log(typeof (params))
  return request({
    params,
    url: '/home/inforesources/getEquipmentAllCountData',
    method: 'get',
    responseType: 'json'
  })
}

export function getIPAddressCountData(obj) {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  let params = JSON.parse(JSON.stringify(obj))
  //console.log(params)
  // //console.log(typeof (params))
  return request({
    params,
    url: '/home/inforesources/getIPAddressCountData',
    method: 'get',
    responseType: 'json'
  })
}

export function getPostMachineRoom(data) {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  // //console.log(typeof (params))
  return request({
    params: {postId: data},
    url: '/home/inforesources/getPostMachineRoom',
    method: 'get',
    responseType: 'json'
  })
}

export function getMachineRoomAllCountData() {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  // //console.log(typeof (params))
  let params = ''
  return request({
    params,
    url: '/home/inforesources/getMachineRoomAllCountData',
    method: 'get',
    responseType: 'json'
  })
}

export function getCabinetAllCountData(obj) {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  var params = JSON.parse(JSON.stringify(obj))
  //console.log(params)
  // //console.log(typeof (params))
  return request({
    params,
    url: '/home/inforesources/getCabinetAllCountData',
    method: 'get',
    responseType: 'json'
  })
}


//获取有数据的单位
export function getUnitWithExistData(){
  return request({
    url: '/home/inforesources/getUnitWithExistData',
    method: 'get',
    responseType: 'json',
  })
}

//统计常见设备数量
export function getCommonEquipmentInformationAndCount(){
  return request({
    url: '/home/inforesources/getCommonEquipmentInformationAndCount',
    method: 'get',
    responseType: 'json',
  })
}

// 获取各单位部门下的国产化设备

export function getChinaLocalization(){
  return request({
    url: '/home/inforesources/getChinaLocalization',
    method: 'get',
    responseType: 'json'
  })
}

// 获取各单位部门下的等保等级数量
export function getSecondProtectedBusinessSonSystem(){
  return request({
    url: '/home/inforesources/getSecondProtectedBusinessSonSystem',
    method: 'get',
    responseType: 'json'
  })
}
