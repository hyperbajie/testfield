<template>
  <div>
    <h3>AutoAnimate的测试</h3>
    <el-input v-model="inputStr"></el-input>
    <el-button plain @click="handleClickAdd">add</el-button>
    <ul v-auto-animate="{ duration: 100 }">
      <li style="height: 30px; line-height: 30px; margin: 20px 0" v-for="(item, index) in list" :key="item.id">
        <div style="display: inline-block">{{ item.name }}</div>
        <el-button style="margin-left: 10px" plain @click="handleClickRemove(item, index)">remove</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * AutoAnimate 的测试
 * AutoAnimate在vue中使用directive的方式实现对该元素或其直接子元素增删改的动画添加
 * AutoAnimate在directive中使用mounted钩子函数，因此在vue2中无法直接使用
 */
export default {
  name: "AutoAnimate",
  data() {
    return {
      list: [
        {
          id: 1,
          name: "zs",
        },
      ],
      id: 1,
      inputStr: "",
    };
  },
  methods: {
    handleClickAdd() {
      if (!this.inputStr) {
        return;
      }
      this.list.push({
        id: ++this.id,
        name: this.inputStr,
      });
      this.inputStr = "";
    },
    handleClickRemove(item, index) {
      this.list.splice(index, 1);
    },
  },
};
</script>
