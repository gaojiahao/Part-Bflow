<template>
  <div fix class="timeline-box" v-show="data.length===0?false:true">
    <header>
      <h3>更新日志</h3>
      <a @click="showAppLog">新增</a>
    </header>
    <Timeline class="timeline-list" pending>
      <TimelineItem v-for="item in data" :key="item.VERSION">
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

    <!-- 更新日志 -->
    <custom-modal width="600" footerBtnAlign="right" title="更新日志" v-model="visible" @onVisibleChange="modalVisibleChange" @on-ok="submitLog">
      <div style="margin:20px auto;width:85%;">
        <Form ref="formValidate" :label-width="95" :model="logData" :rules="ruleValidate">
          <FormItem label="更新范围:" prop="scope">
            <Select multiple v-model="logData.scope">
              <Option value="表单">表单</Option>
              <Option value="科目关系">科目关系</Option>
              <Option value="报表">报表</Option>
              <Option value="工作流">工作流</Option>
              <Option value="权限">权限</Option>
            </Select>
          </FormItem>
          <FormItem label="耗用小时数:" prop="spendTime">
            <InputNumber v-model="logData.spendTime" />
            <span style="color:#ddd;margin-left:10px;">单位/时</span>
          </FormItem>
          <FormItem label="更新内容:" prop="content">
            <Input type="textarea" v-model="logData.content" :autosize="{minRows: 4,maxRows: 6}" />
          </FormItem>
        </Form>
      </div>
    </custom-modal>
  </div>
</template>

<script>
import CustomModal from "@/components/modal/Modal";
export default {
  name: "TimeLine",
  props: {
    data: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      visible: false,
      logData: {
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
        let params = {
          listId: this.listId,
          scope: this.logData.scope.join(","),
          spendTime: this.logData.spendTime,
          content: this.logData.content
        };
        saveAppLog(params).then(res => {
          if (res.success) {
            this.$Message.success(res.message);
            this.visible = false;
            this.$emit("callTimeLineRefesh", true);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" >
.timeline-box {
  position: relative;
  margin: 20px 0 0 0;
  h2 {
    margin: 10px 15px;
  }
}

.timeline-list {
  margin: 0 25px;
}

.ivu-timeline-item-content {
  top: -11px !important;
}

.time {
  font-size: 22px;
  font-weight: 400;
}

.timeline-item-content-ul {
  margin-left: 20px;
  font-size: 14px;
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
    font-size: 14px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
  }
}
</style>
