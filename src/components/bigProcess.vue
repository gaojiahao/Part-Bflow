<template>
<div style="width:100%;height:100%">
   <!-- <Row type="flex" justify="center" class="code-row-bg" style="text-align: center;">
        <Col span="2" >
            <div ><b>销售订单</b></div>
            <div><div style="width: 30px;height: 30px;background-color:red;margin:0 auto;border-radius:30px;"><span>100%</span></div></div>
            <div>
                <div style="background-color: rgb(30, 136, 229);width:2px;height:30px;margin:0 auto;"></div>
                <div style="height: 5px;margin: 0px auto;border-top: 1px solid;border-left: 1px solid;border-right: 1px solid;border-color: rgb(30, 136, 229);">
                    <a>PLAN-1808-001</a>
                    <p>2018-08-09 12:1221</p>
                </div>
            </div>
        </Col>
        <Col span="2">col-4</Col>
        <Col span="2">col-4</Col>
        <Col span="2">col-4</Col>
        <Col span="2">col-4</Col>
        <Col span="2">col-4</Col>
        <Col span="2">col-4</Col>
        <Col span="2">col-4</Col>
    </Row> -->
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
                
                <div class="appName"><strong>{{node.appName}}</strong></div>
                <div class="schedule "  v-bind:style="{ backgroundColor: node.color }"><span>{{node.schedule}}</span></div>
                <div class="verticalbar" v-if="node.appInstances.length>0"></div>
                <div class="trans" v-if="node.appInstances.length>0">
                    <div class="trans-kuan"></div>
                    <div class="transitem" v-for="(instance,index) in node.appInstances" :key="index">
                        <p ><b style="color:#1e88e5;">{{instance.transCode}}</b></p>
                        <p>{{instance.crtTime}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</div>
</template>

<script>
export default {
  name: "BigProcessa",
  data() {
    return {
        bigProcessNodes:[
            {
                appName:'销售订单',
                durationTime:'2天6小时',
                schedule:'100%',
                color:'black',
                appInstances:[
                   
                ]
            },
            {
                appName:'需求计划',
                durationTime:'2天6小时',
                schedule:'100%',
                color:'#9C27B0',
                appInstances:[
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    }
                ]
            },
            {
                appName:'下单',
                durationTime:'3天5小时',
                schedule:'100%',
                color:'#03A9F4',
                appInstances:[
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                     {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    }
                ]
            },
             {
                appName:'工单任务',
                durationTime:'3天5小时',
                schedule:'100%',
                color:'#FF9800',
                appInstances:[
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                   }
                ]
            },
             {
                appName:'验收',
                durationTime:'',
                schedule:'100%',
                durationTime:'3天5小时',
                color:'#4CAF50',
                appInstances:[
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                     {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    }
                ]
            },
             {
                appName:'交付',
                durationTime:'3天5小时',
                schedule:'100%',
                color:'#e8630a',
                appInstances:[
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                     {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    }
                ]
            },
             {
                appName:'收款',
                durationTime:'2天0小时',
                schedule:'100%',
                color:'#235784',
                appInstances:[
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                     {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    }
                ]
            },
           
            {
                appName:'开票',
                durationTime:'',
                schedule:'100%',
                color:'#red',
                appInstances:[
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                    {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    },
                     {
                        transCode:"PLAN-1808-001",
                        crtTime:'2018-08-09 12:1221'
                    }
                ]
            }
        ]
    };
  }
};
</script>

<style>
.n{
    float: left;
    margin-bottom: 50px;
}
.nodePro{

	width: 150px;
    /* display: inline-block; */
    text-align: center;
    /* margin-left: -30px; */
    /* background-color: #ddd; */
    float: left;
}
.order {
    line-height: 40px;
    text-align: center;
    padding-top: 5%;
    width: 95%;
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
    font-family: cursive;
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
    right: -75px;
    top: 32px;
    height: 1px;
}
.transitem{
    text-align: center;
    line-height: 20px;
}

.schedule{
   width: 40px;
    height: 40px;
    text-align: center;
    background-color: red;
    border-radius: 40px;
    color: white;
    font-size: 14px;
    margin: 0 auto;
}

.verticalbar{
   /* -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    border-bottom: 1px solid #1e88e5;
    width: 50px;
    position: relative;
    left: 7px;
    top: 22px; */

    width: 2px;
    background-color: #1e88e5;
    height: 30px;
    margin: 0 auto;
}

.trans{
    /* position: relative;
    top: 47px;
    left: -25px;
    width: 50%;
    height: 80px; */
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
