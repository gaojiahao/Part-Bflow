{"source":"webpackJsonp([46],{c72o:function(e,s,t){\"use strict\";Object.defineProperty(s,\"__esModule\",{value:!0});var n=t(\"bOdI\"),i=t.n(n),o=t(\"woOf\"),c=t.n(o),r=t(\"mvHQ\"),a=t.n(r),u=t(\"Gu7T\"),b=t.n(u),l=t(\"GIAq\"),d=t(\"U18u\"),f=t(\"bJtM\"),m=t(\"ejmB\"),p=t(\"bTqw\"),h={name:\"userComments\",components:{comments:f.a,commentPublish:m.a},props:{},data:function(){return{transCode:this.$route.params.transCode,selectusers:\"\",type:\"instance\",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,showUserModal:!1,isInstance:!1,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]}}},watch:{selectusers:function(e){console.log(JSON.parse(e)),this.addUserData(JSON.parse(e))}},methods:{addUserData:function(e){var s=this,t=[],n={};e.forEach(function(e){t.push(e.userId)}),0<t.length&&(n={relationKey:this.transCode,type:this.type,userIds:t.join(\",\")},Object(d.a)(n).then(function(e){e.success&&(s.$Message.success(e.message),s.refreshSubscribeInfo(),s.judgeIsSubscribeByRelationKey())}).catch(function(e){s.$Message.error(e.data.message)}))},addSubUsers:function(e){\"add\"===e&&window.top.viewInsCommentsUserModal&&window.top.viewInsCommentsUserModal()},deleteSubscribeUsers:function(e,s){var t=this,n={relationKey:this.transCode,userIds:e,type:this.type};this.$Modal.confirm({title:\"确认\",content:\"确认退订<b style=color:#e4393c;>\"+s+\"</b>么？\",onOk:function(){Object(d.b)(n).then(function(e){e.success&&(t.$Message.success(e.message),t.refreshSubscribeInfo(),t.judgeIsSubscribeByRelationKey())}).catch(function(e){t.$Message.error(e.data.message)})}})},handlePublish:function(e,s){var t=this,n={type:this.type,content:e,relationKey:this.transCode,parentId:-1,commentAndReply:!1,commentAttachments:s};Object(l._6)(n).then(function(e){e.success?t.refreshComments():t.$Notice.warning({title:\"系统提示\",desc:e.message})})},refreshComments:function(){var s=this,t=[].concat(b()(p.b)),n=/\\[(.+?)\\]/g,e={relationKey:this.transCode,sort:a()([{property:\"crtTime\",direction:\"DESC\"}])};e=c()(e,this.pageInfo),Object(l.I)(e).then(function(e){e.tableContent.forEach(function(e){e.content=e.content.replace(n,function(s){var e=t.findIndex(function(e){return e===s.replace(/(\\[|\\])/g,\"\")});return-1===e?s:'<span class=\"comments-content-item-content-img-emotion\" style=\"background-position: -'+24*e+'px 0;\"></span>'})}),s.comments=e.tableContent,s.pageInfo.total=e.dataCount}).then(function(e){window.top.setInstaceCommentsIframeHeight()})},handlePageChange:function(e){this.pageInfo.page=e,this.refreshComments()},handleSubscribeApp:function(){var s=this;Object(d.e)({type:\"instance\",relationKey:this.transCode}).then(function(e){s.subscribeInfo.isSubscribe=1,s.refreshSubscribeInfo()})},handleUnsubscribeApp:function(e){var s=this;Object(d.f)({relationKey:this.transCode,type:this.type}).then(function(e){s.subscribeInfo.isSubscribe=0,s.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var e,s=this;this.$forceUpdate(),Object(d.c)((e={type:\"instance\",relationKey:this.transCode},i()(e,\"type\",this.type),i()(e,\"limit\",1e3),i()(e,\"page\",1),e)).then(function(e){s.subscribeInfo.subscribeUsers=e.tableContent,s.subscribeInfo.subscribeNum=e.dataCount})},judgeIsSubscribeByRelationKey:function(e){var s=this;Object(d.d)({relationKey:this.transCode,type:this.type}).then(function(e){s.subscribeInfo.isSubscribe=e})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey(),window.top.addUserData=this.addUserData}},I=t(\"eWtG\"),g=t.n(I);var y=function(e){t(\"rYK1\")},C=t(\"VU/8\")(h,g.a,!1,y,\"data-v-15ca562f\",null);s.default=C.exports},eWtG:function(e,s){e.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"div\",{staticClass:\"bg_ff\",staticStyle:{padding:\"5px\"}},[n(\"Row\",{staticClass:\"app-resource-group-title\"},[n(\"div\",{staticClass:\"commnet-title\"},[t._v(\"评论 \\n              \"),n(\"span\",{staticClass:\"fr subscribe-bar\"},[n(\"span\",[1==t.subscribeInfo.isSubscribe&&t.subcribeVisible?n(\"span\",{staticClass:\"subcribeing\",on:{mouseover:function(e){t.unsubcribeVisible=!0,t.subcribeVisible=!1},mouseout:function(e){t.unsubcribeVisible=!1,t.subcribeVisible=!0}}},[n(\"Icon\",{staticClass:\"success-color\",attrs:{type:\"md-checkmark\"}}),t._v(\"正在关注中\\n                      \")],1):t._e(),t._v(\" \"),1==t.subscribeInfo.isSubscribe&&t.unsubcribeVisible?n(\"span\",{staticClass:\"unsubcribe\",on:{click:t.handleUnsubscribeApp,mouseout:function(e){t.unsubcribeVisible=!1,t.subcribeVisible=!0}}},[n(\"Icon\",{staticClass:\"warning-color\",attrs:{type:\"md-close\"}}),t._v(\"取消关注\\n                      \")],1):t._e(),t._v(\" \"),0==t.subscribeInfo.isSubscribe?n(\"span\",{staticClass:\"subcribe\",on:{click:t.handleSubscribeApp}},[t._v(\"关注\")]):t._e(),t._v(\" \"),n(\"span\",[n(\"Icon\",{staticClass:\"success-color\",attrs:{type:\"md-notifications\",size:\"18\"}})],1)]),t._v(\" \"),n(\"span\",[n(\"Dropdown\",{staticClass:\"instance-dropdown\",attrs:{trigger:\"click\"},on:{\"on-click\":t.addSubUsers}},[n(\"Icon\",{attrs:{type:\"md-person\",size:\"18\"}}),t._v(\" \"),n(\"b\",[t._v(t._s(t.subscribeInfo.subscribeNum))]),t._v(\" \"),n(\"Icon\",{attrs:{type:\"ios-arrow-down\"}}),t._v(\" \"),n(\"DropdownMenu\",{attrs:{slot:\"list\"},slot:\"list\"},[n(\"DropdownItem\",{attrs:{name:\"add\"}},[t._v(\"\\n                             添加关注者\\n                          \")]),t._v(\" \"),t._l(t.subscribeInfo.subscribeUsers,function(s,e){return n(\"DropdownItem\",{key:e},[t._v(\"\\n                             \"+t._s(s.nickname)+\"\\n                             \"),n(\"span\",{staticClass:\"delete-user\",on:{click:function(e){e.stopPropagation(),t.deleteSubscribeUsers(s.userId,s.nickname)}}},[n(\"Icon\",{attrs:{type:\"md-close\"}})],1)])})],2)],1)],1)])])]),t._v(\" \"),n(\"Row\",{staticClass:\"comments\"},[n(\"commentPublish\",{attrs:{handlePublish:t.handlePublish}}),t._v(\" \"),0<t.comments.length?n(\"div\",{staticClass:\"comments-header martop10\"},[n(\"strong\",[t._v(\"最新评论(\"+t._s(t.pageInfo.total)+\")\")])]):t._e(),t._v(\" \"),n(\"comments\",{attrs:{isInIframe:!0,comments:t.comments,refreshRootComments:t.refreshComments}}),t._v(\" \"),0<t.pageInfo.total?n(\"Page\",{staticClass:\"pad20\",attrs:{total:t.pageInfo.total,\"page-size\":t.pageInfo.limit,current:t.pageInfo.page,\"prev-text\":\"上一页\",\"next-text\":\"下一页\"},on:{\"on-change\":t.handlePageChange}}):t._e()],1)],1)},staticRenderFns:[]}},rYK1:function(e,s){}});"}