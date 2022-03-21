<template>
  <div class="container">
    <div class="bg-line"></div>
    <ul class="item-container">
      <li v-for="(item, index) in labelList" :key="index">
        <div
          class="circle"
          :class="{
            'bg-selected': currHref == item.href,
            'bg-unselected': currHref != item.href,
          }"
        ></div>
        <span
          :href="'#' + item.href"
          :class="{
            'span-selected': currHref == item.href,
            'span-unselected': currHref != item.href,
          }"
          @click="handleClickATag(item)"
        >
          {{ item.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BaseAnchor",
  props: {
    labelList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    elRefName: {
      type: String,
      default: function () {
        return "elRefName";
      },
    },
  },
  data() {
    return {
      // 当前锚点
      currHref: "",
      // 锚点元素列表
      hrefEleList: [],
    };
  },
  computed: {
    relatedEl: function () {
      if (this.$parent.$refs[this.elRefName]) {
        return this.$parent.$refs[this.elRefName] instanceof HTMLElement
          ? this.$parent.$refs[this.elRefName]
          : this.$parent.$refs[this.elRefName].$el;
      }
      return null;
    },
  },
  // watch: {
  //   currHref: function () {
  //     console.log("changed,", this.currHref);
  //   },
  // },
  mounted() {
    if (this.relatedEl) {
      this.bindEventListener();
      this.handleRelatedElScroll();
    }
  },
  destroyed() {
    // todo 摧毁
  },
  methods: {
    /**
     * 绑定滚动监听
     */
    bindEventListener() {
      this.relatedEl?.addEventListener("scroll", this.handleRelatedElScroll);
    },
    /**
     * 处理滚动
     */
    handleRelatedElScroll() {
      this.currHref = this.getCurrHref();
    },
    /**
     * 获取当前标签
     */
    getCurrHref() {
      for (let i = 0; i < this.labelList.length; i++) {
        let ele = this.relatedEl.querySelector("#" + this.labelList[i].href);
        if (ele && ele.offsetTop >= this.relatedEl.scrollTop) {
          return ele.id;
        }
      }
      return "";
    },
    /**
     * 处理点击标签
     */
    handleClickATag(item) {
      // this.currHref = item.href;
      this.setScroll(item);
      this.$emit("click", item);
    },
    /**
     * 设置滚动条
     */
    setScroll(item) {
      let ele = this.relatedEl?.querySelector("#" + item.href);
      if (ele) {
        this.relatedEl.scrollTo({
          left: 0,
          top: ele.offsetTop,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 68px;
  position: relative;
}
.bg-line {
  width: 100%;
  height: 8px;
  border-bottom: 2px dashed #dcdfe6;
  position: relative;
  box-sizing: border-box;
}
.item-container {
  display: flex;
  justify-content: space-around;
  position: relative;
  top: -8px;
}
li {
  list-style-type: none;
  text-align: center;
}
span {
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;
  cursor: pointer;
}
.span-unselected {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #666666;
}
.span-selected {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #3eb6ac;
}
.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 0 auto;
}
.bg-unselected {
  background: #dcdfe6;
}
.bg-selected {
  background: #3eb6ac;
}
</style>
