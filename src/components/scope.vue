<script>
export default {
  props: {
    message: String,
  },
  render(h) {
    return h("div",{style:"color: pink;"}, [
      this.$scopedSlots.default(),
    ]);
  },
};
</script>
