<template>
    <div>
        <header class="header">科目分录</header>
        <div class="main">
            <div class="main-form">
                <Form label-position="left" :model="baseInfo" inline :label-width="75">
                    <FormItem label="交易号:" style="width:22%">
                        <Input type="text" v-model="baseInfo.transCode" />
                    </FormItem>
                    <FormItem label="业务类型:" style="width:22%">
                        <Input type="text" v-model="baseInfo.transType" />
                    </FormItem>
                    <FormItem label="应用名称:" style="width:22%">
                        <Input type="text" v-model="baseInfo.appName" />
                    </FormItem>
                    <FormItem label="表单状态:" style="width:22%">
                        <Select v-model="baseInfo.status.key">
                            <Option v-for="item in formStatus" :key="item.key" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="生效时间:" style="width:22%">
                        <DatePicker type="date" v-model="baseInfo.effectiveTime" style="width:100%" />
                    </FormItem>
                    <FormItem label="经办人:" style="width:22%">
                        <Select v-model="baseInfo.status.key">
                            <Option v-for="item in formStatus" :key="item.key" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="经办主体:" style="width:22%">
                        <Input type="text" v-model="baseInfo.handlerZhuTi" />
                    </FormItem>
                    <FormItem label="经办部门:" style="width:22%">
                        <Select v-model="baseInfo.status.key">
                            <Option v-for="item in formStatus" :key="item.key" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="经办职位:" style="width:22%">
                        <Select v-model="baseInfo.status.key">
                            <Option v-for="item in formStatus" :key="item.key" :value="item.key">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="创建者:" style="width:22%">
                        <Input type="text" v-model="baseInfo.creatorName" />
                    </FormItem>
                    <FormItem label="修改者:" style="width:22%">
                        <Input type="text" v-model="baseInfo.modiferName" />
                    </FormItem>
                    <FormItem label="修改时间:" style="width:22%">
                        <DatePicker type="date" v-model="baseInfo.modTime" style="width:100%" />
                    </FormItem>
                </Form>
            </div>
            <div>
                <div>
                <RadioGroup v-model="type">
                    <Radio label="1">
                        <span>无辅助项</span>
                    </Radio>
                    <Radio label="2">
                        <span>项目计划</span>
                    </Radio>
                    <Radio label="3">
                        <span>内部主体</span>
                    </Radio>
                </RadioGroup>
                </div>


                <Form label-position="left" :model="baseInfo" inline :label-width="75">
                    <FormItem label="项目交易号:" style="width:22%">
                        <Select>
                        </Select>
                    </FormItem>
                    <FormItem label="项目名称:" style="width:22%">
                        <Input type="text" v-model="baseInfo.transType" />
                    </FormItem>
                </Form>
            </div>
            <div class="main-tabs">
                <Tabs value="name1">
                    <TabPane label="会计类科目" name="name1">
                        <Table :columns="columns1" :data="data1"></Table>
                    </TabPane>
                    <TabPane label="非会计类科目" name="name2">
                        <Table :columns="columns1" :data="data1"></Table>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "SubjectForm",
  data() {
    return {
      baseInfo: {
        transCode: "0001",
        transType: "科目分录",
        appName: "", //应用名称
        status: {
          value: "已生效",
          key: 1
        },
        effectiveTime: "",
        handlerName: "", //经办人
        handlerZhuTi: "", //经办主体
        handlerArea: "", //经办部门
        handlerUnitName: "", //经办职位
        creatorName: "", //创建者
        modiferName: "", //修改者
        modTime: "" //修改时间
      },
      formStatus: [
        {
          value: "已失效",
          key: -1
        },
        {
          value: "草稿",
          key: 0
        },
        {
          value: "已生效",
          key: 1
        },
        {
          value: "进行中",
          key: 2
        }
      ],

      type: "1",
      columns1: [
        {
          title: "摘要",
          key: "abstract"
        },
        {
          title: "管理科目",
          key: "manageSubject"
        },
        {
          title: "基础对象",
          key: "object"
        },
        {
          title: "增加金额",
          key: "addMoney"
        },
        {
          title: "减少金额",
          key: "decMoney"
        }
      ],
      data1: [
        {
          abstract: "John Brown",
          manageSubject: 18,
          object: "New York No. 1 Lake Park",
          addMoney: "2016-10-03",
          decMoney:''
        }
      ]
    };
  }
};
</script>

<style lang="less">
.header {
  height: 50px;
  width: 100%;
  line-height: 50px;
  background-color: #ffffff;
  position: fixed;
  font-size: 16px;
  padding: 0 2%;
  border-bottom: 1px solid #ccc;
}
.main {
  position: relative;
  top: 50px;
  margin: 0px auto;
  width: 80%;
  background-color: #ffffff;
  min-height: 585px;
  padding: 20px 20px;

  &-form {
    border-bottom: 1px dashed #ddd;
  }
}

</style>
