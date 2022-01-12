<template>
  <div>
    <el-button @click="handleCustomize">自定义</el-button>
    <el-table
      :data="tableData"
      :style="{ visibility: processing ? 'hidden' : 'visible' }"
    >
      <el-table-column
        v-for="item in realHeaders"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
    <el-dialog :visible.sync="show" title="Custom">
      <el-checkbox-group v-model="temp">
        <el-checkbox
          v-for="item in headers"
          :label="item.prop"
          :key="item.prop"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group>
      <template v-slot:footer>
        <el-button @click="handleConfirm">Confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    includes: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      localIncludes: [],
      show: false,
      temp: [],
      processing: false,
    };
  },
  computed: {
    realHeaders: function () {
      return this.headers.filter((item) => {
        return this.localIncludes.indexOf(item.prop) > -1;
      });
    },
  },
  created() {
    this.localIncludes = this.includes.slice();
  },
  methods: {
    handleConfirm() {
      this.show = false;
      this.processing = true;
      //   this.localIncludes = this.temp;
      //   setTimeout(() => {
      //     this.processing = false;
      //   }, 0);
      this.localIncludes = this.temp;
      this.$nextTick(() => {
        this.processing = false;
      });
    },
    handleCustomize() {
      this.temp = this.localIncludes.slice();
      this.show = true;
    },
  },
};
</script>
