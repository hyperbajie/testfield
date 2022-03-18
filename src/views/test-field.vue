<template>
  <div class="app-container">
    <h3>test-field</h3>
    <el-button @click="show = !show">toggle show</el-button>
    <transition name="fade">
      <p v-show="show">hide text</p>
    </transition>
    <el-divider></el-divider>
    <el-button @click="pageShow = !pageShow">toggle pageShow</el-button>
    <el-dialog :visible.sync="pageShow">
      <p>第一行</p>
      <p>第二行</p>
    </el-dialog>
    <el-divider></el-divider>
    <vmodel v-model="data1"></vmodel>
    <p>data1: {{ data1 }}</p>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1">
      </el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2">
      </el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3">
      </el-table-column>
    </el-table>

    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="width: 500px">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
    </div>
    <el-divider></el-divider>
    <el-tag v-for="(item,index) in tags" :key="index">
      {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import vmodel from "@/components/vmodel.vue";
export default {
  name: "testfield",
  components: {
    vmodel,
  },
  data() {
    return {
      show: false,
      pageShow: false,
      data1: "",
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      textarea: "",
      tags: [
        {
          label: "v1"
        },
        {
          label: "v2"
        }
      ]
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
      // console.log("row,column", rowIndex, columnIndex);
      if (rowIndex == 0 && columnIndex == 1) {
        return [5, 1];
      } else if (columnIndex == 1) {
        return [0, 1];
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>
