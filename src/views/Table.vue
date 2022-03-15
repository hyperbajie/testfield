<template>
  <div>
    <h3>i'm table view</h3>
    <!-- <my-table :data="tableData">
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="age" prop="age"></el-table-column>
    </my-table> -->
    <!-- <js-table :tableData="tableData" :tableHeader="tableHeader"> </js-table> -->
    <com-table
      :headers="tableHeader"
      :tableData="tableData"
      :includes="['name', 'age']"
    ></com-table>
  </div>
</template>

<script>
import MyTable from "@/components/my-table";
import JsTable from "@/components/js-table";
import ComTable from "@/components/com-table";
export default {
  name: "table",
  components: {
    MyTable,
    JsTable,
    ComTable,
  },
  data() {
    return {
      tableData: [
        {
          name: "sf",
          age: 1,
        },
        {
          name: "ts",
          age: 2,
        },
      ],
      tableHeader: [
        {
          label: "name",
          prop: "name",
        },
        {
          label: "age",
          prop: "age",
        },
      ],
    };
  },
};
</script>
