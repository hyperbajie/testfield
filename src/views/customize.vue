<template>
  <div>
    <h3>customize page</h3>
    <base-table :data="tableData">
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="性别" prop="gender">
          <template v-slot="scope">
              {{scope.row.gender == 1 ? "男":"女"}}
          </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="备注" prop="note"></el-table-column>
    </base-table>
  </div>
</template>

<script>
import BaseTable from "@/components/base-table";
export default {
  name: "Customize",
  components: {
    BaseTable,
  },
  data() {
    return {
      tableData: [
        {
          name: "汤秀兰",
          age: 94,
          gender: 1,
          email: "i.qofpbiyue@vgvhsk.gi",
          note: "S",
        },
        {
          name: "黄艳",
          age: 100,
          gender: 1,
          email: "e.wmsafrhcp@dgdwsevo.py",
          note: "g",
        },
        {
          name: "雷芳",
          age: 44,
          gender: 0,
          email: "x.qslzvgt@tbjwbzmyv.nz",
          note: "g",
        },
        {
          name: "龙秀兰",
          age: 119,
          gender: 0,
          email: "f.yhtxiqme@gddl.sm",
          note: "x",
        },
        {
          name: "唐杰",
          age: 58,
          gender: 1,
          email: "g.qjfx@uiye.fr",
          note: "M",
        },
      ],
    };
  },
};
</script>
