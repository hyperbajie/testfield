<template>
  <div>
    <h3>select</h3>
    <el-divider></el-divider>
    <base-select :list="dataList" :currV.sync="currSelectV"></base-select>
  </div>
</template>

<script>
import BaseSelect from "@/components/base-select";
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
    };
  },
};
</script>
