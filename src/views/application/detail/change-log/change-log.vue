<style lang="less" scoped>
@import "./change-log.less";
</style>

<template>
  <div  class="timeline-box">
    <div class="app-resource-group-title">
        <h3>更新日志</h3>
      </div>
    <div class="timeline-box-form" v-if="isAdmin">
      <Form ref="formValidate" :label-width="120" :model="modalFormData" :rules="ruleValidate">
        <FormItem label="更新范围:" prop="scope" width="300">
          <Select multiple v-model="modalFormData.scope">
            <Option value="表单">表单</Option>
            <Option value="科目关系">科目关系</Option>
            <Option value="报表">报表</Option>
            <Option value="工作流">工作流</Option>
            <Option value="权限">权限</Option>
          </Select>
        </FormItem>
        <FormItem label="耗用时间:" prop="spendTime">
          <InputNumber v-model="modalFormData.spendTime"  :min="0"/>
          <span style="margin-left:10px;">单位/时</span>
        </FormItem>
        <FormItem label="更新内容:" prop="content">
           <div ref="logeditor"></div>
        </FormItem>
        
        <FormItem>
          <Button class="timeline-box-form-submit" @click="submitLog">提交</Button>
        </FormItem>
      </Form>
    </div>

    <div  class="timeline-box-log" v-show="logData.length===0?false:true">
      <div class="timeline-box-log-item" v-for="(item,index) in logData" :key="index">
        <div class="timeline-item-content-header">
          <div class="circle"></div>
          <span class="time">{{item.VERSION}}</span>
        </div>
        <ul class="timeline-item-content-ul">
          <li>
            <span>{{item.CREATOR_NAME}}</span>
            <span>{{item.CRT_TIME}}</span>
            <span>耗用时间:{{item.TIME_CONSUMING}}</span>
          </li>
          <li>
            <span>更新范围:</span>
            <span class="customs-tag" v-for="(scope,index) in item.CHANGE_RANGE" :key="index">{{scope}}</span>
          </li>
          <li>
            备注:
            <span v-html="item.CONTENT"></span>
          </li>
        </ul>
      </div>
      <div class="loading-more" v-if="currentPage*10<dataCount">
        <a @click="handleLoadingMore">
          <i class="iconfont">&#xe63d;</i>
          点击加载更多
        </a>
      </div>
      <div v-else class="loading-more">
          没有更多数据了...
      </div>
    </div>
  </div>
</template>

<script>
import { getChangeLog, saveAppLog } from "@/services/appService.js";
import E from 'wangeditor';

export default {
  name: "ChangeLog",
  components: {},
  props: {
    listId: {
      type: String
    },
    isAdmin: {
      type: Boolean
    }
  },
  data() {
    return {
      isAdminTrue: false,
      logData: [],
      modalFormData: {
        //变更日志表单数据
        scope: [],
        spendTime: 1,
        content: ""
      },
      ruleValidate: {
        //变更日志表单校验
        scope: [  
          {
            type: "array",
            required: true,
            message: "不允许为空" 
          }
        ],
        spendTime: [ 
          {
            required: true, 
            message: "不允许为空",
            type: "number"
          }
        ],
        content: [ 
          {
            required: true,
            message: " "
          }
        ]
      },

      dataCount:0,
      currentPage: 1
    };
  },

  watch: {
    isAdmin: function(value) {
      if (value) {
        this.isAdminTrue = true;
      } else {
        this.isAdminTrue = false;
      }
    },
    logData: function() {
      if(!this.logeditor){
        this.createEditor();
      }
    }
  },

  methods: {
    /**
     * 提交变更日志
     */
    submitLog(event) {
      //校验提交的数据是否为空
      let valid;
      if (this.logeditor.txt.html() === "<span></span>") {
        this.$Message.error("必填项请输入！");
      } else {
        this.modalFormData.content = this.logeditor.txt.html();
      }

      this.$refs["formValidate"].validate(v => {
        valid = v;
      });
      if (valid) {
        let listId = this.listId,
          scope = this.modalFormData.scope.join(","),
          spendTime = this.modalFormData.spendTime,
          content = this.modalFormData.content;

        saveAppLog(listId, scope, spendTime, content).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.logeditor.txt.html(`<span></span>`);
            this.$refs["formValidate"].resetFields();
            this.getChangeLog();
          } else {
            //faild todo
          }
        });
      }
    }, 

    /**
     * 获取变更日志
     */
    getChangeLog() {
      let listId = this.listId;
      getChangeLog(listId).then(res => {
        if (res.tableContent) {
          res.tableContent.map(item => {
            if (item["CHANGE_RANGE"]) {
              item["CHANGE_RANGE"] = item["CHANGE_RANGE"].split(",");
            }
          });
          this.logData = res.tableContent;
          this.dataCount = res.dataCount;
        }
      });
    },

    handleLoadingMore(event) {
      this.currentPage++;
      getChangeLog(this.listId, this.currentPage).then(res => {
        if (res.tableContent) {
          res.tableContent.map(item => {
            if (item["CHANGE_RANGE"]) {
              item["CHANGE_RANGE"] = item["CHANGE_RANGE"].split(",");
            }
            this.logData.push(item);
          });
        }
      });
    },
    //create富文本编辑器
    createEditor() {
      this.logeditor = new E(this.$refs.logeditor)
      this.logeditor.customConfig.onchange = (html) => {
        this.modalFormData.content = html;
      }
      this.logeditor.customConfig.zIndex = 100
      this.logeditor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      this.logeditor.create();
      this.logeditor.txt.html(`<span></span>`);
    }
  },
  created() {
    this.getChangeLog();
  }
};
</script>

