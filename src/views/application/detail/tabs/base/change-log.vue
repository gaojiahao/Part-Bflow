<style lang="less" >
.timeline-box {
  position: relative;
  margin-top: 15px;
  &-header {
    height: 48px;
    line-height: 48px;
    padding-left: 15px;
    border-bottom: 1px solid #e8e8e8;
    > span {
      font-size: 16px;
      font-weight: bold;
    }

    a {
      margin-left: 10px;
      font-size: 14px;
    }
  }

  &-form {
    height: 100%;
    background-color: #ffffff;

    //form表单标签字体样式
    .ivu-form-item-label {
      font-size: 14px;
    }

    &-submit {
      background-color: rgb(0, 150, 136);
      color: #fff;
      outline: none;
      font-weight: bold;
      cursor: pointer;
      border: 1px solid transparent;
      padding: 6px 15px;
      line-height: 1.5;
      float: right;
    }
  }

  &-log {
    &-item {
      margin-top: 5px;
      padding: 15px 20px;
      background-color: #ffffff;
    }
  }

  .show-no-log {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 16px;
    color: darkgray;
    transform: translateY(-50%);
  }
}

.ivu-timeline-item-content {
  top: -11px !important;
}

.time {
  font-size: 20px;
  font-weight: 400;
}

.timeline-item-content-ul {
  margin-left: 20px;
  font-size: 13px;
  list-style: disc;
  span {
    padding: 0 20px 0 0;
  }

  .customs-tag {
    margin: 0 8px;
    background-color: #2c9383;
    padding: 2px 8px;
    border: 1px solid #2c9383;
    border-radius: 3px;
    color: #ffffff;
    font-size: 13px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
  }
}
</style>

<template>
  <div fix class="timeline-box">
    <div class="app-resource-group-title">
      <h3>更新日志
        <a v-if="isAdminTrue">新增</a>
      </h3>

    </div>

    <div class="timeline-box-form">
      <Form ref="formValidate" :label-width="120" :model="modalFormData" :rules="ruleValidate" style="margin:5px ;width:60%;">
        <FormItem label="更新范围:" prop="scope" width="300">
          <Select multiple v-model="modalFormData.scope">
            <Option value="表单">表单</Option>
            <Option value="科目关系">科目关系</Option>
            <Option value="报表">报表</Option>
            <Option value="工作流">工作流</Option>
            <Option value="权限">权限</Option>
          </Select>
        </FormItem>
        <FormItem label="耗用小时数:" prop="spendTime">
          <InputNumber v-model="modalFormData.spendTime" />
          <span style="color:#ddd;margin-left:10px;">单位/时</span>
        </FormItem>
        <FormItem label="更新内容:" prop="content">
          <Input type="textarea" v-model="modalFormData.content" :autosize="{minRows: 2,maxRows: 4}" />
        </FormItem>
        <FormItem>
          <input type='submit' value="提交" class="timeline-box-form-submit" @click="submitLog" />
        </FormItem>
      </Form>
    </div>

    <div v-show="logData.length===0?false:true">
      <div class="timeline-box-log-item" v-for="(item,index) in logData" :key="index">
        <p class="time">{{item.VERSION}}</p>
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
            <span>备注:{{item.CONTENT}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="logData.length===0?true:false" class="show-no-log">
      暂无日志...
    </div>
    <!-- <div class="timeline-box-log" v-show="logData.length===0?false:true">
      <Timeline class="timeline-list" pending>
        <TimelineItem v-for="(item,index) in logData" :key="index">
          <p class="time">{{item.VERSION}}</p>
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
              <span>备注:{{item.CONTENT}}</span>
            </li>
          </ul>
        </TimelineItem>
      </Timeline>
    </div> -->

  </div>
</template>

<script>
import { getChangeLog, saveAppLog } from "@/services/appService.js";
export default {
  name: "ChangeLog",

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
            message: "不允许为空",
            trigger: "blur"
          }
        ]
      }
    };
  },

  watch: {
    isAdmin: function(value) {
      if (value) {
        this.isAdminTrue = true;
      } else {
        this.isAdminTrue = false;
      }
    }
  },

  methods: {
    modalVisibleChange(val) {
      this.$refs["formValidate"].resetFields();
    },

    /**
     * 提交变更日志
     */
    submitLog(event) {
      //校验提交的数据是否为空
      let valid;
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
        }
      });
    }
  },

  created() {
    this.getChangeLog();
  }
};
</script>

