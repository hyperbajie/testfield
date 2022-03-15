<template>
  <div>
    <h3>i'm pop</h3>
    <el-button @click="click">click</el-button>
  </div>
</template>

<script>
import { popfunc } from "@/tools/pop";
export default {
  name: "pop",
  methods: {
    click() {
        popfunc();
    },
  },
};
</script>
