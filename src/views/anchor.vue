<template>
  <div>
    <h3>anchor anchor</h3>
    <div style="width: 1000px">
      <BaseAnchor :labelList="labelList" elRefName="scrollEl"></BaseAnchor>
    </div>

    <br />
    <br />
    <br />
    <el-divider></el-divider>
    <div
      style="
        width: 1000px;
        background-color: pink;
        height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
      "
      ref="scrollEl"
    >
      <div id="info" style="background-color: rgba(255, 0, 0, 0.3)">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
      </div>
      <div id="detail" style="background-color: rgba(0, 255, 0, 0.3)">
        <p>a</p>
        <p>b</p>
        <p>c</p>
        <p>d</p>
        <p>e</p>
        <p>f</p>
        <p>g</p>
        <p>h</p>
        <p>i</p>
        <p>j</p>
      </div>
      <div id="history" style="background-color: rgba(0, 0, 255, 0.3)">
        <p>!</p>
        <p>@</p>
        <p>#</p>
        <p>$</p>
        <p>%</p>
        <p>^</p>
        <p>&</p>
        <p>*</p>
        <p>(</p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseAnchor from "@/components/base-anchor";
export default {
  name: "anchor",
  components: {
    BaseAnchor,
  },
  data() {
    return {
      labelList: [
        {
          label: "患者基础信息",
          href: "info",
        },
        {
          label: "非重阳详情",
          href: "detail",
        },
        {
          label: "回访历史",
          href: "history",
        },
      ],
    };
  },
};
</script>
