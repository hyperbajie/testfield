<template>
  <div>
    <h3>Element.animate 接口测试;增加元素时附加动画</h3>
    <el-button @click="handleClickEle">添加元素</el-button>
    <div ref="container" class="container"></div>
  </div>
</template>

<script>
export default {
  name: "Animation",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleClickEle() {
      let el = document.createElement("span");
      el.innerText = Math.random().toFixed(2);
      let animation = el.animate(
        [
          { transform: "scale(.98)", opacity: 0 },
          { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: 1000,
          easing: "ease-in",
        }
      );
      this.$refs.container.appendChild(el);
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  border: 1px solid pink;
  border-radius: 10px;
  min-height: 100px;
  width: 800px;
  padding: 10px;
}
</style>
