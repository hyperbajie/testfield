<template>
  <el-select v-bind="$attrs" v-model="localV">
    <el-option
      v-for="item in list"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    currV: {
      type: String | Number,
      default: function () {
        return null;
      },
    },
  },
  computed: {
    localV: {
      get: function () {
        return this.currV;
      },
      set: function (v) {
        this.$emit("update:currV", v);
      },
    },
  },
};
</script>
