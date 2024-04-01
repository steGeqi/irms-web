import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    realname: '',
    roleid: '',
    username: '',
    userid: '',
    role_department_id: '',
    role_department_name: '',
    roles: [],
    role_name:''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_REAL_NAME: (state, realname) => {
    state.realname = realname
  },
  SET_ROLE_ID: (state, roleid) => {
    state.roleid = roleid
  },

  SET_POST_NAME: (state, post_name) => {
    state.post_name = post_name
  },

  SET_ROLE_DEPARTMENT_ID: (state, role_department_id) => {
    state.role_department_id = role_department_id
  },
  SET_ROLE_DEPARTMENT_NAME: (state, role_department_name) => {
    state.role_department_name = role_department_name
  },
  SET_USER_NAME: (state, username) => {
    state.username = username
  },
  SET_USER_ID: (state, userid) => {
    state.userid = userid
  },
  SET_ROLE_NAME: (state, role_name) => {
    state.role_name = role_name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, reCode, fosV } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, reCode: reCode, fosV: fosV }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重新登录。')
        }
        const { roles, realname, roleid , post_name , role_department_id, role_department_name , username, userid ,role_name } = data
        // Roles必须为非空数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles必须是非空数组!')
        }

        commit('SET_ROLES', roles) // group_name
        commit('SET_REAL_NAME', realname)
        commit('SET_ROLE_ID', roleid)
        commit('SET_POST_NAME', post_name)
        commit('SET_ROLE_DEPARTMENT_ID', role_department_id)
        commit('SET_ROLE_DEPARTMENT_NAME', role_department_name)
        commit('SET_USER_NAME', username)
        commit('SET_USER_ID', userid)
        commit('SET_ROLE_NAME', role_name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

