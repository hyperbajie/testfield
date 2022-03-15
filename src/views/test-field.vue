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
    <el-divider></el-divider>
    <vmodel v-model="data1"></vmodel>
    <p>data1: {{data1}}</p>
    <el-divider></el-divider>
  </div>
</template>

<script>
import vmodel from "@/components/vmodel.vue";
export default {
  components: {
    vmodel
  },
  data() {
    return {
      show: false,
      pageShow: false,
      data1: ""
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
