<style lang="less" scoped>
  @import "./list.less";
</style>

<template>
    <div class="file">
        <div class="toolbar">
            <span class="toolbar-bread">
              <span v-if="breadHeader.length>0">
                <span @click="goBack" class="toolbar-back"><Icon type="md-arrow-round-back" /></span>
                <span class="toolbar-line"> | </span>
              </span>
              <span @click="goSubarea" class="toolbar-subarea">分区</span>
              <span v-for="(item,index) of breadHeader" :key="index">
                <span> > </span>
                <span @click="goClickFile(item,index)" v-if="breadHeader.length-1!==index" class="bread-title"> {{ item.name }} </span>
                <span v-else class="current-title"> {{ item.name }} </span>
              </span>
            </span>
            <div class="file-search">
              <Input 
                @on-search="fileFilter" 
                :search="true" 
                v-model="searchValue" 
                placeholder="搜索" 
                style="width: 200px">
              </Input>
            </div>
            <Button v-if="filePath === 'root'" @click="subareaInfo" class="toolbar-btn">新建分区</Button>
            <Button v-if="filePath !== 'root' && permissionSattus" @click="addNewFile" class="toolbar-btn">新建文件夹</Button>
            <Upload 
              v-if="filePath !== 'root' && permissionSattus"
              class="toolbar-upload" 
              :action="`/H_roleplay-si/filing/upload?directory=${filePath}&cover=false`"
              :show-upload-list="false" 
              :on-success="handleSuccess"
              :headers="httpHeaders">
              <Button class="toolbar-btn" type="info">上传</Button>
            </Upload>
        </div>
        <div class="subarea">
            <Table :columns="columns" :data="data" @on-row-dblclick="openFile"  :loading="loading">
                <template slot-scope="{ row }" slot="name">
                    <Icon v-if="row.isSubregion" class="subarea-icon" type="ios-grid" />
                    <Icon v-if="!row.isFile && !row.isSubregion" class="subarea-file-icon" type="md-albums" />
                    <Icon v-if="row.isFile && row.suffix===null" class="subarea-icon" type="md-document" />
                    <img 
                    v-if="row.isFile && (row.suffix==='jpg'||row.suffix==='png'||row.suffix==='jepg'||row.suffix==='gif')" 
                    :src="`/H_roleplay-si/filing/download?path=${row.path}`"/>
                    <span v-for="(data,k) of iconData" :key="k">
                      <img v-if="row.isFile && row.suffix===data.suffix" :src="data.src"/>
                    </span>

                    <label>{{ row.name }}</label>
                    <Poptip trigger="hover" placement="right-start" style="float:right;">
                        <span class="subarea-more">
                          <Icon type="ios-arrow-dropright-circle" />
                        </span>
                        <div slot="content">
                          <ul class="subarea-menu">
                            <li v-if="!row.isFile" @click="openFile(row)">打开</li>
                            <li v-if="!row.isSubregion" @click="downloadFiles(row)">下载</li>
                            <li v-if="!row.isSubregion && row.authority!=='仅浏览'" @click="copyFiles(row)">复制到...</li>
                            <li v-if="row.authority!=='仅浏览'" @click="renameFile(row)">重命名</li>
                            <li v-if="!row.isSubregion && row.authority!=='仅浏览'" @click="moveFiles(row)">移动到...</li>
                            <li v-if="row.isSubregion" @click="subareaInfo(row)">分区信息</li>
                            <li v-if="!row.isSubregion" @click="fileInfo(row)">详情...</li>
                            <li v-if="row.authority!=='仅浏览'" @click="deleteFiles(row)">删除</li>
                          </ul>
                        </div>
                    </Poptip>
                    <div v-if="row.isFile" @click="downloadFiles(row)" class="subarea-download">
                      <Icon type="md-cloud-download" />
                    </div>
                </template>
            </Table>
        </div>
        <!-- 新建和编辑文件 -->
        <Modal
            v-model="showModal"
            :title="modalTitle"
            @on-ok="confirmRename">
            <span><b style="color:#e4393c;">*</b>名称：</span>
            <Input v-model="fileName" placeholder="请输入名称" autofocus style="width: 300px" />
        </Modal>
        <!-- 详情信息 -->
        <Modal v-model="showFileModal" width="300" title="详情信息">
            <ul class="subarea-info">
              <li>名称：{{ fileInformation.name }}</li>
              <li>大小：{{ fileInformation.size }}</li>
              <li>可用空间：{{ fileInformation.size }}</li>
              <li>权限：{{ fileInformation.authority }}</li>
            </ul>
            <div slot="footer"></div>
        </Modal>
        <!-- 复制或移动文件 -->
        <Modal
            v-model="showActionModal"
            title="选择文件"
            @on-ok="copyMoveFile"
            :styles="{top: '20px'}"
            height="600"
            width="300">
            <Tree :data="actionData" :load-data="loadData" @on-select-change="onSelectChange" empty-text=" " class="file-tree"></Tree>
        </Modal>
        <!-- 分区设置 -->
        <subarea-setting ref="subareaSetting" :subareaDetail="subareaDetail"></subarea-setting>
    </div>
</template>

<script>
import { 
  getFileData,
  renameFile,
  createFileSubarea,
  deleteFile,
  uploadFile,
  downloadFile,
  copyFile,
  moveFile, } from "@/services/fileCabinetService.js";
  import { getToken } from "@/utils/utils";
  import SubareaSetting from './subarea-setting.vue';

export default {
  name: "fileCabinetList",
  components: {
    SubareaSetting
  },
  data() {
    return {
      httpHeaders: {
        Authorization: getToken()
      },
      fileName: "",
      filePath: "",
      renamePath: "",
      searchValue: "",
      waitPath: "",
      modalTitle: '重命名',
      showModal: false,
      isAdd: true,
      showFileModal: false,
      showActionModal: false,
      isCopy: true,
      loading: true,
      permissionSattus: true,
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
      subareaColumns: [
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
      fileColumns: [
        {
          title: "名称",
          slot: 'name',
          width: 400
        },{title: "大小",
          key: "size",
          render: (h,params) => {
            if(params.row.size){
              return h('span',{},params.row.size);
            }else{
              return h('span',{},'- -');
            }
          }
        },{
        title: "来源",
          key: "creator"
        },{
          title: "时间",
          key: "crtTime"
        }
      ],
      data: [],
      actionData: [],
      breadHeader: [],
      fileInformation: {},
      selectTreeItem: {},
      subareaDetail: {},
      iconData: [
        {src:'resources/images/file/excel.png',suffix:'xls'},
        {src:'resources/images/file/excel.png',suffix:'xlsx'},
        {src:'resources/images/file/word.png',suffix:'doc'},
        {src:'resources/images/file/word.png',suffix:'docx'},
        {src:'resources/images/file/txt.png',suffix:'txt'},
        {src:'resources/images/file/pdf.jpg',suffix:'pdf'},
        {src:'resources/images/file/ppt.jpg',suffix:'pptx'}]
    };
  },
  methods: {
    //打开分区信息
    subareaInfo(row) {
      this.$refs['subareaSetting'].showModal = true;
      this.subareaDetail = row;
      this.$refs['subareaSetting'].getSubareaMember(row.id);
    },
    //后退
    goBack() {
      let backPath = '';
      this.breadHeader.splice(this.breadHeader.length-1,1);
      if(this.breadHeader.length === 0){
        backPath = 'root';
        this.filePath = 'root';
        this.columns = this.subareaColumns;
      }else{
        backPath = this.breadHeader[this.breadHeader.length-1].path;
      }
      this.getAllFileData(backPath);
    },
    //过滤
    fileFilter() {
      this.columns = this.fileColumns;
      if(this.searchValue === ''){
        this.getAllFileData(this.filePath);
      }else{
        this.getAllFileData('',this.searchValue);
      }
    },
    openFile(row) {
      if(!row.isFile){
        if(row.isSubregion){
          if(row.authority === '仅浏览'){
            this.permissionSattus = false;
          }
        }
        this.breadHeader.push({path: row.path,name:row.name});
        this.filePath = row.path;
        this.$router.push({path:`/fileCabinet/list`,query:{path:row.path}});
        this.columns = this.fileColumns;
        this.getAllFileData(row.path);
        sessionStorage.setItem('breadHeaderData',JSON.stringify(this.breadHeader));
      }else{
        this.downloadFiles(row);
      }
    },
    goClickFile(item,index) {
      this.breadHeader.splice(index+1,this.breadHeader.length-1);
      this.getAllFileData(item.path);
      this.filePath = item.path;
      sessionStorage.setItem('breadHeaderData',JSON.stringify(this.breadHeader));
      this.$router.push({path:`/fileCabinet/list`,query:{path:row.path}});
    },
    goSubarea() {
      this.columns = this.subareaColumns;
      this.filePath = 'root';
      this.getAllFileData(this.filePath);
      this.breadHeader = [];
      this.$router.push({path:`/fileCabinet/list`});
    },
    handleSuccess(res, file) {
      if(res.success){
        this.$Message.success(res.message);
        this.getAllFileData(this.filePath);
      }else{
        this.$Message.error(res.message);
      }
    },
    renameFile(row) {
      this.showModal = true;
      this.fileName = row.name;
      this.modalTitle = '重命名';
      this.isAdd = false;
      this.renamePath = row.path;
    },
    fileInfo(row) {
      this.fileInformation = row;
      this.showFileModal = true;
    },
    //新建分区
    addNewFile() {
      this.showModal = true;
      this.fileName = "";
      this.modalTitle = '新建';
      this.isAdd = true;
    },
    confirmRename() {
      let addPath = '';
      if(this.fileName){
        if(this.isAdd){
          if(this.filePath === 'root'){
            addPath = this.fileName;
          }else{
            addPath = `${this.filePath}/${this.fileName}`;
          }

          createFileSubarea(addPath).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.getAllFileData(this.filePath);
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }else{
          renameFile(this.renamePath,this.fileName).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.getAllFileData(this.filePath);
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }
      }
    },
    //删除文件
    deleteFiles(row) {
      if(row.path){
        this.$Modal.confirm({
            title: "确认",
            content: `确认删除${row.name}？`,
            onOk: () => {
              deleteFile(row.path).then(res => {
                if(res.success){
                  this.$Message.success(res.message);
                  this.getAllFileData(this.filePath);
                }
              })
              .catch(error => {
                this.$Message.error(error.data.message);
              });
            }
          });
      }
    },
    //打开复制modal
    copyFiles(row) {
      this.showActionModal = true;
      this.selectTreeItem = {};
      this.getActionFileData('root');
      this.isCopy = true;
      this.waitPath = row.path;
    },
    //打开移动modal
    moveFiles(row) {
      this.showActionModal = true;
      this.selectTreeItem = {};
      this.getActionFileData('root');
      this.isCopy = false;
      this.waitPath = row.path;
    },
    //复制或移动文件或文件夹
    copyMoveFile() {
      if(this.selectTreeItem.path){
        if(this.isCopy){
          copyFile(this.waitPath,this.selectTreeItem.path).then(res => {
            if(res.success){
              this.$Message.success(res.message);
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }else{
          moveFile(this.waitPath,this.selectTreeItem.path).then(res => {
            if(res.success){
              this.$Message.success(res.message);
              this.getAllFileData(this.filePath);
            }
          })
          .catch(error => {
            this.$Message.error(error.data.message);
          });
        }
      }
    },
    //获取复制或移动modal数据
    getActionFileData(filePath,callback) {
      let treeData = [];
      getFileData(filePath,true).then(res => {
        res.forEach(val => {
          if(val.leaf){
            treeData.push({
              title: val.name,
              path: val.path
            });
          }else{
            treeData.push({
              title: val.name,
              path: val.path,
              loading: false,
              children: []
            });
          }
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
      this.selectTreeItem = currentItem;
    },
    //下载文件或文件夹
    downloadFiles(row) {
      if(row.path){
        window.open(`/H_roleplay-si/filing/download?path=${row.path}`);
      }
    },
    //获取分区数据
    getAllFileData(path,searchValue) {
      this.loading = true;
      getFileData(path,false,searchValue).then(res => {
        this.loading = false;
        this.data = res;
      })
      .catch(error => {
        this.$Message.error(error.data.message);
      });
    }
  },
  mounted() {
    if(this.$route.query.path){
      this.filePath = this.$route.query.path;
      this.breadHeader = JSON.parse(sessionStorage.getItem('breadHeaderData'));
    }else{
      this.filePath = 'root';
    }
    this.getAllFileData(this.filePath);
  }
};
</script>

