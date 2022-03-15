<template>
  <div style="width: 100%; height: 100%">
    <div class="side-bar"></div>
    <div>
        <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.side-bar {
  width: 100px;
  float: left;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
