<template>
  <div>
    <h3>权限指令测试</h3>
    <br />
    <button v-permission:[tar]="autho">you know</button>
    <br />
    <button v-on:click="handleClick">toggle</button>
  </div>
</template>

<script>
export default {
  name: "Permission",
  directives: {
    permission: {
      inserted: function (el, binding) {
        const { value, arg } = binding;
        console.log("value", value, arg)
        if (arg.indexOf(value) < 0) {
          el.style.display = "none";
        } else {
          el.style.display = "";
        }
      },
      update: function (el, binding) {
        const { value, arg } = binding;
        console.log("update");
        if (arg.indexOf(value) < 0) {
          el.style.display = "none";
        } else {
          el.style.display = "";
        }
      },
    },
  },
  data() {
    return {
      show: true,
      autho: "doctor",
      tar: ["doctor", "dept"],
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
      if( this.show ) {
          this.autho = "doctor";
      } else {
          this.autho = "hos";
      }
    }
  },
};
</script>
