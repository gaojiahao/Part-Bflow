webpackJsonp([10],{PiXU:function(e,r,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=s("YsVi"),o={data:function(){return{email:this.$route.query,form:{userCode:"",userName:"",password:"",confirmPassword:""},rules:{userCode:[{required:!0,message:"账号不能为空",trigger:"blur"}],userName:[{required:!0,message:"昵称不能为空",trigger:"blur"}],password:[{required:!0,message:"密码必须同时包含字母和数字，且不少于8位！",pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,trigger:"blur"}],confirmPassword:[{required:!0,message:"确认密码不能为空",trigger:"blur"}]}}},methods:{handleSubmit:function(){var e=this;this.$refs.activeForm.validate(function(r){r&&(e.form.password===e.form.confirmPassword?Object(t.a)(e.email.m,e.email.t,e.email.e,e.form.userCode,e.form.userName,e.form.password).then(function(r){r.success&&e.$Message.success(r.message)}).catch(function(r){e.$Message.error(r.data.message)}):e.$Message.error("两次输入的密码不一致！请重新输入"))})},blurConfirmPwd:function(){this.form.password!==this.form.confirmPassword&&this.$Message.error("两次输入的密码不一致！请重新输入")}},mounted:function(){}},a={render:function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"active-body"},[s("div",{staticClass:"active-con"},[e._m(0),e._v(" "),s("p",{staticClass:"active-welcome"},[e._v("欢迎激活账号")]),e._v(" "),s("div",{staticClass:"form-con"},[s("Form",{ref:"activeForm",attrs:{model:e.form,rules:e.rules}},[s("FormItem",{attrs:{prop:"userCode",label:"账号："}},[s("Input",{attrs:{placeholder:"请输入账号"},model:{value:e.form.userCode,callback:function(r){e.$set(e.form,"userCode",r)},expression:"form.userCode"}})],1),e._v(" "),s("FormItem",{attrs:{prop:"userName",label:"昵称："}},[s("Input",{attrs:{placeholder:"请输入昵称"},model:{value:e.form.userName,callback:function(r){e.$set(e.form,"userName",r)},expression:"form.userName"}})],1),e._v(" "),s("FormItem",{attrs:{prop:"password",label:"密码：(密码必须同时包含字母和数字，且不少于8位！)"}},[s("Input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),e._v(" "),s("FormItem",{attrs:{prop:"confirmPassword",label:"确认密码："}},[s("Input",{attrs:{type:"password",placeholder:"请确认密码"},on:{"on-blur":e.blurConfirmPwd},model:{value:e.form.confirmPassword,callback:function(r){e.$set(e.form,"confirmPassword",r)},expression:"form.confirmPassword"}})],1),e._v(" "),s("FormItem",[s("Button",{attrs:{type:"primary",long:""},on:{click:e.handleSubmit}},[e._v("激活")])],1)],1),e._v(" "),s("p",{staticClass:"active-tip"},[e._v("请输入账号和密码")])],1)])])},staticRenderFns:[function(){var e=this.$createElement,r=this._self._c||e;return r("div",{staticStyle:{"text-align":"center"}},[r("img",{staticStyle:{width:"40px"},attrs:{src:"static/favicon.ico"}}),this._v(" "),r("b",[this._v("Roletask")])])}]};var i=s("VU/8")(o,a,!1,function(e){s("YL1M"),s("e9f+")},null,null);r.default=i.exports},YL1M:function(e,r){},YsVi:function(e,r,s){"use strict";s.d(r,"b",function(){return o}),s.d(r,"a",function(){return a});var t=s("7B+g"),o=function(e){return Object(t.a)("../mock/login/user.json",e)},a=function(e,r,s,o,a,i){return Object(t.a)("/H_roleplay-si/userInfo/register",{m:e,t:r,e:s,usercode:o,nickname:a,password:i},"POST")}},"e9f+":function(e,r){}});
//# sourceMappingURL=10.4b69b834d317aef87fe1.js.map