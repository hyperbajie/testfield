<script>
export default {
  props: {
    num: {
      type: String,
      default: function () {
        return "20";
      },
    },
  },
  render: function (h) {
    return (
      <div>
        <span>i'm jsxcom</span>
        <div>{this.num}</div>
      </div>
    );
  },
};
</script>
