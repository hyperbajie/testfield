<template>
  <div>
    <h3>懒加载的指令测试</h3>
    <el-select v-model="curSelect" v-lazyload="loadMore" filterable clearable remote :remote-method="searchInList" @focus="resetList">
      <el-option v-for="item in caseNumList" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import { HosCaseNums } from "@/mock/hosCaseNums";
export default {
  name: "LazySelect",
  directives: {
    lazyload: {
      bind: function (el, binding) {
        const SELECTWRAP_DOM = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (CONDITION) {
            binding.value();
          }
        });
      },
    },
  },
  data() {
    return {
      curSelect: undefined,
      caseNumList: [],
      lazyLoadObj: {
        page: 1,
        oriList: HosCaseNums,
        searchList: [],
        limit: 50,
        add: 20,
        inSearch: false,
      },
    };
  },
  created() {
    this.caseNumList = this.getCaseNumList();
  },
  methods: {
    loadMore() {
      console.log("moremore");
      this.lazyLoadObj.page++;
      this.caseNumList = this.getCaseNumList();
    },
    getCaseNumList() {
      if (this.lazyLoadObj.oriList.length > this.lazyLoadObj.limit) {
        return this.lazyLoadObj.oriList.slice(0, this.lazyLoadObj.page * this.lazyLoadObj.add);
      }
      return this.lazyLoadObj.oriList;
    },
    searchInList(query) {
      console.log("search in list:", query);
      if (query) {
        this.lazyLoadObj.inSearch = true;
        this.caseNumList = this.lazyLoadObj.oriList.filter((item) => {
          return item.label.indexOf(query) >= 0;
        });
      } else {
        // 删除玩的情形
      }
    },
    resetList() {
      this.lazyLoadObj.page = 1;
      this.lazyLoadObj.inSearch = false;
      this.lazyLoadObj.searchList = [];
      this.caseNumList = this.getCaseNumList();
    },
  },
};
</script>
