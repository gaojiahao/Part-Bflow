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
            groupName: '组织架构',
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
            <div class="org-item org-item_${data.groupId}" id=${data.groupId}>
              <img class="org-item-img" src=${data.principalPic?data.principalPic:'resources/images/icon/user.png'} id=${data.groupId}></img>
              <div class="org-item-content" id=${data.groupId}>
                <a id=${data.groupId} href="/addressBook/organization/detail/${data.groupId}">${data.groupName}</a>
                <div id=${data.groupId}>${data.creator?data.creator:" "}</div>
              </div>
            </div>
          `;
        };
        getGroupData(id).then(res=>{
          this.datasource.children = [...res.tableContent];
          let oc = $('#chartContainerId').orgchart({
            'data' : this.datasource,
            'nodeTemplate': nodeTemplate
          });
          $('.org-item_7')[0].setAttribute('expand',true);

          oc.$chartContainer.on('click', '.node', (e,f)=>{
            let target = e.target || e.srcElement,
                id = target.getAttribute('id'),
                node = $('.org-item_'+id);
            if(node[0].getAttribute('expand') !== 'true'){
              this.handleExpandChildNode(node,oc,id);
            }else{
             this.handleDeleteChildNode(node,oc,id);
            }
          });
        })
      },

      handleExpandChildNode(node,oc,id){
         getGroupData(id).then(res=>{
            if(res.dataCount>0){
              oc.addChildren(node, res['tableContent'].map(function (item) {
                return item;
              }));
              node[0].setAttribute('expand',true);
            }else{
              this.$Message.info('该组织下面没有下级组织!');
            }
         })
      },

      handleDeleteChildNode(node,oc,id){
        getGroupData(id).then(res=>{
            if(res.dataCount>0){
              res['tableContent'].map(function (item) {
                 oc.removeNodes($('.org-item_'+item.groupId));
              })
              node[0].setAttribute('expand',false);
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