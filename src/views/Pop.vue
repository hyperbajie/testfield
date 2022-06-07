<template>
  <div>
    <h3>两个弹窗</h3>
    <el-button @click="click">右侧弹窗</el-button>
    <el-button @click="handleClick">弹出对话框</el-button>
  </div>
</template>

<script>
import { popfunc } from "@/tools/pop";
import { popfunc as popDialog } from "@/components/base-pop/index.js";
export default {
  name: "Pop",
  methods: {
    click() {
      popfunc();
    },
    handleClick() {
      popDialog();
    },
  },
};
</script>
