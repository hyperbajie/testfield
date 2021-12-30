<template>
  <div>
    <h1>say lalala</h1>
    <el-table :data="tableData" border @header-contextmenu="handle111">
      <el-table-column label="属性a" prop="a"></el-table-column>
      <el-table-column label="属性b" prop="b"></el-table-column>
      <el-table-column label="属性c" prop="c"></el-table-column>
    </el-table>
    <table cellspacing="0" cellpadding="0" border="1">
      <tr>
        <th>A</th>
        <th>B</th>
        <th>C</th>
      </tr>
      <tr>
        <td>110</td>
        <td>111</td>
        <td>112</td>
      </tr>
      <tr>
        <td>110</td>
        <td>111</td>
        <td>112</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          a: 1,
          b: 2,
          c: 3,
        },
        {
          a: 11,
          b: 22,
          c: 33,
        },
        {
          a: 111,
          b: 222,
          c: 333,
        },
      ],
    };
  },
  methods: {
    handle111: function (column, event) {
      console.log("column:", column);
      console.log("event:", event);
    },
  },
};
</script>

<style scoped>
th, td {
  padding: 10px;
}
</style>
