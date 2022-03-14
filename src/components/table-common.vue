<template>
  <div>
    <div>
      <el-button @click="handleClickCustomrize">自定义</el-button>
    </div>
    <el-table
      :data="tableData"
      @select="handleSelectInStep"
      @select-all="handleSelectAllInStep"
      @selection-change="handleSelectionChange"
      ref="table"
    >
      <template v-for="(item, index) in tableHeader">
        <el-table-column
          v-if="item.type === 'selection'"
          type="selection"
          :key="index"
        ></el-table-column>
        <el-table-column
          v-else
          :key="index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
      </template>
    </el-table>
    <el-dialog :visible.sync="showFlag" title="自定义">
      <draggable
        v-model="headers"
        chosenClass="chosen"
        forceFallback="true"
        group="people"
        animation="500"
        :move="onMove"
      >
        <el-checkbox
          v-for="item in headers"
          :key="item.prop"
          :label="item.prop"
          v-model="item.selected"
          :class="[item.can ? 'unmover' : '']"
          >{{ item.label }}</el-checkbox
        >
      </draggable>

      <template v-slot:footer>
        <el-button @click="handleClickConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tableHeader: {
      type: Array,
      required: true,
    },
    selectRows: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      showFlag: false,
      select: [],
      headers: [],
      drag: false,
    };
  },
  methods: {
    handleClickCustomrize() {
      this.headers = this.tableHeader.map((item) => {
        return {
          label: item.label,
          prop: item.prop,
          selected: false,
          disabled: false,
          can: item.can,
        };
      });
      this.showFlag = true;
    },
    handleClickConfirm() {
      console.log("confirm");
      this.showFlag = false;
    },
    onMove(e) {
      if (e.relatedContext.element.prop == "score2") return false;
      //不允许拖拽
      if (e.draggedContext.element.prop == "score2") return false;
      return true;
    },
    handleSelectInStep(row, item) {
      this.$emit("evSelect", row, item);
    },
    handleSelectAllInStep(selection) {
      this.$emit("evSelectAll", selection);
    },
    handleSelectionChange(selection) {
      console.log("handleSelectionChange", ...arguments);
      this.$emit("evSelectionChange", selection);
    },
    toggleRowSelection(data, b) {
      this.$refs["table"].toggleRowSelection(data, b);
    },
  },
};
</script>

<style scoped>
.item {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 1px #3089dc !important;
}
</style>
