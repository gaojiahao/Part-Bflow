webpackJsonp([8],{E4YT:function(t,a){},L9CH:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("GIAq"),i={name:"appAddList",components:{},data:function(){return{showSelect:!0,selectTemplate:[],appData:[{name:"对象",list:[]},{name:"业务",list:[]}]}},methods:{selectApp:function(t,a){"对象"===a?this.appData[0].list[t].isSelect=!this.appData[0].list[t].isSelect:this.appData[1].list[t].isSelect=!this.appData[1].list[t].isSelect},addAppTemplate:function(){}},mounted:function(){var t=this;Object(s.k)().then(function(a){a.tableContent.forEach(function(a,e){"obj"===a.tplType?(a.isSelect=!1,t.appData[0].list.push(a)):"business"===a.tplType&&(a.isSelect=!1,t.appData[1].list.push(a))})})}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t._l(t.appData,function(a,s){return e("Row",{key:s},[e("Card",{staticClass:"app-out-card"},[e("p",{staticClass:"app-name",attrs:{slot:"title"},slot:"title"},[t._v("\n              "+t._s(a.name)+"\n          ")]),t._v(" "),e("a",{attrs:{slot:"extra",href:"#"},slot:"extra"}),t._v(" "),t._l(a.list,function(s,i){return e("div",{key:i,staticClass:"app-card",on:{click:function(e){t.selectApp(i,a.name)}}},[e("Card",[e("div",{staticClass:"app-block"},[e("img",{staticClass:"app-img",attrs:{src:s.icon}}),t._v(" "),e("p",{staticClass:"app-title"},[t._v(t._s(s.title))]),t._v(" "),e("Icon",{directives:[{name:"show",rawName:"v-show",value:s.isSelect,expression:"item.isSelect"}],staticClass:"app-select-icon",attrs:{type:"checkmark-round"}}),t._v(" "),e("p",{staticClass:"app-desc"},[t._v(t._s(s.comment))])],1)])],1)})],2)],1)}),t._v(" "),e("div",{staticClass:"add-bottom"},[e("Affix",{staticClass:"add-save-btn",attrs:{"offset-bottom":0}},[e("Button",{attrs:{type:"primary"},on:{click:t.addAppTemplate}},[t._v("保存")])],1)],1)],2)},staticRenderFns:[]};var p=e("VU/8")(i,n,!1,function(t){e("E4YT")},"data-v-5af74d6f",null);a.default=p.exports}});
//# sourceMappingURL=8.ea1531e5f7a86faf5439.js.map