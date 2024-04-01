import request from '@/utils/request'

// 综合数据管理展示与查询--lry
export function getList(obj) {
  // 将有数组和字符串的对象转为符合JSON格式的对象
  if (obj.prop == null) {
    obj.prop = 'basicInfoId'
  }
  if (obj.order == null) {
    obj.order = 'ASC'
  }
  if (obj.dataName[0] === '111' && obj.dataValue !== ' ') {
    obj.dataName = [
      'basicInfoId',
      'ipAddress',
      'macAddress',
      'equipmentName',
      'postName',
      'departmentName',
      'appAdminName',
      'equipmentTypeName',
      'brandName',
      'brandModelName',
      'serialNumber',
      'businessOrExperimental',
      'machineRoomName',
      'cabinetName',
      'cabinetUStart',
      'cabinetUEnd',
      'accessLocation',
      'singleAndDoublePowerSupply',
      'businessSystemFirstName',
      'businessSystem',
      'businessSystemLevel',
      'agreedToTemporaryShutdown',
      'installSafetyMonitoringSoftware',
      'deployStrongPassword',
      'deploymentEnvironment',
      'offlineTime',
      'onlineTime',
      'remarks',
      'type',
      'configMemoryCorenessOrCapacity',
      'softwareOperatingSystemEdition',
      'softwareOperatingSystemBuildDate',
      'softwareDatabaseEdition',
      'softwareDatabaseBuildDate',
      'edition',
      'softwareMiddlewareBuildDate',
      'cloudServiceUnit',
      'leasedComputingResources',
      'leasedStorageResources',
      'leasedNetworkBandwidth',
      'termOfLease',
      'domainName',
      'domainNameRegistrationService',
      'ns',
      'cname',
      'useCDN',
      'trueOrVirtual'
    ]
  }
  const params = JSON.parse(JSON.stringify(obj))
  return request({
    params,
    url: '/home/inforesources/getCompreDataAll',
    method: 'get',
    responseType: 'json'
  })
}

export function getEquipmentsByBaseInfoId(basicInfoId) {
  return request({
    params: { basicInfoId: basicInfoId },
    url: '/home/inforesources/getEquipmentsByBaseInfoId',
    method: 'post',
    responseType: 'json'
  })
}

export function getBasicInfoAll() {
  return request({
    url: '/home/inforesources/getBasicInfoAll',
    method: 'get',
    responseType: 'json'
  })
}

export function getdataCount(obj) {
  if (obj.dataName[0] === '111' && obj.dataValue !== ' ') {
    obj.dataName = [
      'basicInfoId',
      'ipAddress',
      'macAddress',
      'equipmentName',
      'postName',
      'departmentName',
      'appAdminName',
      'equipmentTypeName',
      'brandName',
      'brandModelName',
      'serialNumber',
      'businessOrExperimental',
      'machineRoomName',
      'cabinetName',
      'cabinetUStart',
      'cabinetUEnd',
      'accessLocation',
      'singleAndDoublePowerSupply',
      'businessSystemFirstName',
      'businessSystem',
      'businessSystemLevel',
      'agreedToTemporaryShutdown',
      'installSafetyMonitoringSoftware',
      'deployStrongPassword',
      'deploymentEnvironment',
      'offlineTime',
      'onlineTime',
      'remarks',
      'type',
      'configMemoryCorenessOrCapacity',
      'softwareOperatingSystemEdition',
      'softwareOperatingSystemBuildDate',
      'softwareDatabaseEdition',
      'softwareDatabaseBuildDate',
      'edition',
      'softwareMiddlewareBuildDate',
      'cloudServiceUnit',
      'leasedComputingResources',
      'leasedStorageResources',
      'leasedNetworkBandwidth',
      'termOfLease',
      'domainName',
      'domainNameRegistrationService',
      'ns',
      'cname',
      'useCDN',
      'trueOrVirtual'
    ]
  }
  // 将有数组和字符串的对象转为符合JSON格式的对象
  var params = JSON.parse(JSON.stringify(obj))
  // console.log(params)
  // console.log(typeof (params))
  return request({
    params,
    url: '/home/inforesources/getCompreDataCount',
    method: 'get',
    responseType: 'json'
  })
}

// 获取统计数据
export function getStatisticsData(par) {
  return request({
    url: '/home/inforesources/' + par,
    method: 'get',
    responseType: 'json'
  })
}

export function addEquipment(eq) {
  console.log(eq)
  return request({
    data: eq,
    url: '/home/inforesources/AddEquipment',
    method: 'post',
    responseType: 'json'
  })
}

export function AddExcel(eq) {
  // console.log('$$$',eq)
  return request({
    data: eq,
    url: '/home/inforesources/AddExcel',
    method: 'post',
    responseType: 'json'
  })
}


export function importMachineRoom(machineRoom) {
  return request({
    data: machineRoom,
    url: '/home/inforesources/importMachineRoom',
    method: 'post',
    responseType: 'json'
  })
}

export function delEquipment(equipmentId) {
  console.log(typeof (equipmentId))
  return request({

    params: { equipmentId: equipmentId },
    url: '/home/inforesources/DelEquipment',
    method: 'post',
    responseType: 'json'
  })
}

export function getbasic(equipmentId) {
  return request({
    params: { equipmentId: equipmentId },
    url: '/home/inforesources/getBasicInfoById',
    method: 'post',
    responseType: 'json'
  })
}

export function changeStatus(eq) {
  var params = JSON.parse(JSON.stringify(eq))
  return request({
    params,
    url: '/home/inforesources/changeEquipStatus',
    method: 'post',
    responseType: 'json'
  })
}

export function batchChangeEquipmentStatus(params) {
  return request({
    params,
    url: '/home/inforesources/batchChangeEquipmentStatus',
    method: 'post',
    responseType: 'json'
  })
}


export function InitValue(initdata) {
  console.log(initdata)
  return request({
    params: { initValue: initdata },
    url: '/home/inforesources/getInitDataAll',
    method: 'post',
    responseType: 'json'
  })
}


//综合信息管理表多条件查询
export function searchComprehensiveInfoByMultipleConditions(data) {
  return request({
    params: data,
    url: '/home/inforesources/searchComprehensiveInfoByMultipleConditions',
    method: 'post',
    responseType: 'json'
  })
}

//保修期查询
export function guaranteePeriodSearchByTime(data) {
  return request({
    params: data,
    url: '/home/inforesources/guaranteePeriodSearchByTime',
    method: 'post',
    responseType: 'json'
  })
}

//综合信息管理-新添IP地址、Mac地址查询
export function solelySearchIdAndMacAddress(data) {
  return request({
    params: data,
    url: '/home/inforesources/solelySearchIdAndMacAddress',
    method: 'post',
    responseType: 'json'
  })
}

