<template>
  <div>
    <h3>filter-instance</h3>
    <el-select v-model="currValue" clearable>
      <el-option v-for="item in userList" v-hasPermission="{item,'role': 'system'}" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled || false">
      </el-option>
    </el-select>
    <el-table :data="userList">
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="age" prop="age"></el-table-column>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="score" prop="score"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "filter-instance",
  directives: {
    hasPermission: {
      inserted(el, binding) {
        // if (binding.value.score < 10) {
        //   binding.value.disabled = true;
        // }
        console.log("binding", binding.value);
      },
      update(el, binding) {
        if (binding.value.score < 10) {
          binding.value.disabled = true;
        }
      },
    },
  },
  data() {
    return {
      userList: [
        {
          name: "li",
          age: 11,
          id: 10,
          score: 11,
        },
        {
          name: "wang",
          age: 13,
          id: 11,
          score: 9,
          disabled: false
        },
        {
          name: "zhang",
          age: 13,
          id: 14,
          score: 13,
        },
      ],
      currValue: "",
    };
  },
  methods: {
    filter(arr, auth) {
      return arr.filter((item) => {
        return item.score >= 10;
      });
    },
  },
};
</script>
