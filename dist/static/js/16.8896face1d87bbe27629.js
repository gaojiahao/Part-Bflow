webpackJsonp([16],{"8N8F":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=t("K4CD"),i={components:{ChangeDetail:t("lZCD").a},data:function(){var e=this;return{fieldDetailColumns:[{title:"版本",key:"version",width:60,align:"center"},{title:"变更时间",key:"modiferTime",align:"center"},{title:"变更者",key:"modiferName",align:"center"},{title:"变更字段",key:"mainTable",align:"center",render:function(e,a){var t=a.row.mainTable,l=(a.row.detailTable,[]);return t.length>0&&t.forEach(function(a){l.push(e("p",{style:{minHeight:"16px"}},a.fieldName))}),a.row.detailTable.length>0&&a.row.detailTable.forEach(function(a,t){l.push(e("p",{style:{height:"16px"}},"明细表"))}),e("div",l)}},{title:"变更前",key:"mainTable",align:"center",render:function(a,t){var l=t.row.mainTable,i=t.row.detailTable,n=[],s=/jpg|jpeg|png/g;return l.length>0&&l.forEach(function(e){s.test(e.fieldOldValue)?n.push(a("img",{attrs:{src:"/H_roleplay-si/ds/download?url="+e.fieldOldValue,style:"width: 30px;height: 30px;border-radius: 2px;"}})):n.push(a("p",{style:{minHeight:"16px",color:"#ee0000"}},e.fieldOldValue?e.fieldOldValue:" "))}),i&&i.length>0&&i.forEach(function(l,s){n.push(a("p",{style:{height:"16px",color:"#1605f3",cursor:"pointer"},on:{click:function(){e.showChangeDetailsModal=!0,e.modiferName=t.row.modiferName,e.modiferTime=t.row.modiferTime,e.addRows=JSON.parse(JSON.parse(i[s].changes).adds),e.deleteRows=JSON.parse(i[s].changes).deletes?JSON.parse(JSON.parse(i[s].changes).deletes):[];var a=JSON.parse(i[s].changes).updates?JSON.parse(JSON.parse(i[s].changes).updates):[],l=JSON.parse(i[s].fieldName);for(var n in l)"ID"===l[n]&&(e.locationField=n);for(var r in e.changeColumns=[{type:"index",width:60,align:"center"}],l)r!==e.locationField&&e.changeColumns.push({title:l[r],key:r,hidden:!0,align:"center"});e.beforeChangeData=JSON.parse(i[s].oldData),e.afterChangeData=JSON.parse(i[s].newData),a.length>0&&a.forEach(function(a){e.afterChangeData.forEach(function(t){if(a.id===t[e.locationField]){var l=a.change;t.cellClassName={};for(var i=0;i<l.length;i++)t.cellClassName[l[i]]="table-column-update"}})})}}},"查看详情"))}),a("div",n)}},{title:"变更后",key:"mainTable",align:"center",render:function(a,t){var l=t.row.mainTable,i=t.row.detailTable,n=[],s=/jpg|jpeg|png/g;return l.length>0&&l.forEach(function(e){s.test(e.fieldNewValue)?n.push(a("img",{attrs:{src:"/H_roleplay-si/ds/download?url="+e.fieldNewValue,style:"width: 30px;height: 30px;border-radius: 2px;"}})):n.push(a("p",{style:{minHeight:"16px",color:"#008000"}},e.fieldNewValue))}),i&&i.length>0&&i.forEach(function(l,s){n.push(a("p",{style:{height:"16px",color:"#1605f3",cursor:"pointer"},on:{click:function(){e.showChangeDetailsModal=!0,e.modiferName=t.row.modiferName,e.modiferTime=t.row.modiferTime,e.addRows=JSON.parse(JSON.parse(i[s].changes).adds),e.deleteRows=JSON.parse(i[s].changes).deletes?JSON.parse(JSON.parse(i[s].changes).deletes):[];var a=JSON.parse(i[s].changes).updates?JSON.parse(JSON.parse(i[s].changes).updates):[],l=JSON.parse(i[s].fieldName);for(var n in l)"ID"===l[n]&&(e.locationField=n);for(var r in e.changeColumns=[{type:"index",width:60,align:"center"}],l)r!==e.locationField&&e.changeColumns.push({title:l[r],key:r,hidden:!0,align:"center"});e.beforeChangeData=JSON.parse(i[s].oldData),e.afterChangeData=JSON.parse(i[s].newData),a.length>0&&a.forEach(function(a){e.afterChangeData.forEach(function(t){if(a.id===t[e.locationField]){var l=a.change;t.cellClassName={};for(var i=0;i<l.length;i++)t.cellClassName[l[i]]="table-column-update"}})})}}},"查看详情"))}),a("div",n)}}],fieldDetail:[],showChangeDetailsModal:!1,beforeChangeData:[],afterChangeData:[],changeColumns:[],modiferName:"",modiferTime:"",addRows:[],deleteRows:[],locationField:""}},methods:{addRowClassName:function(e,a){for(var t=0;t<this.addRows.length;t++)if(e[this.locationField]===this.addRows[t])return"table-column-add"},deleteRowClassName:function(e,a){for(var t=0;t<this.deleteRows.length;t++)if(e[this.locationField]===this.deleteRows[t])return"table-column-detele"}},filters:{capitalize:function(e){return e?(e=Math.abs(Number(e))).toFixed(2):""}},mounted:function(){var e=this,a=this.$route.params.transCode;Object(l.e)(a).then(function(a){e.fieldDetail=a})}},n={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"wrapper"},[t("div",{staticClass:"wrapper-body"},[t("Table",{attrs:{columns:e.fieldDetailColumns,data:e.fieldDetail}})],1),e._v(" "),t("change-detail",{attrs:{title:"变更详情",width:"900",footerHide:!0},model:{value:e.showChangeDetailsModal,callback:function(a){e.showChangeDetailsModal=a},expression:"showChangeDetailsModal"}},[t("div",{staticClass:"detail"},[t("div",{staticClass:"detail-header"},[t("p",[t("label",[e._v("变更者:")]),e._v(" "),t("span",[e._v(e._s(e.modiferName))])]),e._v(" "),t("div",{staticClass:"detail-header-time"},[t("label",[e._v("变更时间:")]),e._v(" "),t("span",[e._v(e._s(e.modiferTime))]),e._v(" "),t("ul",[t("li",[t("div",{staticStyle:{"background-color":"#ffe699"}}),e._v("\n              已移除\n            ")]),e._v(" "),t("li",[t("div",{staticStyle:{"background-color":"#c6e0b4"}}),e._v("\n              新增\n            ")]),e._v(" "),t("li",[t("div",{staticStyle:{"background-color":"#bdd7ee"}}),e._v("\n              已修改\n            ")])])])]),e._v(" "),t("div",{staticClass:"detail-table"},[t("div",{staticClass:"detail-table-before"},[t("div",{staticClass:"detail-table-before-title"},[e._v("更变前")]),e._v(" "),t("Table",{attrs:{"row-class-name":e.deleteRowClassName,columns:e.changeColumns,data:e.beforeChangeData,size:"small",height:"152","disabled-hover":!0}})],1),e._v(" "),t("div",{staticClass:"detail-table-after"},[t("div",{staticClass:"detail-table-after-title"},[e._v("更变后")]),e._v(" "),t("Table",{attrs:{"row-class-name":e.addRowClassName,columns:e.changeColumns,data:e.afterChangeData,size:"small",height:"152","disabled-hover":!0}})],1)])])])],1)},staticRenderFns:[]};var s=t("D8HT")(i,n,!1,function(e){t("Ws/0")},null,null);a.default=s.exports},"Ws/0":function(e,a){}});
//# sourceMappingURL=16.8896face1d87bbe27629.js.map