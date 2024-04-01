import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { getMoveRoute } from '@/api/user'

/**
 * Note: sub-menu only appear when route children. Length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will become nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will not redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export let asyncRoutes = [
  // 404页一定要放在最后!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export function getAsyncRoutes() {
  return new Promise((resolve, reject) => {
    getMoveRoute().then(response => {
      if (response.data.length == 0){
        asyncRoutes = []
      }else {
        const { data } = response
        asyncRoutes = filterAsyncRoutes(data) // 全部的路由数据
      }
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

export function getRouter(permission) {
  if (permission.children && permission.children.length > 0) { // 一级菜单Layout
    return {
      path: permission.path,
      component: Layout,
      children: [{
        path: '',
        component: (resolve) => require([`@/views/${permission.component}`], resolve),
        meta: {
          title: permission.meta.title,
          icon: permission.meta.icon,
          breadcrumb: false
        }
      },],
    }
  } else { // 子菜单
    return {
      path: permission.path,
      component: (resolve) => require([`@/views/${permission.component}`], resolve),
      meta: {
        title: permission.meta.title,
        icon: permission.meta.icon,
        breadcrumb: false
      }
    }
  }
}

export function initRoute(permission) { // 封装路由
  if (permission.children && permission.children.length > 0) { // 如果存在子节点
    const route = {
      path: permission.path,
      component: Layout,
      alwaysShow: true,
      meta: {
        title: permission.meta.title,
        icon: permission.meta.icon,
        breadcrumb: false
      },
      children: []
    }
    permission.children.forEach(child => { // 递归封装子节点
      route.children.push(initRoute(child, child.level))
    })
    return route
  } else { // 不存在子节点直接返回
    return getRouter(permission)
  }
}

export function filterAsyncRoutes(routes) {
  const accessedRoutes = []
  routes.forEach(permission => {
    const routeNode = initRoute(permission)
    accessedRoutes.push(routeNode) // push一个个封装好的路由数据
  })
  const firstRouteNode =
    {
      path: '/',
      component: Layout,
      redirect: routes[0].path + '/' + routes[0].children[0].path,
      hidden: true
    }
  accessedRoutes.push(firstRouteNode)
  return accessedRoutes // 返回全部的路由数据
}

export default router

