<template>
  <div>
    <h3>fix-row-table</h3>
    <el-table :data="tableData1">
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="age" prop="age"></el-table-column>
      <el-table-column label="gender" prop="gender"></el-table-column>
    </el-table>
    <el-table :data="tableData2" :show-header="false" height="300">
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="age" prop="age"></el-table-column>
      <el-table-column label="gender" prop="gender"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "fixrowtable",
  data() {
    return {
      tableData1: [
        {
          name: "zzz",
          age: 1,
          gender: 1,
        },
      ],
      tableData2: [
        {
          name: "qqq",
          age: 1,
          gender: 1,
        },
        {
          name: "yyy",
          age: 1,
          gender: 1,
        },
        {
          name: "www",
          age: 1,
          gender: 1,
        },
        {
          name: "eee",
          age: 1,
          gender: 1,
        },
        {
          name: "rrr",
          age: 1,
          gender: 1,
        },
        {
          name: "ttt",
          age: 1,
          gender: 1,
        },
        {
          name: "yyy",
          age: 1,
          gender: 1,
        },
        {
          name: "uuu",
          age: 1,
          gender: 1,
        },
      ],
    };
  },
};
</script>
