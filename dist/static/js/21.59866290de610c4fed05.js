webpackJsonp([21],{NNDa:function(t,i){t.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ul",{staticClass:"navigation-list messagescrollbar"},e._l(e.navs,function(i,t){return s("router-link",{key:t,attrs:{to:"/social/message/list/"+i.listId}},[s("li",{staticClass:"navigation-list-item",class:{active:e.$route.params.listId==i.listId},on:{click:function(t){e.handleActiveNavigation(i)}}},[s("img",{attrs:{width:"40",src:i.icon}}),e._v(" "),s("div",{staticClass:"navigation-list-item-appinfo"},[s("div",{staticClass:"font14"},[e._v(" "+e._s(i.listName))]),e._v(" "),s("div",{staticStyle:{color:"#5c7893"}},[s("p",{domProps:{innerHTML:e._s(i.comment)}})])]),e._v(" "),s("Badge",{staticClass:"navigation-list-item-msgcount",attrs:{count:i.unreadNum,"overflow-count":"99"}})],1)])}))},staticRenderFns:[]}},Nrpr:function(t,i){},nUp3:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"message"},[e("div",{staticClass:"message-sider"},[e("div",{staticClass:"message-sider-header"},[t._v("\n            消息通知\n            \n            "),e("Tooltip",{attrs:{content:"工作流任务"}},[e("router-link",{attrs:{to:{name:"flowtask"}}},[e("Icon",{attrs:{type:"md-repeat",size:"24"}})],1)],1)],1),t._v(" "),e("div",{staticClass:"message-sider-list "},[e("navigation")],1)]),t._v(" "),e("div",{staticClass:"message-content"},[e("router-view")],1)])},staticRenderFns:[]}},pu3t:function(t,i){},ru4w:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("a8xa"),n={name:"Navigation",data:function(){return{params:{page:1,limit:1e3,filter:""},navs:[]}},methods:{refreshNavListByMessage:function(t){var i=this;Object(s.d)(this.params).then(function(t){i.navs=t.tableContent})},subscribeMessage:function(){var i=this,t=this.$deepstream,e=this.$currentUser.userId;console.log("订阅"),t.event.subscribe("commentMessage/"+e,function(t){i.refreshNavListByMessage(),0<t.dataCount&&i.hanleWindowNotification("您有"+t.dataCount+"未读消息")})},hanleWindowNotification:function(i){var e=function(){var t=new Notification("Roletask【路塔】",{body:i,icon:"static/favicon.ico"});t.onclick=function(){console.log("点击"),window.self.focus(),t.close()}};if(window.Notification){var t=navigator.userAgent.toLowerCase();-1!=t.indexOf("safari")&&(-1<t.indexOf("chrome")?Notification.requestPermission().then(function(t){"granted"==t?e():(Notification.requestPermission(),console.log("没有权限,用户拒绝:Notification"))}):Notification.requestPermission(function(t){"granted"==t||(Notification.requestPermission(),console.log("没有权限,用户拒绝:Notification"))}))}else console.log("不支持Notification")},handleActiveNavigation:function(i){Object(s.e)(i.listId).then(function(t){i.unreadNum=0})}},mounted:function(){this.refreshNavListByMessage(),this.subscribeMessage()}},a=e("NNDa"),o=e.n(a);var r=function(t){e("Nrpr")},c={name:"MessageLayout",components:{Navigation:e("VU/8")(n,o.a,!1,r,"data-v-41219229",null).exports},data:function(){return{}},watch:{},mounted:function(){var t=localStorage.getItem("activeNavigatioIdOfNotice");t&&this.$router.push("/social/message/list/"+t)}},l=e("nUp3"),u=e.n(l);var f=function(t){e("pu3t")},d=e("VU/8")(c,u.a,!1,f,"data-v-2d44e5f0",null);i.default=d.exports}});