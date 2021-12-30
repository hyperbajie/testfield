<template>
  <div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    promised: {
      type: Promise,
      require: true,
    },
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style scoped>
.head {
  color: red;
}
.main {
  color: green;
}
.footer {
  color: blue;
}
</style>
