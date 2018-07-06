<style lang="less" scoped>
  .nav-tree{
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
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
  getNavData
} from "@/services//appService.js";

export default {
  name: "navModal",
  props: {
    modalNavStatus: Boolean
  },
  data() {
    return {
      showNav: false,
      navData: []
    };
  },
  watch: {
    modalNavStatus: function(value, oldValue) {
      this.showNav = value;
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
    publishApp() {},
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
                            h('span', data.title)
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
                            h('span', data.title)
                        ])
                    ]);
                }
            })
          }
        });
        callback(data);
      })
    }
  },
  mounted() {
    this.getNavData();
  }
};
</script>
