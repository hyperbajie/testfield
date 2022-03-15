<template>
  <div>
    <el-button @click="handleClick">clickclickclick</el-button>
  </div>
</template>

<script>
import { popfunc } from "@/components/base-pop/index.js";
export default {
  methods: {
    handleClick() {
      popfunc();
    },
  },
};
</script>
