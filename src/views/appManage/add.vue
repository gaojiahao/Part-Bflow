<style lang="less" scoped>
    .app-card{
        width: 197px;
        float: left;
        position: relative;
        .app-block{
            width: 177px;
            height: 100px;
            .app-img{
                width: 2rem;
                height: 2rem;
            }
            .app-title{
                font-size: 0.8rem;
                font-weight: bold;
                position: absolute;
                top: 18%;
                left: 28%;
            }
            .app-desc{
                color: #abaaaa;
                font-size: 0.5rem;
            }
            .app-select-icon{
                position: absolute;
                left: 90%;
                top: 0%;
                font-size: 1.2rem;
                color: #e4393c;
            }
        }
    }
    .app-confirm-btn{
        position: absolute;
        top: 64%;
        left: 29%;
        width: 500px;
    }
    .ivu-card{
        border-radius: 0;
    }
    .ivu-card:hover{
        box-shadow: 0 2px 16px 2px rgba(0,0,0,.2);
    }
    .app-out-card{
        float:left;
        width:100%;
        padding: 0px 0px 11px 5px;
        .app-name{
            color: #40a9ff;
            font-size: 1rem;
        }
    }
    div.ivu-card-body{
        overflow: hidden;
        padding: 10px !important;
    }
    .add-bottom{
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 5px 5px;
        height: 50px;
        width: 100%;
        position: fixed;
        top: 94%;
        left: 0;
    }
</style>

<template>
  <div>
    <Row v-for="(list,k) of appData" :key="k">
        <Card class="app-out-card">
            <p class="app-name" slot="title">
                {{ list.name }}
            </p>
            <a href="#" slot="extra"></a>
            <div @click="selectApp(index,list.name)" class="app-card" v-for="(item,index) of list.list" :key="index">
                <Card>
                    <div class="app-block">
                        <img class="app-img" :src="item.icon" />
                        <p class="app-title">{{ item.title }}</p>
                        <Icon v-show="item.isSelect" class="app-select-icon" type="checkmark-round"></Icon>
                        <p class="app-desc">{{ item.comment }}</p>
                    </div>
                </Card>
            </div>
        </Card>
    </Row>
    <div class="add-bottom">
        <Affix :offset-bottom="0">
            <Button type="primary">保存</Button>
        </Affix>
    </div>
  </div>
</template>

<script>
import { getAppTemplateData } from '../../services/appService.js'
export default {
  name: 'appAddList',
  components:{
      
  },
  data () {
      return {
         showSelect: true,
         appData: [{name:'对象',list:[]},{name:'业务',list:[]}]
      }
  },
  methods: {
     selectApp(index,name) {
         if(name === '对象'){
             this.appData[0].list[index].isSelect = !this.appData[0].list[index].isSelect;
         }else{
             this.appData[1].list[index].isSelect = !this.appData[1].list[index].isSelect;
         }
     }
  },
  mounted() {
      getAppTemplateData().then(res => {
          res.tableContent.forEach((val, index) => {
              if(val.tplType === 'obj'){
                  val.isSelect = false;
                  this.appData[0].list.push(val);
              }else if(val.tplType === 'business'){
                  val.isSelect = false;
                  this.appData[1].list.push(val);
              }
          })
      })
  }
}
</script>

