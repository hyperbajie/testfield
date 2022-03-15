import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/components/base-layout";

Vue.use(VueRouter)

function format(name) {
  let result = String(name).toLowerCase();
  return result.replace("-", "");
}

const generateRoutes = function () {
  const requirePages = require.context('../views', true, /\.vue/);
  const Routes = [];
  requirePages.keys().forEach(fileName => {
    const page = requirePages(fileName);
    const pageName = fileName.replace(/\.\/(.*)\.vue/, '$1');
    // Routes.push({
    //   path: "/" + format(pageName),
    //   name: pageName,
    //   component: page.default
    // });

    Routes.push({
      path: "/" + format(pageName),
      component: Layout,
      name: page.default.name,
      children: [
        {
          path: "/" + format(pageName),
          name: pageName,
          component: page.default
        }
      ]
    })

  });

  return Routes;
}

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: "/table",
  //   name: 'table',
  //   component: () => import('../views/Table.vue')
  // },
  // {
  //   path: "/scope",
  //   name: "scope",
  //   component: () => import('../views/Scope.vue')
  // },
  // {
  //   path: "/promise",
  //   name: "promise",
  //   component: () => import('../views/Promise.vue')
  // },
  // {
  //   path: "/jsx",
  //   name: "jsx",
  //   component: () => import('../views/Jsx.vue')
  // },
  // {
  //   path: "/pop",
  //   name: "pop",
  //   component: () => import('../views/Pop.vue')
  // },
  // {
  //   path: "/pop2",
  //   name: "pop2",
  //   component: () => import('../views/Pop2.vue')
  // },
  // {
  //   path: "/table2",
  //   name: "table2",
  //   component: () => import('../views/Table2.vue')
  // },
  // {
  //   path: "/table3",
  //   name: "table3",
  //   component: () => import('../views/Table3.vue')
  // },
  // {
  //   path: "/tag",
  //   name: "tag",
  //   component: () => import("../views/Tag.vue")
  // },
  // {
  //   path: "/collapse",
  //   name: "collapse",
  //   component: () => import("../views/Collapse.vue")
  // },
  // {
  //   path: "/testfield",
  //   name: "testfield",
  //   component: () => import("../views/test-field.vue")
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

export const lastRoutes = routes.concat(generateRoutes());
const router = new VueRouter({
  routes: lastRoutes
})

router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    next("/home");
    return;
  }
  next();
})

export default router
