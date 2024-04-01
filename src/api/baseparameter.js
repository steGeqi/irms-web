import request from '@/utils/request'
import { getMachineRoom } from '@/api/select'



//通过页码获取单位
export function getPostByPage(data) {
  return request({
    url: '/home/baseparameter/getPostByPage',
    method: 'get',
    params: data
  })
}
//通过页码获取部门
export function getPostDepartmentByPage(data) {
  return request({
    url: '/home/baseparameter/getPostDepartmentByPage',
    method: 'get',
    params: data
  })
}
//通过页码获取一级设备类型
export function getEquipmentFirstTypeByPage(obj) {
  if(obj.dataName[0]=== "111" && obj.dataValue !== " "){
    obj.dataName = [
      'equipmentFirstTypeName',
      'equipmentFirstTypeCode'
    ]
  }
  const params = JSON.parse(JSON.stringify(obj));
  return request({
    params,
    url: '/home/baseparameter/getEquipmentFirstTypeByPage',
    method: 'get',
  })
}

//修改一级设备类型----------------赵长开----------------
export function updateEquipmentFirstType(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateEquipmentFirstType',
    method: 'post',
    responseType: 'json'
  })
}
//修改二级设备类型----------------赵长开----------------
export function updateEquipmentSecondType(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateEquipmentSecondType',
    method: 'post',
    responseType: 'json'
  })
}




//通过页码获取二级设备类型
export function getEquipmentTypeByPage(obj) {
  if(obj.dataName[0]=== "111" && obj.dataValue !== " "){
    obj.dataName = [
      'equipmentTypeName',
      'equipmentTypeCode',
      'equipmentFirstTypeName'
    ]
  }
  const params = JSON.parse(JSON.stringify(obj));
  return request({
    params,
    url: '/home/baseparameter/getEquipmentTypeByPage',
    method: 'get',
  })
}

//获取机房数量wr
export function getMachineRoomTotal(obj) {
  if(obj.dataName[0]=== "111" && obj.dataValue !== " "){
    obj.dataName = [
      'machineRoomName',
      'postName',
      'machineArea',
      'machineLocation',
      'machineAdministrator'
    ]
  }
  const params = JSON.parse(JSON.stringify(obj));
  return request({
    url: '/home/baseparameter/getMachineRoomTotal',
    method: 'get',
    params,
  })
}
//新增机柜
export function createCabinet(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createCabinet',
    method: 'post',
    responseType: 'json'
  })
}
//通过单位id获取机房
export function getMachineRoomByPostId(data) {
  return request({
    params: {postId: data},
    url: '/home/baseparameter/getMachineRoomByPostId',
    method: 'get'
  })
}
//获取机柜数量
export function getCabinetTotal(obj) {
  if(obj.dataName[0]=== "111" && obj.dataValue !== " "){
    obj.dataName = [
      'c.cabinetName',
      'm.machineRoomName',
      'm.postName',
    ]
  }
  const params = JSON.parse(JSON.stringify(obj));
  return request({
    url: '/home/baseparameter/getCabinetTotal',
    method: 'get',
    params,
  })
}
//通过页码获取机柜信息
export function getCabinetByPage(obj) {
  if(obj.dataName[0]=== "111" && obj.dataValue !== " "){
    obj.dataName = [
      'c.cabinetName',
      'm.machineRoomName',
      'm.postName',
    ]
  }
  const params = JSON.parse(JSON.stringify(obj));
  return request({
    params,
    url: '/home/baseparameter/getCabinetByPage',
    method: 'get',
  })
}
//检查机柜是否重复
export function checkCabinetName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkCabinetName',
    method: 'post',
    responseType: 'json'
  })
}
//通过页码获取机房
export function getMachineRoomByPage(obj) {
  if(obj.dataName[0]=== "111" && obj.dataValue !== " "){
    obj.dataName = [
      'machineRoomName',
      'postName',
      'machineArea',
      'machineLocation',
      'machineAdministrator'
    ]
  }
  const params = JSON.parse(JSON.stringify(obj));
  return request({
    params,
    url: '/home/baseparameter/getMachineRoomByPage',
    method: 'get',
  })
}
//通过页码获取业务系统
export function getBusinessSystemByPage(obj) {
  if(obj.dataName[0]=== "111" && obj.dataValue !== " "){
    obj.dataName = [
      'businessSystemName',
      'businessSystemLevel',
      'businessSystemFirstName',
      'departmentName',
      'postName'
    ]
  }
  const params = JSON.parse(JSON.stringify(obj));
  return request({
    params,
    url: '/home/baseparameter/getBusinessSystemByPage',
    method: 'get',
  })
}
//不通过页码获取业务子系统
export function getBusinessSystemAll(obj) {
  if(obj.dataName[0]=== "111" && obj.dataValue !== " "){
    obj.dataName = [
      'businessSystemName',
      'businessSystemLevel',
      'businessSystemFirstName',
      'departmentName',
      'postName'
    ]
  }
  const params = JSON.parse(JSON.stringify(obj));
  return request({
    params,
    url: '/home/baseparameter/getBusinessSystemAll',
    method: 'get',
  })
}

//通过页码获取一级业务系统
export function getFirstLevelBusinessSystemByPage(data) {
  return request({
    url: '/home/baseparameter/getFirstLevelBusinessSystemByPage',
    method: 'get',
    params: data
  })
}

//删除一级业务系统
export function deleteFirstLevelBusinessSystem(data){
  return request({
    url: '/home/baseparameter/deleteFirstLevelBusinessSystem',
    method: 'DELETE',
    params: {businessSystemFirstId:data}
  })
}

//搜索查询一级业务系统
export function SearchBusinessSystemFirstLevel(data){
  return request({
    url: '/home/baseparameter/SearchBusinessSystemFirstLevel',
    method: 'post',
    params: data
  })
}


//获取全部一级业务系统数据
export function getAllFirstLevelBusinessSystem() {
  return request({
    url: '/home/baseparameter/getAllFirstLevelBusinessSystem',
    method: 'get'
  })
}

//通过单位获取一级业务系统
export function getFirstLevelBusinessSystemByPostId(data) {
  return request({
    params: {postId: data},
    url: '/home/baseparameter/getFirstLevelBusinessSystemByPostId',
    method: 'get'
  })
}

//改变机房状态wr
export function changeStatus(eq) {
  var params = JSON.parse(JSON.stringify(eq))
  return request({
    params,
    url: '/home/baseparameter/changeRoomStatus',
    method: 'post',
    responseType: 'json'
  })
}

//新增单位
export function createPost(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createPost',
    method: 'post',
    responseType: 'json'
  })
}

//新增部门
export function createDepartment(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createPostDepartment',
    method: 'post',
    responseType: 'json'
  })
}
//新增业务系统 ----------------------赵长开-------------------
export function createBusinessSystem(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createBusinessSystem',
    method: 'post',
    responseType: 'json'
  })
}

//新增一级业务系统 ----------------------赵长开-------------------
export function createFirstLevelBusinessSystem(data) {
  return request({
    params:data,
    url: '/home/baseparameter/createFirstLevelBusinessSystem',
    method: 'post',
    responseType: 'json'
  })
}

//检查业务系统是否重复----------------------赵长开-------------------
export function checkBusinessSystemName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkBusinessSystemName',
    method: 'post',
    responseType: 'json'
  })
}

//检查一级业务系统是否重复----------------------赵长开-------------------
export function checkFirstLevelBusinessSystemName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkFirstLevelBusinessSystemName',
    method: 'post',
    responseType: 'json'
  })
}





//删除业务系统---------------------赵长开----------------------
export function delBusinessSystem(data) {
  return request({
    url: '/home/baseparameter/delBusinessSystem',
    method: 'delete',
    params: data
  })
}

//修改一级业务系统
export function updateFirstLevelBusinessSystem(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateFirstLevelBusinessSystem',
    method: 'post',
    responseType: 'json'
  })
}


//修改业务系统----------------赵长开----------------
export function updateBusinessSystemAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateBusinessSystemAction',
    method: 'post',
    responseType: 'json'
  })
}


//通过业务系统Id获取设备------------赵长开
export function getEquipmentByBusinessSystemId(data){
  return request({
    //params:data,
    params: {tempBusinessSystemNameId : data},
    url:'/home/baseparameter/getEquipmentByBusinessSystemId',
    method:'post',
    responseType:'json'
  })
}



//修改单位
export function updatePostAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updatePostAction',
    method: 'post',
    responseType: 'json'
  })
}
//修改部门
export function updatePostDepartmentAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updatePostDepartmentAction',
    method: 'post',
    responseType: 'json'
  })
}

//检查单位名称是否重复
export function checkPostName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostName',
    method: 'post',
    responseType: 'json'
  })
}
//检查单位代码是否重复
export function checkPostCode(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostCode',
    method: 'post',
    responseType: 'json'
  })
}

//检查部门名称是否重复
export function checkDepartmentName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostDepartmentName',
    method: 'post',
    responseType: 'json'
  })
}
//检查部门代码是否重复
export function checkDepartmentCode(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkPostDepartmentCode',
    method: 'post',
    responseType: 'json'
  })
}

//删除单位
export function delPost(data) {
  return request({
    url: '/home/baseparameter/delPost',
    method: 'delete',
    params: {postId : data}
  })
}

//删除部门
export function delPostDepartment(data) {
  return request({
    url: '/home/baseparameter/delPostDepartment',
    method: 'delete',
    params: {departmentId : data}
  })
}
//删除一级设备类型
export function delEquipmentFirstType(data) {
  return request({
    url: '/home/baseparameter/delEquipmentFirstType',
    method: 'delete',
    params: {equipmentFirstTypeId : data}
  })
}
//删除二级设备类型
export function delEquipmentType(data) {
  return request({
    url: '/home/baseparameter/delEquipmentType',
    method: 'delete',
    params: {equipmentTypeId : data}
  })
}

//新增一级设备类型
export function addEquipmentFirstType(data) {
  return request({
    params: data,
    url: '/home/baseparameter/addEquipmentFirstType',
    method: 'post',
    responseType: 'json'
  })
}

/* //修改一级设备类型
export function  updateEquipmentFirstType(data){
  return request({
    params:data,
    url:'/home/baseparameter/updateEquipmentFirstType',
    method: 'post',
    responseType: 'json'
  })
} */

//新增二级设备类型
export function addEquipmentSecondType(data) {
  return request({
    params: data,
    url: '/home/baseparameter/addEquipmentType',
    method: 'post',
    responseType: 'json'
  })
}


//检查一级设备类型名称是否重复
export function checkEquipmentTypeFirstName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkEquipmentTypeFirstName',
    method: 'post',
    responseType: 'json'
  })
}

//检查二级设备类型名称是否重复
export function checkEquipmentTypeSecondName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkEquipmentTypeName',
    method: 'post',
    responseType: 'json'
  })
}


//新增机房
export function addMachineRoom(data) {
  return request({
    params: data,
    url: '/home/baseparameter/addMachineRoom',
    method: 'post',
    responseType: 'json'
  })
}
//修改机房
export function updateMachineRoomAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateMachineRoomAction',
    method: 'post',
    responseType: 'json'
  })
}

//检查机房名称是否重复
export function checkMachineRoomName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkMachineRoomName',
    method: 'post',
    responseType: 'json'
  })
}

//删除机房
export function delMachineRoom(data) {
  return request({
    url: '/home/baseparameter/delMachineRoom',
    method: 'delete',
    params: {machineRoomId : data}
  })
}

//删除机柜
export function delCabinet(data) {
  return request({
    url: '/home/baseparameter/delCabinet',
    method: 'delete',
    params: {cabinetId : data}
  })
}
export function delCustomField(data) {
  return request({
    url: '/home/baseparameter/delCustomField',
    method: 'delete',
    params: {id : data}
  })
}

//修改机房
export function updateCabinetAction(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateCabinetAction',
    method: 'post',
    responseType: 'json'
  })
}

//获取机柜内设备信息
// export function getEquipmentByCabinet(machineRoomId, cabinetName) {
//   return request({
//     data: {
//       machineRoomName: machineRoomId,
//       cabinetName: cabinetName
//     },
//     url: '/home/baseparameter/getEquipmentByCabinet',
//     method: 'post',
//     responseType: 'json'
//   });
// }
export function getEquipmentByCabinet(cabinetId,postName){
  return request({
    params:{
      cabinetId:cabinetId,
      postName:postName
    },
    url:'/home/baseparameter/getEquipmentByCabinet',
    method: 'post',
    responseType: 'json'
  })
}

export function getVisitTotalOfCurrentPost(postName){
  return request({
    params:{
      postName:postName
    },
    url:'/home/baseparameter/getVisitTotalOfCurrentPost',
    method: 'post',
    responseType: 'json'
  })
}

export function getCabinetByEquipmentType(data){
  return request({
    params:{
      postName:data.postName,
      machineRoomName:data.machineRoomName,
      equipmentType:data.equipmentType
    },
    url:'/home/baseparameter/getCabinetByEquipmentType',
    method: 'post',
    responseType: 'json'
  })
}
//获取自定义字段
export function getCustomFieldData(){
  return request({
    url:'/home/baseparameter/getCustomFieldData',
    method: 'get',
    responseType: 'json'
  })
}
export function getCustomFieldByPage(data){
  return request({
    url:'/home/baseparameter/getCustomFieldByPage',
    method: 'get',
    params: data
  })
}
export function createCustomField(data) {
  return request({
    params: data,
    url: '/home/baseparameter/createCustomField',
    method: 'post',
    responseType: 'json'
  })
}

export function checkFieldName(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkFieldName',
    method: 'post',
    responseType: 'json'
  })
}
//检查标签是否重复
export function checkFieldLabel(data) {
  return request({
    params: data,
    url: '/home/baseparameter/checkFieldLabel',
    method: 'post',
    responseType: 'json'
  })
}
export function updateCustomField(data) {
  return request({
    params: data,
    url: '/home/baseparameter/updateCustomField',
    method: 'post',
    responseType: 'json'
  })
}
