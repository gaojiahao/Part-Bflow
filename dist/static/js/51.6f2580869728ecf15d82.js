webpackJsonp([51],{"8N8F":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=t("K4CD"),i={components:{ChangeDetail:t("lZCD").a},data:function(){var r=this;return{fieldDetailColumns:[{title:"版本",key:"version",width:60,align:"center"},{title:"变更时间",key:"modiferTime",align:"center"},{title:"变更者",key:"modiferName",align:"center"},{title:"变更字段",key:"mainTable",align:"center",render:function(t,e){var a=e.row.mainTable,l=(e.row.detailTable,[]);return 0<a.length&&a.forEach(function(e){l.push(t("p",{style:{minHeight:"16px"}},e.fieldName))}),0<e.row.detailTable.length&&e.row.detailTable.forEach(function(e,a){l.push(t("p",{style:{height:"16px"}},"明细表"))}),t("div",l)}},{title:"变更前",key:"mainTable",align:"center",render:function(a,o){var e=o.row.mainTable,s=o.row.detailTable,t=[],l=/jpg|jpeg|png/g;return 0<e.length&&e.forEach(function(e){l.test(e.fieldOldValue)?t.push(a("img",{attrs:{src:"/H_roleplay-si/ds/download?url="+e.fieldOldValue,style:"width: 30px;height: 30px;border-radius: 2px;"}})):t.push(a("p",{style:{minHeight:"16px",color:"#ee0000"}},e.fieldOldValue?e.fieldOldValue:" "))}),s&&0<s.length&&s.forEach(function(e,n){t.push(a("p",{style:{height:"16px",color:"#1605f3",cursor:"pointer"},on:{click:function(){r.showChangeDetailsModal=!0,r.modiferName=o.row.modiferName,r.modiferTime=o.row.modiferTime;var e=JSON.parse(s[n].changes);r.addRows=e.adds?JSON.parse(e.adds):[],r.deleteRows=e.deletes?JSON.parse(e.deletes):[];var a=e.updates?JSON.parse(e.updates):[],t=s[n].fieldName?JSON.parse(s[n].fieldName):[];for(var l in t)"ID"===t[l]&&(r.locationField=l);for(var i in r.changeColumns=[{type:"index",width:60,align:"center"}],t)i!==r.locationField&&r.changeColumns.push({title:t[i],key:i,hidden:!0,width:25*t[i].length,align:"center"});r.beforeChangeData=JSON.parse(s[n].oldData)?JSON.parse(s[n].oldData):[],r.afterChangeData=JSON.parse(s[n].newData)?JSON.parse(s[n].newData):[],0<a.length&&a.forEach(function(l){r.afterChangeData.forEach(function(e){if(l.id===e[r.locationField]){var a=l.change;e.cellClassName={};for(var t=0;t<a.length;t++)e.cellClassName[a[t]]="table-column-update"}})})}}},"查看详情"))}),a("div",t)}},{title:"变更后",key:"mainTable",align:"center",render:function(a,o){var e=o.row.mainTable,s=o.row.detailTable,t=[],l=/jpg|jpeg|png/g;return 0<e.length&&e.forEach(function(e){l.test(e.fieldNewValue)?t.push(a("img",{attrs:{src:"/H_roleplay-si/ds/download?url="+e.fieldNewValue,style:"width: 30px;height: 30px;border-radius: 2px;"}})):t.push(a("p",{style:{minHeight:"16px",color:"#008000"}},e.fieldNewValue))}),s&&0<s.length&&s.forEach(function(e,n){t.push(a("p",{style:{height:"16px",color:"#1605f3",cursor:"pointer"},on:{click:function(){r.showChangeDetailsModal=!0,r.modiferName=o.row.modiferName,r.modiferTime=o.row.modiferTime;var e=JSON.parse(s[n].changes);r.addRows=e.adds?JSON.parse(e.adds):[],r.deleteRows=e.deletes?JSON.parse(e.deletes):[];var a=e.updates?JSON.parse(e.updates):[],t=s[n].fieldName?JSON.parse(s[n].fieldName):[];for(var l in t)"ID"===t[l]&&(r.locationField=l);for(var i in r.changeColumns=[{type:"index",width:60,align:"center"}],t)i!==r.locationField&&r.changeColumns.push({title:t[i],key:i,width:25*t[i].length,hidden:!0,align:"center"});r.beforeChangeData=JSON.parse(s[n].oldData)?JSON.parse(s[n].oldData):[],r.afterChangeData=JSON.parse(s[n].newData)?JSON.parse(s[n].newData):[],0<a.length&&a.forEach(function(l){r.afterChangeData.forEach(function(e){if(l.id===e[r.locationField]){var a=l.change;e.cellClassName={};for(var t=0;t<a.length;t++)e.cellClassName[a[t]]="table-column-update"}})})}}},"查看详情"))}),a("div",t)}}],fieldDetail:[],loading:!1,showChangeDetailsModal:!1,beforeChangeData:[],afterChangeData:[],changeColumns:[],modiferName:"",modiferTime:"",addRows:[],deleteRows:[],locationField:""}},methods:{addRowClassName:function(e,a){for(var t=0;t<this.addRows.length;t++)if(e[this.locationField]===this.addRows[t])return"table-column-add"},deleteRowClassName:function(e,a){for(var t=0;t<this.deleteRows.length;t++)if(e[this.locationField]===this.deleteRows[t])return"table-column-detele"}},filters:{capitalize:function(e){return e?(e=Math.abs(Number(e))).toFixed(2):""}},mounted:function(){var a=this,e=this.$route.params.transCode;this.loading=!0,Object(l.j)(e).then(function(e){a.loading=!1,a.fieldDetail=e})}},n=t("Xyk/"),o=t.n(n);var s=function(e){t("Cdq1")},r=t("VU/8")(i,o.a,!1,s,null,null);a.default=r.exports},Cdq1:function(e,a){},"Xyk/":function(e,a){e.exports={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"wrapper"},[t("div",{staticClass:"wrapper-body"},[t("Table",{attrs:{loading:a.loading,columns:a.fieldDetailColumns,data:a.fieldDetail}})],1),a._v(" "),t("change-detail",{attrs:{title:"变更详情",width:"900",footerHide:!0},model:{value:a.showChangeDetailsModal,callback:function(e){a.showChangeDetailsModal=e},expression:"showChangeDetailsModal"}},[t("div",{staticClass:"detail"},[t("div",{staticClass:"detail-header"},[t("p",[t("label",[a._v("变更者:")]),a._v(" "),t("span",[a._v(a._s(a.modiferName))])]),a._v(" "),t("div",{staticClass:"detail-header-time"},[t("label",[a._v("变更时间:")]),a._v(" "),t("span",[a._v(a._s(a.modiferTime))]),a._v(" "),t("ul",[t("li",[t("div",{staticStyle:{"background-color":"#ffe699"}}),a._v("\n              已移除\n            ")]),a._v(" "),t("li",[t("div",{staticStyle:{"background-color":"#c6e0b4"}}),a._v("\n              新增\n            ")]),a._v(" "),t("li",[t("div",{staticStyle:{"background-color":"#bdd7ee"}}),a._v("\n              已修改\n            ")])])])]),a._v(" "),t("div",{staticClass:"detail-table"},[t("div",{staticClass:"detail-table-before"},[t("div",{staticClass:"detail-table-before-title"},[a._v("变更前")]),a._v(" "),t("Table",{attrs:{"row-class-name":a.deleteRowClassName,columns:a.changeColumns,data:a.beforeChangeData,size:"small",height:"152","disabled-hover":!0}})],1),a._v(" "),t("div",{staticClass:"detail-table-after"},[t("div",{staticClass:"detail-table-after-title"},[a._v("变更后")]),a._v(" "),t("Table",{attrs:{"row-class-name":a.addRowClassName,columns:a.changeColumns,data:a.afterChangeData,size:"small",height:"152","disabled-hover":!0}})],1)])])])],1)},staticRenderFns:[]}}});