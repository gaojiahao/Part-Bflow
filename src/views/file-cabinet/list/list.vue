<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="file">
        <div class="toolbar">
            <span>分区</span>
            <Button @click="addNewSubarea" class="toolbar-btn">新建分区</Button>
        </div>
        <div class="subarea">
            <Table :columns="columns" :data="data" @on-row-dblclick="openSubarea">
                <template slot-scope="{ row }" slot="name">
                    <Icon class="subarea-icon" type="ios-grid" />
                    <strong>{{ row.name }}</strong>
                    <Poptip trigger="hover" placement="right-start" style="float:right;">
                        <span class="subarea-more">
                          <Icon type="ios-arrow-dropright-circle" />
                        </span>
                        <div slot="content">
                          <ul class="subarea-menu">
                            <li @click="openSubarea(row)">打开</li>
                            <li @click="renameSubarea(row)">重命名</li>
                            <li @click="subareaInfo(row)">分区信息</li>
                            <li @click="deleteSubarea(row)">删除</li>
                          </ul>
                        </div>
                    </Poptip>
                </template>
            </Table>
        </div>
        <!-- 新建和编辑分区 -->
        <Modal
            v-model="showModal"
            :title="modalTitle"
            @on-ok="confirmRename">
            <span><b style="color:#e4393c;">*</b>名称：</span>
            <Input v-model="subareaName" placeholder="请输入名称" autofocus style="width: 300px" />
        </Modal>
        <!-- 新建和编辑分区 -->
        <Modal v-model="showSubareaModal" width="300" title="分区信息">
            <ul class="subarea-info">
              <li>分区名称：{{ subareaInformation.name }}</li>
              <li>大小：{{ subareaInformation.size }}</li>
              <li>可用空间：{{ subareaInformation.size }}</li>
              <li>权限：{{ subareaInformation.authority }}</li>
            </ul>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { 
  getFileData,
  renameFile,
  createFileSubarea,
  deleteFile } from "@/services/fileCabinetService.js";

export default {
  name: "fileCabinetList",
  data() {
    return {
      subareaName: "",
      filePath: "",
      modalTitle: '分区重命名',
      showModal: false,
      isAdd: true,
      showSubareaModal: false,
      columns: [
          {
          title: "名称",
          slot: 'name',
          width: 400
        },{
          title: "权限",
          key: "authority"
        },{
          title: "管理员",
          key: "creator"
        },{
          title: "时间",
          key: "crtTime"
        }
      ],
      data: [],
      subareaInformation: {}
    };
  },
  methods: {
    openSubarea(row) {
      this.$router.push({path: `/fileCabinet/detail/${row.id}`});
    },
    renameSubarea(row) {
      this.showModal = true;
      this.subareaName = row.name;
      this.modalTitle = '分区重命名';
      this.isAdd = false;
      this.filePath = row.path;
    },
    subareaInfo(row) {
      this.subareaInformation = row;
      this.showSubareaModal = true;
    },
    //新建分区
    addNewSubarea() {
      this.showModal = true;
      this.subareaName = "";
      this.modalTitle = '新建分区';
      this.isAdd = true;
    },
    //获取分区数据
    getAllFileData() {
      getFileData('root').then(res => {
        this.data = res;
      })
      .catch(error => {
        this.$Message.error(error.data.message);
      });
    },
    confirmRename() {
      if(this.subareaName){
        if(this.isAdd){
          createFileSubarea(this.subareaName).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.getAllFileData();
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }else{
          renameFile(this.filePath,this.subareaName).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.getAllFileData();
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }
      }
    },
    //删除分区
    deleteSubarea(row) {
      if(row.path){
        this.$Modal.confirm({
            title: "确认",
            content: `确认删除${row.name}？`,
            onOk: () => {
              deleteFile(row.path).then(res => {
                if(res.success){
                  this.$Message.success(res.message);
                }
              })
              .catch(error => {
                this.$Message.error(error.data.message);
              });
            }
          });
      }
    }
  },
  mounted() {
    this.getAllFileData();
  }
};
</script>

