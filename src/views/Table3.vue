<template>
  <div>
    <h3>Table3 vue</h3>
    <table-common
      :tableData="tableData[pageIndex]"
      :tableHeader="tableHead"
      @evSelect="handleSelectInStep"
      @evSelectAll="handleSelectAllInStep"
      ref="table"
    ></table-common>
    <el-row>
      <el-button @click="pre">上一页</el-button>
      <el-button @click="next">下一页</el-button>
    </el-row>
    <el-row>
      <el-button @click="show">展示</el-button>
    </el-row>
  </div>
</template>

<script>
import TableCommon from "@/components/table-common";

export default {
  components: {
    TableCommon,
  },
  data() {
    return {
      tableHead: [
        {
          type: "selection",
        },
        {
          label: "姓名",
          prop: "name",
          can: false,
        },
        {
          label: "年龄",
          prop: "age",
          can: false,
        },
        {
          label: "分数",
          prop: "score",
          can: false,
        },
        {
          label: "分数2",
          prop: "score2",
          can: true,
        },
      ],
      tableData: [
        [
          {
            name: "joe",
            id: 1,
            age: 23,
            score: 36,
            score2: 21,
          },
          {
            name: "johnson",
            id: 2,
            age: 30,
            score: 11,
            score2: 23,
          },
          {
            name: "guy",
            id: 3,
            age: 27,
            score: 24,
            score2: 35,
          },
        ],
        [
          {
            name: "joe2",
            id: 4,
            age: 23,
            score: 36,
            score2: 21,
          },
          {
            name: "johnson2",
            id: 5,
            age: 30,
            score: 11,
            score2: 23,
          },
          {
            name: "guy2",
            id: 6,
            age: 27,
            score: 24,
            score2: 35,
          },
        ],
        [
          {
            name: "joe3",
            id: 7,
            age: 23,
            score: 36,
            score2: 21,
          },
          {
            name: "johnson3",
            id: 8,
            age: 30,
            score: 11,
            score2: 23,
          },
          {
            name: "guy3",
            id: 9,
            age: 27,
            score: 24,
            score2: 35,
          },
        ],
      ],
      pageIndex: 0,
      currentTableSelection: [],
    };
  },
  methods: {
    pre() {
      if (this.pageIndex <= 0) return;
      this.pageIndex--;
      this.$nextTick(() => {
        this.currentTableSelection.forEach((item) => {
          for (let i = 0; i < this.tableData[this.pageIndex].length; i++) {
            if (this.tableData[this.pageIndex][i].id == item.id) {
              this.$refs["table"].toggleRowSelection(this.tableData[this.pageIndex][i], true);
            }
          }
        });
      });
    },
    next() {
      if (this.pageIndex >= this.tableData.length - 1) return;
      this.pageIndex++;
      this.$nextTick(() => {
        this.currentTableSelection.forEach((item) => {
          for (let i = 0; i < this.tableData[this.pageIndex].length; i++) {
            if (this.tableData[this.pageIndex][i].id == item.id) {
              this.$refs["table"].toggleRowSelection(this.tableData[this.pageIndex][i], true);
            }
          }
        });
      });
    },
    /**
     * 单选
     */
    handleSelectInStep(rows, item) {
      let index = -1;
      for (let i = 0; i < this.currentTableSelection.length; i++) {
        if (this.currentTableSelection[i].id == item.id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        this.currentTableSelection.splice(index, 1);
      } else {
        this.currentTableSelection.push(item);
      }
    },
    /**
     * 全选
     */
    handleSelectAllInStep(selection) {
      if (selection.length == 0) {
        for (let i = 0; i < this.tableData[this.pageIndex].length; i++) {
          for (let j = 0; j < this.currentTableSelection.length; j++) {
            if (
              this.currentTableSelection[j].id ==
              this.tableData[this.pageIndex][i].id
            ) {
              this.currentTableSelection.splice(j, 1);
              break;
            }
          }
        }
      } else {
        for (let i = 0; i < selection.length; i++) {
          let item = selection[i];
          if (
            !this.currentTableSelection.some((obj) => {
              return obj && obj.id == item.id;
            })
          ) {
            this.currentTableSelection.push(item);
          }
        }
      }
    },
    show() {
      console.log("select", this.currentTableSelection);
    },
  },
};
</script>
