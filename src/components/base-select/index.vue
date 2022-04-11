<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    v-model="localValue"
    ref="selectRef"
    @visible-change="handleVisibleChange"
    filterable
    remote
    :remote-method="searchInList"
  >
    <el-option
      v-for="item in localList"
      :key="item[valueWord]"
      :label="item[labelWord]"
      :value="item[valueWord]"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    // 原始列表
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 当前值
    secondaryValue: {
      default: function () {
        return null;
      },
    },
    // 上限，超过这个数据需要截断
    upperLimit: {
      default: function () {
        return 50;
      },
    },
    // 每次加载多少
    seg: {
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
      localList: [],
      // 截断起始标
      sliceStartIndex: 0,
      // 截断终止标
      sliceEndIndex: 0,
      // 搜索用缓冲列表
      searchList: [],
      // 搜索中标识
      inSearch: false,
      // 标记已监听
      haveListen: false,
    };
  },
  computed: {
    localValue: {
      get: function () {
        return this.secondaryValue;
      },
      set: function (v) {
        this.$emit("update:secondaryValue", v);
      },
    },
    factList: function () {
      return this.inSearch ? this.searchList : this.list;
    },
  },
  // watch: {
  //   list: {
  //     immediate: true,
  //     handler: function () {
  //       this.setLocalList();
  //       this.addListener();
  //     },
  //   },
  // },
  mounted() {
    window.ins = this;
    this.addListener();
    this.spliceLocalValue();
    // this.setLocalList();
    this.$watch("list", function() {
      this.addListener();
      // this.spliceLocalValue();
    })
  },
  methods: {
    // 将当前选中值提取到前面
    spliceLocalValue() {
      if (Array.isArray(this.localValue)) {
        this.localValue.forEach((element, index) => {
          this.spliceListByValue(element, index);
        });
        return;
      }
      if (this.localValue !== null) {
        this.spliceListByValue(this.localValue);
      }
    },
    // 将选中值剪切到前面去, 主要是操作list，这样传进来的列表就改变了
    spliceListByValue(v, tarPos) {
      let index = this.list.findIndex((item) => {
        return item[this.valueWord] === v;
      });
      if (index < 0) {
        return;
      }
      let temp = this.list[index];
      this.list.splice(index, 1);
      if (tarPos >= 0) {
        this.list.splice(tarPos, 0, temp);
      } else {
        this.list.unshift(temp);
      }
    },
    // 添加监听
    addListener() {
      if (this.haveListen) {
        return;
      }
      if (this.factList.length > this.upperLimit && this.$refs?.selectRef) {
        this.haveListen = true;
        this.$refs.selectRef.$refs.scrollbar.$el.childNodes[0].addEventListener(
          "scroll",
          (e) => {
            // 判断已经滑到底了
            if (
              this.sliceEndIndex < this.factList.length &&
              e.target.scrollHeight - e.target.scrollTop <=
                e.target.clientHeight + 20
            ) {
              let plus = Math.min(
                this.seg,
                this.factList.length - this.sliceEndIndex
              );
              this.sliceEndIndex += plus;
              this.sliceStartIndex = Math.max(
                this.sliceEndIndex - this.upperLimit,
                0
              );
              this.setLocalList();
              e.target.scrollTop =
                (1 - plus / this.upperLimit) * e.target.scrollHeight -
                e.target.clientHeight;
              return;
            }
            // 判断已经滑到顶了
            if (this.sliceStartIndex > 0 && e.target.scrollTop <= 20) {
              this.sliceStartIndex = Math.max(
                0,
                this.sliceStartIndex - this.seg
              );
              this.sliceEndIndex = this.sliceStartIndex + this.upperLimit;
              this.setLocalList();
              return;
            }
          }
        );
      }
    },
    handleVisibleChange(visible) {
      if (visible) {
        if (this.list.length > this.upperLimit) {
          this.spliceLocalValue();
          this.sliceStartIndex = 0;
          this.sliceEndIndex = 0;
          this.setLocalList();
        }
      } else {
        this.searchList = [];
        this.inSearch = false;
      }
    },
    setLocalList() {
      // if (this.inSearch) {
      //   // 搜索中
      //   if (this.searchList.length <= this.upperLimit) {
      //     this.localList = this.searchList;
      //     this.sliceStartIndex = 0;
      //     this.sliceEndIndex = this.searchList.length;
      //     return;
      //   }
      //   this.sliceEndIndex == 0 && (this.sliceEndIndex = this.upperLimit);
      //   this.localList = this.searchList.slice(
      //     this.sliceStartIndex,
      //     this.sliceEndIndex
      //   );
      //   return;
      // }
      // // 普通
      // if (this.list.length <= this.upperLimit) {
      //   this.localList = this.list;
      //   this.sliceStartIndex = 0;
      //   this.sliceEndIndex = this.list.length;
      //   return;
      // }
      // this.sliceEndIndex == 0 && (this.sliceEndIndex = this.upperLimit);
      // this.localList = this.list.slice(
      //   this.sliceStartIndex,
      //   this.sliceEndIndex
      // );
      if (this.factList.length <= this.upperLimit) {
        this.localList = this.factList;
        this.sliceStartIndex = 0;
        this.sliceEndIndex = this.factList.length;
        return;
      }
      this.sliceEndIndex == 0 && (this.sliceEndIndex = this.upperLimit);
      this.localList = this.factList.slice(
        this.sliceStartIndex,
        this.sliceEndIndex
      );
    },
    searchInList(query) {
      console.log("search in list:", query);
      if (query) {
        this.inSearch = true;
        this.searchList = this.list.filter((item) => {
          return item[this.labelWord].indexOf(query) >= 0;
        });
        this.sliceStartIndex = 0;
        this.sliceEndIndex = 0;
        this.setLocalList();
      }
    },
  },
};
</script>
