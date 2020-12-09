import Vue from 'vue';
import loading  from "./loading.vue";
let loadingComponent = null;

export default function (show = true) {
  if(!loadingComponent) {
    const Loading = Vue.extend(loading);
    loadingComponent = new Loading({
      el: document.createElement('div')
    });
    loadingComponent.show = show;
    document.body.appendChild(loadingComponent.$el);
  }else{
    loadingComponent.show = show;
  }
}
