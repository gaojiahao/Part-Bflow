webpackJsonp([33],{c72o:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=t("woOf"),i=t.n(n),o=t("mvHQ"),r=t.n(o),c=t("GIAq"),a=t("U18u"),b=t("bJtM"),u=t("ejmB"),l={name:"userComments",components:{comments:b.a,commentPublish:u.a},props:{},data:function(){return{transCode:this.$route.params.transCode,type:"instance",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]}}},methods:{handlePublish:function(e,s){var t=this,n={type:this.type,content:e,relationKey:this.transCode,parentId:-1,commentAndReply:!1,commentAttachments:s};Object(c.U)(n).then(function(e){e.success?t.refreshComments():t.$Notice.warning({title:"系统提示",desc:"添加评论失败,请联系企业管理员!"})})},refreshComments:function(){var e=this,s={relationKey:this.transCode,sort:r()([{property:"crtTime",direction:"DESC"}])};s=i()(s,this.pageInfo),Object(c.C)(s).then(function(s){e.comments=s.tableContent,e.pageInfo.total=s.dataCount}).then(function(e){window.top.setInstaceCommentsIframeHeight()})},handlePageChange:function(e){this.pageInfo.page=e,this.refreshComments()},handleSubscribeApp:function(){var e=this;Object(a.c)({type:"instance",relationKey:this.transCode}).then(function(s){e.subscribeInfo.isSubscribe=1,e.refreshSubscribeInfo()})},handleUnsubscribeApp:function(e){var s=this;Object(a.d)({relationKey:this.transCode}).then(function(e){s.subscribeInfo.isSubscribe=0,s.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var e=this;this.$forceUpdate(),Object(a.a)({relationKey:this.transCode,limit:10,page:1}).then(function(s){e.subscribeInfo.subscribeUsers=s.tableContent,e.subscribeInfo.subscribeNum=s.dataCount})},judgeIsSubscribeByRelationKey:function(e){var s=this;Object(a.b)({relationKey:this.transCode}).then(function(e){s.subscribeInfo.isSubscribe=e})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey()}},m={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"bg_ff "},[t("Row",{staticClass:"app-resource-group-title"},[t("h3",[e._v("评论 \n              "),t("b",{staticClass:"fr subscribe-bar"},[t("span",[1==e.subscribeInfo.isSubscribe&&e.subcribeVisible?t("span",{staticClass:"subcribeing",on:{mouseover:function(s){e.unsubcribeVisible=!0,e.subcribeVisible=!1},mouseout:function(s){e.unsubcribeVisible=!1,e.subcribeVisible=!0}}},[t("Icon",{staticClass:"success-color",attrs:{type:"md-checkmark"}}),e._v("正在关注中\n                      ")],1):e._e(),e._v(" "),1==e.subscribeInfo.isSubscribe&&e.unsubcribeVisible?t("span",{staticClass:"unsubcribe",on:{click:e.handleUnsubscribeApp,mouseout:function(s){e.unsubcribeVisible=!1,e.subcribeVisible=!0}}},[t("Icon",{staticClass:"warning-color",attrs:{type:"md-close"}}),e._v("取消关注\n                      ")],1):e._e(),e._v(" "),0==e.subscribeInfo.isSubscribe?t("span",{staticClass:"subcribe",on:{click:e.handleSubscribeApp}},[e._v("关注")]):e._e(),e._v(" "),t("span",[t("Icon",{staticClass:"success-color",attrs:{type:"md-notifications",size:"18"}})],1)]),e._v(" "),t("span",[t("Dropdown",{staticStyle:{"margin-left":"20px"},attrs:{placement:"bottom-end",trigger:"click"}},[t("Icon",{attrs:{type:"md-person",size:"18"}}),e._v(" "+e._s(e.subscribeInfo.subscribeNum)+"\n                      "),t("DropdownMenu",{attrs:{slot:"list"},slot:"list"},e._l(e.subscribeInfo.subscribeUsers,function(s,n){return t("DropdownItem",{key:n},[e._v("\n                             "+e._s(s.nickname)+"\n                          ")])}))],1)],1)])])]),e._v(" "),t("Row",{staticClass:"comments"},[t("commentPublish",{attrs:{handlePublish:e.handlePublish}}),e._v(" "),e.comments.length>0?t("div",{staticClass:"comments-header martop10"},[t("strong",[e._v("最新评论("+e._s(e.pageInfo.total)+")")])]):e._e(),e._v(" "),t("comments",{attrs:{isInIframe:!0,comments:e.comments,refreshRootComments:e.refreshComments}}),e._v(" "),e.pageInfo.total>0?t("Page",{staticClass:"pad20",attrs:{total:e.pageInfo.total,"page-size":e.pageInfo.limit,current:e.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":e.handlePageChange}}):e._e()],1)],1)},staticRenderFns:[]};var f=t("VU/8")(l,m,!1,function(e){t("f/nA")},"data-v-a9af891c",null);s.default=f.exports},"f/nA":function(e,s){}});