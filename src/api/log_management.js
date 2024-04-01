import request from '@/utils/request'

// 获取日志数据操作者
export function getLogDataUser() {
  return request({
    url: '/home/log_management/getLogDataUser',
    method: 'get',
    params: ''
  })
}
// 通过时间获取日志数据的用户
export function getLogDataUserByTime(timeParams) {
  return request({
    params: {timeParams:timeParams},
    url: '/home/log_management/getLogDataUserByTime',
    method: 'get',
  })
}

// 通过时间获取日志数据
export function getLogDataByTime(timeParams) {
  return request({
    params: {timeParams:timeParams},
    url: '/home/log_management/getLogDataByTime',
    method: 'get',
  })
}
// 通过用户获取日志数据
export function getLogDataByDateAndUser(data) {
  return request({
    params: data,
    url: '/home/log_management/getLogDataByDateAndUser',
    method: 'get',
  })
}
// 通过单位获取日志数据
export function getRoleAndCountByCurrentDay(data) {
  return request({
    params: data,
    url: '/home/log_management/getRoleAndCountByCurrentDay',
    method: 'get',
  })
}
//获取日志数据
export function getLogData(data) {
  return request({
    params: data,
    url: '/home/log_management/getLogData',
    method: 'get',
  })
}
//获取每天操作日志的次数
export function getLogDateAndCount() {
  return request({
    params: '',
    url: '/home/log_management/getLogDateAndCount',
    method: 'get',
  })
}
//获取当天日志数据
export function getCurrentDayLogData(currentDate) {
  return request({
    params: {currentDate: currentDate},
    url: '/home/log_management/getCurrentDayLogData',
    method: 'get',
  })
}


//获取日志操作用户和次数
export function getOperationCount() {
  return request({
    params: '',
    url: '/home/log_management/getOperationCount',
    method: 'get',
  })
}

//获取当天操作用户和次数
export function getUserAndCountByCurrentDay(currentDate) {
  return request({
    params: {currentDate: currentDate},
    url: '/home/log_management/getUserAndCountByCurrentDay',
    method: 'get',
  })
}

//获取当天单位角色或部门角色的操作的操作次数
export function getUnitRoleOrDepartmentRoleOperationCountByCurrenDayDate(currenDayDate) {
  return request({
    params: {currenDayDate: currenDayDate},
    url: '/home/log_management/getUnitRoleOrDepartmentRoleOperationCountByCurrenDayDate',
    method: 'get',
  })
}


//获取每个单位操作的次数
export function getPostAndOperationCount() {
  return request({
    params: '',
    url: '/home/log_management/getPostAndOperationCount',
    method: 'get',
  })
}



