{"source":"webpackJsonp([22],{PiXU:function(e,r,s){\"use strict\";Object.defineProperty(r,\"__esModule\",{value:!0});var t=s(\"YsVi\"),o={data:function(){return{email:this.$route.query,form:{userCode:\"\",userName:\"\",password:\"\",confirmPassword:\"\"},rules:{userCode:[{required:!0,message:\"账号不能为空\",trigger:\"blur\"}],userName:[{required:!0,message:\"昵称不能为空\",trigger:\"blur\"}],password:[{required:!0,message:\"密码必须同时包含字母和数字，且不少于8位！\",pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,trigger:\"blur\"}],confirmPassword:[{required:!0,message:\"确认密码不能为空\",trigger:\"blur\"}]}}},methods:{handleSubmit:function(){var r=this;this.$refs.activeForm.validate(function(e){e&&(r.form.password===r.form.confirmPassword?Object(t.a)(r.email.m,r.email.t,r.email.e,r.form.userCode,r.form.userName,r.form.password).then(function(e){e.success&&r.$Message.success(e.message)}).catch(function(e){r.$Message.error(e.data.message)}):r.$Message.error(\"两次输入的密码不一致！请重新输入\"))})},blurConfirmPwd:function(){this.form.password!==this.form.confirmPassword&&this.$Message.error(\"两次输入的密码不一致！请重新输入\")}},mounted:function(){}},a=s(\"tyy4\"),n=s.n(a);var i=function(e){s(\"atIn\"),s(\"aPhJ\")},c=s(\"VU/8\")(o,n.a,!1,i,\"data-v-2b3a58df\",null);r.default=c.exports},YsVi:function(e,r,s){\"use strict\";s.d(r,\"b\",function(){return t}),s.d(r,\"a\",function(){return o});var n=s(\"7B+g\"),t=function(e){return Object(n.a)(\"../mock/login/user.json\",e)},o=function(e,r,s,t,o,a){return Object(n.a)(\"/H_roleplay-si/userInfo/register\",{m:e,t:r,e:s,usercode:t,nickname:o,password:a},\"POST\")}},aPhJ:function(e,r){},atIn:function(e,r){},tyy4:function(e,r){e.exports={render:function(){var r=this,e=r.$createElement,s=r._self._c||e;return s(\"div\",{staticClass:\"active-body\"},[s(\"div\",{staticClass:\"active-con\"},[r._m(0),r._v(\" \"),s(\"p\",{staticClass:\"active-welcome\"},[r._v(\"欢迎激活账号\")]),r._v(\" \"),s(\"div\",{staticClass:\"form-con\"},[s(\"Form\",{ref:\"activeForm\",attrs:{model:r.form,rules:r.rules}},[s(\"FormItem\",{attrs:{prop:\"userCode\",label:\"账号：\"}},[s(\"Input\",{attrs:{placeholder:\"请输入账号\"},model:{value:r.form.userCode,callback:function(e){r.$set(r.form,\"userCode\",e)},expression:\"form.userCode\"}})],1),r._v(\" \"),s(\"FormItem\",{attrs:{prop:\"userName\",label:\"昵称：\"}},[s(\"Input\",{attrs:{placeholder:\"请输入昵称\"},model:{value:r.form.userName,callback:function(e){r.$set(r.form,\"userName\",e)},expression:\"form.userName\"}})],1),r._v(\" \"),s(\"FormItem\",{attrs:{prop:\"password\",label:\"密码：(密码必须同时包含字母和数字，且不少于8位！)\"}},[s(\"Input\",{attrs:{type:\"password\",placeholder:\"请输入密码\"},model:{value:r.form.password,callback:function(e){r.$set(r.form,\"password\",e)},expression:\"form.password\"}})],1),r._v(\" \"),s(\"FormItem\",{attrs:{prop:\"confirmPassword\",label:\"确认密码：\"}},[s(\"Input\",{attrs:{type:\"password\",placeholder:\"请确认密码\"},on:{\"on-blur\":r.blurConfirmPwd},model:{value:r.form.confirmPassword,callback:function(e){r.$set(r.form,\"confirmPassword\",e)},expression:\"form.confirmPassword\"}})],1),r._v(\" \"),s(\"FormItem\",[s(\"Button\",{attrs:{type:\"primary\",long:\"\"},on:{click:r.handleSubmit}},[r._v(\"激活\")])],1)],1),r._v(\" \"),s(\"p\",{staticClass:\"active-tip\"},[r._v(\"请输入账号和密码\")])],1)])])},staticRenderFns:[function(){var e=this.$createElement,r=this._self._c||e;return r(\"div\",{staticStyle:{\"text-align\":\"center\"}},[r(\"img\",{staticStyle:{width:\"40px\"},attrs:{src:\"static/favicon.ico\"}}),this._v(\" \"),r(\"b\",[this._v(\"Roletask\")])])}]}}});"}