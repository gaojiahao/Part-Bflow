webpackJsonp([28],{bOdI:function(e,s,t){"use strict";s.__esModule=!0;var n,i=t("C4MV"),o=(n=i)&&n.__esModule?n:{default:n};s.default=function(e,s,t){return s in e?(0,o.default)(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}},c72o:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=t("bOdI"),i=t.n(n),o=t("woOf"),r=t.n(o),c=t("mvHQ"),a=t.n(c),u=t("GIAq"),b=t("U18u"),l=t("bJtM"),f=t("ejmB"),d={name:"userComments",components:{comments:l.a,commentPublish:f.a},props:{},data:function(){return{transCode:this.$route.params.transCode,selectusers:"",type:"instance",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,showUserModal:!1,isInstance:!1,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]}}},watch:{selectusers:function(e){console.log(JSON.parse(e)),this.addUserData(JSON.parse(e))}},methods:{addUserData:function(e){var s=this,t=[],n={};e.forEach(function(e){t.push(e.userId)}),t.length>0&&(n={relationKey:this.transCode,type:this.type,userIds:t.join(",")},Object(b.a)(n).then(function(e){e.success&&(s.$Message.success(e.message),s.refreshSubscribeInfo())}).catch(function(e){s.$Message.error(e.data.message)}))},addSubUsers:function(e){"add"===e&&window.top.viewInsCommentsUserModal&&window.top.viewInsCommentsUserModal()},deleteSubscribeUsers:function(e,s){var t=this,n={relationKey:this.transCode,userIds:e,type:this.type};this.$Modal.confirm({title:"确认",content:"确认退订<b style=color:#e4393c;>"+s+"</b>么？",onOk:function(){Object(b.b)(n).then(function(e){e.success&&(t.$Message.success(e.message),t.refreshSubscribeInfo())}).catch(function(e){t.$Message.error(e.data.message)})}})},handlePublish:function(e,s){var t=this,n={type:this.type,content:e,relationKey:this.transCode,parentId:-1,commentAndReply:!1,commentAttachments:s};Object(u.X)(n).then(function(e){e.success?t.refreshComments():t.$Notice.warning({title:"系统提示",desc:"添加评论失败,请联系企业管理员!"})})},refreshComments:function(){var e=this,s={relationKey:this.transCode,sort:a()([{property:"crtTime",direction:"DESC"}])};s=r()(s,this.pageInfo),Object(u.D)(s).then(function(s){e.comments=s.tableContent,e.pageInfo.total=s.dataCount}).then(function(e){window.top.setInstaceCommentsIframeHeight()})},handlePageChange:function(e){this.pageInfo.page=e,this.refreshComments()},handleSubscribeApp:function(){var e=this;Object(b.e)({type:"instance",relationKey:this.transCode}).then(function(s){e.subscribeInfo.isSubscribe=1,e.refreshSubscribeInfo()})},handleUnsubscribeApp:function(e){var s=this;Object(b.f)({relationKey:this.transCode,type:this.type}).then(function(e){s.subscribeInfo.isSubscribe=0,s.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var e,s=this;this.$forceUpdate(),Object(b.c)((e={type:"instance",relationKey:this.transCode},i()(e,"type",this.type),i()(e,"limit",10),i()(e,"page",1),e)).then(function(e){s.subscribeInfo.subscribeUsers=e.tableContent,s.subscribeInfo.subscribeNum=e.dataCount})},judgeIsSubscribeByRelationKey:function(e){var s=this;Object(b.d)({relationKey:this.transCode,type:this.type}).then(function(e){s.subscribeInfo.isSubscribe=e})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey(),window.top.addUserData=this.addUserData}},m={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"bg_ff "},[t("Row",{staticClass:"app-resource-group-title"},[t("h3",[e._v("评论 \n              "),t("b",{staticClass:"fr subscribe-bar"},[t("span",[1==e.subscribeInfo.isSubscribe&&e.subcribeVisible?t("span",{staticClass:"subcribeing",on:{mouseover:function(s){e.unsubcribeVisible=!0,e.subcribeVisible=!1},mouseout:function(s){e.unsubcribeVisible=!1,e.subcribeVisible=!0}}},[t("Icon",{staticClass:"success-color",attrs:{type:"md-checkmark"}}),e._v("正在关注中\n                      ")],1):e._e(),e._v(" "),1==e.subscribeInfo.isSubscribe&&e.unsubcribeVisible?t("span",{staticClass:"unsubcribe",on:{click:e.handleUnsubscribeApp,mouseout:function(s){e.unsubcribeVisible=!1,e.subcribeVisible=!0}}},[t("Icon",{staticClass:"warning-color",attrs:{type:"md-close"}}),e._v("取消关注\n                      ")],1):e._e(),e._v(" "),0==e.subscribeInfo.isSubscribe?t("span",{staticClass:"subcribe",on:{click:e.handleSubscribeApp}},[e._v("关注")]):e._e(),e._v(" "),t("span",[t("Icon",{staticClass:"success-color",attrs:{type:"md-notifications",size:"18"}})],1)]),e._v(" "),t("span",[t("Dropdown",{staticStyle:{"margin-left":"20px"},attrs:{trigger:"click"},on:{"on-click":e.addSubUsers}},[t("Icon",{attrs:{type:"md-person",size:"18"}}),e._v(" "+e._s(e.subscribeInfo.subscribeNum)+"\n                       "),t("Icon",{attrs:{type:"ios-arrow-down"}}),e._v(" "),t("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[t("DropdownItem",{attrs:{name:"add"}},[e._v("\n                             添加关注者\n                          ")]),e._v(" "),e._l(e.subscribeInfo.subscribeUsers,function(s,n){return t("DropdownItem",{key:n},[e._v("\n                             "+e._s(s.nickname)+"\n                             "),t("span",{staticClass:"delete-user",on:{click:function(t){t.stopPropagation(),e.deleteSubscribeUsers(s.userId,s.nickname)}}},[t("Icon",{attrs:{type:"md-close"}})],1)])})],2)],1)],1)])])]),e._v(" "),t("Row",{staticClass:"comments"},[t("commentPublish",{attrs:{handlePublish:e.handlePublish}}),e._v(" "),e.comments.length>0?t("div",{staticClass:"comments-header martop10"},[t("strong",[e._v("最新评论("+e._s(e.pageInfo.total)+")")])]):e._e(),e._v(" "),t("comments",{attrs:{isInIframe:!0,comments:e.comments,refreshRootComments:e.refreshComments}}),e._v(" "),e.pageInfo.total>0?t("Page",{staticClass:"pad20",attrs:{total:e.pageInfo.total,"page-size":e.pageInfo.limit,current:e.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":e.handlePageChange}}):e._e()],1)],1)},staticRenderFns:[]};var h=t("VU/8")(d,m,!1,function(e){t("jFR/")},"data-v-c209fcd0",null);s.default=h.exports},"jFR/":function(e,s){}});