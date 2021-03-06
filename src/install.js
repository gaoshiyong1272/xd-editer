'use strict';

// 自动以数组加载并结构保存组件，便于遍历
import components from './components/autoload';

import gxdHelper from 'gxd-helper';
let {helper, cookie, storage, regExps} = gxdHelper;
let helperObj = helper({});


// 定义 install 方法
const install = function (Vue, options) {
  if (install.installed) return;
  install.installed = true;


  Vue.prototype.$xdHelper = helperObj;
  Vue.prototype.$xdCookie = cookie;
  Vue.prototype.$xdStorage = storage;
  Vue.prototype.$xdRegExps = regExps;
  Vue.prototype.$xdOptions = helperObj.cloneDeep(options);
  console.log('Vue.use()=> options', options);

  // 遍历并注册全局组件
  Object.keys(components).map(key => {
    Vue.component(components[key].name, components[key])
  });
};

if (typeof window !== 'undefined' && window['Vue']) {
  install(window['Vue'])
}

export default {
  install,
  ...components
}
