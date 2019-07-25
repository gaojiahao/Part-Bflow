import commonLoading from './loading.vue';

let [ Loading, pageLoadInstance ] = [ {}, null ];

Loading.install = (Vue) => {
  if (!pageLoadInstance) {
    // 扩展vue实例，引入loading
    const Loading = Vue.extend(commonLoading); 
    // 创建loading实例并挂载
    pageLoadInstance = new Loading().$mount(); 
    document.body.appendChild(pageLoadInstance.$el);
  }
  
  Vue.prototype.$loading = { 
    show() {
      pageLoadInstance.show = true;
    },
    hide() {
      pageLoadInstance.show = false;
    }
  }
}

export default Loading;
