<template>
  <div>
    <el-button @click="handleClickCustomize">自定义</el-button>
    <el-table v-bind="$attrs" :key="tableKey">
      <slot></slot>
    </el-table>
    <el-dialog :visible.sync="show">
      <template v-slot:title> 自定义 </template>
      <el-checkbox
        v-for="(item, index) in tempOptions"
        :key="index"
        v-model="item.show"
        >{{ item.label }}</el-checkbox
      >
      <template v-slot:footer>
        <el-button @click="handleClickConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      options: [],
      tempOptions: [],
      oldDefaultSlots: null,
      oriDefaultSlotsObj: {},
      tableKey: 0,
    };
  },
  mounted() {
    this.oldDefaultSlots = this.$slots.default;
    this.$slots.default.forEach((item) => {
      this.options.push({
        ...item.componentOptions.propsData,
        show: true,
      });
      this.oriDefaultSlotsObj[
        item.componentOptions.propsData.prop ||
          item.componentOptions.propsData.type
      ] = item;
    });
  },
  methods: {
    handleClickCustomize() {
      this.tempOptions = JSON.parse(JSON.stringify(this.options));
      this.show = true;
    },
    handleClickConfirm() {
      let temp = this.tempOptions.reduce((pre, cur) => {
        if (cur.show) {
          pre.push(this.oriDefaultSlotsObj[cur.prop || cur.type]);
        }
        return pre;
      }, []);
      //   console.log(this.tempOptions,temp);
      this.$slots.default = temp;
      this.options = this.tempOptions;
      this.tableKey ++;
      this.show = false;
    },
  },
};
</script>
