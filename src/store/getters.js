
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  realname: state => state.user.realname,
  roles: state => state.user.roles,
  userid: state => state.user.userid,
  roleid: state => state.user.roleid,
  role_department_id: state => state.user.role_department_id,
  role_department_name: state => state.user.role_department_name,
  role_name: state => state.user.role_name,

  permission_routes: state => state.permission.routes,
  unit: state => state.machineRoom.state.unit
}
export default getters
