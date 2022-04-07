<template>
  <div>
    <h3>select</h3>
    <!-- <el-divider></el-divider>
    <base-select :list="dataList" :currV.sync="currSelectV"></base-select> -->
    <el-divider></el-divider>
    <base-select
      clearable
      :list="HosCaseNums"
      :secondaryValue.sync="currSelectV2"
      @change="handleChange"
      @visible-change="handleVisibleChange"
    ></base-select>
  </div>
</template>

<script>
import BaseSelect from "@/components/base-select";
import { HosCaseNums } from "@/mock";
export default {
  name: "selectField",
  components: {
    BaseSelect,
  },
  data() {
    return {
      dataList: [
        {
          label: "标签一",
          value: 1,
        },
        {
          label: "标签二",
          value: 2,
        },
      ],
      currSelectV: 1,
      HosCaseNums,
      currSelectV2: "202107501",
    };
  },
  methods: {
    handleChange() {
      console.log("changed");
    },
    handleVisibleChange() {
      console.log("can you hear me");
    },
  },
};
</script>
