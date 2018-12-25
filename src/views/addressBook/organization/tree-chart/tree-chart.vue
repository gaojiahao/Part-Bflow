<style lang="less">
@import './tree-chart.less';
</style>

<template>
    <div class="tree-container" id="chartContainerId" ></div>
</template>

<script>
import {getGroupData} from "@/services/addressBookService.js";
export default {
    
    data(){
        return {
          datasource:{
            groupName: '根节点',
            groupId:7,
            creator:" ",
            children:[]
          }
        };
    },

    methods:{
      getGroupData(id){
         const nodeTemplate = function(data) {
          return `
            <div class="org-item org-item_${data.groupId}">
              <img class="org-item-img" src=${data.principalPic?data.principalPic:'resources/images/icon/defaultUserPhoto.png'}></img>
              <div class="org-item-content">
                <a href="/dist/#/addressBook/organization/detail/${data.groupId}" target="_blank">${data.groupName}</a>
                <div>
                  <a href="/dist/#/addressBook/user/detail/${data.creatorId}" target="_blank">
                    ${data.creator?data.creator:" "}
                  </a>
                </div>
              </div>
            </div>
            <i id=${data.groupId} class="iconfont icon-pos">&#xe62b;</i>
          `;
        };
        getGroupData(id).then(res=>{
          this.datasource.children = [...res.tableContent];

          let oc = $('#chartContainerId').orgchart({
            'data' : this.datasource,
            'nodeTemplate': nodeTemplate,
            // 'pan': true,
            // 'zoom': true
          });
          $('.org-item_7')[0].setAttribute('expand',true);

          oc.$chartContainer.on('click', '.node', (e,f)=>{
            let target = e.target || e.srcElement,
                id = target.getAttribute('id');
            if(id){
              let node = $('.org-item_'+id);
              if(node[0].getAttribute('expand') !== 'true'){
                target.classList.add('icon-rotate');
                this.handleExpandChildNode(node,oc,id);
              }else{
                target.classList.remove('icon-rotate');
                this.handleDeleteChildNode(node,oc,id);
              }
            }
          });
        })
      },

      handleExpandChildNode(node,oc,id){
         getGroupData(id).then(res=>{
            node[0].setAttribute('expand',true);
            if(res.dataCount>0){
              oc.addChildren(node, res['tableContent'].map(function (item) {
                return item;
              }));
            }else{
              this.$Message.info('该组织下面没有下级组织!');
            }
         })
      },

      handleDeleteChildNode(node,oc,id){
        getGroupData(id).then(res=>{
            node[0].setAttribute('expand',false);
            if(res.dataCount>0){
              res['tableContent'].map(function (item) {
                 oc.removeNodes($('.org-item_'+item.groupId));
              })
            }else{
              this.$Message.info('该组织下面没有下级组织!');
            }
         })
      }
    },

  mounted(){
    this.getGroupData(7);
  }
}
</script>