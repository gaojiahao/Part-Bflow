webpackJsonp([16],{"6FNX":function(t,e){},"8NPY":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("GIAq"),n=s("i70d"),a=s.n(n),r=s("mvHQ"),o=s.n(r),c={name:"canEditTable",props:{refs:String,columnsList:Array,value:Array,url:String,editIncell:{type:Boolean,default:!1},hoverShow:{type:Boolean,default:!1}},data:function(){return{columns:[],thisTableData:[],edittingStore:[]}},created:function(){this.init()},methods:{init:function(){var t,e=this,s=this,i=this.columnsList.filter(function(t){if(t.editable&&!0===t.editable)return t});t=JSON.parse(o()(this.value)).map(function(t,s){var n=!1;if(e.thisTableData[s])if(e.thisTableData[s].editting)n=!0;else for(var a in e.thisTableData[s].edittingCell)!0===e.thisTableData[s].edittingCell[a]&&(n=!0);if(n)return e.thisTableData[s];e.$set(t,"editting",!1);var r={};return i.forEach(function(t){r[t.key]=!1}),e.$set(t,"edittingCell",r),t}),this.thisTableData=t,this.edittingStore=JSON.parse(o()(this.thisTableData)),this.columnsList.forEach(function(t){t.editable&&(t.render=function(i,n){var a=e.thisTableData[n.index];return a.editting?i("Input",{props:{type:"text",value:a[t.key]},on:{"on-change":function(t){var e=n.column.key;s.edittingStore[n.index][e]=t.target.value}}}):e.editIncell?i("Row",{props:{type:"flex",align:"middle",justify:"center"}},[i("Col",{props:{span:"22"}},[a.edittingCell[n.column.key]?function(t,e,s,i){return e("Input",{props:{type:"text",value:t.edittingStore[s.index][i.key]},on:{"on-change":function(e){var n=i.key;t.edittingStore[s.index][n]=e.target.value}}})}(e,i,n,t):i("span",a[t.key])]),i("Col",{props:{span:"2"}},[a.edittingCell[n.column.key]?function(t,e,s){return e("Button",{props:{type:"text",icon:"checkmark"},on:{click:function(e){t.edittingStore[s.index].edittingCell[s.column.key]=!1,t.thisTableData=JSON.parse(o()(t.edittingStore)),t.$emit("input",t.handleBackdata(t.thisTableData)),t.$emit("on-cell-change",t.handleBackdata(t.thisTableData),s.index,s.column.key)}}})}(e,i,n):function(t,e,s){return t.hoverShow?e("div",{class:{"show-edit-btn":t.hoverShow}},[e("Button",{props:{type:"text",icon:"edit"},on:{click:function(e){t.edittingStore[s.index].edittingCell[s.column.key]=!0,t.thisTableData=JSON.parse(o()(t.edittingStore))}}})]):e("Button",{props:{type:"text",icon:"edit"},on:{click:function(e){t.edittingStore[s.index].edittingCell[s.column.key]=!0,t.thisTableData=JSON.parse(o()(t.edittingStore))}}})}(e,i,n)])]):i("span",a[t.key])}),t.handle&&(t.render=function(s,i){var n=e.thisTableData[i.index],a=[];return t.handle.forEach(function(t){"edit"===t?a.push(function(t,e,s,i){return e("Button",{props:{type:s.editting?"success":"primary",loading:s.saving},style:{margin:"0 5px"},on:{click:function(){if(s.editting){t.edittingStore[i].saving=!0,t.thisTableData=JSON.parse(o()(t.edittingStore));var e=t.edittingStore[i];e.editting=!1,e.saving=!1,t.thisTableData=JSON.parse(o()(t.edittingStore)),t.$emit("input",t.handleBackdata(t.thisTableData)),t.$emit("on-change",t.handleBackdata(t.thisTableData),i)}else{if(s.edittingCell)for(var n in s.edittingCell)s.edittingCell[n]=!1,t.edittingStore[i].edittingCell[n]=!1;t.edittingStore[i].editting=!0,t.thisTableData=JSON.parse(o()(t.edittingStore))}}}},s.editting?"保存":"编辑")}(e,s,n,i.index)):"delete"===t&&a.push(function(t,e,s,i){return e("Poptip",{props:{confirm:!0,title:"您确定要删除这条数据吗?",transfer:!0},on:{"on-ok":function(){t.thisTableData.splice(i,1),t.$emit("input",t.handleBackdata(t.thisTableData)),t.$emit("on-delete",t.handleBackdata(t.thisTableData),i)}}},[e("Button",{style:{margin:"0 5px"},props:{type:"error",placement:"top"}},"删除")])}(e,s,0,i.index))}),s("div",a)})})},handleBackdata:function(t){var e=JSON.parse(o()(t));return e.forEach(function(t){delete t.editting,delete t.edittingCell,delete t.saving}),e}},watch:{value:function(t){this.init()}}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Table",{ref:this.refs,attrs:{columns:this.columnsList,data:this.thisTableData,border:"","disabled-hover":""}})],1)},staticRenderFns:[]};var u=s("VU/8")(c,l,!1,function(t){s("6FNX")},null,null).exports,d={name:"admintrstorAssessment",components:{AssessModal:s("lZCD").a,EditTable:u,vueWangeditor:a.a},props:{isAdmin:{type:Boolean}},data:function(){return{listId:this.$route.params.listId,showAssessModal:!1,isPage:!0,isEdit:"",IsEditId:"",changeResult:"",page:{total:0,current:1,pageSize:10},adminAssessData:{duringDate:"",result:"",opportunity:""},ruleValidate:{duringDate:[{type:"date",required:!0,message:"不允许为空"}],result:[{required:!0,message:" "}],opportunity:[{required:!0,message:" "}]},assessments:[],menu:["source","|","bold","underline","italic","strikethrough","eraser","forecolor","bgcolor","|","quote","fontfamily","fontsize","head","unorderlist","orderlist","alignleft","aligncenter","alignright","|","emotion","|","undo","redo"]}},methods:{addAssess:function(){this.showAssessModal=!0,this.$refs.formValidate.resetFields()},submitAdminAssess:function(){var t=this;"<p><br></p>"===this.$refs.result.getHtml()?this.$Message.error("必填项请输入！"):"<p><br></p>"===this.$refs.oppor.getHtml()?this.$Message.error("必填项请输入！"):(this.adminAssessData.opportunity=document.getElementById("editorOppor").innerHTML,this.adminAssessData.result=document.getElementById("editorResult").innerHTML);var e={listId:this.listId,chance:this.adminAssessData.opportunity,achievement:this.adminAssessData.result,date:this.formatDate(this.adminAssessData.duringDate)};"edit"===this.isEdit&&(e.id=this.IsEditId);var s=!1;this.$refs.formValidate.validate(function(t){s=t}),s&&Object(i.W)(e).then(function(e){e.success?(t.$Message.success(e.message),t.getAssessmentData(),t.showAssessModal=!1,t.$refs.formValidate.resetFields(),document.getElementById("editorOppor").innerHTML="",document.getElementById("editorResult").innerHTML="",t.isEdit=""):t.$Message.error(e.message)})},getAssessmentData:function(t){var e=this;Object(i.z)(this.listId,this.page.pageSize,t).then(function(t){e.assessments=t.tableContent,e.page.total=t.dataCount,0===t.tableContent.length?e.isPage=!1:e.isPage=!0})},onPageChange:function(t){this.getAssessmentData(t)},formatDate:function(t,e){var s=new Date(t),i=s.getFullYear(),n=s.getMonth()+1;return n>=1&&n<=9&&(n="0"+n),e?i+"-"+n:i+"-"+n+"-1"}},created:function(){this.getAssessmentData(this.page.current)}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bg_ff",staticStyle:{"margin-bottom":"10px"}},[s("div",[s("Row",{staticClass:"app-resource-group-title"},[s("h3",[t._v("管理员自评\n      ")])]),t._v(" "),t.isAdmin?s("Row",{staticClass:"assessmentForm pad15"},[s("Form",{ref:"formValidate",attrs:{"label-width":150,model:t.adminAssessData,rules:t.ruleValidate}},[s("FormItem",{attrs:{label:"期间（月份）:",prop:"duringDate"}},[s("DatePicker",{staticStyle:{width:"200px"},attrs:{format:"yyyy-MM",type:"month",placeholder:"选择日期"},model:{value:t.adminAssessData.duringDate,callback:function(e){t.$set(t.adminAssessData,"duringDate",e)},expression:"adminAssessData.duringDate"}})],1),t._v(" "),s("FormItem",{staticStyle:{"margin-bottom":"65px"},attrs:{label:"效率与成本改进成果:",prop:"result"}},[s("vue-wangeditor",{ref:"result",staticClass:"editor-result",attrs:{id:"editorResult",menus:t.menu,height:"143",width:"100%"}})],1),t._v(" "),s("FormItem",{staticStyle:{"margin-bottom":"40px"},attrs:{label:"效率与成本改进机会:",prop:"opportunity"}},[s("vue-wangeditor",{ref:"oppor",attrs:{id:"editorOppor",menus:t.menu,height:"143",width:"100%"}})],1)],1),t._v(" "),s("div",{staticStyle:{"text-align":"right","margin-bottom":"5px"}},[s("Button",{staticClass:"radius0",staticStyle:{"background-color":"rgb(0, 150, 136) !important",color:"#fff","margin-top":"5px"},on:{click:t.submitAdminAssess}},[t._v("提交")])],1)],1):t._e(),t._v(" "),t._l(t.assessments,function(e,i){return s("div",{key:i,staticClass:"pad10 bg_ff assessmentItem"},[s("img",{staticClass:"user-icon",attrs:{src:e.photo?e.photo:"resources/images/icon/contactor.png"}}),t._v(" "),s("div",{staticClass:"font14 content"},[s("div",[s("h4",[t._v(t._s(e.creator)+"\n            "),s("span",{staticClass:"fr"},[t._v(t._s(t.formatDate(e.date,!0)))])])]),t._v(" "),s("div",{staticClass:"assessment-info"},[s("div",[s("span",{staticStyle:{color:"#a06970"}},[t._v("改进成果:")]),t._v(" "),s("div",{staticClass:"assessment-info-text",domProps:{innerHTML:t._s(e.achievement)}})]),t._v(" "),s("div",[s("span",{staticStyle:{color:"#a06970"}},[t._v("改进机会:")]),t._v(" "),s("div",{staticClass:"assessment-info-text",domProps:{innerHTML:t._s(e.chance)}})])])])])}),t._v(" "),0===t.assessments.length?s("div",{staticClass:"pad10 bg_ff assessmentItem"},[t._v("暂无数据")]):t._e(),t._v(" "),t.isPage?s("div",{staticClass:"pad20 bg_ff assessmentItem"},[s("Page",{attrs:{total:t.page.total,current:t.page.current,"page-size":t.page.pageSize,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":t.onPageChange}})],1):t._e()],2)])},staticRenderFns:[]};var h=s("VU/8")(d,m,!1,function(t){s("xWzI")},"data-v-b7cda7ec",null).exports,p=s("woOf"),b=s.n(p),f=s("U18u"),g=s("bJtM"),v=s("ejmB"),y=s("CaXr"),I={name:"userComments",components:{comments:g.a,commentPublish:v.a,UserSelector:y.a},props:{},data:function(){return{listId:this.$route.params.listId,type:"list",comments:[],commentsCount:0,pageInfo:{limit:10,page:1,total:0},unsubcribeVisible:!1,subcribeVisible:!0,showUserModal:!1,subscribeInfo:{isSubscribe:0,subscribeNum:0,subscribeUsers:[]}}},methods:{emitUserModal:function(){this.showUserModal=!1},getUserModalData:function(t){var e=this,s=[],i={};t.forEach(function(t){s.push(t.userId)}),s.length>0&&(i={relationKey:this.listId,type:this.type,userIds:s.join(",")},Object(f.a)(i).then(function(t){t.success&&(e.$Message.success(t.message),e.refreshSubscribeInfo())}).catch(function(t){e.$Message.error(t.data.message)}))},addSubscribeUsers:function(t){"add"===t&&(this.showUserModal=!0)},deleteSubscribeUsers:function(t,e){var s=this,i={relationKey:this.listId,userIds:t,type:this.type};this.$Modal.confirm({title:"确认",content:"确认退订<b style=color:#e4393c;>"+e+"</b>么？",onOk:function(){Object(f.b)(i).then(function(t){t.success&&(s.$Message.success(t.message),s.refreshSubscribeInfo())}).catch(function(t){s.$Message.error(t.data.message)})}})},handlePublish:function(t,e){var s=this,n={type:this.type,content:t,relationKey:this.listId,parentId:-1,commentAndReply:!1,commentAttachments:e};Object(i.X)(n).then(function(t){t.success?s.refreshComments():s.$Notice.warning({title:"系统提示",desc:"添加评论失败,请联系企业管理员!"})})},refreshComments:function(){var t=this,e={relationKey:this.listId,sort:o()([{property:"crtTime",direction:"DESC"}])};e=b()(e,this.pageInfo),Object(i.D)(e).then(function(e){t.comments=e.tableContent,t.pageInfo.total=e.dataCount})},handlePageChange:function(t){this.pageInfo.page=t,this.refreshComments()},handleSubscribeApp:function(){var t=this;Object(f.e)({type:"list",relationKey:this.listId}).then(function(e){t.subscribeInfo.isSubscribe=1,t.refreshSubscribeInfo()})},handleUnsubscribeApp:function(t){var e=this;Object(f.f)({relationKey:this.listId,type:this.type}).then(function(t){e.subscribeInfo.isSubscribe=0,e.refreshSubscribeInfo()})},refreshSubscribeInfo:function(){var t=this;this.$forceUpdate(),Object(f.c)({relationKey:this.listId,type:this.type,limit:10,page:1}).then(function(e){t.subscribeInfo.subscribeUsers=e.tableContent,t.subscribeInfo.subscribeNum=e.dataCount})},judgeIsSubscribeByRelationKey:function(t){var e=this;Object(f.d)({relationKey:this.listId,type:this.type}).then(function(t){e.subscribeInfo.isSubscribe=t})}},mounted:function(){this.refreshComments(),this.refreshSubscribeInfo(),this.judgeIsSubscribeByRelationKey()}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bg_ff "},[s("Row",{staticClass:"app-resource-group-title"},[s("h3",[t._v("评论 \n          "),s("b",{staticClass:"fr subscribe-bar"},[s("span",[1==t.subscribeInfo.isSubscribe&&t.subcribeVisible?s("span",{staticClass:"subcribeing",on:{mouseover:function(e){t.unsubcribeVisible=!0,t.subcribeVisible=!1},mouseout:function(e){t.unsubcribeVisible=!1,t.subcribeVisible=!0}}},[s("Icon",{staticClass:"success-color",attrs:{type:"md-checkmark"}}),t._v("正在关注中\n                  ")],1):t._e(),t._v(" "),1==t.subscribeInfo.isSubscribe&&t.unsubcribeVisible?s("span",{staticClass:"unsubcribe",on:{click:t.handleUnsubscribeApp,mouseout:function(e){t.unsubcribeVisible=!1,t.subcribeVisible=!0}}},[s("Icon",{staticClass:"warning-color",attrs:{type:"md-close"}}),t._v("取消关注\n                  ")],1):t._e(),t._v(" "),0==t.subscribeInfo.isSubscribe?s("span",{staticClass:"subcribe",on:{click:t.handleSubscribeApp}},[t._v("关注")]):t._e(),t._v(" "),s("span",[s("Icon",{staticClass:"success-color",attrs:{type:"md-notifications",size:"18"}})],1)]),t._v(" "),s("span",[s("Dropdown",{staticStyle:{"margin-left":"20px"},attrs:{trigger:"click"},on:{"on-click":t.addSubscribeUsers}},[s("Icon",{attrs:{type:"md-person",size:"18"}}),t._v(" "+t._s(t.subscribeInfo.subscribeNum)+"\n                       "),s("Icon",{attrs:{type:"ios-arrow-down"}}),t._v(" "),s("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[s("DropdownItem",{attrs:{name:"add"}},[t._v("\n                             添加关注者\n                          ")]),t._v(" "),t._l(t.subscribeInfo.subscribeUsers,function(e,i){return s("DropdownItem",{key:i},[t._v("\n                             "+t._s(e.nickname)+"\n                             "),s("span",{staticClass:"delete-user",on:{click:function(s){s.stopPropagation(),t.deleteSubscribeUsers(e.userId,e.nickname)}}},[s("Icon",{attrs:{type:"md-close"}})],1)])})],2)],1)],1)])])]),t._v(" "),s("Row",{staticClass:"user-comment"},[s("commentPublish",{attrs:{handlePublish:t.handlePublish}}),t._v(" "),t.comments.length>0?s("div",{staticClass:"user-comment-header"},[s("strong",[t._v("最新评论("+t._s(t.pageInfo.total)+")")])]):t._e(),t._v(" "),s("comments",{attrs:{comments:t.comments,refreshRootComments:t.refreshComments}}),t._v(" "),t.pageInfo.total>0?s("Page",{staticClass:"pad20",attrs:{total:t.pageInfo.total,"page-size":t.pageInfo.limit,current:t.pageInfo.page,"prev-text":"上一页","next-text":"下一页"},on:{"on-change":t.handlePageChange}}):t._e()],1),t._v(" "),s("user-selector",{attrs:{showUserSelector:t.showUserModal},on:{emitUserModal:t.emitUserModal,userModalData:t.getUserModalData}})],1)},staticRenderFns:[]};var S={name:"InteractionLayout",components:{AdmintrstorAssessment:h,UserComments:s("VU/8")(I,_,!1,function(t){s("jOIa")},"data-v-0b6bcd21",null).exports},props:{isAdmin:{type:Boolean,default:!1}}},C={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"interaction-layout"},[e("admintrstor-assessment",{attrs:{isAdmin:this.isAdmin}}),this._v(" "),e("user-comments")],1)},staticRenderFns:[]};var D=s("VU/8")(S,C,!1,function(t){s("kRSs")},"data-v-62f5d8ff",null);e.default=D.exports},jOIa:function(t,e){},kRSs:function(t,e){},xWzI:function(t,e){}});