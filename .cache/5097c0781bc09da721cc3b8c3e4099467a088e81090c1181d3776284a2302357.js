{"source":"webpackJsonp([41],{\"+OXj\":function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var a=n(\"Gu7T\"),i=n.n(a),r=n(\"o32f\"),o={data:function(){return{datasource:{groupName:\"根节点\",groupId:7,creator:\" \",children:[]}}},methods:{getGroupData:function(t){var o=this,e=function(t){return'\\n            <div class=\"org-item org-item_'+t.groupId+'\">\\n              <img class=\"org-item-img\" src='+(t.principalPic?t.principalPic:\"resources/images/icon/defaultUserPhoto.png\")+'></img>\\n              <div class=\"org-item-content\">\\n                <a href=\"/dist/#/addressBook/organization/detail/'+t.groupId+'\" target=\"_blank\">'+t.groupName+'</a>\\n                <div>\\n                  <a href=\"/dist/#/addressBook/user/detail/'+t.principal+'\" target=\"_blank\">\\n                    '+(t.principalName?t.principalName:\" \")+\"\\n                  </a>\\n                </div>\\n              </div>\\n            </div>\\n            <i id=\"+t.groupId+' class=\"iconfont icon-pos\">&#xe62b;</i>\\n          '};Object(r.F)(t).then(function(t){o.datasource.children=[].concat(i()(t.tableContent));var r=$(\"#chartContainerId\").orgchart({data:o.datasource,nodeTemplate:e});$(\".org-item_7\")[0].setAttribute(\"expand\",!0),r.$chartContainer.on(\"click\",\".node\",function(t,e){var n=t.target||t.srcElement,a=n.getAttribute(\"id\");if(a){var i=$(\".org-item_\"+a);\"true\"!==i[0].getAttribute(\"expand\")?(n.classList.add(\"icon-rotate\"),o.handleExpandChildNode(i,r,a)):(n.classList.remove(\"icon-rotate\"),o.handleDeleteChildNode(i,r,a))}})})},handleExpandChildNode:function(e,n,t){var a=this;Object(r.F)(t).then(function(t){e[0].setAttribute(\"expand\",!0),0<t.dataCount?n.addChildren(e,t.tableContent.map(function(t){return t})):a.$Message.info(\"该组织下面没有下级组织!\")})},handleDeleteChildNode:function(e,n,t){var a=this;Object(r.F)(t).then(function(t){e[0].setAttribute(\"expand\",!1),0<t.dataCount?t.tableContent.map(function(t){n.removeNodes($(\".org-item_\"+t.groupId))}):a.$Message.info(\"该组织下面没有下级组织!\")})}},mounted:function(){this.getGroupData(7)}},d=n(\"fR6l\"),c=n.n(d);var s=function(t){n(\"O0pu\")},u=n(\"VU/8\")(o,c.a,!1,s,null,null);e.default=u.exports},O0pu:function(t,e){},fR6l:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)(\"div\",{staticClass:\"tree-container\",attrs:{id:\"chartContainerId\"}})},staticRenderFns:[]}}});"}