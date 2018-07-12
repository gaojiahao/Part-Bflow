<template>
    <div fix class="timeline-box">
        <h2>变更日志</h2>
        <Timeline class="timeline-list" pending>
            <TimelineItem v-for="item in data" :key="item.VERSION">
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
    </div>
</template>

<script>
export default {
  name: "TimeLine",
  props:{
    data:{
      type:Array,
      default: []
    }
  },
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
