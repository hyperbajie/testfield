<template>
  <div style="width: 100%; height: 100%">
    <div class="side-bar">
      <ul>
        <li v-for="item in routes" :key="item.path" @click="handleClick(item.path)" :class="{ selected: item.path === currentPath }">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="content-wrapper">
      <transition name="fade">
        <router-view class="app-container"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { lastRoutes } from "@/router/index.js";
export default {
  data() {
    return {
      routes: lastRoutes,
    };
  },
  methods: {
    handleClick(path) {
      if (this.$route.path == path) {
        return;
      }
      this.$router.push(path);
    },
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.side-bar {
  width: 200px;
  float: left;
  height: 100%;
  background-color: #e0f8f7;
}
ul {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
li {
  height: 50px;
  line-height: 50px;
  color: black;
  cursor: pointer;
  text-indent: 10px;
}
li:hover {
  background-color: #81bef7;
  color: white;
  font-size: 20px;
}
.content-wrapper {
  width: calc(100% - 200px);
  height: 100%;
  position: relative;
  margin-left: 200px;
  overflow: auto;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
.selected {
  background-color: #81bef7;
  color: white;
  font-size: 20px;
}
</style>
