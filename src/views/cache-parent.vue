<template>
  <div>
    <h3>{{ title }}</h3>
    <el-button @click="handleClickOne">点击</el-button>
  </div>
</template>

<script>
export default {
  name: "cacheparent",
  data() {
    return {
      title: "cache parent",
    };
  },
  methods: {
    handleClickOne() {
      console.log("im in cacheparent page");
    },
  },
};
</script>
