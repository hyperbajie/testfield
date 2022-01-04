import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
import SelfInstall from "./install";
Vue.config.productionTip = false

Vue.use(Element);

Vue.use(SelfInstall);
// Vue.directive("change", changecolor);

Vue.filter("lower", function(value) {
  return value.charAt(0).toLowerCase() + value.slice(1);
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
