<template>
  <div style="width: 100%; padding: 10px; box-sizing: border-box">
    <base-collapse :defaultExpand="true" backgroundColor="red">
      <template v-slot:title>
        <base-tag>异常指标汇总</base-tag>
      </template>
      <el-table :data="tableData">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
      </el-table>
      <!-- <p>134444412313131</p>
      <p>jalksdjflajfasjflka</p>
      <p>jsdlkfjalfjlaj</p> -->
    </base-collapse>
    <br />
    <base-tag>hello</base-tag>
  </div>
</template>

<script>
import BaseCollapse from "@/components/base-collapse/index.vue";
import BaseTag from "@/components/base-tag";
export default {
  components: {
    BaseCollapse,
    BaseTag,
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
