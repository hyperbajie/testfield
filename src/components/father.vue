<template>
  <div
    style="
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
    "
    @click="handleClick"
  >
    i'm father
  </div>
</template>

<script>
export default {
    methods: {
        handleClick() {
            document.body.removeChild(this.$el);
        }
    }
};
</script>
