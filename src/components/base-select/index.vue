<template>
  <el-select
    v-bind="$attrs"
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
    //   列表
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
        return 100;
      },
    },
  },
  data() {
    return {
      count: 0,
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
    localList: function () {
      if (this.list.length <= this.upperLimit) {
        return this.list;
      }
      return this.list.slice(0, this.upperLimit + this.seg * this.count);
    },
  },
  mounted() {
    // console.log("el");
    if (this.list.length > this.upperLimit) {
      this.$refs.selectRef.$refs.scrollbar.$el.childNodes[0].addEventListener(
        "scroll",
        (e) => {
          if (this.upperLimit + this.seg * this.count > this.list.length) {
            return;
          }
          if (
            e.target.scrollHeight - e.target.scrollTop <=
            e.target.clientHeight + 20
          ) {
            this.count++;
          }
        }
      );
    }
  },
  methods: {
    handleVisibleChange(visible) {
      if (visible) {
        console.log("handleFocus", visible, this.localValue);
        for (let i = 0; i < this.localList.length; i++) {
          if (this.localList[i].value == this.secondaryValue) {
            return;
          }
        }
      }
    },
  },
};
</script>
