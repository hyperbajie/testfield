<script>
import CacheParent from "./cache-parent.vue";
export default {
  name: "CacheChild",
    extends: CacheParent,
//   mixins: [CacheParent],
  data() {
    return {
      title: "cache child",
    };
  },
  methods: {
    handleClickOne() {
      console.warn("im in cachechild page");
    },
  },
};
</script>
