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
        <a
          :href="'#'+item.href"
          :class="{
            'a-selected': currHref == item.href,
            'a-unselected': currHref != item.href,
          }"
          >{{ item.label }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
      currHref: "",
    };
  },
  computed: {
    relatedEl: function () {
      if (this.$parent.$refs[this.elRefName]) {
        return this.$parent.$refs[this.elRefName];
      }
      return null;
    },
  },
  watch: {
    currHref: function () {
      console.log("changed,", this.currHref);
    },
  },
  mounted() {
    if (this.relatedEl) {
      this.bindEventListener();
      this.handleRelatedElScroll();
    }
  },
  methods: {
    bindEventListener() {
      this.relatedEl.addEventListener("scroll", this.handleRelatedElScroll);
    },
    handleRelatedElScroll() {
      this.currHref = this.getCurrHref();
    },
    getCurrHref() {
      for (let i = 0; i < this.relatedEl.childNodes.length; i++) {
        let ele = this.relatedEl.childNodes[i];
        if (ele.offsetTop >= this.relatedEl.scrollTop) {
          return ele.id;
        }
      }
      return "";
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 15px 24px 15px 24px;
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
a {
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;
}
.a-unselected {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #666666;
}
.a-selected {
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
