webpackJsonp([22],{"7Po2":function(e,t){},Cjst:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"knowledge"},[s("Row",{staticClass:"knowledge-title"},[s("span",[e._v(e._s(e.knowledgeForm.title))])]),e._v(" "),s("Row",{staticClass:"knowledge-desc"},[s("img",{attrs:{src:e.knowledgeForm.photo}}),e._v(" "),s("span",{staticClass:"knowledge-desc-type"},[e._v(e._s(e.knowledgeForm.typeName))]),e._v(" "),s("span",{staticClass:"knowledge-desc-creator"},[e._v(e._s(e.knowledgeForm.creator))]),e._v(" "),s("span",{staticClass:"knowledge-desc-crtTime"},[e._v(e._s(e.knowledgeForm.crtTime))])]),e._v(" "),s("Row",{staticClass:"knowledge-content"},[s("div",{ref:"toolbar",staticStyle:{display:"none"}}),e._v(" "),s("div",{ref:"text",staticStyle:{display:"none"}}),e._v(" "),s("div",{staticClass:"w-e-text",domProps:{innerHTML:e._s(e.knowledgeForm.content)}}),e._v(" "),s("knowledge-comments")],1),e._v(" "),s("Row",{staticClass:"knowledge-toolbar"},[s("span",{staticClass:"knowledge-toolbar-btn",on:{click:e.editKnowledge}},[e._v("编辑")]),e._v(" "),s("span",{staticClass:"knowledge-toolbar-btn",on:{click:e.goBack}},[e._v("返回")])])],1)},staticRenderFns:[]}},FyTv:function(e,t){},LsYV:function(e,t){e.exports={render:function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("div",{staticClass:"bg_ff "},[n("Row",{staticClass:"app-resource-group-title"},[n("div",{staticClass:"commnet-title"},[s._v("评论 \n          "),n("span",{staticClass:"fr subscribe-bar"},[n("span",[1==s.subscribeInfo.isSubscribe&&s.subcribeVisible?n("span",{staticClass:"subcribeing",on:{mouseover:function(e){s.unsubcribeVisible=!0,s.subcribeVisible=!1},mouseout:function(e){s.unsubcribeVisible=!1,s.subcribeVisible=!0}}},[n("Icon",{staticClass:"success-color",attrs:{type:"md-checkmark"}}),s._v("正在关注中\n                  ")],1):s._e(),s._v(" "),1==s.subscribeInfo.isSubscribe&&s.unsubcribeVisible?n("span",{staticClass:"unsubcribe",on:{click:s.handleUnsubscribeApp,mouseout:function(e){s.unsubcribeVisible=!1,s.subcribeVisible=!0}}},[n("Icon",{staticClass:"warning-color",attrs:{type:"md-close"}}),s._v("取消关注\n                  ")],1):s._e(),s._v(" "),0==s.subscribeInfo.isSubscribe?n("span",{staticClass:"subcribe",on:{click:s.handleSubscribeApp}},[s._v("关注")]):s._e(),s._v(" "),n("span",[n("Icon",{staticClass:"success-color",attrs:{type:"md-notifications",size:"18"}})],1)]),s._v(" "),n("span",[n("Dropdown",{staticClass:"knowledge-dropdown",attrs:{trigger:"click"},on:{"on-click":s.addSubscribeUsers}},[n("Icon",{attrs:{type:"md-person",size:"18"}}),s._v(" "),n("b",[s._v(s._s(s.subscribeInfo.subscribeNum))]),s._v(" "),n("Icon",{attrs:{type:"ios-arrow-down"}}),s._v(" "),n("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[n("DropdownItem",{attrs:{name:"add"}},[s._v("\n                             添加关注者\n                          ")]),s._v(" "),s._l(s.subscribeInfo.subscribeUsers,function(t,e){return n("DropdownItem",{key:e},[s._v("\n                             "+s._s(t.nickname)+"\n                             "),n("span",{staticClass:"delete-user",on:{click:function(e){e.stopPropagation(),s.deleteSubscribeUsers(t.userId,t.nickname)}}},[n("Icon",{attrs:{type:"md-close"}})],1)])})],2)],1)],1)])])]),s._v(" "),n("Row",{staticClass:"user-comment"},[n("commentPublish",{attrs:{handlePublish:s.handlePublish}}),s._v(" "),0<s.comments.length?n("div",{staticClass:"user-comment-header"},[n("strong",[s._v("最新评论("+s._s(s.pageInfo.total)+")")])]):s._e(),s._v(" "),n("comments",{attrs:{comments:s.comments,refreshRootComments:s.refreshComments}}),s._v(" "),0<s.pageInfo.total?n("Page",{staticClass:"pad20",attrs:{total:s.pageInfo.total,"page-size":s.pageInfo.limit,current:s.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":s.handlePageChange}}):s._e()],1),s._v(" "),n("user-selector",{attrs:{showUserSelector:s.showUserModal,commentData:s.commentData},on:{emitUserModal:s.emitUserModal,userModalData:s.getUserModalData}})],1)},staticRenderFns:[]}},g6Ys:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("JUNF"),o=s("woOf"),i=s.n(o),a=s("mvHQ"),r=s.n(a),c=s("Gu7T"),l=s.n(c),u=s("GIAq"),d=s("CaXr"),b=s("U18u"),m=s("bJtM"),p=s("ejmB"),f=s("bTqw"),h={name:"KnowledgeComments",components:{comments:m.a,commentPublish:p.a,UserSelector:d.a},props:{},data:function(){return{knowledgeId:this.$route.params.id,type:"knowledge",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,showUserModal:!1,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]},commentData:{relationkey:this.knowledgeId,type:this.type}}},methods:{emitUserModal:function(){this.showUserModal=!1},getUserModalData:function(e){var t=this,s=[],n={};e.forEach(function(e){s.push(e.userId)}),0<s.length&&(n={relationKey:this.knowledgeId,type:this.type,userIds:s.join(",")},Object(b.a)(n).then(function(e){e.success&&(t.$Message.success(e.message),t.refreshSubscribeInfo(),t.judgeIsSubscribeByRelationKey())}).catch(function(e){t.$Message.error(e.data.message)}))},addSubscribeUsers:function(e){"add"===e&&(this.showUserModal=!0)},deleteSubscribeUsers:function(e,t){var s=this,n={relationKey:this.knowledgeId,userIds:e,type:this.type};this.$Modal.confirm({title:"确认",content:"确认退订<b style=color:#e4393c;>"+t+"</b>么？",onOk:function(){Object(b.b)(n).then(function(e){e.success&&(s.$Message.success(e.message),s.refreshSubscribeInfo(),s.judgeIsSubscribeByRelationKey())}).catch(function(e){s.$Message.error(e.data.message)})}})},handlePublish:function(e,t){var s=this,n={type:this.type,content:e,relationKey:this.knowledgeId,parentId:-1,commentAndReply:!1,commentAttachments:t};Object(u._6)(n).then(function(e){e.success?s.refreshComments():s.$Notice.warning({title:"系统提示",desc:e.message})})},refreshComments:function(){var t=this,s=[].concat(l()(f.b)),n=/\[(.+?)\]/g,e={relationKey:this.knowledgeId,sort:r()([{property:"crtTime",direction:"DESC"}])};e=i()(e,this.pageInfo),Object(u.I)(e).then(function(e){e.tableContent.forEach(function(e){e.content=e.content.replace(n,function(t){var e=s.findIndex(function(e){return e===t.replace(/(\[|\])/g,"")});return-1===e?t:'<span class="comments-content-item-content-img-emotion" style="background-position: -'+24*e+'px 0;"></span>'})}),t.comments=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.refreshComments()},handleSubscribeApp:function(){var t=this;Object(b.e)({type:"knowledge",relationKey:this.knowledgeId}).then(function(e){t.subscribeInfo.isSubscribe=1,t.refreshSubscribeInfo()})},handleUnsubscribeApp:function(e){var t=this;Object(b.f)({relationKey:this.knowledgeId,type:this.type}).then(function(e){t.subscribeInfo.isSubscribe=0,t.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var t=this;this.$forceUpdate(),Object(b.c)({relationKey:this.knowledgeId,type:this.type,limit:1e3,page:1}).then(function(e){t.subscribeInfo.subscribeUsers=e.tableContent,t.subscribeInfo.subscribeNum=e.dataCount})},judgeIsSubscribeByRelationKey:function(e){var t=this;Object(b.d)({relationKey:this.knowledgeId,type:this.type}).then(function(e){t.subscribeInfo.isSubscribe=e})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey()}},g=s("LsYV"),w=s.n(g);var v=function(e){s("7Po2")},I=s("VU/8")(h,w.a,!1,v,"data-v-2524bd55",null).exports,_=s("sYY+"),y=s.n(_),k={name:"KnowledgeView",components:{KnowledgeComments:I},data:function(){return{knowledgeId:this.$route.params.id,knowledgeForm:{title:"",type:"",content:"",creator:"",crtTime:""}}},methods:{goBack:function(){this.$router.push({path:"/knowledge/list"})},editKnowledge:function(){this.$router.push({name:"knowledgeDetail",path:"/knowledge/detail/"+this.$route.params.id,params:{id:this.$route.params.id}})},getKnowledgeDataById:function(){var t=this;Object(n.e)(this.knowledgeId).then(function(e){t.knowledgeForm=e,t.editor=new y.a(t.$refs.toolbar,t.$refs.text),t.editor.create()})}},created:function(){this.getKnowledgeDataById()}},C=s("Cjst"),S=s.n(C);var U=function(e){s("FyTv")},K=s("VU/8")(k,S.a,!1,U,"data-v-1ee4766a",null);t.default=K.exports}});