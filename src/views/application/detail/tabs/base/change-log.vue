<style lang="less" >
.timeline-box {
  position: relative;
  border-bottom: 1px solid #ddd;
  &-header {
    height: 30px;
    line-height: 30px;

    >span {
      font-size: 16px;
      font-weight: bold;
    }

    a {
      margin-left: 10px;
      font-size: 14px;
    }
  }

  &-log {
    padding: 15px 0;
  }

  .show-no-log{
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
    <div class="timeline-box-header">
      <span>更新日志:</span>
      <a @click="showAppLog">新增</a>
    </div>
    <div class="timeline-box-log" v-show="logData.length===0?false:true">
      <Timeline class="timeline-list" pending>
        <TimelineItem v-for="item in logData" :key="item.VERSION">
          <p class="time">{{item.VERSION}}</p>
          <ul class="timeline-item-content-ul">
            <li>
              <span>{{item.CREATOR_NAME}}</span>
              <span>{{item.CRT_TIME}}</span>
              <span>耗用小时数:{{item.TIME_CONSUMING}}</span>
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
    </div>
    <div v-show="logData.length===0?true:false" class="show-no-log">
      暂无日志...
    </div>

    <!-- 更新日志 -->
    <custom-modal width="600" footerBtnAlign="right" title="更新日志" v-model="visible" @onVisibleChange="modalVisibleChange" @on-ok="submitLog">
      <div style="margin:20px auto;width:85%;">
        <Form ref="formValidate" :label-width="95" :model="modalFormData" :rules="ruleValidate">
          <FormItem label="更新范围:" prop="scope">
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
            <Input type="textarea" v-model="modalFormData.content" :autosize="{minRows: 4,maxRows: 6}" />
          </FormItem>
        </Form>
      </div>
    </custom-modal>
  </div>
</template>

<script>
import { getChangeLog, saveAppLog } from "@/services/appService.js";
import CustomModal from "@/components/modal/Modal";
export default {
  name: "ChangeLog",
  components: {
    CustomModal
  },

  props: {
    listId: {
      type: String
    }
  },

  data() {
    return {
      visible: false,
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

  methods: {
    /**
     * 显示变更日志弹出框
     * */

    showAppLog() {
      this.visible = true;
    },

    modalVisibleChange(val) {
      if (!val) {
        this.$refs["formValidate"].resetFields();
      }
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
            this.visible = false;
            this.getChangeLog();
          }else{
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

