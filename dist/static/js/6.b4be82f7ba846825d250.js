webpackJsonp([6],{"2nk9":function(e,t){},"4TdE":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("Gu7T"),i=o.n(n),a=o("mvHQ"),s=o.n(a),d=o("lZCD"),l=o("K4CD"),r={name:"BusinessModuleConfig",components:{AddJobsModal:d.a,AddProcessModal:d.a,AddNodeModal:d.a},data:function(){var e=this;return{isShowAddJobsModal:!1,isShowAddProcessModal:!1,isShowAddNodeModal:!1,drawerVisable:!1,moduleId:"",moduleFromItem:{moduleName:""},ruleValidate:{moduleName:[{required:!0,message:"请输入应用模板名称",trigger:"blur"}]},NodeDetailFrom:{uniqueId:"",title:"",nextNode:[]},jobsFormItem:{id:[],name:[]},processFormItem:{title:"",key:""},searchValue:"",appListLoading:!1,appListColumns:[{type:"selection",width:60,align:"center"},{title:"id",key:"id"},{title:"应用名称",key:"title"},{title:"创建时间",key:"crtTime"}],appListData:[],appListPageTotal:0,appListCurrentPage:1,pageSize:8,withoutListId:"",onPageSelection:[],nodePositionId:"",nodeProcssId:"",columns:[{title:" ",key:"positionName",columnId:"cacf-ool4-jbpj-wkx5-slj9-013e-psir-ak24",align:"center",fixed:"left",render:function(t,o){return t("div",[t("span",o.row.positionName),t("Icon",{class:"column-icon-delete",props:{type:"md-trash"},on:{click:function(){var t=o.row.positionId,n=o.row.jobId;e.handleRowDelete(t,n)}}})])}}],columnDatas:[],appNodes:{},joblist:[]}},methods:{getRandomCode:function(){for(var e=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],t="",o=1;o<=32;o++){t+=e[parseInt(35*Math.random())],o%4==0&&32!=o&&(t+="-")}return t},handleSubmitBoxs:function(e){var t=e.target||e.srcElement;if("input"===t.nodeName.toLocaleLowerCase())switch(t.id){case"addJob":this.isShowAddJobsModal=!0,this.jobsFormItem.name=[],this.jobsFormItem.id=[];break;case"addProcess":this.isShowAddProcessModal=!0,this.$refs.processFormItem.resetFields();break;case"save":this.saveAppConfig();break;case"back":this.$router.push({path:"/BusinessModuleGraph/"+this.moduleId})}},saveAppConfig:function(){var e=this;this.$refs.moduleFromItem.validate(function(t){if(t){var o={},n=[],i=[],a=[];e.columns.forEach(function(e,t){if("positionName"!==e.key){var o=e.columnId,n=e.key,i=e.title,s=e.editId;s?a.push({id:s,title:i,key:n,sort:t,columnAnchorPoint:o}):a.push({title:i,key:n,sort:t,columnAnchorPoint:o})}}),e.columnDatas.forEach(function(e,t){e.id?i.push({title:e.positionName,rowAnchorPoint:e.positionId,sort:t,id:e.id}):i.push({title:e.positionName,rowAnchorPoint:e.positionId,sort:t})});var d=function(t){var o=[];e.appNodes[t].nextNode&&e.appNodes[t].nextNode.length>0&&e.appNodes[t].nextNode.forEach(function(e){o.push(e.id)}),e.appNodes[t].editId?n.push({id:e.appNodes[t].editId,name:e.appNodes[t].title,listKey:e.appNodes[t].id,nextNode:o.join(","),listId:e.appNodes[t].uniqueId,rowAnchorPoint:e.appNodes[t].rowId,columnAnchorPoint:e.appNodes[t].columnId}):n.push({name:e.appNodes[t].title,listKey:e.appNodes[t].id,nextNode:o.join(","),listId:e.appNodes[t].uniqueId,rowAnchorPoint:e.appNodes[t].rowId,columnAnchorPoint:e.appNodes[t].columnId})};for(var r in e.appNodes)d(r);o.nodeList=n,o.stageList=a,o.positionList=i,o.title=e.moduleFromItem.moduleName,o.configColumns=s()(e.columns.slice(1)),o.configColumnDatas=s()(e.columnDatas),e.moduleId&&(o.id=e.moduleId),Object(l.u)(o).then(function(t){if(t.success){setTimeout(function(){e.$router.push({path:"/BusinessModuleGraph/"+t.moduleId})},5e3),e.$Message.success({content:t.message+", 5秒后将自动离开当前页面",duration:1})}}).catch(function(t){e.$Message.error(t.data.message)})}})},columnTemplate:function(e,t,o){var n=this;return{columnId:e,key:t,title:o,align:"center",renderHeader:function(e,t){return e("div",[e("span",t.column.title.trim()),e("Icon",{class:"column-icon-delete",props:{type:"md-trash"},on:{click:function(){var e=t.column.columnId;n.handleColumnDelete(e)}}})])},render:function(e,t){var o=[];return t.row[t.column.key]&&t.row[t.column.key].length>0&&t.row[t.column.key].forEach(function(t){var i=e("Tag",{attrs:{uniqueId:t.uniqueId,rowId:t.rowId,columnId:t.columnId},props:{color:"primary",closable:!0},on:{"on-close":function(e){var t=e.target.parentNode||e.srcElement.parentNode;n.handleDeleteNode(t.getAttribute("uniqueId"),t.getAttribute("rowId"),t.getAttribute("columnId"))}}},[e("span",{on:{click:function(e){e.preventDefault();var t=e.target.parentNode.parentNode.getAttribute("uniqueId");n.handleEditNode(t)}}},t.title)]);o.push(i)}),o.push(e("a",{on:{click:function(e){var o=n,i=[];for(var a in o.nodePositionId=t.row.positionId,o.nodeProcssId=t.column.columnId,o.isShowAddNodeModal=!0,o.onPageSelection=[],o.searchValue="",o.appNodes)i.push(o.appNodes[a].id);o.withoutListId=i.join(","),o.getAllAppList(o.appListCurrentPage,o.pageSize,o.withoutListId)}}},"添加")),e("div",o)}}},handleAddNode:function(e){var t=this,o=this.columns.filter(function(e){return e.columnId===t.nodeProcssId})[0].key;this.columnDatas.forEach(function(e){if(e.positionId===t.nodePositionId){var n=[],a=[];e[o]&&e[o].length>0?t.onPageSelection.length>0&&(t.onPageSelection.forEach(function(e){a.push({title:e.title,id:e.id,uniqueId:e.uniqueId,rowId:t.nodePositionId,columnId:t.nodeProcssId}),t.appNodes[e.uniqueId]={title:e.title,id:e.id,uniqueId:e.uniqueId,rowId:t.nodePositionId,columnId:t.nodeProcssId}}),n=[].concat(i()(e[o]),a)):t.onPageSelection.length>0&&t.onPageSelection.forEach(function(e){n.push({title:e.title,id:e.id,uniqueId:e.uniqueId,rowId:t.nodePositionId,columnId:t.nodeProcssId}),t.appNodes[e.uniqueId]={title:e.title,id:e.id,uniqueId:e.uniqueId,rowId:t.nodePositionId,columnId:t.nodeProcssId}}),t.$set(e,o,n)}}),this.isShowAddNodeModal=!1},addJobsZColumn:function(){for(var e=this,t=this.jobsFormItem.name,o=this.jobsFormItem.id,n=function(n){e.columnDatas.push({jobId:o[n],positionId:e.getRandomCode(),positionName:t[n]}),e.joblist.forEach(function(t){t.id===o[n]&&e.$set(t,"disabled",!0)})},i=0;i<o.length;i++)n(i);this.isShowAddJobsModal=!1},handleJobModalNameChage:function(e){if(e){var t=[];e.map(function(e){t.push(e.label)}),this.jobsFormItem.name=t}},addProcssColumn:function(){var e=this.processFormItem.title,t="column_"+this.getRandomCode(),o=this.columnTemplate(this.getRandomCode(),t,e,this);this.columns.push(o),this.isShowAddProcessModal=!1},handleRowDelete:function(e,t){var o=this,n=this.columnDatas.filter(function(t){return t.positionId!=e});this.columnDatas=n,this.joblist.forEach(function(e){e.id===t&&o.$set(e,"disabled",!1)});var i=[];for(var a in this.appNodes){this.appNodes[a].rowId===e&&(i.push(this.appNodes[a].uniqueId),delete this.appNodes[a])}i.length>0&&function(){var e=i.join(",");for(var t in o.appNodes){var n=o.appNodes[t].nextNode;n&&n.length>0&&(o.appNodes[t].nextNode=n.filter(function(t){return!~e.indexOf(t.uniqueId)}))}}()},handleColumnDelete:function(e){var t=this,o=this.columns.filter(function(t){return t.columnId!=e});this.columns=o;var n=[];for(var i in this.appNodes){this.appNodes[i].columnId===e&&(n.push(this.appNodes[i].uniqueId),delete this.appNodes[i])}n.length>0&&function(){var e=n.join(",");for(var o in t.appNodes){var i=t.appNodes[o].nextNode;i&&i.length>0&&(t.appNodes[o].nextNode=i.filter(function(t){return!~e.indexOf(t.uniqueId)}))}}()},handleDeleteNode:function(e,t,o){var n=this,i=this.columns.filter(function(e){return e.columnId===o})[0].key;this.columnDatas.forEach(function(o){if(o.positionId==t){if(o[i]&&o[i].length>0){var a=o[i].filter(function(t){return t.uniqueId!=e});n.$set(o,i,a)}}}),delete this.appNodes[e]&&this.$Message.success("删除成功!")},handleEditNode:function(e){var t=this;this.drawerVisable=!0;var o=this.appNodes[e];this.NodeDetailFrom.uniqueId=o.uniqueId,this.NodeDetailFrom.title=o.title,this.NodeDetailFrom.nextNode=[],o.nextNode&&o.nextNode.length>0&&o.nextNode.map(function(e){t.NodeDetailFrom.nextNode.push(e.uniqueId)})},handleSaveNodeDetail:function(e){var t=this,o=t.NodeDetailFrom.uniqueId;t.NodeDetailFrom.nextNode[0]&&(t.appNodes[o].nextNode=t.appNodes[o].nextNode?t.appNodes[o].nextNode:[],t.NodeDetailFrom.nextNode.forEach(function(e){0!==t.appNodes[o].nextNode.filter(function(t){return t.uniqueId===e}).length&&t.appNodes[o].nextNode.push(t.appNodes[e])})),this.$Message.success("保存成功!"),this.drawerVisable=!1},handleAppNameFilter:function(e){this.getAllAppList(this.appListCurrentPage,this.pageSize,"",this.searchValue)},onSelectAll:function(e){var t,o={};(t=this.onPageSelection).push.apply(t,i()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!o[t.uniqueId]&&(o[t.uniqueId]=e.push(t)),e},[])},handerSelectionChange:function(e){if(0===e.length){var t=this.$refs.selection.data,o=this.onPageSelection;t.map(function(e){o=o.filter(function(t){return t.uniqueId!==e.uniqueId})}),this.onPageSelection=o}else{var n,a={};(n=this.onPageSelection).push.apply(n,i()(e)),this.onPageSelection=this.onPageSelection.reduce(function(e,t){return!a[t.uniqueId]&&(a[t.uniqueId]=e.push(t)),e},[])}},onSelectCancel:function(e,t){this.onPageSelection=this.onPageSelection.filter(function(e){return e.uniqueId!==t.uniqueId})},deletePageSelection:function(){var e=this,t=event.target.parentElement.getAttribute("uniqueId");this.onPageSelection=this.onPageSelection.filter(function(e){return e.uniqueId!==t}),this.$refs.selection.data.forEach(function(o,n){t===o.uniqueId&&e.$refs.selection.toggleSelect(n)})},appListChangePage:function(e){this.getAllAppList(e,this.pageSize,this.withoutListId,this.searchValue)},getAllAppList:function(e,t,o,n){var i=this;this.appListLoading=!0,o=o||"-1",Object(l.a)(e,this.pageSize,o,n).then(function(e){i.appListPageTotal=e.dataCount,i.appListData=e.tableContent,i.onPageSelection.length>0&&i.appListData.map(function(e){i.onPageSelection.map(function(t){e.uniqueId===t.uniqueId&&(e._checked=!0)})}),i.appListLoading=!1}).catch(function(e){i.$Message.error(e.message)})},getAllRoleData:function(){var e=this;Object(l.b)().then(function(t){e.joblist=t.tableContent,e.columnDatas.length>0&&e.columnDatas.forEach(function(t){e.joblist.forEach(function(o){t.positionName===o.name&&e.$set(o,"disabled",!0)})})})}},mounted:function(){var e=this;this.moduleId=this.$route.params.moduleId,this.moduleId?Object(l.d)(this.moduleId).then(function(t){JSON.parse(t.configColumns).forEach(function(o){var n="";o.editId||(n=t.stageList.filter(function(e){return e.columnAnchorPoint===o.columnId})[0].id),e.columns.push({align:o.align,columnId:o.columnId,key:o.key,title:o.title,editId:o.editId?o.editId:n,renderHeader:function(t,o){return t("div",[t("span",o.column.title.trim()),t("Icon",{class:"column-icon-delete",props:{type:"md-trash"},on:{click:function(){var t=o.column.columnId;e.handleColumnDelete(t)}}})])},render:function(t,o){var n=[];return o.row[o.column.key]&&o.row[o.column.key].length>0&&o.row[o.column.key].forEach(function(o){var i=t("Tag",{attrs:{uniqueId:o.uniqueId,rowId:o.rowId,columnId:o.columnId},props:{color:"primary",closable:!0},on:{"on-close":function(t){var o=t.target.parentNode||t.srcElement.parentNode;e.handleDeleteNode(o.getAttribute("uniqueId"),o.getAttribute("rowId"),o.getAttribute("columnId"))}}},[t("span",{on:{click:function(t){t.preventDefault();var o=t.target.parentNode.parentNode.getAttribute("uniqueId");e.handleEditNode(o)}}},o.title)]);n.push(i)}),n.push(t("a",{on:{click:function(t){var n=e,i=[];for(var a in n.nodePositionId=o.row.positionId,n.nodeProcssId=o.column.columnId,n.isShowAddNodeModal=!0,n.onPageSelection=[],n.searchValue="",n.appNodes)i.push(n.appNodes[a].id);n.withoutListId=i.join(","),n.getAllAppList(n.appListCurrentPage,n.pageSize,n.withoutListId)}}},"添加")),t("div",n)}})}),t.nodeList.forEach(function(o){var n=[];o.nextNode&&o.nextNode.split(",").forEach(function(e){var o=t.nodeList.filter(function(t){return t.listKey===e});1===o.length&&n.push({title:o[0].name,id:o[0].listKey,uniqueId:o[0].listId,rowId:o[0].rowAnchorPoint,columnId:o[0].columnAnchorPoint})}),e.appNodes[o.listId]={title:o.name,id:o.listKey,uniqueId:o.listId,rowId:o.rowAnchorPoint,columnId:o.columnAnchorPoint,nextNode:n,editId:o.id}}),e.columnDatas=JSON.parse(t.configColumnDatas),e.moduleFromItem.moduleName=t.title,e.getAllRoleData()}):this.getAllRoleData()}},u={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticStyle:{padding:"20px","background-color":"#fff"}},[o("div",{staticStyle:{"font-size":"16px",width:"30%"}},[o("Form",{ref:"moduleFromItem",attrs:{model:e.moduleFromItem,rules:e.ruleValidate,labelWidth:100}},[o("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"业务模块名称",prop:"moduleName"}},[o("Input",{model:{value:e.moduleFromItem.moduleName,callback:function(t){e.$set(e.moduleFromItem,"moduleName",t)},expression:"moduleFromItem.moduleName"}})],1)],1)],1),e._v(" "),o("div",[o("Table",{attrs:{columns:e.columns,data:e.columnDatas,size:"small",border:""}})],1)]),e._v(" "),o("div",{staticClass:"config-action",on:{click:e.handleSubmitBoxs}},[o("input",{staticClass:"config-action-submit",attrs:{type:"submit",value:"添加职位",id:"addJob"}}),e._v(" "),o("input",{staticClass:"config-action-submit",attrs:{type:"submit",value:"添加阶段",id:"addProcess"}}),e._v(" "),o("input",{staticClass:"config-action-submit",staticStyle:{"background-color":"rgb(0, 150, 136)"},attrs:{type:"submit",value:"保存",id:"save"}}),e._v(" "),e.moduleId?o("input",{staticClass:"config-action-submit",staticStyle:{"background-color":"rgb(0, 150, 136)"},attrs:{type:"submit",value:"返回",id:"back"}}):e._e()]),e._v(" "),o("Drawer",{attrs:{title:"节点详情","mask-closable":!1,closable:"",transfer:""},model:{value:e.drawerVisable,callback:function(t){e.drawerVisable=t},expression:"drawerVisable"}},[o("Form",{ref:"NodeDetailFrom",attrs:{model:e.NodeDetailFrom,labelWidth:60}},[o("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"名称:",prop:"title"}},[o("Input",{attrs:{disabled:""},model:{value:e.NodeDetailFrom.title,callback:function(t){e.$set(e.NodeDetailFrom,"title",t)},expression:"NodeDetailFrom.title"}})],1),e._v(" "),o("FormItem",{attrs:{label:"下级节点",labelWidth:60,prop:"nextNode"}},[o("Select",{attrs:{multiple:"",clearable:""},model:{value:e.NodeDetailFrom.nextNode,callback:function(t){e.$set(e.NodeDetailFrom,"nextNode",t)},expression:"NodeDetailFrom.nextNode"}},e._l(e.appNodes,function(t){return t.uniqueId!==e.NodeDetailFrom.uniqueId?o("Option",{key:t.uniqueId,attrs:{value:t.uniqueId}},[e._v(e._s(t.title))]):e._e()}))],1)],1),e._v(" "),o("div",[o("input",{staticClass:"drawer-detail-save-submit",attrs:{type:"submit",value:"保存"},on:{click:e.handleSaveNodeDetail}})])],1),e._v(" "),o("add-jobs-modal",{attrs:{width:"360",footerBtnAlign:"right",title:"添加职位"},on:{"on-ok":e.addJobsZColumn},model:{value:e.isShowAddJobsModal,callback:function(t){e.isShowAddJobsModal=t},expression:"isShowAddJobsModal"}},[o("div",{staticStyle:{"margin-top":"10px"}},[o("Form",{ref:"jobsFormItem",attrs:{model:e.jobsFormItem,labelWidth:60,prop:"id"}},[o("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"名称:"}},[o("Select",{attrs:{"label-in-value":!0,multiple:"",clearable:"",transfer:""},on:{"on-change":e.handleJobModalNameChage},model:{value:e.jobsFormItem.id,callback:function(t){e.$set(e.jobsFormItem,"id",t)},expression:"jobsFormItem.id"}},e._l(e.joblist,function(t){return o("Option",{key:t.id,attrs:{value:t.id,label:t.name,disabled:!!t.disabled}},[e._v(e._s(t.name))])}))],1)],1)],1)]),e._v(" "),o("add-process-modal",{attrs:{width:"360",footerBtnAlign:"right",title:"添加阶段"},on:{"on-ok":e.addProcssColumn},model:{value:e.isShowAddProcessModal,callback:function(t){e.isShowAddProcessModal=t},expression:"isShowAddProcessModal"}},[o("div",{staticStyle:{"margin-top":"10px"}},[o("Form",{ref:"processFormItem",attrs:{model:e.processFormItem,labelWidth:60}},[o("FormItem",{staticStyle:{"font-size":"16px"},attrs:{label:"名称:",prop:"title"}},[o("Input",{model:{value:e.processFormItem.title,callback:function(t){e.$set(e.processFormItem,"title",t)},expression:"processFormItem.title"}})],1)],1)],1)]),e._v(" "),o("add-node-modal",{attrs:{width:"720",footerBtnAlign:"right",title:"添加应用"},on:{"on-ok":e.handleAddNode},model:{value:e.isShowAddNodeModal,callback:function(t){e.isShowAddNodeModal=t},expression:"isShowAddNodeModal"}},[o("div",{staticStyle:{"margin-top":"10px"}},[o("div",{staticClass:"app-search"},[o("Input",{staticStyle:{width:"300px"},attrs:{search:!0,placeholder:"搜索应用名称"},on:{"on-search":e.handleAppNameFilter},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),e._v(" "),o("a",{staticClass:"app-search-icon"},[o("Button",{attrs:{type:"primary",size:"small"},on:{click:e.handleAppNameFilter}},[e._v("查询")])],1)],1),e._v(" "),o("Table",{ref:"selection",attrs:{loading:e.appListLoading,columns:e.appListColumns,data:e.appListData,size:"small"},on:{"on-select-all":e.onSelectAll,"on-selection-change":e.handerSelectionChange,"on-select-cancel":e.onSelectCancel}}),e._v(" "),o("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[o("div",{staticStyle:{float:"right"}},[o("Page",{attrs:{total:e.appListPageTotal,current:e.appListCurrentPage,"page-size":e.pageSize,size:"small","show-total":"","show-elevator":""},on:{"on-change":e.appListChangePage}})],1)])],1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.onPageSelection[0],expression:"onPageSelection[0] "}],staticClass:"page-selection-warp"},e._l(e.onPageSelection,function(t){return o("Tag",{key:t.uniqueId,attrs:{uniqueId:t.uniqueId,type:"border",color:"primary",size:"small",closable:!0},on:{"on-close":e.deletePageSelection}},[e._v("\n              "+e._s(t.title)+"\n          ")])}))])],1)},staticRenderFns:[]};var c=o("VU/8")(r,u,!1,function(e){o("2nk9")},null,null);t.default=c.exports}});