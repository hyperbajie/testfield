<template>
  <div>
    <h3>select</h3>
    <!-- <el-divider></el-divider>
    <base-select :list="dataList" :currV.sync="currSelectV"></base-select> -->
    <el-divider></el-divider>
    <base-select
      clearable
      :list="hosCaseList"
      :secondaryValue.sync="currSelectV2"
      @change="handleChange"
      @visible-change="handleVisibleChange"
    ></base-select>
    <el-button @click="toggleList">toggle list</el-button>
    <el-divider></el-divider>
    <!-- <el-select clearable v-model="currSelectV">
      <el-option
        v-for="item in hosCaseList"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></el-option>
    </el-select> -->
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
      currSelectV: "202107501",
      hosCaseList: [],
      // currSelectV2: ["202107501","202112263"],
      currSelectV2: "202107501",
      //       multiple
      // collapse-tags
    };
  },
  methods: {
    handleChange() {
      // console.log("changed");
    },
    handleVisibleChange() {
      // console.log("can you hear me");
    },
    toggleList() {
      this.hosCaseList = HosCaseNums;
      this.currSelectV2 = "202107501";
    },
  },
};
</script>
