<template>
  <div>
    <slot name="pending" v-if="promiseStatus == 'pending'"></slot>
    <slot v-if="promiseStatus == 'fulfilled'" :data="promiseData"></slot>
    <slot name="rejected" v-if="promiseStatus == 'rejected'"></slot>
  </div>
</template>

<script>
export default {
  props: {
    promise: {
      type: Promise,
      default: function () {
        return undefined;
      },
    },
  },
  data() {
    return {
      promiseStatus: "pending",
      promiseData: undefined,
    };
  },
  computed: {
    // promiseData: {
    //   get: async function () {
    //     if (this.promise instanceof Promise) {
    //       return await promise;
    //     }
    //     return undefined;
    //   },
    // },
  },
  watch: {
    promise: {
      immediate: true,
      handler: function () {
        console.log("watch changed");
        this.promiseStatus = "pending";
        if (this.promise instanceof Promise) {
          this.promise.then(
            (v) => {
              this.promiseStatus = "fulfilled";
              this.promiseData = v;
            },
            (r) => {
              this.promiseStatus = "rejected";
              this.promiseData = undefined;
            }
          );
        }
      },
    },
  },
};
</script>
