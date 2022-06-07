<template>
  <div>
    <h3>BaseCollapse测试</h3>
    <base-collapse :defaultExpand="true">
      <template v-slot:title>
        <p>异常信息</p>
      </template>
      <el-table :data="tableData">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
      </el-table>
    </base-collapse>
  </div>
</template>

<script>
import BaseCollapse from "@/components/base-collapse/index.vue";
export default {
  name: "collapse",
  components: {
    BaseCollapse
  },
  data() {
    return {
      tableData: [
        {
          name: "name1",
          age: "28",
        },
        {
          name: "name2",
          age: "23",
        },
      ],
    };
  },
};
</script>
