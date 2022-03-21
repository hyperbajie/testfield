<template>
  <div>
    <h3>anchor anchor</h3>
    <div style="width: 1000px">
      <BaseAnchor :labelList="labelList"></BaseAnchor>
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
          href: "#info",
        },
        {
          label: "非重阳详情",
          href: "#detail",
        },
        {
          label: "回访历史",
          href: "#history",
        },
      ],
    };
  },
};
</script>
