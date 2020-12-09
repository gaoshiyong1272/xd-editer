import Vue from 'vue'
import App from './App.vue';
import gxdHelper from 'gxd-helper';
import components from "@/components/autoload";

let {helper, cookie, storage, regExps} = gxdHelper;
let helperObj = helper({});

Vue.prototype.$xdHelper = helperObj;
Vue.prototype.$xdCookie = cookie;
Vue.prototype.$xdStorage = storage;
Vue.prototype.$xdRegExps = regExps;
Vue.config.productionTip = false;

Vue.prototype.$xdOptions = {
  // qiniu: [{
  //   accoutKey: 'bP3Ca5dtSJBNaWwMkihfhuE30CbAZnYrNzQm6eMN', //七牛AK（e56buy ）
  //   serviceKey: 'pPNgWwRL3_Jlj7cPtpYbkhXn01EOZTtUhOs3NqZM', //七牛SK（e56buy ）
  //   webSiteName: 'e56buystatic', //七牛桶名称（e56buy ）
  //   staticUrl: 'http://static.e56buy.com' //静态域名访问地址（e56buy ）
  // }]
};

console.log(components);

// 遍历并注册全局组件
Object.keys(components).map(key => {
  Vue.component(components[key].name, components[key])
});

new Vue({
  render: h => h(App),
}).$mount('#app')
