<template>
  <div>
    <h3>MutationObserver测试</h3>
    <div ref="target">
      <span ref="targetSon1">i'm in target</span>
    </div>
    <el-divider></el-divider>
    <el-button @click="handleClickModify">更改字体颜色</el-button>
    <el-button @click="handleClickAdd">添加子节点</el-button>
    <el-button @click="handleClickAll">更改字体颜色添加一个子节点</el-button>
    <el-button @click="handleClickAddTwo">添加两个子节点</el-button>

  </div>
</template>

<script>
export default {
  name: "MutationObserver",
  data() {
    return {
      mo: null,
    };
  },
  mounted() {
    this.mo = new MutationObserver((mutationsList, observer) => {
      console.log("================");
      console.log(mutationsList);
      //   this.text = JSON.stringify(mutationsList);
      this.$refs.result.innerHTML = mutationsList;
    });
    this.mo.observe(this.$refs.target, { attributes: true, childList: true, subtree: true });
  },
  methods: {
    handleClickModify() {
      this.$refs.targetSon1.style.color = "red";
    },
    handleClickAdd() {
      let el = document.createElement("span");
      el.innerText = "new create";
      this.$refs.target.appendChild(el);
    },
    handleClickAll() {
      this.handleClickAdd();
      this.handleClickModify();
    },
    handleClickAddTwo() {
      let el = document.createElement("span");
      el.innerText = "子节点2";
      this.$refs.target.appendChild(el);

      let el2 = document.createElement("span");
      el2.innerText = "子节点3";
      this.$refs.target.appendChild(el2);
    },
  },
};
</script>
