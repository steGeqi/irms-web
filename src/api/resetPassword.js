import request from '@/utils/request'
export default {
  checkOldPassword(msg) { //校验原密码
    return request({
      url: '/syslogin/checkOldPassword',
      method: "post",
      params: msg
    })
  },

  updatePassword(msg) { //校验确认密码和新密码
    return request({
      url: "syslogin/editPasswordCheck",
      method: "post",
      params: msg
    })
  }

}




