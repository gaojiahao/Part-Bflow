<style lang="less" scoped>
    .app-card{
        float: left;
        width: 100%;
         border-top-style: none;
        padding-bottom: 10px;
        overflow-x: hidden;
        .app-name{
            font-size: 1rem;
        }
    }
</style>

<template>
  <div>
    <Row>
        <Card class="app-card">
            <p class="app-name" slot="title">
                应用科目
            </p>
            <a href="#" slot="extra"></a>
            <Table :columns="columns" :data="tableData"></Table>
        </Card>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'appSubject',
  components:{
      
  },
  data () {
      return {
         columns: [
          {
            title: "名称",
            key: "name"
          },
          {
            title: "分类",
            key: "type"
          },
          {
            title: "启用",
            key: "defaultView",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("Checkbox", {
                props: {
                  value: true
                }
              });
            }
          }
        ],
        tableData: [
          { name: "存货", type: '计划类'},
          { name: "费用", type: '会计类'}
        ]
      }
  },
  methods: {
     
  },
  mounted() {
      
  }
}
</script>

