<template>
    <div fix class="timeline-box">
        <h2>变更日志</h2>
        <Timeline class="timeline-list" pending>
            <TimelineItem v-for="item in data" :key="item.transCode">
                <p class="time">{{item.transCode}}</p>
                <ul class="timeline-item-content-ul">
                    <li>
                        <span>{{item.updateUser}}</span>
                        <span>{{item.updateTime}}</span>
                        <span>耗用时间:{{item.hour}}</span>
                    </li>
                    <li>
                        <span>更新范围:</span>
                        <span class="customs-tag" v-for="(scope,index) in item.undateScope" :key="index">{{scope}}</span>
                    </li>
                    <li>
                        <span>备注:{{item.content}}</span>
                    </li>
                </ul>

            </TimelineItem>
        </Timeline>
    </div>
</template>

<script>
export default {
  name: "TimeLine",
  data() {
    return {
      data: [
        {
          transCode: "0001",
          objName: "采购入库",
          appType: "YW1",
          undateScope:['表单','科目关系','报表','工作流','权限'],
          updateUser: "管理员",
          updateTime: "2018-07-10",
          hour: "1:30",
          content: "测试"
        },
        {
          transCode: "0002",
          objName: "采购入库",
          appType: "YW1",
          undateScope:['表单','科目关系','报表','工作流','权限'],
          appBigType: "YW2",
          updateUser: "管理员",
          updateTime: "2018-07-10",
          hour: "1:30",
          content: "测试"
        },
        {
          transCode: "0003",
          objName: "采购入库",
          appType: "YW1",
          undateScope:['表单','科目关系','报表','工作流','权限'],
          appBigType: "YW2",
          updateUser: "管理员",
          updateTime: "2018-07-10",
          hour: "1:30",
          content: "测试"
        },
        {
          transCode: "0004",
          objName: "采购入库",
          appType: "YW1",
          appBigType: "YW2",
          undateScope:['表单','科目关系','报表','工作流','权限'],
          updateUser: "管理员",
          updateTime: "2018-07-10",
          hour: "1:30",
          content: "测试"
        },
        {
          transCode: "0005",
          objName: "采购入库",
          undateScope:['表单','科目关系','报表','工作流','权限'],
          appType: "YW1",
          appBigType: "YW2",
          updateUser: "管理员",
          updateTime: "2018-07-10",
          hour: "1:30",
          content: "测试"
        }
      ]
    };
  }
};
</script>

<style lang="less" >
.timeline-box {
  border-top: 1px solid #ddd;
  position: relative;
  margin: 20px 0 0 0;
  h2 {
    margin: 10px 15px;
  }
}
.spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
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
  list-style-type: ;
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
