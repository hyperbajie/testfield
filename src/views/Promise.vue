<template>
  <div>
    <h3>i'm Promise</h3>
    <promised :promise="promise">
      <template v-slot="data">
        <div>fulfilled: {{ data.data }}</div>
      </template>
      <template v-slot:rejected>
        <div>reject slot</div>
      </template>
      <template v-slot:pending>
        <div>loading...</div>
      </template>
    </promised>
    <div>
      <el-button @click="handleClick">click switch promise</el-button>
    </div>
  </div>
</template>

<script>
import Promised from "@/components/promised";
export default {
  components: {
    Promised,
  },
  data() {
    return {
      promise: Promise.resolve(1),
    };
  },
  methods: {
    handleClick() {
      this.promise = new Promise((res, rej) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            res(110);
          } else {
            rej(0);
          }
        }, 5000);
      });
    },
  },
};
</script>
