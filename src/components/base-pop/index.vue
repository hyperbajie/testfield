<template>
  <div class="mask base-pop-transition" @click="close">
    <transition name="fade">
      <div v-if="show" class="content-body">wtf</div>
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
  methods: {
    close() {
      this.show = false;
      this.$nextTick(() => {
        document.body.removeChild(this.$el);
      });
    },
  },
};
</script>

<style scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
}
.content-body {
  width: 500px;
  height: 500px;
  background-color: white;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  margin-top: -250px;
  left: 50%;
  margin-left: -250px;
}
.base-pop-transition {
  -webkit-transition: 1s all ease-in-out;
  transition: 1s all ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
