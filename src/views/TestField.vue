<template>
  <div>
    <h3>vue综合测试</h3>
    <el-table :data="tableData|removeEmpty">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="age" prop="age"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TestField",
  filters: {
    removeEmpty: function(value) {
      return value.filter(item=>{
        return !!item;
      })
    }
  },
  data() {
    return {
      tableData: [{
        id: 7,
        name: "joe",
        age: 11
      },null,{
        id: 9,
        name: "jordan",
        age: 40
      }],
    };
  },
};
</script>
