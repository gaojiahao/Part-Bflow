<template>
  <div class="attchment">
    <div class="attchment-toolbar">
      <Upload
        multiple
        action="/H_roleplay-si/ds/upload"
        :show-upload-list="false"
        :headers="httpHeaders"
        :data="uploadParams"
        :on-success="handleSuccess"
      >
        <Button icon="ios-cloud-upload-outline">添加附件</Button>
      </Upload>
      <Icon
        type="md-trash"
        size="20"
        title="回收站"
        @click="handleShowDeleted"
        :color="showDeleted?'#2d8cf0':'#2c3e50'"
      />
    </div>
    <div class="attchment-spin-col">
      <Spin fix v-if="showSpin">
        <Icon type="ios-loading" size="18" class="attchment-spin-icon-load"></Icon>
        <div>加载中...</div>
      </Spin>
      <ul class="file-list">
        <li
          class="files-container-item-content"
          v-for="(file,index) of fileList"
          :key="index"
          @click="openFile(file)"
        >
          <img class="flie-img" width="38" :src="file.attr1|fileTypeFilter" />
          <div class="files-container-item-content-info">
            <div class="files-container-item-content-info-content">
              {{file.attr1}}
              <span @click.stop="deletefile(file,index)" class="delete-file">
                <Icon type="md-close" v-if="!showDeleted" />
              </span>
            </div>
            <div class="files-container-item-content-info-other font12">
              {{file.attr2}}KB|{{file.creator}}
              <Time class="fr" :time="file.crtTime" />
            </div>
          </div>
        </li>
      </ul>
      <Page
        class="pad10"
        v-if="params.total>0"
        :total="params.total"
        :page-size="params.limit"
        :current="params.page"
        show-total
        size="small"
        @on-change="handlePageChange"
      />
    </div>
    <div class="attchment-empty" v-if="!fileList.length">暂无数据...</div>
  </div>
</template>

<script>
import { getToken } from "@/utils/utils";
import {
  deleteProjectTaskFile,
  getProjectFiles
} from "@/services/projectService";
export default {
  name: "WarRoomAttachment",
  props: {
    uploadParams: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      httpHeaders: {
        Authorization: getToken()
      },
      fileList: [],
      transCode: undefined,
      params: {
        limit: 15,
        page: 1,
        total: 0
      },
      showDeleted: false,
      showSpin: true
    };
  },
  components: {},
  watch: {
    $route(to, from) {
      this.transCode = to.params.transCode;
      this.getAttachment();
    }
  },
  methods: {
    handleSuccess(res, file) {
      res.data[0].crtTime = parseInt(res.data[0].crtTime);
      this.fileList = [...res.data, ...this.fileList];
      this.params.total = this.fileList.length;
      this.$Message.success(res.message);
    },
    openFile(file) {
      let url = `/H_roleplay-si/ds/download?url=${file.attacthment}`;
      window.open(url);
    },
    deletefile(file, index) {
      this.$Modal.confirm({
        title: "确认",
        content: `确认删除<b style="color:#e4393c;">${file.attr1}</b>？`,
        onOk: () => {
          deleteProjectTaskFile(file.id)
            .then(res => {
              if (res.success) {
                this.fileList.splice(index, 1);
                this.$Message.success(res.message);
              }
            })
            .catch(err => {
              this.$Message.error(err.data.message);
            });
        }
      });
    },
    getAttachment() {
      this.showSpin = true;
      getProjectFiles({
        transCode: this.transCode
          ? this.transCode
          : this.$route.params.transCode,
        ...this.params
      }).then(res => {
        this.showSpin = false;
        this.fileList = res.tableContent;
        this.params.total = res.dataCount;
      });
    },
    handleShowDeleted() {
      this.showDeleted = !this.showDeleted;
      if (this.showDeleted) {
        this.params.status = 0;
      } else {
        delete this.params.status;
      }
      this.getAttachment();
    },
    handlePageChange: function(page) {
      this.params.page = page;
      this.getAttachment();
    }
  },
  mounted() {
    this.getAttachment();
  }
};
</script>

<style lang="less" scoped>
.attchment {
  overflow: hidden;
  &-toolbar {
    border-bottom: 1px solid #cecece;
    height: 40px;
    padding: 5px;
    .ivu-upload {
      text-align: center;
      display: inline-block;
    }
    i {
      cursor: pointer;
    }
  }

  &-empty{
    text-align: center;
    color: #cecece;
  }
}
.file-list {
  list-style: none;
  padding: 5px;
  .files-container-item-content {
    padding: 5px;
    &-info {
      display: inline-block;
      vertical-align: top;
      line-height: 20px;
      width: calc(100% - 50px);
      .delete-file {
        float: right;
        cursor: pointer;
      }
      &-content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      &-other {
        color: #999;
        width: 100%;
      }
    }
  }
  .files-container-item-content:hover {
    cursor: pointer;
    background-color: #ddd;
  }
}

.attchment-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.attchment-spin-col {
  height: 100%;
  position: relative;
  /deep/ .ivu-spin-fix .ivu-spin-main {
    top: 30px;
  }
}
</style>