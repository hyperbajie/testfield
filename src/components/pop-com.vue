<template>
  <div class="mask" @click.self="removeSelf">
    <!-- <div class="content" ref="content">
      <slot></slot>
    </div> -->
    <transition name="star">
      <div v-if="show" class="content"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    removeSelf() {
      this.$el.parentNode.removeChild(this.$el);
    },
  },
  mounted() {
    //放在两个task中
    // setTimeout(() => {
    //   this.$refs["content"].style.right = "0px";
    // }, 0);
    this.show = true;
  },
};
</script>

<style>
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
  top: 0px;
  height: 100%;
  right: 0px;
  background-color: white;
}
.star-enter {
  right: -500px;
}
.star-enter-active {
  transition: all 1s ease-in-out;
}
.star-enter-to, .star-leave-to {
  right: 0px;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
