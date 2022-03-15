<template>
  <div>
    <h3>test-field</h3>
    <el-button @click="show = !show">toggle show</el-button>
    <transition name="fade">
      <p v-show="show">hide text</p>
    </transition>
    <el-divider></el-divider>
    <el-button @click="pageShow = !pageShow">toggle pageShow</el-button>
    <el-dialog :visible.sync="pageShow">
      <p>第一行</p>
      <p>第二行</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      pageShow: false,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>
