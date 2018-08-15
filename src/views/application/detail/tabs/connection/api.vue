<style lang="less" scoped>
  @import './api.less';
</style>

<template>
<div class="bg_ff martop20">

    <Row class="app-resource-group-title">
         <h3>API</h3>
    </Row>
    <Row class="api-content">
        <h2>创建销售订单</h2>
        <p><strong>请求方式：POST（HTTPS）</strong></p>
        <p><strong>请求地址：https://qyapi.weixin.qq.com/cgi-bin/user/update?access_token=ACCESS_TOKEN</strong></p>
        <p><strong>请求包体：</strong></p>
        <Row>
            <pre class="api-code">
            {{appContent}}
            <div style="position: absolute;top: 0px;right: 0px;cursor: pointer;"  class="tag-read"  :data-clipboard-text=apiInfo  @click="copy">
                <Tooltip placement="top" content="点击复制" :disabled="disabled">
                    <Icon type="md-document" size='24' />
                </Tooltip>
            </div>
            </pre>
        </Row>
    </Row>

  </div>
</template>

<script>
import { getAppSubjectData } from "@/services/appService.js";
import Clipboard from 'clipboard';

export default {
  name: "appApi",
  components: {},
  props: {
   
  },
  data() {
    return {
        apiInfo:'HHHHHHHHHHHHHHHHHHHH',
        appContent:`{
                "formData": {
                    "order": {
                        "dataSet": [{
                            "transObjCode": "输入物料",
                            "tdQty": "明细发生数",
                            "comment": "说明",
                            "price": "明细单价",
                            "promDeliTime": "承诺交付时间",
                            "tdAmount": "明细发生金额",
                            "taxRate": "税率",
                            "assMeasureUnit": "辅助计量（明细）",
                            "assistQty": "辅计数量（明细）",
                            "taxAmount": "税金",
                            "assMeasureScale": "与主计量单位倍数（明细）"
                        }],
                        "dealerDebit": "借方往来",
                        "drDealerLabel": "借方往来关系标签（明细）",
                        "drDealerPaymentTerm": "借方往来结算方式"
                    },
                    "inPut": {
                        "dataSet": [{
                            
                        }]
                    },
                    "outPut": {
                        "dataSet": [{
                            
                        }]
                    },
                    "handlerUnit": "经办部门ID",
                    "handlerRoleName": "经办角色名称",
                    "handler": "经办人ID",
                    "dealerDebitContactPersonName": "借方往来联系人",
                    "dealerDebitContactInformation": "借方往来联系人联系方式",
                    "handlerRole": "经办角色ID",
                    "handlerName": "经办人名称",
                    "biComment": "备注",
                    "handlerUnitName": "经办部门名称",
                    "drDealerLogisticsTerms": "借方往来物流条款"
                },
                "listId": "a4897429-f4f2-44a4-ade7-2fe8dc67c3cf",
                "biReferenceId": ""
            } `
    };
  },
  methods: {
      copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          console.log('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      }
  },
  created() {
  }
};
</script>

