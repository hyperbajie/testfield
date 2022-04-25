<template>
  <div class="app-container">
    <h3>test-field</h3>
    <el-table :data="tableData|removeEmpty">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="age" prop="age"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "testfield",
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
