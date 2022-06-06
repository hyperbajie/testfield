import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
import SelfInstall from "./install";
import "@/css/index.scss";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { install as directiveInstall } from "@/directives";

Vue.config.productionTip = false

Vue.use(autoAnimatePlugin);

Vue.use(directiveInstall);

Vue.use(Element);

Vue.use(SelfInstall);
// Vue.directive("change", changecolor);

Vue.filter("lower", function (value) {
  return value.charAt(0).toLowerCase() + value.slice(1);
});
window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
