{"source":"webpackJsonp([40],{\"8N8F\":function(e,a,t){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var i=t(\"K4CD\"),l=t(\"lZCD\"),n=t(\"oAV5\"),s={components:{ChangeDetail:l.a},data:function(){var r=this;return{fieldDetailColumns:[{title:\"版本\",key:\"version\",width:60,align:\"center\"},{title:\"变更时间\",key:\"modiferTime\",align:\"center\"},{title:\"变更者\",key:\"modiferName\",align:\"center\"},{title:\"变更字段\",key:\"mainTable\",align:\"center\",render:function(t,e){var a=e.row.mainTable,i=(e.row.detailTable,[]);return 0<a.length&&a.forEach(function(e){i.push(t(\"p\",{style:{minHeight:\"16px\"}},e.fieldName))}),0<e.row.detailTable.length&&e.row.detailTable.forEach(function(e,a){i.push(t(\"p\",{style:{height:\"16px\"}},\"明细表\"))}),t(\"div\",i)}},{title:\"变更前\",key:\"mainTable\",align:\"center\",render:function(a,s){var e=s.row.mainTable,o=s.row.detailTable,t=[],i=/jpg|jpeg|png/g;return 0<e.length&&e.forEach(function(e){i.test(e.fieldOldValue)?t.push(a(\"img\",{attrs:{src:\"/H_roleplay-si/ds/download?url=\"+e.fieldOldValue,style:\"width: 30px;height: 30px;border-radius: 2px;\"}})):t.push(a(\"p\",{style:{minHeight:\"16px\",color:\"#ee0000\"}},e.fieldOldValue?e.fieldOldValue:\" \"))}),o&&0<o.length&&o.forEach(function(e,n){t.push(a(\"p\",{style:{height:\"16px\",color:\"#1605f3\",cursor:\"pointer\"},on:{click:function(){r.showChangeDetailsModal=!0,r.modiferName=s.row.modiferName,r.modiferTime=s.row.modiferTime;var e=JSON.parse(o[n].changes);r.addRows=e.adds?JSON.parse(e.adds):[],r.deleteRows=e.deletes?JSON.parse(e.deletes):[];var a=e.updates?JSON.parse(e.updates):[],t=o[n].fieldName?JSON.parse(o[n].fieldName):[];for(var i in t)\"ID\"===t[i]&&(r.locationField=i);for(var l in r.changeColumns=[{type:\"index\",width:60,align:\"center\"}],t)l!==r.locationField&&r.changeColumns.push({title:t[l],key:l,hidden:!0,width:25*t[l].length,align:\"center\"});r.beforeChangeData=JSON.parse(o[n].oldData)?JSON.parse(o[n].oldData):[],r.afterChangeData=JSON.parse(o[n].newData)?JSON.parse(o[n].newData):[],0<a.length&&a.forEach(function(i){r.afterChangeData.forEach(function(e){if(i.id===e[r.locationField]){var a=i.change;e.cellClassName={};for(var t=0;t<a.length;t++)e.cellClassName[a[t]]=\"table-column-update\"}})})}}},\"查看详情\"))}),a(\"div\",t)}},{title:\"变更后\",key:\"mainTable\",align:\"center\",render:function(a,s){var e=s.row.mainTable,o=s.row.detailTable,t=[],i=/jpg|jpeg|png/g;return 0<e.length&&e.forEach(function(e){i.test(e.fieldNewValue)?t.push(a(\"img\",{attrs:{src:\"/H_roleplay-si/ds/download?url=\"+e.fieldNewValue,style:\"width: 30px;height: 30px;border-radius: 2px;\"}})):t.push(a(\"p\",{style:{minHeight:\"16px\",color:\"#008000\"}},e.fieldNewValue))}),o&&0<o.length&&o.forEach(function(e,n){t.push(a(\"p\",{style:{height:\"16px\",color:\"#1605f3\",cursor:\"pointer\"},on:{click:function(){r.showChangeDetailsModal=!0,r.modiferName=s.row.modiferName,r.modiferTime=s.row.modiferTime;var e=JSON.parse(o[n].changes);r.addRows=e.adds?JSON.parse(e.adds):[],r.deleteRows=e.deletes?JSON.parse(e.deletes):[];var a=e.updates?JSON.parse(e.updates):[],t=o[n].fieldName?JSON.parse(o[n].fieldName):[];for(var i in t)\"ID\"===t[i]&&(r.locationField=i);for(var l in r.changeColumns=[{type:\"index\",width:60,align:\"center\"}],t)l!==r.locationField&&r.changeColumns.push({title:t[l],key:l,width:25*t[l].length,hidden:!0,align:\"center\"});r.beforeChangeData=JSON.parse(o[n].oldData)?JSON.parse(o[n].oldData):[],r.afterChangeData=JSON.parse(o[n].newData)?JSON.parse(o[n].newData):[],0<a.length&&a.forEach(function(i){r.afterChangeData.forEach(function(e){if(i.id===e[r.locationField]){var a=i.change;e.cellClassName={};for(var t=0;t<a.length;t++)e.cellClassName[a[t]]=\"table-column-update\"}})})}}},\"查看详情\"))}),a(\"div\",t)}}],fieldDetail:[],loading:!1,showChangeDetailsModal:!1,beforeChangeData:[],afterChangeData:[],changeColumns:[],modiferName:\"\",modiferTime:\"\",addRows:[],deleteRows:[],locationField:\"\"}},methods:{addRowClassName:function(e,a){for(var t=0;t<this.addRows.length;t++)if(e[this.locationField]===this.addRows[t])return\"table-column-add\"},deleteRowClassName:function(e,a){for(var t=0;t<this.deleteRows.length;t++)if(e[this.locationField]===this.deleteRows[t])return\"table-column-detele\"},subscribeMessage:function(){var a=this,e=this.$deepstream;Object(n.c)();e.event&&e.event.subscribe(\"transHistoryChange/\"+this.$route.params.transCode,function(e){a.getChangeHistoryData()})},getChangeHistoryData:function(){var a=this,e=this.$route.params.transCode;this.loading=!0,Object(i.g)(e).then(function(e){a.loading=!1,a.fieldDetail=e})}},filters:{capitalize:function(e){return e?(e=Math.abs(Number(e))).toFixed(2):\"\"}},mounted:function(){this.getChangeHistoryData(),this.subscribeMessage()}},o=t(\"gQRa\"),r=t.n(o);var d=function(e){t(\"f6Bd\")},c=t(\"VU/8\")(s,r.a,!1,d,null,null);a.default=c.exports},f6Bd:function(e,a){},gQRa:function(e,a){e.exports={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t(\"div\",{staticClass:\"wrapper\"},[t(\"div\",{staticClass:\"wrapper-body\"},[t(\"Table\",{attrs:{loading:a.loading,columns:a.fieldDetailColumns,data:a.fieldDetail}})],1),a._v(\" \"),t(\"change-detail\",{attrs:{title:\"变更详情\",width:\"900\",footerHide:!0},model:{value:a.showChangeDetailsModal,callback:function(e){a.showChangeDetailsModal=e},expression:\"showChangeDetailsModal\"}},[t(\"div\",{staticClass:\"detail\"},[t(\"div\",{staticClass:\"detail-header\"},[t(\"p\",[t(\"label\",[a._v(\"变更者:\")]),a._v(\" \"),t(\"span\",[a._v(a._s(a.modiferName))])]),a._v(\" \"),t(\"div\",{staticClass:\"detail-header-time\"},[t(\"label\",[a._v(\"变更时间:\")]),a._v(\" \"),t(\"span\",[a._v(a._s(a.modiferTime))]),a._v(\" \"),t(\"ul\",[t(\"li\",[t(\"div\",{staticStyle:{\"background-color\":\"#ffe699\"}}),a._v(\"\\n              已移除\\n            \")]),a._v(\" \"),t(\"li\",[t(\"div\",{staticStyle:{\"background-color\":\"#c6e0b4\"}}),a._v(\"\\n              新增\\n            \")]),a._v(\" \"),t(\"li\",[t(\"div\",{staticStyle:{\"background-color\":\"#bdd7ee\"}}),a._v(\"\\n              已修改\\n            \")])])])]),a._v(\" \"),t(\"div\",{staticClass:\"detail-table\"},[t(\"div\",{staticClass:\"detail-table-before\"},[t(\"div\",{staticClass:\"detail-table-before-title\"},[a._v(\"变更前\")]),a._v(\" \"),t(\"Table\",{attrs:{\"row-class-name\":a.deleteRowClassName,columns:a.changeColumns,data:a.beforeChangeData,size:\"small\",height:\"152\",\"disabled-hover\":!0}})],1),a._v(\" \"),t(\"div\",{staticClass:\"detail-table-after\"},[t(\"div\",{staticClass:\"detail-table-after-title\"},[a._v(\"变更后\")]),a._v(\" \"),t(\"Table\",{attrs:{\"row-class-name\":a.addRowClassName,columns:a.changeColumns,data:a.afterChangeData,size:\"small\",height:\"152\",\"disabled-hover\":!0}})],1)])])])],1)},staticRenderFns:[]}}});"}