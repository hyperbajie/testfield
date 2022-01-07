<template>
  <div class="mask" @click="removeSelf">
    <div class="content" ref="content"></div>
  </div>
</template>

<script>
export default {
  methods: {
    removeSelf() {
      this.$el.parentNode.removeChild(this.$el);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["content"].style.right = "0px";
    });
  },
};
</script>

<style scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.content {
  position: absolute;
  width: 500px;
  right: -500px;
  height: 100%;
  transition: right 10s ease;
  background-color: white;
}
</style>
