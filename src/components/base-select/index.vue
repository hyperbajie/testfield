<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    v-model="localValue"
    ref="selectRef"
    @visible-change="handleVisibleChange"
    filterable
  >
    <el-option
      v-for="item in localList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
// 分段显示/全列表搜索
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
        return 100;
      },
    },
    // 每次加载多少
    seg: {
      default: function () {
        return 50;
      },
    },
  },
  data() {
    return {
      // 到第几个了
      count: 0,
      // 当前列表
      localList: [],
      // 截断起始标
      sliceStartIndex: 0,
      // 截断终止标
      sliceEndIndex: 0,
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
  },
  watch: {
    list: {
      immediate: true,
      handler: function () {
        this.setLocalList();
        this.addListener();
      },
    },
  },
  mounted() {
    this.addListener();
  },
  methods: {
    addListener() {
      if (this.list.length > this.upperLimit && this.$refs?.selectRef) {
        this.$refs.selectRef.$refs.scrollbar.$el.childNodes[0].addEventListener(
          "scroll",
          (e) => {
            // 判断已经滑到底了
            if (
              this.sliceEndIndex < this.list.length &&
              e.target.scrollHeight - e.target.scrollTop <=
                e.target.clientHeight + 20
            ) {
              let plus = Math.min(
                this.seg,
                this.list.length - this.sliceEndIndex
              );
              this.sliceEndIndex += plus;
              this.sliceStartIndex = Math.max(
                this.sliceEndIndex - this.upperLimit,
                0
              );
              this.setLocalList();
              e.target.scrollTop = plus / this.upperLimit * e.target.scrollHeight - e.target.clientHeight;
              return;
            }
            // 判断已经滑到顶了
            if (this.sliceStartIndex != 0 && e.target.scrollTop < 20) {
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
    /**
     * 将当前值包含在其中
     */
    locateCurrValue() {
      if (!this.localValue) {
        return;
      }
      if (Array.isArray(this.localValue)) {
        let i = 0,
          endIndex = this.localList.length,
          tar = this.localValue[0];
        while (i < endIndex) {
          if (this.localList[i].value == tar) {
            break;
          }
          i++;
          if (i == endIndex && endIndex < this.list.length) {
            this.count++;
            this.getLocalList();
            endIndex = this.localList.length;
          }
        }
        console.log("done", this.localList[i]);
      } else {
        let i = 0,
          endIndex = this.localList.length;
        while (i < endIndex) {
          if (this.localList[i].value == this.secondaryValue) {
            break;
          }
          i++;
          if (i == endIndex && endIndex < this.list.length) {
            this.count++;
            this.getLocalList();
            endIndex = this.localList.length;
          }
        }
        console.log("done", this.localList[i]);
      }
    },
    handleVisibleChange(visible) {
      if (visible && this.localValue) {
        // console.log("handleFocus", visible, this.localValue);
      }
    },
    setLocalList() {
      if (this.list.length <= this.upperLimit) {
        this.localList = this.list;
        this.sliceStartIndex = 0;
        this.sliceEndIndex = this.list.length;
        return;
      }
      this.sliceEndIndex == 0 && (this.sliceEndIndex = this.upperLimit);
      this.localList = this.list.slice(
        this.sliceStartIndex,
        this.sliceEndIndex
      );
    },
  },
};
</script>
