<template>
  <div>
    <h3>lazy-load-select</h3>
    <base-select2 :selectList="selectOptions" :selectValue.sync="selectValue" filterable clearable multiple collapse-tags></base-select2>
    <el-button @click="handleClick">添加123</el-button>
  </div>
</template>

<script>
import BaseSelect2 from "@/components/base-select2";
import { HosCaseNums } from "@/mock/hosCaseNums.js";

export default {
  name: "LazyLoadSelect2",
  components: {
    BaseSelect2,
  },
  data() {
    return {
      selectOptions: [],
      selectValue: undefined,
    };
  },
  methods: {
    handleClick() {
      this.selectOptions = HosCaseNums;
    },
  },
};
</script>
