webpackJsonp([32],{"6Siv":function(t,i){},tp8y:function(t,i){t.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"imgs messagescrollbar",attrs:{id:"imgHistory"}},[e._l(e.images,function(i,t){return a("div",{key:t,staticClass:"comimg"},[a("img",{attrs:{width:"80",src:i.attachment}}),e._v(" "),a("div",{staticClass:"comimg-cover"},[a("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(t){e.handleViewImg(i.attachment)}}})],1)])}),e._v(" "),a("Modal",{attrs:{title:"查看图片",width:"50%"},model:{value:e.imgModalVisible,callback:function(t){e.imgModalVisible=t},expression:"imgModalVisible"}},[e.imgModalVisible?a("img",{staticStyle:{width:"100%"},attrs:{src:e.imgName}}):e._e()])],2)},staticRenderFns:[]}},xKcK:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("Gu7T"),s=e.n(a),n=e("a8xa"),l={name:"Images",data:function(){return{images:[],imgName:"",imgModalVisible:!1,isRolling:!1,listId:"",imgParams:{page:1,limit:100,total:0,listId:this.$route.params.listId,type:"image"}}},methods:{handleScroll:function(){var t=document.getElementById("imgHistory"),i=this;t.addEventListener("scroll",function(){Math.ceil(t.clientHeight+t.scrollTop)+2>=t.scrollHeight&&i.imgParams.total>i.images.length&&(i.imgParams.page++,i.isRolling=!0,i.refreshImages())})},refreshImages:function(){var e=this;Object(n.c)(this.imgParams).then(function(t){var i;(e.imgParams.total=t.dataCount,e.isRolling)?e.images=(i=e.images).concat.apply(i,s()(t.tableContent)):e.images=t.tableContent})},handleViewImg:function(t){this.imgName=t,this.imgModalVisible=!0}},mounted:function(){this.listId=this.$route.params.listId,this.refreshImages(),this.handleScroll()}},o=e("tp8y"),m=e.n(o);var r=function(t){e("6Siv")},c=e("VU/8")(l,m.a,!1,r,"data-v-773a8084",null);i.default=c.exports}});