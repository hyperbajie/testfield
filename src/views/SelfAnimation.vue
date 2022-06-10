<template>
  <div>
    <h3>SelfAnimation</h3>
    <el-input v-model="inputStr"></el-input>
    <el-button @click="handleClickAdd">添加一个节点</el-button>
    <div ref="container" v-animate>
      <div v-for="(item, index) in list" :key="item.id">
        <span>{{ item.value }}</span> <el-button type="text" @click="handleClickDel(index)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfAnimation",
  data() {
    return {
      list: [
        {
          id: 1,
          value: "a-11",
        },
        {
          id: 2,
          value: "a-12",
        },
      ],
      id: 2,
      inputStr: "",
    };
  },
  methods: {
    handleClickDel(index) {
      this.list.splice(index, 1);
    },
    handleClickAdd() {
      if (!this.inputStr) {
        return;
      }
      this.list.push({
        id: ++this.id,
        value: this.inputStr,
      });
      this.inputStr = "";
    },
  },
};
</script>
