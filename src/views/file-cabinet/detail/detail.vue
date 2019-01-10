<style lang="less" scoped>
  @import "./detail.less";
</style>

<template>
    <div class="file">
        <div class="toolbar">
            <span class="toolbar-bread">
              <span @click="goSubarea" class="toolbar-subarea">分区</span>
              <span> > </span>
              <span v-for="(item,index) of breadHeader" :key="index">
                <span @click="goClickFile(item,index)" v-if="breadHeader.length-1!==index" class="bread-title"> {{ item.name }} </span>
                <span v-else class="current-title"> {{ item.name }} </span>
                <span v-if="breadHeader.length-1!==index"> > </span>
              </span>
            </span>
            <Button @click="addNewFile" class="toolbar-btn">新建文件夹</Button>
            <Upload 
              class="toolbar-btn" 
              :action="`/H_roleplay-si/filing/upload?directory=${subareaPath}&cover=false`"
              :show-upload-list="false" 
              :on-success="handleSuccess"
              :headers="httpHeaders"
              type="drag">
              <Button type="info" icon="ios-cloud-upload-outline">上传</Button>
            </Upload>
        </div>
        <div class="subarea">
            <Table :columns="columns" :data="data" @on-row-dblclick="openfile">
                <template slot-scope="{ row }" slot="name">

                    <Icon v-if="!row.isFile" class="subarea-icon" type="md-albums" />
                    <Icon v-if="row.isFile && row.suffix===null" class="subarea-icon" type="md-document" />
                    <img v-if="row.isFile && row.suffix==='xls'" src="resources/images/file/excel.png" />
                    <img v-if="row.isFile && row.suffix==='xlsx'" src="resources/images/file/excel.png" />
                    <img v-if="row.isFile && row.suffix==='doc'" src="resources/images/file/word.png" />
                    <img v-if="row.isFile && row.suffix==='docx'" src="resources/images/file/word.png" />
                    <img v-if="row.isFile && row.suffix==='txt'" src="resources/images/file/txt.png" />

                    <label>{{ row.name }}</label>
                    <Poptip trigger="hover" placement="right-start" style="float:right;">
                        <span class="subarea-more">
                          <Icon type="ios-arrow-dropright-circle" />
                        </span>
                        <div slot="content">
                          <ul class="subarea-menu">
                            <li v-if="!row.isFile" @click="openfile(row)">打开</li>
                            <li @click="downloadFiles(row)">下载</li>
                            <li @click="copyFiles(row)">复制</li>
                            <li @click="renameFile(row)">重命名</li>
                            <li>移动到...</li>
                            <li @click="deleteFiles(row)">删除</li>
                          </ul>
                        </div>
                    </Poptip>
                </template>
            </Table>
        </div>
         <!-- 新建和编辑文件夹 -->
        <Modal
            v-model="showModal"
            :title="modalTitle"
            @on-ok="confirmAddNewFile"
            :styles="{top: '20px'}">
            <span><b style="color:#e4393c;">*</b>名称：</span>
            <Input v-model="fileName" placeholder="请输入名称" autofocus style="width: 300px" />
        </Modal>
        <!-- 复制或移动文件 -->
        <Modal
            v-model="showActionModal"
            :title="actionModalTitle"
            @on-ok="copyMoveFile"
            :styles="{top: '20px'}"
            height="600"
            width="300">
            <Tree :data="actionData"  :load-data="loadData" @on-select-change="onSelectChange" class="file-tree"></Tree>
        </Modal>
    </div>
</template>

<script>
import { 
  getFileData,
  renameFile,
  createFileSubarea,
  uploadFile,
  deleteFile,
  downloadFile,
  getFileDataByPath } from "@/services/fileCabinetService.js";
import { getToken } from "@/utils/utils";

export default {
  name: "fileCabinetList",
  data() {
    return {
      subareaId: this.$route.params.id,
      subareaPath: "",
      httpHeaders: {
        Authorization: getToken()
      },
      showModal: false,
      showActionModal: false,
      fileName: "",
      filePath: "",
      modalTitle: '新建文件夹',
      actionModalTitle: '复制',
      isAdd: true,
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
      actionData: [],
      breadHeader: []
    };
  },
  methods: {
    handleSuccess(res, file) {
      if(res.success){
        this.$Message.success(res.message);
        this.getAllFileData(this.subareaPath);
      }
    },
    goSubarea() {
      this.$router.push({path: `/fileCabinet/list`});
    },
    openfile(row) {
      if(!row.isFile){
        this.breadHeader.push({path:row.path,name:row.name});
        this.getAllFileData(row.path);
        this.subareaPath = row.path;
      }
    },
    goClickFile(item,index) {
      this.breadHeader.splice(index+1,this.breadHeader.length-1);
      this.getAllFileData(item.path);
      this.subareaPath = item.path;
    },
    //重命名文件或文件夹
    renameFile(row) {
      this.showModal = true;
      this.isAdd = false;
      this.fileName = row.name;
      this.modalTitle = '重命名';
      this.filePath = row.path;
    },
    //打开新建文件夹modal
    addNewFile() {
      this.showModal = true;
      this.isAdd = true;
      this.fileName = "";
      this.modalTitle = '新建文件夹';
    },
    //新建或编辑文件夹
    confirmAddNewFile() {
      if(this.fileName){
        if(this.isAdd){
          createFileSubarea(`${this.subareaPath}/${this.fileName}`).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.getAllFileData();
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }else{
          renameFile(this.filePath,this.fileName).then(res => {
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
    //删除文件或文件夹
    deleteFiles(row) {
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
    },
    //下载文件或文件夹
    downloadFiles(row) {
      if(row.path){
        window.open(`/H_roleplay-si/filing/download?path=${row.path}`);
      }
    },
    //打开复制modal
    copyFiles(row) {
      this.showActionModal = true;
      this.getActionFileData('root');
    },
    //复制或移动文件或文件夹
    copyMoveFile() {},
    getAllFileData(path) {
      let filePath = path?path:this.subareaPath;
      getFileData(filePath).then(res => {
        this.data = res;
      })
    },
    //获取复制或移动modal数据
    getActionFileData(filePath,callback) {
      let treeData = [];
      getFileData(filePath,true).then(res => {
        res.forEach(val => {
          treeData.push({
            title: val.name,
            path: val.path,
            loading: false,
            children: []
          });
        });
        if(callback){
          callback(treeData);
        }else{
          this.actionData = treeData;
        }
      })
    },
    //异步加载树形数据
    loadData (item, callback) {
      this.getActionFileData(item.path,callback);
    },
    //选择树节点
    onSelectChange(currentArray,currentItem) {
      
    },
    //获取当前文件信息
    getCurrentFileByPath() {
      getFileDataByPath(this.subareaId).then(res => {
        this.subareaPath = res.path;
        this.breadHeader.push({path: this.subareaPath,name:this.subareaPath});
        this.getAllFileData();
      });
    }
  },
  mounted() {},
  created() {
    this.getCurrentFileByPath();
  }
};
</script>

