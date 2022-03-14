<template>
  <div class="container" :style="{ 'background-color': backgroundColor }">
    <div class="title" @click="handleClick">
      <div class="title-one">
        <slot name="title"></slot>
      </div>
      <div class="title-flag">
        <span
          class="el-icon-arrow-right base-collapse-transition"
          :class="{ 'title-flag-rotate': !isCollapse }"
        ></span>
      </div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    >
      <div class="content-container" v-show="!isCollapse">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    defaultExpand: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    backgroundColor: {
      type: String,
      default: function () {
        return "white";
      },
    },
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  created() {
    this.isCollapse = this.defaultExpand;
  },
  methods: {
    handleClick() {
      this.isCollapse = !this.isCollapse;
      this.$emit("change", this.isCollapse);
    },

    beforeEnter(el) {
      el.classList.add("base-collapse-transition");
      el.style.height = "0";
    },
    enter(el) {
      el.style.height = `${el.scrollHeight}px`;
    },
    afterEnter(el) {
      el.classList.remove("base-collapse-transition");
      el.style.height = "";
    },

    beforeLeave(el) {
      el.style.height = `${el.scrollHeight}px`;
    },
    leave(el) {
      if (el.scrollHeight != 0) {
        el.classList.add("base-collapse-transition");
        el.style.height = "0";
      }
    },
    afterLeave(el) {
      el.style.height = "";
      el.classList.remove("base-collapse-transition");
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  border-radius: 8px;
  position: relative;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 40px;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.title-one {
  flex: 1;
}
.title-flag {
  width: 20px;
  height: 20px;
  line-height: 22px;
  border-radius: 12px;
  border: 2px solid gray;
  text-align: center;
}
.title-flag-rotate {
  transform: rotate(90deg);
}
.content-container {
  width: 100%;
  overflow: hidden;
  background-color: transparent;
}
.base-collapse-transition {
  -webkit-transition: 0.3s all ease-in-out;
  transition: 0.3s all ease-in-out;
}
</style>
