<style lang="less" scoped>
  .nav-tree{
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
  }
.ivu-modal-close .ivu-icon-ios-close-empty{
    font-size: 31px;
    color: red !important;
    transition: color .2s ease;
    position: relative;
    top: 1px;
}
</style>
<template>
  <Modal v-model="showNav" title="导航" width="300" :mask-closable="false" @on-ok="publishApp" @on-visible-change="modalVisibleChange">
    <Tree class="nav-tree" :data="navData" :load-data="loadData"></Tree>
  </Modal>
</template>

<script>
import {
  getAllProcessData,
  getProcessDataByListId,
  getNavData,
  publishApp,
  getAppviews
} from "@/services//appService.js";

export default {
  name: "navModal",
  props: {
    modalNavStatus: Boolean,
    listId: String
  },
  data() {
    return {
      showNav: false,
      viewId: '',
      navData: [],
      selectedNode: {}
    };
  },
  watch: {
    modalNavStatus: function(value, oldValue) {
      this.showNav = value;
      if(value){
          this.navData = [];
          this.getNavData();
      }
    }
  },
  methods: {
    //通知父组件modal的状态
    modalVisibleChange(state) {
      if (!state) {
        this.$emit("emitNavModal", { modal: false });
      }
    },
    //发布应用到菜单
    publishApp() {
        if(Object.keys(this.selectedNode).length !== 0){
            publishApp(this.selectedNode).then(res => {
                if(res.success){
                    this.$Message.success(res.message);
                    //通知应用父组件已发布
                    this.$emit('hasPublished', '已发布');
                }else{
                    this.$Message.error(res.message);
                }
            })
        }
    },
    //获取点击节点数据并修改样式
    getNodeSelectedData(e, data) {
        let params = {
            filter: JSON.stringify([{operator: "eq",value: this.listId,property: "uniqueId"},{operator:"eq",value:1,property:"listViewStatus"}])
            },
            selectData = {};
        getAppviews(params).then(res => {
            for(let i=0;i<res.tableContent.length;i++){
                if(res.tableContent[i].isDefault === 1){
                    this.viewId = res.tableContent[i].viewId;
                    break;
                }else{
                    this.viewId = res.tableContent[0].viewId;
                }
            }
            selectData = {
                listId: this.listId,
                parentId: data.id
            };
            if(e.target.style.backgroundColor){
                e.target.style.backgroundColor = '';
                e.target.style.padding = '0px';
                e.target.style.color = '#333';
                if(data.id === this.selectedNode.parentId){
                    this.selectedNode = {};
                }
            }else{
                e.target.style.backgroundColor = 'rgba(242, 157, 30, 0.9)';
                e.target.style.padding = '3px';
                e.target.style.color = '#fff';
                this.selectedNode = selectData;
            }
        })
    },
    //获取菜单
    getNavData() {
      let rootParams = {
        parentId: 'root'
      };
      getNavData(rootParams).then(res => {
        res.forEach((val, index) => {
          if(val.leaf === 1){
              this.navData.push({
                title: val.text,
                id: val.id,
                parentId: val.parentId,
                url: val.url,
                icon: val.icon,
                render: (h, {root,node,data}) => {
                  return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'ios-folder-outline'
                                },
                                style: {
                                    marginRight: '8px',
                                    color: '#FF8F59',
                                    fontSize: '1rem'
                                }
                            }),
                            h('span', data.title)
                        ])
                    ]);
                }
            });
          }else{
              this.navData.push({
              title: val.text,
              id: val.id,
              parentId: val.parentId,
              url: val.url,
              icon: val.icon,
              loading: false,
              children: [],
              render: (h, {root,node,data}) => {
                  return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'folder'
                                },
                                style: {
                                    marginRight: '8px',
                                    color: '#39f',
                                    fontSize: '1.2rem'
                                }
                            }),
                            h('span', {
                                style: {
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: (e) => {
                                        this.getNodeSelectedData(e, data);
                                    }
                                }
                            }, data.title)
                        ])
                    ]);
                }
            });
          }
        });
      });
    },
    //异步加载菜单数据
    loadData(item, callback) {
      let childrenParams = {
        parentId: item.id
      };
      getNavData(childrenParams).then(res => {
        const data = [];
        res.forEach(val => {
          if(val.leaf === 1){
            data.push({
              title: val.text,
              id: val.id,
              parentId: val.parentId,
              url: val.url,
              icon: val.icon,
              render: (h, {root,node,data}) => {
                  return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'ios-folder-outline'
                                },
                                style: {
                                    marginRight: '8px',
                                    color: '#FF8F59',
                                    fontSize: '1rem'
                                }
                            }),
                            h('span', data.title)
                        ])
                    ]);
                }
            })
          }else{
            data.push({
              title: val.text,
              id: val.id,
              parentId: val.parentId,
              url: val.url,
              icon: val.icon,
              loading: false,
              children: [],
              render: (h, {root,node,data}) => {
                  return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'folder'
                                },
                                style: {
                                    marginRight: '8px',
                                    color: '#39f',
                                    fontSize: '1.2rem'
                                }
                            }),
                            h('span', {
                                style: {
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: (e) => {
                                        this.getNodeSelectedData(e, data);
                                    }
                                }
                            }, data.title)
                        ])
                    ]);
                }
            })
          }
        });
        callback(data);
      })
    },
    //子节点重新渲染
    renewChildRender() {

    },
    //父节点重新渲染
    renewParentRender() {
        
    }
  },
  mounted() {
    
  }
};
</script>
