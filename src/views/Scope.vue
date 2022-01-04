<template>
  <div>
    <h3>this is Scope.vue</h3>
    <container>
      <span>see this</span>
    </container>
    <inner>
      <span>view this</span>
    </inner>
  </div>
</template>

<script>
import Container from "@/components/container";
import Inner from "@/components/inner";

export default {
  components: {
    Container,
    Inner
  },
};
</script>
