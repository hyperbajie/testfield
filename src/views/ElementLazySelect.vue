<template>
  <div>
    <h3>基于el-select的懒加载组件</h3>
    <base-lazy-select :selectValue.sync="hosCaseNum" :selectList="HosCaseNums" filterable clearable></base-lazy-select>
  </div>
</template>

<script>
import BaseLazySelect from "@/components/base-lazy-select";
import { HosCaseNums } from "@/mock/hosCaseNums";
export default {
  name: "ElementLazySelect",
  components: {
    BaseLazySelect,
  },
  data() {
    return {
      hosCaseNum: "",
      HosCaseNums,
    };
  },
};
</script>
