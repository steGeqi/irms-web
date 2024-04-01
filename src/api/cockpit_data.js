import request from '@/utils/request'

//总设备数据量
export const getEquipmentCount= () => {
  return request.get( '/home/inforesources/getCompreDataCount?dataName[]=111&dataValue=&status=0')
}
export const getPauseEquipmentCount= () => {
  return request.get( '/home/inforesources/getCompreDataCount?dataName[]=111&dataValue=&status=1')
}
export const getEndEquipmentCount= () => {
  return request.get( '/home/inforesources/getCompreDataCount?dataName[]=111&dataValue=&status=2')
}

//总设备类型数据量
export const getEquipmentTypeCount= () => {
  return request.get( '/home/baseparameter/getEquipmentTypeCount')
}

//保修期内设备数据量
export const getGuaranteePeriodCount= () =>{
  return request.get('/home/inforesources/getGuaranteePeriodCount')
}

//过保设备数据量
export const getOverGuaranteePeriodCount= () =>{
  return request.get('/home/inforesources/getOverGuaranteePeriodCount')
}

//总应用系统数量
export const getBusinessSystemCount= () =>{
  return request.get('/home/baseparameter/getBusinessSystemCount')
}

//应用管理员数量
export const getApplicationUserCount= () =>{
  return request.get('/home/inforesources/getApplicationUserCount?')
}

//设备管理员数量
export const getEquipmentUserCount= () =>{
  return request.get('/home/inforesources/getEquipmentUserCount?')
}

//虚拟机设备
export const getTrueOrVirtualCount= () =>{
  return request.get('/home/inforesources/getTrueOrVirtualCount')
}

//在用设备数量
export const getStatusCount= () =>{
  return request.get('/home/inforesources/getStatusCount')
}

//获取国产化设备数量
export const getDomesticEquipmentCount= () =>{
  return request.get('/home/inforesources/getDomesticEquipmentCount')
}
