webpackJsonp([9],{UZd2:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("GIAq"),i={name:"appAddList",components:{},data:function(){return{showSelect:!0,selectTemplate:[],appData:[{name:"业务",list:[]}]}},methods:{selectApp:function(t,e){this.appData[0].list[t].isSelect=!this.appData[0].list[t].isSelect},addAppTemplate:function(){var t=this,e=[];this.appData[0].list.forEach(function(e){e.isSelect&&t.selectTemplate.push(e)}),this.selectTemplate.forEach(function(t){e.push({list:"list",title:t.title,templateId:t.id,type:t.tplType,creator:"",transType:t.transType,uniqueId:t.uniqueId})}),Object(s.c)(e).then(function(e){e.success&&(t.$Message.success(e.message),t.selectTemplate=[])})},getTplData:function(){var t=this;Object(s.r)().then(function(e){e.tableContent.forEach(function(e,a){"business"===e.tplType&&(e.isSelect=!1,t.appData[0].list.push(e))})})},goBack:function(){this.$router.push({path:"/application/list"})}},created:function(){this.getTplData()}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._l(t.appData,function(e,s){return a("Row",{key:s,staticStyle:{"padding-bottom":"35px"}},[a("Card",{staticClass:"app-out-card"},[a("p",{staticClass:"app-name",attrs:{slot:"title"},slot:"title"},[t._v("\n              "+t._s(e.name)+"\n          ")]),t._v(" "),a("a",{attrs:{slot:"extra",href:"#"},slot:"extra"}),t._v(" "),t._l(e.list,function(s,i){return a("div",{key:i,staticClass:"app-card",on:{click:function(a){t.selectApp(i,e.name)}}},[a("Card",[a("div",{staticClass:"app-block"},[a("img",{staticClass:"app-img",attrs:{src:s.icon}}),t._v(" "),a("p",{staticClass:"app-title"},[t._v(t._s(s.title))]),t._v(" "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:s.isSelect,expression:"item.isSelect"}],staticClass:"app-select-icon",attrs:{type:"checkmark-round"}}),t._v(" "),a("p",{staticClass:"app-desc"},[t._v(t._s(s.comment))])],1)])],1)})],2)],1)}),t._v(" "),a("div",{staticClass:"add-bottom"},[a("Affix",{staticClass:"add-save-btn",attrs:{"offset-bottom":0}},[a("Button",{on:{click:t.goBack}},[t._v("返回")]),t._v(" "),a("Button",{attrs:{type:"primary"},on:{click:t.addAppTemplate}},[t._v("保存")])],1)],1)],2)},staticRenderFns:[]};var n=a("D8HT")(i,c,!1,function(t){a("Z/P1")},"data-v-1eebe0d0",null);e.default=n.exports},"Z/P1":function(t,e){}});
//# sourceMappingURL=9.b43b1383a4920a420fff.js.map