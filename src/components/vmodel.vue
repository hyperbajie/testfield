<template>
  <div>
    <p>vmodel com</p>
    <input type="text" :value="value" @input="handleInput" ref="inputt" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  methods: {
    handleInput(v) {
      this.$emit("input", this.$refs.inputt.value);
    },
  },
};
</script>
