webpackJsonp([24],{Cjst:function(e,s){e.exports={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"knowledge"},[t("Row",{staticClass:"knowledge-title"},[t("span",[e._v(e._s(e.knowledgeForm.title))])]),e._v(" "),t("Row",{staticClass:"knowledge-desc"},[t("img",{attrs:{src:e.knowledgeForm.photo}}),e._v(" "),t("span",{staticClass:"knowledge-desc-type"},[e._v(e._s(e.knowledgeForm.typeName))]),e._v(" "),t("span",{staticClass:"knowledge-desc-creator"},[e._v(e._s(e.knowledgeForm.creator))]),e._v(" "),t("span",{staticClass:"knowledge-desc-crtTime"},[e._v(e._s(e.knowledgeForm.crtTime))])]),e._v(" "),t("Row",{staticClass:"knowledge-content"},[t("div",{ref:"toolbar",staticStyle:{display:"none"}}),e._v(" "),t("div",{ref:"text",staticStyle:{display:"none"}}),e._v(" "),t("div",{staticClass:"w-e-text",domProps:{innerHTML:e._s(e.knowledgeForm.content)}}),e._v(" "),t("knowledge-comments")],1),e._v(" "),t("Row",{staticClass:"knowledge-toolbar"},[t("span",{staticClass:"knowledge-toolbar-btn",on:{click:e.editKnowledge}},[e._v("编辑")]),e._v(" "),t("span",{staticClass:"knowledge-toolbar-btn",on:{click:e.goBack}},[e._v("返回")])])],1)},staticRenderFns:[]}},FyTv:function(e,s){},"P3+Z":function(e,s){},g6Ys:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=t("JUNF"),o=t("woOf"),i=t.n(o),r=t("mvHQ"),a=t.n(r),c=t("GIAq"),l=t("CaXr"),u=t("U18u"),d=t("bJtM"),b=t("ejmB"),m={name:"KnowledgeComments",components:{comments:d.a,commentPublish:b.a,UserSelector:l.a},props:{},data:function(){return{knowledgeId:this.$route.params.id,type:"knowledge",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,showUserModal:!1,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]}}},methods:{emitUserModal:function(){this.showUserModal=!1},getUserModalData:function(e){var s=this,t=[],n={};e.forEach(function(e){t.push(e.userId)}),0<t.length&&(n={relationKey:this.knowledgeId,type:this.type,userIds:t.join(",")},Object(u.a)(n).then(function(e){e.success&&(s.$Message.success(e.message),s.refreshSubscribeInfo())}).catch(function(e){s.$Message.error(e.data.message)}))},addSubscribeUsers:function(e){"add"===e&&(this.showUserModal=!0)},deleteSubscribeUsers:function(e,s){var t=this,n={relationKey:this.knowledgeId,userIds:e,type:this.type};this.$Modal.confirm({title:"确认",content:"确认退订<b style=color:#e4393c;>"+s+"</b>么？",onOk:function(){Object(u.b)(n).then(function(e){e.success&&(t.$Message.success(e.message),t.refreshSubscribeInfo())}).catch(function(e){t.$Message.error(e.data.message)})}})},handlePublish:function(e,s){var t=this,n={type:this.type,content:e,relationKey:this.knowledgeId,parentId:-1,commentAndReply:!1,commentAttachments:s};Object(c.Y)(n).then(function(e){e.success?t.refreshComments():t.$Notice.warning({title:"系统提示",desc:"添加评论失败,请联系企业管理员!"})})},refreshComments:function(){var s=this,e={relationKey:this.knowledgeId,sort:a()([{property:"crtTime",direction:"DESC"}])};e=i()(e,this.pageInfo),Object(c.D)(e).then(function(e){s.comments=e.tableContent,s.pageInfo.total=e.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.refreshComments()},handleSubscribeApp:function(){var s=this;Object(u.e)({type:"knowledge",relationKey:this.knowledgeId}).then(function(e){s.subscribeInfo.isSubscribe=1,s.refreshSubscribeInfo()})},handleUnsubscribeApp:function(e){var s=this;Object(u.f)({relationKey:this.knowledgeId,type:this.type}).then(function(e){s.subscribeInfo.isSubscribe=0,s.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var s=this;this.$forceUpdate(),Object(u.c)({relationKey:this.knowledgeId,type:this.type,limit:10,page:1}).then(function(e){s.subscribeInfo.subscribeUsers=e.tableContent,s.subscribeInfo.subscribeNum=e.dataCount})},judgeIsSubscribeByRelationKey:function(e){var s=this;Object(u.d)({relationKey:this.knowledgeId,type:this.type}).then(function(e){s.subscribeInfo.isSubscribe=e})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey()}},h=t("qCWk"),f=t.n(h);var p=function(e){t("P3+Z")},g=t("VU/8")(m,f.a,!1,p,"data-v-51c4d318",null).exports,w=t("sYY+"),v=t.n(w),_={name:"KnowledgeView",components:{KnowledgeComments:g},data:function(){return{knowledgeId:this.$route.params.id,knowledgeForm:{title:"",type:"",content:"",creator:"",crtTime:""}}},methods:{goBack:function(){this.$router.push({path:"/knowledge/list"})},editKnowledge:function(){this.$router.push({name:"knowledgeDetail",path:"/knowledge/detail/"+this.$route.params.id,params:{id:this.$route.params.id}})},getKnowledgeDataById:function(){var s=this;Object(n.e)(this.knowledgeId).then(function(e){s.knowledgeForm=e,s.editor=new v.a(s.$refs.toolbar,s.$refs.text),s.editor.create()})}},created:function(){this.getKnowledgeDataById()}},I=t("Cjst"),k=t.n(I);var y=function(e){t("FyTv")},C=t("VU/8")(_,k.a,!1,y,"data-v-1ee4766a",null);s.default=C.exports},qCWk:function(e,s){e.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bg_ff "},[n("Row",{staticClass:"app-resource-group-title"},[n("h3",[t._v("评论 \n          "),n("b",{staticClass:"fr subscribe-bar"},[n("span",[1==t.subscribeInfo.isSubscribe&&t.subcribeVisible?n("span",{staticClass:"subcribeing",on:{mouseover:function(e){t.unsubcribeVisible=!0,t.subcribeVisible=!1},mouseout:function(e){t.unsubcribeVisible=!1,t.subcribeVisible=!0}}},[n("Icon",{staticClass:"success-color",attrs:{type:"md-checkmark"}}),t._v("正在关注中\n                  ")],1):t._e(),t._v(" "),1==t.subscribeInfo.isSubscribe&&t.unsubcribeVisible?n("span",{staticClass:"unsubcribe",on:{click:t.handleUnsubscribeApp,mouseout:function(e){t.unsubcribeVisible=!1,t.subcribeVisible=!0}}},[n("Icon",{staticClass:"warning-color",attrs:{type:"md-close"}}),t._v("取消关注\n                  ")],1):t._e(),t._v(" "),0==t.subscribeInfo.isSubscribe?n("span",{staticClass:"subcribe",on:{click:t.handleSubscribeApp}},[t._v("关注")]):t._e(),t._v(" "),n("span",[n("Icon",{staticClass:"success-color",attrs:{type:"md-notifications",size:"18"}})],1)]),t._v(" "),n("span",[n("Dropdown",{staticStyle:{"margin-left":"20px"},attrs:{trigger:"click"},on:{"on-click":t.addSubscribeUsers}},[n("Icon",{attrs:{type:"md-person",size:"18"}}),t._v(" "+t._s(t.subscribeInfo.subscribeNum)+"\n                       "),n("Icon",{attrs:{type:"ios-arrow-down"}}),t._v(" "),n("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[n("DropdownItem",{attrs:{name:"add"}},[t._v("\n                             添加关注者\n                          ")]),t._v(" "),t._l(t.subscribeInfo.subscribeUsers,function(s,e){return n("DropdownItem",{key:e},[t._v("\n                             "+t._s(s.nickname)+"\n                             "),n("span",{staticClass:"delete-user",on:{click:function(e){e.stopPropagation(),t.deleteSubscribeUsers(s.userId,s.nickname)}}},[n("Icon",{attrs:{type:"md-close"}})],1)])})],2)],1)],1)])])]),t._v(" "),n("Row",{staticClass:"user-comment"},[n("commentPublish",{attrs:{handlePublish:t.handlePublish}}),t._v(" "),0<t.comments.length?n("div",{staticClass:"user-comment-header"},[n("strong",[t._v("最新评论("+t._s(t.pageInfo.total)+")")])]):t._e(),t._v(" "),n("comments",{attrs:{comments:t.comments,refreshRootComments:t.refreshComments}}),t._v(" "),0<t.pageInfo.total?n("Page",{staticClass:"pad20",attrs:{total:t.pageInfo.total,"page-size":t.pageInfo.limit,current:t.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":t.handlePageChange}}):t._e()],1),t._v(" "),n("user-selector",{attrs:{showUserSelector:t.showUserModal},on:{emitUserModal:t.emitUserModal,userModalData:t.getUserModalData}})],1)},staticRenderFns:[]}}});