<template>
  <div v-transfer-dom :data-transfer="transfer">
    <div class="rfd-modal-mask" v-show="visible" @click="mask"></div>
    <div class="rfd-modal-warp" @click="handleWrapClick" v-show="visible">
      <div class="rfd-modal" :style="mainStyles">
        <div class="rfd-modal-content">
          <header>
            <div class="modal-content-header">
              <slot name="header">
                <span class="modal-content-header-title">{{title}}</span>
                <i class="iconfont modal-content-header-close" @click="close">&#xe607;</i>
              </slot>
            </div>
          </header>
          <main>
            <div class="modal-content-body">
              <slot></slot>
            </div>
          </main>
          <footer class="modal-content-footer" :class="inputAlign" v-show="!footerHide">
            <slot name="footer">
              <input type="submit" value="取消" class="input-submit-cancel" @click.prevent="cancel" />
              <input type="submit" value="确定" class="input-submit-ok" @click.prevent="ok" />
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TransferDom from "@/components/modal/transfer-dom";
export default {
  name:'custom-modal',
  
  directives: { TransferDom },
  props: {
    value: {
      type: Boolean,
      default: false
    },

    width: {
      type: [Number, String],
      default: 520
    },

    styles: {
      type: Object
    },
    //是否打开遮罩
    maskClosable: {
      type: Boolean,
      default: true
    },

    footerBtnAlign: {
      type: String,
      default: "right"
    },
    //弹出框名称
    title: {
      type: String
    },

    transfer: {
      type: Boolean,
      default: true
    },

    //是否隐藏确定取消按钮
    footerHide: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      visible: this.value,
    };
  },

  computed: {
    mainStyles() {
      let style = {};
      const width = parseInt(this.width);
      const styleWidth = {
        width: width <= 100 ? `${width}%` : `${width}px`
      };
      const customStyle = this.styles ? this.styles : {};
      Object.assign(style, styleWidth, customStyle);
      return style;
    },
    inputAlign() {
      let alignClass = `input-align-${this.footerBtnAlign}`;
      return alignClass;
    }
  },

  methods: {
    close() {
      this.visible = false;
      this.$emit("on-cancel");
      //v-model 把状态传给父组件
      this.$emit("input", false);
    },

    mask() {
      if (this.maskClosable) {
        this.close();
      }
    },

    handleWrapClick(event) {
      const className = event.target.getAttribute("class");
      if (className && className.indexOf("rfd-modal-warp") > -1) this.mask();
    },

    cancel() {
      this.close();
    },

    ok() {
      this.$emit("on-ok");
      // this.$emit('input', false);
    }
  },

  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("onVisibleChange", val);
    }
  }
};
</script>

<style lang="less" scoped>
@main-bg-color: rgb(45, 140, 240);
@main-bg-color-hover: @main-bg-color+30;
@padding-modal: 0 15px;
.rfd-modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.6);
  width: auto;
  z-index: 1000;
}

.rfd-modal-warp {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}

.rfd-modal {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;

  &-content {
    position: relative;
    background-color: #fff;
    border: 0;
    border-radius: 6px;
    background-clip: padding-box;

    .modal-content-header {
      height: 40px;
      line-height: 40px;
      position: relative;
      width: 100%;
      color: #fff;
      background-color: @main-bg-color;
      padding: @padding-modal;

      &-title {
        font-size: 14px;
        cursor: default;
      }

      &-close {
        position: absolute;
        top: 50%;
        right: 15px;
        cursor: pointer;
        transform: translateY(-50%);
      }
    }

    .modal-content-body {
      position: relative;
      padding: 1px 15px;
    }

    .modal-content-footer {
      bottom: 0px;
      left: 0px;
      height: 50px;
      width: 100%;
      line-height: 50px;
      border-top: 1px solid #ddd;
      background-color: #e9eaec;
      padding: @padding-modal;

      .input-submit-ok {
        border: none;
        border-radius: 4px;
        width: 66px;
        height: 32px;
        line-height: 32px;
        vertical-align: middle;
        background-color: @main-bg-color;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
      }

      .input-submit-ok:hover {
        background-color: @main-bg-color-hover;
      }

      .input-submit-cancel {
        border: none;
        border-radius: 4px;
        width: 66px;
        height: 32px;
        line-height: 32px;
        vertical-align: middle;
        background-color: #ffffff;
        color: #6d7380;
        cursor: pointer;
        font-size: 14px;
      }

      .input-submit-cancel:hover {
        color: @main-bg-color;
      }
    }

    .input-align-left {
      text-align: left;
    }

    .input-align-center {
      text-align: center;
    }

    .input-align-right {
      text-align: right;
    }
  }
}
</style>
