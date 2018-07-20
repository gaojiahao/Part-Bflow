<style lang="less" scoped>
@import "./enterpriseInfo.less";
</style>

<template>
    <div class="info-warp">
        <header class="info-warp-header">
            <h3>企业信息</h3>
        </header>
        <main class="info-warp-main">
            <section class="info-warp-main-section">
                <div class="select-logo">
                    <label class="left-leble">企业LOGO</label>
                    <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" action="/H_roleplay-si/ds/upload" style="display: inline-block;width:128px;vertical-align: middle;" :headers="httpHeaders">
                        <div style="width: 128px;height:128px;line-height: 128px;">
                            <img :src="imageUrl">
                            <i class="iconfont">&#xe63b;</i>
                        </div>
                        <!-- <div style="width: 128px;height:128px;line-height: 128px;" class="demo-upload-list" v-if="imageUrl">
                            <img :src="imageUrl">
                            <div class="demo-upload-list-cover">
                                <p class="iconfont" @click.native="handleRemove(item)">&#xe63b;</p>
                            </div>
                        </div> -->
                    </Upload>
                </div>
                <div class="select-explain">
                    <label class="left-leble">企业简称</label>
                    <span v-if="!editEnterpriseName">{{enterpriseName}}</span>
                    <input v-if="editEnterpriseName" type="text" v-model="enterpriseName" value="瑞福登" class="input-common-att" />
                    <a @click="handleEditName">{{edit}}</a>

                </div>
                <div class="select-explain">
                    <label class="left-leble">企业全称</label>
                    <span>深圳市瑞福登信息技术服务有限公司</span>
                </div>
                <div class="select-explain">
                    <label class="left-leble">企业说明</label>
                    <span>服务服务服务！！！！！！！</span>
                </div>
            </section>
            <section class="info-warp-main-section">
                <div class="select-explain">
                    <label class="left-leble">企业地址</label>
                    <span>深圳市福田区梅林街道梅林路卓越梅林中信广场(南区)</span>
                </div>
                <div class="select-explain">
                    <label class="left-leble">联系电话</label>
                    <input type="text" value="123065" class="input-common-att" />
                    <a>添加</a>
                </div>
            </section>
            <section class="info-warp-main-section">
                <div class="select-explain">
                    <label class="left-leble">企业管理员</label>
                    <a>添加</a>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import { downloadImage } from "@/services/appService";
import { getToken } from "@/utils/utils";
export default {
  name: "enterpriseInfo",
  data() {
    return {
      imageUrl: "",
      enterpriseName: "",
      editEnterpriseName: false,
      edit: "修改",
      enterprisePhone: "",
      httpHeaders: {
        Authorization: "5c27db46c1a747ddab6cfe75efe2961b"
      }
    };
  },

  methods: {
    //编辑企业简称
    handleEditName() {
      this.edit = this.editEnterpriseName ? "修改" : "完成";
      this.editEnterpriseName = !this.editEnterpriseName;
    },

    handleSuccess(res, file) {
      this.imageUrl =
        "/H_roleplay-si/ds/download?width=128&height=128&specify=true&url=" +
        res.data[0].attacthment;
    },

    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超出范围",
        desc: "文件大小最大为2M"
      });
    },

    //判断上传图片格式是否有误
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不对",
        desc: "请上传格式为png 或者 jpg 的图片"
      });
    }
  }
};
</script>

    
