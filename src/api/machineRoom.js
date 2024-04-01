import request from "@/utils/request";

export function getAllmachineroom(data) {
  return request({
    url:'/home/baseparameter/getMachineRoomByPage',
    method:'get',
    params:data
  })
}
