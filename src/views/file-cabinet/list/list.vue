<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="file">
        <div class="toolbar">
            <span>分区</span>
            <Button class="toolbar-btn">新建分区</Button>
        </div>
        <div class="subarea">
            <Table :columns="columns" :data="data" disabled-hover>
                <template slot-scope="{ row }" slot="name">
                    <Icon class="subarea-icon" type="ios-grid" />
                    <strong>{{ row.name }}</strong>
                    <Poptip  trigger="hover" placement="right-start" style="float:right;">
                        <span class="subarea-more">
                          <Icon type="ios-arrow-dropright-circle" />
                        </span>
                        <div slot="content">
                          <ul class="subarea-menu">
                            <li @click="openSubarea(row.cabineId)">打开</li>
                            <li @click="renameSubarea(row.path)">重命名</li>
                            <li>分区信息</li>
                            <li>退出</li>
                          </ul>
                        </div>
                    </Poptip>
                </template>
            </Table>
        </div>
        <!-- 新建和编辑分区 -->
        <Modal
            v-model="showModal"
            title="分区重命名"
            @on-ok="confirmRename">
            <span><b style="color:#e4393c;">*</b>名称：</span>
            <Input v-model="subareaName" placeholder="请输入名称" autofocus style="width: 300px" />
        </Modal>
    </div>
</template>

<script>
import { getFileData,renameFile } from "@/services/fileCabinetService.js";

export default {
  name: "fileCabinetList",
  data() {
    return {
      subareaName: "",
      showModal: false,
      filePath: "",
      columns: [
          {
          title: "名称",
          slot: 'name',
          width: 400
        },{
          title: "权限",
          key: "authority",
          width: 400
        },{
          title: "管理员",
          key: "creator"
        },{
          title: "时间",
          key: "crtTime"
        }
      ],
      data: []
    };
  },
  methods: {
    openSubarea(cabineId) {
      this.$router.push({path: `/fileCabinet/detail/${cabineId}`,params:{cabineId:cabineId}});
    },
    renameSubarea(filePath) {
      this.showModal = true;
      this.filePath = filePath;
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
        renameFile(this.filePath,this.subareaName).then(res => {
          if(res.success){
            this.$Message.success(res.message);
            this.getAllFileData();
          }
        })
        .catch(error => {
          this.$Message.error(error.data.message);
        });
      }else{
        this.$Message.error('请输入名称！');
      }
    }
  },
  mounted() {
    this.getAllFileData();
  }
};
</script>

