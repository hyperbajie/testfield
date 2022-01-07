<template>
  <el-table :data="data">
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  created() {
      console.log(Array.isArray(this.$slots));
  }
};
</script>
