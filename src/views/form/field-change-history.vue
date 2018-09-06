<template>
  <div class="wrapper">
    <div class="wrapper-body">
      <Table :columns="columns1" :data="data1"></Table>
       <Input width='100px' v-model="value"/>
       <p>{{value|capitalize}}</p>
    </div>
   
    <change-detail v-model="showChangeDetailsModal" title="变更详情" width="1000">
      <div class="detail">
        <div class="detail-header">
          <p>
            <label>变更者:</label>
            <span>{{modiferName}}</span>
          </p>
          <div class="detail-header-time">
            <label>变更时间:</label>
            <span>{{modiferTime}}</span>
            <ul>
              <li>
                <div style="background-color:#ffe699"></div>
                已移除
              </li>
              <li>
                <div style="background-color:#c6e0b4"></div>
                新增
              </li>
              <li>
                <div style="background-color:#bdd7ee"></div>
                已修改
              </li>
            </ul>
          </div>
        </div>
        <div class="detail-table">
          <div class="detail-table-before">
            <div class="detail-table-before-title">更变前</div>
            <Table :row-class-name="deleteRowClassName" :columns="changeColumns" :data='beforeChangeData' size="small" height="152" :disabled-hover="true"></Table>
          </div>
          <div class="detail-table-after">
            <div class="detail-table-after-title">更变后</div>
            <Table :row-class-name="addRowClassName" :columns="changeColumns" :data='afterChangeData' size="small" height="152" :disabled-hover="true"></Table>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </change-detail>
  </div>
</template>

<script>
import { getFeildChangeHistory } from "@/services/flowService";
import ChangeDetail from "@/components/modal/Modal";
export default {
  components: {
    ChangeDetail
  },
  data() {
    return {
      value:'',
      columns1: [
        {
          title: "版本",
          key: "version",
          width: 60,
          align: "center"
        },
        {
          title: "变更时间",
          key: "modiferTime",
          align: "center"
        },
        {
          title: "变更者",
          key: "modiferName",
          align: "center"
        },
        {
          title: "变更字段",
          key: "mainTable",
          align: "center",
          render: (h, params) => {
            let mainTable = params.row.mainTable;
            let renderData = [];
            if (mainTable.length > 0) {
              mainTable.forEach(item => {
                renderData.push(
                  h(
                    "p",
                    {
                      style: {
                        height: "16px"
                      }
                    },
                    item.fieldName
                  )
                );
              });
            }
            if (params.row.detailTable.length > 0) {
              params.row.detailTable.forEach((item, index) => {
                renderData.push(
                  h(
                    "p",
                    {
                      style: {
                        height: "16px"
                      }
                    },
                    "明细表"
                  )
                );
              });
            }
            return h("div", renderData);
          }
        },
        {
          title: "变更前",
          key: "mainTable",
          align: "center",
          render: (h, params) => {
            let mainTable = params.row.mainTable,
              renderData = [],
              reg = /jpg|jpeg|png/g;
            if (mainTable.length > 0) {
              mainTable.forEach(item => {
                if (reg.test(item.fieldOldValue)) {
                  renderData.push(
                    h("img", {
                      attrs: {
                        src:
                          "/H_roleplay-si/ds/download?url=" +
                          item.fieldOldValue,
                        style: "width: 30px;height: 30px;border-radius: 2px;"
                      }
                    })
                  );
                } else {
                  renderData.push(
                    h(
                      "p",
                      {
                        style: {
                          height: "16px",
                          color: "#ee0000"
                        }
                      },
                      item.fieldOldValue ? item.fieldOldValue : " "
                    )
                  );
                }
              });
            }
            let detailTable = params.row.detailTable;
            if (detailTable.length > 0) {
              detailTable.forEach((item, index) => {
                renderData.push(
                  h(
                    "p",
                    {
                      style: {
                        height: "16px",
                        color: "#1605f3",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          this.showChangeDetailsModal = true;
                          this.modiferName = params.row.modiferName;
                          this.modiferTime = params.row.modiferTime;
                          //填加明细
                          this.addRows = JSON.parse(
                            JSON.parse(detailTable[index].changes).adds
                          );
                          //删除明细
                          this.deleteRows = JSON.parse(
                            detailTable[index].changes
                          ).deletes
                            ? JSON.parse(
                                JSON.parse(detailTable[index].changes).deletes
                              )
                            : [];
                          //更新明细
                          let updateTd = JSON.parse(detailTable[index].changes)
                            .updates
                            ? JSON.parse(
                                JSON.parse(detailTable[index].changes).updates
                              )
                            : [];

                          let fieldName = JSON.parse(
                            detailTable[index].fieldName
                          );
                          //获取定位字段key值
                          for (let id in fieldName) {
                            if (fieldName[id] === "ID") {
                              this.locationField = id;
                            }
                          }

                          this.changeColumns = [
                            {
                              type: "index",
                              width: 60,
                              align: "center"
                            }
                          ];
                          for (let key in fieldName) {
                            if (key !== this.locationField) {
                              this.changeColumns.push({
                                title: fieldName[key],
                                key: key,
                                hidden: true,
                                align: "center"
                              });
                            }
                          }

                          this.beforeChangeData = JSON.parse(
                            detailTable[index].oldData
                          );
                          this.afterChangeData = JSON.parse(
                            detailTable[index].newData
                          );

                          if (updateTd.length > 0) {
                            updateTd.forEach(update => {
                              this.afterChangeData.forEach(item => {
                                if (update.id === item[this.locationField]) {
                                  let change = update["change"];
                                  item["cellClassName"] = {};
                                  for (let i = 0; i < change.length; i++) {
                                    item["cellClassName"][change[i]] =
                                      "table-column-update";
                                  }
                                }
                              });
                            });
                          }
                        }
                      }
                    },
                    "查看详情"
                  )
                );
              });
            }
            return h("div", renderData);
          }
        },
        {
          title: "变更后",
          key: "mainTable",
          align: "center",
          render: (h, params) => {
            let mainTable = params.row.mainTable,
              renderData = [],
              reg = /jpg|jpeg|png/g;
            if (mainTable.length > 0) {
              mainTable.forEach(item => {
                if (reg.test(item.fieldOldValue)) {
                  renderData.push(
                    h("img", {
                      attrs: {
                        src:
                          "/H_roleplay-si/ds/download?url=" +
                          item.fieldOldValue,
                        style: "width: 30px;height: 30px;border-radius: 2px;"
                      }
                    })
                  );
                } else {
                  renderData.push(
                    h(
                      "p",
                      {
                        style: {
                          height: "16px",
                          color: "#008000"
                        }
                      },
                      item.fieldNewValue
                    )
                  );
                }
              });
            }
            let detailTable = params.row.detailTable;
            if (detailTable.length > 0) {
              detailTable.forEach((item, index) => {
                renderData.push(
                  h(
                    "p",
                    {
                      style: {
                        height: "16px",
                        color: "#1605f3",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          this.showChangeDetailsModal = true;
                          this.modiferName = params.row.modiferName;
                          this.modiferTime = params.row.modiferTime;
                          //填加明细
                          this.addRows = JSON.parse(
                            JSON.parse(detailTable[index].changes).adds
                          );
                          //删除明细
                          this.deleteRows = JSON.parse(
                            detailTable[index].changes
                          ).deletes
                            ? JSON.parse(
                                JSON.parse(detailTable[index].changes).deletes
                              )
                            : [];
                          //更新明细
                          let updateTd = JSON.parse(detailTable[index].changes)
                            .updates
                            ? JSON.parse(
                                JSON.parse(detailTable[index].changes).updates
                              )
                            : [];

                          let fieldName = JSON.parse(
                            detailTable[index].fieldName
                          );
                          //获取定位字段key值
                          for (let id in fieldName) {
                            if (fieldName[id] === "ID") {
                              this.locationField = id;
                            }
                          }

                          this.changeColumns = [
                            {
                              type: "index",
                              width: 60,
                              align: "center"
                            }
                          ];
                          for (let key in fieldName) {
                            if (key !== this.locationField) {
                              this.changeColumns.push({
                                title: fieldName[key],
                                key: key,
                                hidden: true,
                                align: "center"
                              });
                            }
                          }

                          this.beforeChangeData = JSON.parse(
                            detailTable[index].oldData
                          );
                          this.afterChangeData = JSON.parse(
                            detailTable[index].newData
                          );

                          if (updateTd.length > 0) {
                            updateTd.forEach(update => {
                              this.afterChangeData.forEach(item => {
                                if (update.id === item[this.locationField]) {
                                  let change = update["change"];
                                  item["cellClassName"] = {};
                                  for (let i = 0; i < change.length; i++) {
                                    item["cellClassName"][change[i]] =
                                      "table-column-update";
                                  }
                                }
                              });
                            });
                          }
                        }
                      }
                    },
                    "查看详情"
                  )
                );
              });
            }
            return h("div", renderData);
          }
        }
      ],
      data1: [],

      showChangeDetailsModal: false,
      beforeChangeData: [], //变更前数据
      afterChangeData: [], //变更后数据
      changeColumns: [], //变更详情列
      modiferName: "", //修改者
      modiferTime: "", //修改时间
      addRows: [], //添加行
      deleteRows: [], //删除行
      locationField: "" //定位字段key
    };
  },

  methods: {
    addRowClassName(row, index) {
      for (let i = 0; i < this.addRows.length; i++) {
        if (row[this.locationField] === this.addRows[i]) {
          return "table-column-add";
        }
      }
    },

    deleteRowClassName(row, index) {
      for (let i = 0; i < this.deleteRows.length; i++) {
        if (row[this.locationField] === this.deleteRows[i]) {
          return "table-column-detele";
        }
      }
    }
  },

  filters:{
    capitalize:function(value){
       if (!value) return '';
       value = Math.abs(Number(value));
       return value.toFixed(2);
    }
  },

  mounted() {
    getFeildChangeHistory().then(res => {
      this.data1 = res;
    });
  }
};
</script>

<style lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #e0e0e0;

  &-body {
    width: 80%;
    height: 100%;
    margin: 0px auto;
    background-color: #fff;
    padding: 10px 20px;
  }
}

.detail-header {
  margin-top: 5px;
  p {
    font-size: 14px;
  }

  &-time {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    ul {
      list-style: none;
      overflow: auto;
      float: right;
      li {
        display: inline-block;
        margin-right: 15px;
        div {
          width: 60px;
          height: 25px;
          vertical-align: middle;
          display: inline-block;
        }
      }
    }
  }
}

.detail-table {
  margin-top: 10px;

  &-before {
    &-title {
      height: 30px;
      line-height: 30px;
      background-color: #d5d5d5;
      width: 100%;
      text-align: center;
      color: #000;
    }
  }

  &-after {
    margin: 10px 0;
    &-title {
      height: 30px;
      line-height: 30px;
      background-color: #d5d5d5;
      width: 100%;
      text-align: center;
      color: #000;
    }
  }
}

// 新增
.ivu-table .table-column-add td {
  background-color: #c6e0b4;
  color: #000;
}

//删除
.ivu-table .table-column-detele td {
  background-color: #ffe699;
  color: #000;
}
//修改
.ivu-table .table-column-update {
  background-color: #bdd7ee;
  color: #000;
}
</style>

