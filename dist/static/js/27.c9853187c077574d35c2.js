webpackJsonp([27],{GvR7:function(e,t){e.exports={render:function(){var s=this,e=s.$createElement,i=s._self._c||e;return i("div",{staticClass:"workguide"},[i("Row",{staticClass:"workguide-title"},[i("h2",[s._v(s._s(s.workguideData.title))])]),s._v(" "),i("Row",{staticClass:"workguide-type"},[i("img",{attrs:{src:s.workguideData.creatorImage}}),s._v(" "),i("span",{staticClass:"workguide-type-worktype"},[s._v(s._s(s.workguideData.creatorName))]),s._v(" "),i("span",{staticClass:"workguide-type-crtTime"},[s._v(s._s(s.workguideData.crtTime))])]),s._v(" "),i("Row",{staticClass:"workguide-desc"},[i("p",[s._v(s._s(s.workguideData.comment))])]),s._v(" "),i("Row",{staticClass:"workguide-read"},[s._l(s.workguideData.workStepList,function(e,t){return i("img",{key:t,attrs:{src:e.image},on:{click:function(e){s.goAnchor(t)}}})}),s._v(" "),i("router-link",{attrs:{to:{name:"wokdGuideStep",params:{id:s.workguideData.id}}}},[i("div",{staticClass:"workguide-read-go"},[s._v("\n                步骤阅读"),i("Icon",{staticStyle:{"font-size":"23px","margin-bottom":"4px"},attrs:{type:"ios-arrow-forward"}})],1)])],2),s._v(" "),i("Row",{staticClass:"workguide-content"},[i("Timeline",s._l(s.workguideData.workStepList,function(e,t){return i("TimelineItem",{key:t,attrs:{id:"anchor"+t}},[i("div",{class:{"step-num":!0,"step-num-anchor":t===s.isAnchor},attrs:{slot:"dot"},slot:"dot"},[s._v(s._s(t+1))]),s._v(" "),i("div",{staticClass:"step-detail"},[i("h2",[s._v(s._s(e.title))]),s._v(" "),i("div",{staticClass:"step-detail-comment"},[s._v(s._s(e.comment))]),s._v(" "),i("img",{attrs:{src:e.image}})])])}),1),s._v(" "),i("work-comments")],1),s._v(" "),i("Row",{staticClass:"workguide-toolbar"},[i("router-link",{attrs:{to:{name:"wokdGuideDetail",params:{id:s.workguideData.id}}}},[i("span",{staticClass:"workguide-toolbar-btn"},[s._v("编辑")])]),s._v(" "),i("router-link",{attrs:{to:{name:"wokdGuideList"}}},[i("span",{staticClass:"workguide-toolbar-btn"},[s._v("返回")])])],1)],1)},staticRenderFns:[]}},OsRJ:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("eV/a"),o=s("woOf"),n=s.n(o),r=s("mvHQ"),a=s.n(r),c=s("GIAq"),u=s("U18u"),d=s("bJtM"),l=s("ejmB"),b=s("CaXr"),m={name:"WorkComments",components:{comments:d.a,commentPublish:l.a,UserSelector:b.a},props:{},data:function(){return{workGuideId:this.$route.params.id,type:"workGuide",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,showUserModal:!1,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]},commentData:{relationkey:this.workGuideId,type:this.type}}},methods:{emitUserModal:function(){this.showUserModal=!1},getUserModalData:function(e){var t=this,s=[],i={};e.forEach(function(e){s.push(e.userId)}),0<s.length&&(i={relationKey:this.workGuideId,type:this.type,userIds:s.join(",")},Object(u.a)(i).then(function(e){e.success&&(t.$Message.success(e.message),t.refreshSubscribeInfo())}).catch(function(e){t.$Message.error(e.data.message)}))},addSubscribeUsers:function(e){"add"===e&&(this.showUserModal=!0)},deleteSubscribeUsers:function(e,t){var s=this,i={relationKey:this.workGuideId,userIds:e,type:this.type};this.$Modal.confirm({title:"确认",content:"确认退订<b style=color:#e4393c;>"+t+"</b>么？",onOk:function(){Object(u.b)(i).then(function(e){e.success&&(s.$Message.success(e.message),s.refreshSubscribeInfo())}).catch(function(e){s.$Message.error(e.data.message)})}})},handlePublish:function(e,t){var s=this,i={type:this.type,content:e,relationKey:this.workGuideId,parentId:-1,commentAndReply:!1,commentAttachments:t};Object(c._0)(i).then(function(e){e.success?s.refreshComments():s.$Notice.warning({title:"系统提示",desc:"添加评论失败,请联系企业管理员!"})})},refreshComments:function(){var t=this,e={relationKey:this.workGuideId,sort:a()([{property:"crtTime",direction:"DESC"}])};e=n()(e,this.pageInfo),Object(c.E)(e).then(function(e){t.comments=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(e){this.pageInfo.page=e,this.refreshComments()},handleSubscribeApp:function(){var t=this;Object(u.e)({type:"workGuide",relationKey:this.workGuideId}).then(function(e){t.subscribeInfo.isSubscribe=1,t.refreshSubscribeInfo()})},handleUnsubscribeApp:function(e){var t=this;Object(u.f)({relationKey:this.workGuideId,type:this.type}).then(function(e){t.subscribeInfo.isSubscribe=0,t.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var t=this;this.$forceUpdate(),Object(u.c)({relationKey:this.workGuideId,type:this.type,limit:1e3,page:1}).then(function(e){t.subscribeInfo.subscribeUsers=e.tableContent,t.subscribeInfo.subscribeNum=e.dataCount})},judgeIsSubscribeByRelationKey:function(e){var t=this;Object(u.d)({relationKey:this.workGuideId,type:this.type}).then(function(e){t.subscribeInfo.isSubscribe=e})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey()}},h=s("qttP"),p=s.n(h);var f=function(e){s("WhUn")},g={name:"wokdGuideView",components:{WorkComments:s("VU/8")(m,p.a,!1,f,"data-v-68ef56c4",null).exports},data:function(){return{workguideId:this.$route.params.id,isAnchor:-1,workguideData:{}}},methods:{getWorkGuideDataById:function(){var t=this;Object(i.c)(this.$route.params.id).then(function(e){t.workguideData=e}).catch(function(e){t.$Message.error(e.data.message)})},goAnchor:function(e){this.isAnchor=e,document.querySelector(".workguide").scrollTop=this.$el.querySelector("#anchor"+e).offsetTop}},created:function(){this.getWorkGuideDataById()}},w=s("GvR7"),v=s.n(w);var k=function(e){s("WU7E")},_=s("VU/8")(g,v.a,!1,k,"data-v-4488fda4",null);t.default=_.exports},WU7E:function(e,t){},WhUn:function(e,t){},qttP:function(e,t){e.exports={render:function(){var s=this,e=s.$createElement,i=s._self._c||e;return i("div",{staticClass:"bg_ff "},[i("Row",{staticClass:"app-resource-group-title"},[i("h3",[s._v("评论 \n          "),i("b",{staticClass:"fr subscribe-bar"},[i("span",[1==s.subscribeInfo.isSubscribe&&s.subcribeVisible?i("span",{staticClass:"subcribeing",on:{mouseover:function(e){s.unsubcribeVisible=!0,s.subcribeVisible=!1},mouseout:function(e){s.unsubcribeVisible=!1,s.subcribeVisible=!0}}},[i("Icon",{staticClass:"success-color",attrs:{type:"md-checkmark"}}),s._v("正在关注中\n                  ")],1):s._e(),s._v(" "),1==s.subscribeInfo.isSubscribe&&s.unsubcribeVisible?i("span",{staticClass:"unsubcribe",on:{click:s.handleUnsubscribeApp,mouseout:function(e){s.unsubcribeVisible=!1,s.subcribeVisible=!0}}},[i("Icon",{staticClass:"warning-color",attrs:{type:"md-close"}}),s._v("取消关注\n                  ")],1):s._e(),s._v(" "),0==s.subscribeInfo.isSubscribe?i("span",{staticClass:"subcribe",on:{click:s.handleSubscribeApp}},[s._v("关注")]):s._e(),s._v(" "),i("span",[i("Icon",{staticClass:"success-color",attrs:{type:"md-notifications",size:"18"}})],1)]),s._v(" "),i("span",[i("Dropdown",{staticClass:"work-dropdown",attrs:{trigger:"click"},on:{"on-click":s.addSubscribeUsers}},[i("Icon",{attrs:{type:"md-person",size:"18"}}),s._v(" "+s._s(s.subscribeInfo.subscribeNum)+"\n                       "),i("Icon",{attrs:{type:"ios-arrow-down"}}),s._v(" "),i("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[i("DropdownItem",{attrs:{name:"add"}},[s._v("\n                             添加关注者\n                          ")]),s._v(" "),s._l(s.subscribeInfo.subscribeUsers,function(t,e){return i("DropdownItem",{key:e},[s._v("\n                             "+s._s(t.nickname)+"\n                             "),i("span",{staticClass:"delete-user",on:{click:function(e){e.stopPropagation(),s.deleteSubscribeUsers(t.userId,t.nickname)}}},[i("Icon",{attrs:{type:"md-close"}})],1)])})],2)],1)],1)])])]),s._v(" "),i("Row",{staticClass:"user-comment"},[i("commentPublish",{attrs:{handlePublish:s.handlePublish}}),s._v(" "),0<s.comments.length?i("div",{staticClass:"user-comment-header"},[i("strong",[s._v("最新评论("+s._s(s.pageInfo.total)+")")])]):s._e(),s._v(" "),i("comments",{attrs:{comments:s.comments,refreshRootComments:s.refreshComments}}),s._v(" "),0<s.pageInfo.total?i("Page",{staticClass:"pad20",attrs:{total:s.pageInfo.total,"page-size":s.pageInfo.limit,current:s.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":s.handlePageChange}}):s._e()],1),s._v(" "),i("user-selector",{attrs:{showUserSelector:s.showUserModal,commentData:s.commentData},on:{emitUserModal:s.emitUserModal,userModalData:s.getUserModalData}})],1)},staticRenderFns:[]}}});