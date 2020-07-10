<template>
    <div class="week-container">
       <div class="week-list">
         一周小结 {{`${startDate.replace('-','.')}~${endDate.replace('-','.')}`}}
         <div class="list-right">
            <div class="title">
              <span class="title-left">
                <img :src="getDefaultPhoto()" />
              </span>
              <div class="title-right">
                <p>
                  您本周总工作<b>{{content.workingHoursSubtotal | toThousandFilter}}</b>小时，
                  产生<b>{{content.benefitSubtotal | toThousandFilter}}</b>绩效收入
                </p>
              </div>
            </div>
            <div class="list-content">
              <div class="content">
                <span>计件绩效</span>
                <span>{{content.pieceBenefit | toThousandFilter}}</span>
              </div>
              <div class="content">
                <span>工时绩效</span>
                <span>{{content.workBenefit | toThousandFilter}}</span>
              </div>
              <div class="content">
                <span>销售佣金绩效</span>
                <span>{{content.saleBenefit | toThousandFilter}}</span>
              </div>
              <div class="content">
                <span>项目利润分配</span>
                <span>{{content.projectBenefit | toThousandFilter}}</span>
              </div>
              <div class="content">
                <span>组织利润分配</span>
                <span>{{content.groupBenefit | toThousandFilter}}</span>
              </div>
            </div>
         </div>
       </div>
    </div>
</template>

<script>
import { toThousandFilter } from "@/utils/utils";
export default {
    name: "MessageTplWeeksummary",
    props:{
        msg:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            content: {}
        }
    },
    computed: {
      startDate: function(){
        let startDate = new Date(this.content && this.content.startDate);
        return `${startDate.getMonth()}-${startDate.getDate()}`;
      },
      endDate: function(){
        let endDate = new Date(this.content && this.content.endDate);
        return `${endDate.getMonth()}-${endDate.getDate()}`;
      }
    },
    created:function(){
        try{
            let json = JSON.parse(this.msg.content);
            this.content = json.content;
        }catch(e){
            console.log('msg content parse error',this.msg.content);
        }
    },
    methods:{
      getDefaultPhoto() {
          let url = "resources/images/icon/defaultUserPhoto.png";
          if (this.content.photo) {
              url = this.content.photo;
          }
          return url;
        }
    }
}
</script>
<style lang="less" scoped>
.week-container{
  margin: 10px;
  width: 50%;
  margin: 0 auto;
  .week-list{
    border: 1px solid #ddd;
    padding: 0px 10px;
    background-color: #fff;
    border-radius: 2px;
    text-align: left;
    .list-right{
      padding-right: 10px;
      .title{
        color: #333;
        padding: 5px 0px;
        display: flex;
        align-items: center;
        &-left{
          img{
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 1px solid #ddd;
          }
        }
        &-right{
          margin-left: 5px;
          span{
            vertical-align: top;
          }
          p{
            color: #333;
            font-size: 14px;
          }
        }
      }
      .list-content{
        .content{
            padding: 2px 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
        }
      }
    }
  }
}
</style>
