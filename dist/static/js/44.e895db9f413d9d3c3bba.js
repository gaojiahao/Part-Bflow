webpackJsonp([44],{"1iBj":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7B+g"),i=(n("Lokx"),{data:function(){var n=this;return{sortable:null,dictionaryData:[],loading:!1,columns1:[{title:"名称",key:"name",width:180,render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.name},style:{width:"150px"},on:{input:function(t){e.row.name=t.target.value}}}):t("div",e.row.name)}},{title:"简称",key:"shortName",width:180,render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.shortName},style:{width:"150px"},on:{input:function(t){e.row.shortName=t.target.value}}}):t("div",e.row.shortName)}},{title:"值",key:"value",width:180,render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.value},style:{width:"150px"},on:{input:function(t){e.row.value=t.target.value}}}):t("div",e.row.value)}},{title:"类型",key:"type",width:150,render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.type},style:{width:"100px"},on:{input:function(t){e.row.type=t.target.value}}}):t("div",e.row.type)}},{title:"排序",key:"sort",width:80,render:function(t,e){return e.row.$isEdit?t("input",{domProps:{value:e.row.sort},style:{width:"50px"},on:{input:function(t){e.row.sort=t.target.value}}}):t("div",e.row.sort)}},{title:"编辑",key:"action",width:80,align:"center",render:function(t,e){return t("div",[t("Button",{props:{type:"success",size:"small"},on:{click:function(){e.row.$isEdit?n.handleSave(e.row):n.handleEdit(e.row)}}},e.row.$isEdit?"保存":"编辑")])}},{title:"操作",key:"action",width:80,align:"center",render:function(t,e){return t("div",[t("Button",{props:{type:"error",size:"small"},on:{click:function(){n.deleteMenuItem(e.row.id)}}},"删除")])}}]}},methods:{getDictionarybyParentId:function(t){var e,n=this;this.loading=!0,(e=t,Object(r.a)("/H_roleplay-si/base/dict/getChildren",{parentId:e})).then(function(t){n.dictionaryData=t,n.loading=!1})},handleEdit:function(t){this.$set(t,"$isEdit",!0)},handleSave:function(t){var e,n=this,i={id:t.id,name:t.name,parentId:t.parentId,shortName:t.shortName,sort:t.sort,type:t.type,value:t.value};(e=i,Object(r.a)("/H_roleplay-si/base/dict/save",e,"POST",{})).then(function(t){!0===t.success?n.$Message.info("保存成功"):n.$Message.error(t.message)}),this.$set(t,"$isEdit",!1)},deleteMenuItem:function(e){var n=this;this.$Modal.confirm({title:"确认",content:"确认删除此明细？",onOk:function(){var t;(t=e,Object(r.a)("/H_roleplay-si/base/dict/delete",{list:"sys_dict",id:t},"POST",{})).then(function(t){!0===t.success?(n.$Message.info("删除成功"),n.getDictionarybyParentId(n.$route.params.dicId)):n.$Message.error(t.message)})}})}},mounted:function(){this.getDictionarybyParentId(this.$route.params.dicId)}}),o=n("Ny1m"),a=n.n(o);var s=function(t){n("5oLP")},d=n("VU/8")(i,a.a,!1,s,"data-v-3e9eef34",null);e.default=d.exports},"5oLP":function(t,e){},Ny1m:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap"},[n("div",{staticClass:"wrap-table"},[n("br"),t._v(" "),n("Table",{attrs:{loading:t.loading,columns:t.columns1,data:t.dictionaryData}})],1)])},staticRenderFns:[]}}});