{"source":"webpackJsonp([7],{\"3nRU\":function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var c=a(\"mvHQ\"),s=a.n(c),n=a(\"p1MO\"),i={name:\"checkSheet\",components:{},data:function(){return{checkSheetId:this.$route.params.id,tableHeight:0,currentPage:1,pageSize:1e4,checkSheetName:\"\",checkSheetDesc:\"\",searchValue:\"\",showModal:!1,columns:[{type:\"index\",width:80},{title:\"检查项目\",key:\"title\"},{title:\"检查内容\",key:\"content\",width:400}],data:[],formValidate:{name:\"\",content:\"\"},ruleValidate:{name:[{required:!0,message:\"请输入检查项目名称\",trigger:\"blur\"}],content:[{required:!0,message:\"请输入检查内容\",trigger:\"blur\"}]}}},methods:{checkSheetItemFilter:function(){var e=s()([{operator:\"like\",value:this.searchValue,property:\"title\"}]);this.getCheckSheetItemData(e)},goCheckSheet:function(){this.$router.push({path:\"/checkSheet/list\"})},addCheckItem:function(){this.showModal=!0,this.$refs.formValidate.resetFields(),this.formValidate.edit=!1},cancelAdd:function(){this.showModal=!1},confirmAdd:function(){var t=this,e={},a=[],c=void 0;this.$refs.formValidate.validate(function(e){c=e}),c&&(this.checkSheetId?(e={checkTableId:this.checkSheetId,orderNumber:this.data.length+1,title:this.formValidate.name,content:this.formValidate.content},this.formValidate.edit?(e.orderNumber=this.formValidate.currentIndex,e.id=this.data[this.formValidate.currentIndex].id,Object(n.h)(e).then(function(e){e.success&&(t.$Message.success(e.message),t.getCheckSheetItemData(),t.searchValue=\"\")}).catch(function(e){t.$Message.error(e.data.message)})):(a.push(e),Object(n.f)(a).then(function(e){e.success&&(t.$Message.success(e.message),t.getCheckSheetItemData(),t.searchValue=\"\")}).catch(function(e){t.$Message.error(e.data.message)}))):this.formValidate.edit?(this.data[this.formValidate.currentIndex].title=this.formValidate.name,this.data[this.formValidate.currentIndex].content=this.formValidate.content):this.data.unshift({title:this.formValidate.name,content:this.formValidate.content}),this.showModal=!1)},saveCheckSheet:function(t){var a=this;if(this.checkSheetName)if(0<this.data.length){var e=void 0;this.checkSheetId?(e={id:this.checkSheetId,name:this.checkSheetName,comment:this.checkSheetDesc},Object(n.g)(e).then(function(e){e.success&&(a.$Message.success(e.message),\"save\"===t?a.$router.push({path:\"/checkSheet/list\"}):(a.checkSheetName=\"\",a.checkSheetDesc=\"\",a.data=[],a.checkSheetId=!1))}).catch(function(e){a.$Message.error(e.data.message)})):(e={name:this.checkSheetName,comment:this.checkSheetDesc,jopCheckItemList:this.data},Object(n.e)(e).then(function(e){e.success&&(a.$Message.success(e.message),\"save\"===t?a.$router.push({path:\"/checkSheet/list\"}):(a.checkSheetName=\"\",a.checkSheetDesc=\"\",a.data=[]))}).catch(function(e){a.$Message.error(e.data.message)}))}else this.$Message.error(\"请至少添加一条检查项目！\");else this.$Message.error(\"请输入点检表名称！\")},getCheckSheetItemData:function(e){var t=this;Object(n.c)(this.checkSheetId,this.currentPage,this.pageSize,e).then(function(e){t.data=e.tableContent,t.total=e.dataCount,t.checkSheetDesc=e.checkTableComment,t.checkSheetName=e.checkTableName})}},mounted:function(){var e,a=this,t=[{title:\"修改者\",key:\"menderName\"},{title:\"修改时间\",key:\"modTime\",width:180}],c={title:\"操作\",key:\"action\",render:function(e,t){return e(\"div\",[e(\"a\",{on:{click:function(){Object(n.a)(t.row.id).then(function(e){e.success&&(a.$Message.success(e.message),a.getCheckSheetItemData(),a.searchValue=\"\")}).catch(function(e){a.$Message.error(e.data.message)})}}},\"删除\"),e(\"span\",{style:{height:\"20px\",borderLeft:\"1px solid #39f\",margin:\"0px 5px\"}}),e(\"a\",{on:{click:function(){a.formValidate.name=t.row.title,a.formValidate.content=t.row.content,a.formValidate.currentIndex=t.index,a.formValidate.edit=!0,a.showModal=!0}}},\"修改\")])}};this.checkSheetId?(t.push(c),(e=this.columns).push.apply(e,t),this.getCheckSheetItemData()):this.columns.push(c);this.tableHeight=document.body.clientHeight-220,window.onresize=function(){a.tableHeight=document.body.clientHeight-220}}},h=a(\"qFem\"),o=a.n(h);var r=function(e){a(\"nwd2\")},l=a(\"VU/8\")(i,o.a,!1,r,\"data-v-030f5938\",null);t.default=l.exports},nwd2:function(e,t){},p1MO:function(e,t,a){\"use strict\";a.d(t,\"d\",function(){return c}),a.d(t,\"c\",function(){return n}),a.d(t,\"e\",function(){return i}),a.d(t,\"g\",function(){return h}),a.d(t,\"b\",function(){return o}),a.d(t,\"f\",function(){return r}),a.d(t,\"h\",function(){return l}),a.d(t,\"a\",function(){return d});var s=a(\"7B+g\"),c=function(e,t,a){return Object(s.a)(\"/H_roleplay-si/check/listCheckTable\",{page:e,limit:t,filter:a})},n=function(e,t,a,c){return Object(s.a)(\"/H_roleplay-si/check/listCheckItem\",{checkTableId:e,page:t,limit:a,filter:c})},i=function(e){return Object(s.a)(\"/H_roleplay-si/check/saveCheckTableAndCheckItem\",{},\"POST\",e)},h=function(e){return Object(s.a)(\"/H_roleplay-si/check/updateCheckTable\",{},\"POST\",e)},o=function(e){return Object(s.a)(\"/H_roleplay-si/check/deleteCheckTable\",{checkTableId:e},\"POST\")},r=function(e){return Object(s.a)(\"/H_roleplay-si/check/saveCheckItem\",{},\"POST\",e)},l=function(e){return Object(s.a)(\"/H_roleplay-si/check/updateCheckContent\",{},\"POST\",e)},d=function(e){return Object(s.a)(\"/H_roleplay-si/check/deleteCheckItem\",{checkItemId:e},\"POST\")}},qFem:function(e,t){e.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"check-detail\"},[a(\"Row\",{staticClass:\"check-detail-title\"},[a(\"span\",[a(\"b\",{staticStyle:{color:\"#e4393c\"}},[t._v(\"*\")]),t._v(\"点检表名称：\")]),t._v(\" \"),a(\"Input\",{staticStyle:{width:\"200px\",\"font-size\":\"14px\"},attrs:{autofocus:!0,placeholder:\"请输入点检表名称\"},model:{value:t.checkSheetName,callback:function(e){t.checkSheetName=e},expression:\"checkSheetName\"}})],1),t._v(\" \"),a(\"Row\",{staticClass:\"check-detail-desc\"},[a(\"span\",[t._v(\"点检表描述：\")]),t._v(\" \"),a(\"Input\",{attrs:{type:\"textarea\"},model:{value:t.checkSheetDesc,callback:function(e){t.checkSheetDesc=e},expression:\"checkSheetDesc\"}})],1),t._v(\" \"),a(\"Row\",{staticClass:\"check-detail-table\"},[a(\"div\",{staticStyle:{\"margin-bottom\":\"15px\"}},[a(\"span\",{staticClass:\"check-detail-btn\",on:{click:t.addCheckItem}},[t._v(\"新增\")]),t._v(\" \"),t.checkSheetId?a(\"div\",{staticClass:\"app-search\"},[a(\"Input\",{staticStyle:{width:\"300px\"},attrs:{search:!0,placeholder:\"搜索检查项目名称\"},on:{\"on-search\":t.checkSheetItemFilter},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:\"searchValue\"}})],1):t._e()]),t._v(\" \"),a(\"Table\",{attrs:{columns:t.columns,height:t.tableHeight,data:t.data,size:\"small\"}})],1),t._v(\" \"),a(\"Row\",{staticClass:\"check-detail-save\"},[a(\"span\",{staticClass:\"check-detail-save-btn\",on:{click:function(e){t.saveCheckSheet(\"save\")}}},[t._v(\"保存\")]),t._v(\" \"),a(\"span\",{staticClass:\"check-detail-save-btn\",on:{click:t.saveCheckSheet}},[t._v(\"保存并继续添加\")]),t._v(\" \"),a(\"span\",{staticClass:\"check-detail-save-btn\",on:{click:t.goCheckSheet}},[t._v(\"返回\")])]),t._v(\" \"),a(\"Modal\",{attrs:{title:\"新增检查项目\"},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:\"showModal\"}},[a(\"Form\",{ref:\"formValidate\",attrs:{model:t.formValidate,rules:t.ruleValidate,\"label-width\":80}},[a(\"FormItem\",{attrs:{label:\"检查项目\",prop:\"name\"}},[a(\"Input\",{model:{value:t.formValidate.name,callback:function(e){t.$set(t.formValidate,\"name\",e)},expression:\"formValidate.name\"}})],1),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"检查内容\",prop:\"content\"}},[a(\"Input\",{attrs:{type:\"textarea\"},model:{value:t.formValidate.content,callback:function(e){t.$set(t.formValidate,\"content\",e)},expression:\"formValidate.content\"}})],1)],1),t._v(\" \"),a(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"},[a(\"Button\",{attrs:{type:\"primary\"},on:{click:t.confirmAdd}},[t._v(\"确定\")]),t._v(\" \"),a(\"Button\",{attrs:{type:\"default\"},on:{click:t.cancelAdd}},[t._v(\"取消\")])],1)],1)],1)},staticRenderFns:[]}}});"}