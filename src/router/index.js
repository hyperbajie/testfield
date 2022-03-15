import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/table",
    name: 'Table',
    component: () => import('../views/Table.vue')
  },
  {
    path: "/scope",
    name: "Scope",
    component: () => import('../views/Scope.vue')
  },
  {
    path: "/promise",
    name: "Promise",
    component: () => import('../views/Promise.vue')
  },
  {
    path: "/jsx",
    name: "Jsx",
    component: () => import('../views/Jsx.vue')
  },
  {
    path: "/pop",
    name: "Pop",
    component: () => import('../views/Pop.vue')
  },
  {
    path: "/pop2",
    name: "Pop2",
    component: () => import('../views/Pop2.vue')
  },
  {
    path: "/table2",
    name: "Table2",
    component: () => import('../views/Table2.vue')
  },
  {
    path: "/table3",
    name: "Table3",
    component: () => import('../views/Table3.vue')
  },
  {
    path: "/tag",
    name: "Tag",
    component: () => import("../views/Tag.vue")
  },
  {
    path: "/Collapse",
    name: "collapse",
    component: () => import("../views/Collapse.vue")
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
