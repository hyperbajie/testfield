<template>
  <div>
    <el-button @click="handleCustom">自定义</el-button>
    <el-table :data="data">
      <slot></slot>
    </el-table>
    <el-dialog :visible.sync="show" width="50%" title="sayso">
      <el-checkbox-group v-model="select">
        <el-checkbox
          v-for="item in headers"
          :key="item.name"
          :label="item.name"
          v-model="item.select"
          >{{ item.name }}</el-checkbox
        >
      </el-checkbox-group>
      <template v-slot:footer>
        <el-button @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    inclusive: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      show: false,
      headers: [],
      reserveNode: undefined,
      select: [],
    };
  },
  mounted() {
    console.log("this:", this.$slots, Array.isArray(this.$slots.default));
    //收集配置
    if (this.$slots.default && this.$slots.default.length) {
      this.$slots.default.forEach((item) => {
        if (item.child) {
          this.headers.push(this.factoryOneOption(item.child.label));
          this.select.push(item.child.label);
        }
      });
    }
  },
  methods: {
    handleCustom() {
      this.show = true;
    },

    factoryOneOption(v) {
      return {
        name: v,
        select: true,
      };
    },
    handleChange(index) {
      if (this.headers[index].select) {
        this.$slots.default[index] = this.reserveNode[index];
      } else {
        this.reserveNode[index] = this.$slots.default[index];
        this.$slots.default[index] = null;
      }
    },
    confirm() {
      if (!this.reserveNode) {
        this.reserveNode = this.$slots.default;
      }
      this.$slots.default = this.reserveNode.filter((item) => {
        return this.select.indexOf(item.child.label) > -1;
      });
    },
  },
};
</script>
