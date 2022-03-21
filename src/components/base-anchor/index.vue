<template>
  <div class="container">
    <div class="bg-line"></div>
    <ul class="item-container">
      <li v-for="(item, index) in labelList" :key="index">
        <div class="circle bg-unselected"></div>
        <a class="common" :href="item.href">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    labelList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 15px 24px 15px 24px;
  height: 68px;
  position: relative;
}
.bg-line {
  width: 100%;
  height: 8px;
  border-bottom: 2px dashed #dcdfe6;
  position: relative;
  box-sizing: border-box;
}
.item-container {
  display: flex;
  justify-content: space-around;
  position: relative;
  top: -8px;
}
li {
  list-style-type: none;
  text-align: center;
}
a {
  text-decoration: none;
  display: inline-block;
  margin-top: 10px;
}
a[class="common"] {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #666666;
}
a[class="spec"] {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #3eb6ac;
}
.circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 0 auto;
}
.bg-unselected {
  background: #dcdfe6;
}
.bg-selected {
  background: #3eb6ac;
}
</style>
