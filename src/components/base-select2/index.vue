<template>
  <el-select v-lazyload="loadMore" v-bind="$attrs" v-on="$listeners" v-model="localValue" remote :remote-method="handleSearch" @focus="handleFocus">
    <el-option v-for="(item, index) in curList" :key="index" :label="item[labelWord] || item" :value="item[valueWord] || item"></el-option>
  </el-select>
</template>

<script>
export default {
  directives: {
    lazyload: {
      bind: function (el, binding) {
        const SELECTWRAP_DOM = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (CONDITION) {
            binding.value();
          }
        });
      },
    },
  },
  props: {
    // 原始列表
    selectList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 当前值
    selectValue: {
      default: function () {
        return null;
      },
    },
    // 上限，超过这个数据需要截断
    upperLimit: {
      default: function () {
        return 30;
      },
    },
    // 每次加载多少
    segment: {
      default: function () {
        return 20;
      },
    },
    // 显示用字段名
    labelWord: {
      default: function () {
        return "label";
      },
    },
    // 赋值用字段名
    valueWord: {
      default: function () {
        return "value";
      },
    },
  },
  data() {
    return {
      // 当前列表
      curList: [],
      // 当前页码
      page: 1,
      // 搜索列表
      searchList: [],
      // 在搜索中
      inSearch: false,
    };
  },
  computed: {
    localValue: {
      get: function () {
        return this.selectValue;
      },
      set: function (v) {
        this.$emit("update:selectValue", v);
      },
    },
  },
  //   watch: {
  //     selectList: {
  //       immediate: true,
  //       handler: function () {
  //         this.page = 1;
  //         this.setCurList();
  //       },
  //     },
  //   },
  methods: {
    // 处理聚焦，重置页码，重新生成列表
    handleFocus() {
      //   暂时屏蔽，因为在选中选项后点开列表，不能直接跳转到对应位置
      this.spliceCurValue();
      this.inSearch = false;
      this.page = 1;
      this.setCurList();
    },
    // 重置
    reset() {
      this.page = 1;
      this.setCurList();
    },
    // 处理搜索，替换列表
    handleSearch(query) {
      if (query) {
        // 生成搜索列表
        this.inSearch = true;
        this.searchList = this.selectList.filter((item) => {
          return (item[this.labelWord] || item).indexOf(query) >= 0;
        });
        this.page = 1;
        this.setCurList();
      } else {
        this.inSearch = false;
        this.page = 1;
        this.setCurList();
      }
    },
    // 加载
    loadMore() {
      this.page++;
      this.setCurList();
    },
    // 设置列表
    setCurList() {
      let tarList = this.selectList;
      if (this.inSearch) {
        tarList = this.searchList;
      }
      if (tarList.length > this.upperLimit) {
        this.curList = tarList.slice(0, this.upperLimit + this.page * this.segment);
        return;
      }
      this.curList = tarList;
    },
    // 将选项裁剪到列表前面去
    spliceCurValue() {
      if (Array.isArray(this.localValue)) {
        this.localValue.forEach((element, index) => {
          this.spliceListByValue(element, index);
        });
        return;
      }
      if (this.localValue !== null && this.localValue !== undefined) {
        this.spliceListByValue(this.localValue);
      }
    },
    // 将选中值剪切到前面去, 主要是操作list，这样传进来的列表就改变了
    spliceListByValue(v, tarPos) {
      let index = this.selectList.findIndex((item) => {
        return (item[this.valueWord] || item) === v;
      });
      if (index < 0) {
        return;
      }
      let temp = this.selectList[index];
      this.selectList.splice(index, 1);
      if (tarPos >= 0) {
        this.selectList.splice(tarPos, 0, temp);
      } else {
        this.selectList.unshift(temp);
      }
    },
  },
};
</script>
