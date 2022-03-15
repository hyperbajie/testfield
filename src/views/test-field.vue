<template>
  <div>
    <h3>test-field</h3>
    <el-button @click="show = !show">toggle</el-button>
    <transition name="fade">
      <p v-show="show">hide text</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
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
