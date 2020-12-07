import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSipmleAlert from "vue-simple-alert";

Vue.config.productionTip = false

Vue.use(VueSipmleAlert);

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
