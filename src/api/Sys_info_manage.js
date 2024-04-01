import request from "@/utils/request";
// 权限管理 获取角色数据
export function getAuthorData(data) {
  return request({
    url:'/home/authority/getFosGroupByPage',
    method:'get',
    params:data
  })
}
// 角色数量
export function getAutherCount() {
  return request( {
    url:'/home/authority/getFosGroupCount',
    method:'get',
  })
}
//
export function addAithor(data) {
  return request({
    url:'/home/authority/createFosGroup',
    method:'post',
    params:data
  })
}
// 编辑角色
export function editAuthor(data) {
  return request({
    url:'/home/authority/updateFosGroupAction',
    method:'post',
    params:data
  })
}
// 删除角色
export function delAuthor(data) {
  return request({
    url:'/home/authority/delFosGroup',
    method:'post',
    params:data
  })
}

// 获取角色权限数据
export function getAuthority(data) {
  return request({
    url:'home/authority/getFosGroupAuthorityForSetting',
    method:'post',
    params:data
  })
}
// 修改角色权限
export function updateAuthority(data) {
  return request({
    url:'home/authority/updateAuthorityAction',
    method:'post',
    params:data
  })
}
export function helpInfoLogRecord() {
  return request({
    url:'home/authority/helpInfoLogRecord',
    method:'post'
  })
}
