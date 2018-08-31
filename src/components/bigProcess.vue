<template>
<div style="width:100%;height:100%">
    <div class="order">
        <div v-for="(node,index) in bigProcessNodes" :key="index" class="n">
            <div class="lines" v-if="node.durationTime">
                    <span class="dian_l" >&bull;</span>
                    <span class="line"></span>
                    <span class="txt">{{node.durationTime}}</span>
                    <span class="line"></span>
                    <span class="dian_r">&bull;</span>
                </div>
            <div class="nodePro">
                
                <div class="appName"><strong>{{node.procedure}}</strong></div>
                <div class="schedule "  v-bind:style="{ backgroundColor: node.color }"><span>{{node.schedule}}</span></div>
                <div class="verticalbar" v-if="node.appInstances.length>0"></div>
                <div class="trans" v-if="node.appInstances.length>0">
                    <div class="trans-kuan"></div>
                    <div class="transitem" v-for="(instance,index) in node.appInstances" :key="index">
                        <p ><a style="color:#1e88e5;" @click="viewDetail(instance.transCode)">{{instance.transCode}}</a></p>
                        <p >{{instance.crtTime }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</div>
</template>

<script>
import { getBigProcessByOrderCode } from "@/services/appService.js";
import { FormatDate } from '@/utils/utils'
export default {
  name: "BigProcessa",
  data() {
    return {
        bigProcessNodes:[
        ]
    };
  },
  methods:{
      getBigProcessInfo:function () {
          var me = this;
          getBigProcessByOrderCode(this.$route.params.orderCode).then(res=>{
            var nodes = res;
           
            nodes.map(function(n,index) {
                n.schedule = n.schedule + '%';
                switch (n.procedure) {
                    case '下单':
                        n.color = 'black';
                        n.schedule = '';
                        n.appInstances = [];
                        break;
                    case '计划':
                        n.color = '#9C27B0';
                        break;
                     case '下单':
                        n.color = '#03A9F4';
                        break;
                    case '验收':
                        n.color = '#4CAF50';
                        break;
                    case '交付':
                        n.color = '#e8630a';
                        break;
                    case '收款':
                        n.color = '#235784';
                        break;
                    case '开票':
                        n.color = '#red';
                        n.durationTime = '';
                        break;
                }

                if(n.appInstances.length===0){
                    n.durationTime = '';
                }else{
                    nodes[index-1].durationTime = me.calcTimeDiff(new Date(n.startTime),new Date(n.endTime));
                }
                n.appInstances.map(function (inst) {
                    inst.crtTime = FormatDate(new Date(inst.crtTime),'yyyy/MM/dd  hh:mm:ss');
                });
            });
            this.bigProcessNodes = nodes;
          });
      },
      calcTimeDiff:function (startDate,endDate) {
        
           //结束时间
        var date3=endDate.getTime()-startDate.getTime();  //时间差的毫秒数
          //计算出相差天数
        var days=Math.floor(date3/(24*3600*1000));
        
        //计算出小时数
        var leave1=date3%(24*3600*1000);  //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));
        //计算相差秒数
        var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);

        if(days>0){
            return days+"天"+hours+"小时";
        }else{
            return hours+"小时" +minutes+"分";
        }
        
      },
      viewDetail:function (transCode) {
          window.open('/Form/index.html?data='+ transCode);
      }
  },
   created() {
    this.getBigProcessInfo();
  }
};
</script>

<style>
.n{
    float: left;
    margin-bottom: 50px;
}
.nodePro{
	width: 155px;
    text-align: center;
    float: left;
}
.order {
    line-height: 45px;
    text-align: center;
    padding-top: 5%;
    width: 89%;
    margin: 0 auto;
}
.order .line {
  display: inline-block;
  width: 20px;
  border-top: 2px solid #1e88e5;
}
.order .txt {
  color: #686868;
  vertical-align: middle;
}
.appName{
    font-size: 18px;
}
.dian_r {
  position: relative;
  left: -6px;
  top: 9px;
  font-size: 30px;
  color: #1e88e5;
}
.dian_l{
	position: relative;
  left: 6px;
  top: 9px;
  font-size: 30px;
  color: #1e88e5;
}
.num{
    display: inline-block;
}

.lines{
   position: relative;
    right: -77px;
    top: 37px;
    height: 1px;
}
.transitem{
    text-align: center;
    line-height: 20px;
}

.schedule{
   width: 45px;
    height: 45px;
    text-align: center;
    background-color: red;
    border-radius: 45px;
    color: white;
    font-size: 15px;
    margin: 0 auto;
}

.verticalbar{
    width: 2px;
    background-color: #1e88e5;
    height: 30px;
    margin: 0 auto;
}

.trans{
    width: 80%;
    height: 80px;
    margin: 0 auto;
}

.trans-kuan{
    height: 8px;
    border: 1px solid #1e88e5;
    border-bottom-style: none;

}
</style>
