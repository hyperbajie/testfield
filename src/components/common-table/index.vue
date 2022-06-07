<template>
  <div class="group-table">
    <div v-if="configurable">
      <el-button
        icon="el-icon-setting"
        @click="handleClickCustomrize"
        type="text"
        >自定义列表</el-button
      >
    </div>
    <el-table
      :data="data"
      style="width: 100%"
      @sort-change="clickSort"
      @selection-change="selectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      v-loading="loading"
      v-bind="$attrs"
    >
      <template v-for="(item, index) in realHeadInfo">
        <!-- 选项列 -->
        <el-table-column
          v-if="item.type == 'selection'"
          :key="index"
          type="selection"
          :width="getColumnWidth(item, index)"
        ></el-table-column>
        <!-- 可扩展列 -->
        <el-table-column
          v-else-if="item.type == 'expand'"
          :key="index"
          :label="getLabel(item)"
          type="expand"
          :width="getColumnWidth(item, index)"
        >
          <template v-slot="scope">
            <slot
              :name="item.type"
              :row="scope.row.children"
              v-if="scope.row.children"
            ></slot>
          </template>
        </el-table-column>
        <!-- 普通列，包括按钮，各种格式化 -->
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="getLabel(item)"
          :sortable="item.sortable ? 'custom' : false"
          :align="columnAlign"
          :width="getColumnWidth(item, index)"
          :show-overflow-tooltip="item.showOverflowTooltip"
        >
          <template v-slot="scope">
            <template v-if="isBtnArr(scope, item)">
              <template
                v-for="(btnItem, btnIndex) in getBtnArr(
                  item.operations,
                  scope.row
                )"
              >
                <el-button
                  :key="btnIndex"
                  @click="handleClickBtn(scope.row, btnItem, btnIndex)"
                  type="text"
                  size="small"
                  :disabled="checkIsSpecial(scope.row, btnItem)"
                >
                  {{ getBtnText(scope, btnItem) }}
                </el-button>
              </template>
            </template>
            <div
              v-else-if="item.contentFormat"
              v-html="getContent(scope, item)"
            ></div>
            <span v-else>{{ getCommonContent(scope, item) }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div
      class="table-footer"
      v-if="(checkIsShowExportBtn() || pagination) && !loading"
    >
      <el-button
        v-if="checkIsShowExportBtn()"
        class="export-btn"
        @click="handleClickExportBtn"
        >导出</el-button
      >
      <base-pagination
        style="margin-top: 0;"
        v-if="pagination"
        v-show="pagination.total > 0"
        :total="pagination.total"
        :page.sync="pagination.page"
        :limit.sync="pagination.limit"
        @pagination="turnPage"
      />
    </div>

    <el-dialog :visible.sync="customrizeShow" title="自定义列表" append-to-body>
      <div style="margin-bottom: 20px;">
        <el-button @click="selectAll">全选</el-button>
      </div>
      <draggable
        v-model="tempHeaderOptions"
        forceFallback="true"
        group="people"
        animation="300"
        delay="500"
        style="display: flex;flex-wrap: wrap;flex-direction: column;height: 200px;"
        :move="onMove"
      >
        <div
          style="width: 150px;height: 30px;"
          v-for="item in tempHeaderOptions"
          :key="item.prop"
        >
          <el-checkbox
            :label="item.prop"
            v-model="item.selected"
            :disabled="!item.clickable"
            size="medium"
          >
            {{ item.label }}
          </el-checkbox>
        </div>
      </draggable>
      <template slot="footer">
        <el-button @click="handleConfirmCustomrize">确认</el-button>
        <el-button @click="handleResetCustomrize">重置</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { formatPercentage, formatDecimal } from "./utils";
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 表头数据
    headInfo: {
      required: true,
      type: Array
    },
    // 供查询的字典
    dicts: {
      required: false,
      type: Object,
      default: function() {
        return {};
      }
    },
    // 分页的数据
    pagination: {
      type: Object,
      default: null
    },
    // 统一列宽
    columnWidth: {
      required: false,
      type: String,
      default: ""
    },
    // 是否正在加载中
    loading: {
      required: false,
      type: Boolean,
      default: false
    },
    // 导出方法，当有值传入时，显示导出按钮
    exportFunction: {
      required: false,
      default: false
    },
    // 单元格文字对齐方式
    columnAlign: {
      required: false,
      type: String,
      default: function() {
        return "center";
      }
    },
    // 是否将普通格子填充字符串null
    fillingNull: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 是否可配置
    configurable: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 自定义配置的标识，只有标识有值时才会保存
    customrizeKey: {
      type: String,
      default: function() {
        return undefined;
      }
    }
  },
  data() {
    return {
      // 表头选项
      headerOptions: [],
      // 配置页面开启标识
      customrizeShow: false,
      // 临时表头选项
      tempHeaderOptions: [],
      // 真实表头数据,即显示数据
      realHeadInfo: []
    };
  },
  watch: {
    headInfo: {
      deep: true,
      handler: function() {
        this.headerOptions = [];
        this.generateRealHeadInfoFirst();
      }
    }
  },
  computed: {
    // 获取是否有总计的内容
    totalMark() {
      let temp = null;
      if (this.headInfo) {
        for (let i = 0; i < this.headInfo.length; i++) {
          if (this.headInfo[i].totalMark) {
            temp = this.headInfo[i].prop;
            break;
          }
        }
      }
      return temp;
    },

    /**
     * 对象形式的表头数据，方便查询
     */
    headerObj() {
      let result = {};
      this.headInfo.forEach(item => {
        result[item.prop] = item;
      });
      return result;
    }
  },
  created() {
    //创建时处理表格头
    // 需要自定义表头的功能
    this.generateRealHeadInfoFirst();
  },
  methods: {
    /**
     * @description 点击单个选择框
     */
    handleSelect(row, index) {
      this.$emit("evSelect", row, index);
    },
    /**
     * @description 全选按钮
     */
    handleSelectAll(selection) {
      this.$emit("evSelectAll", selection);
    },
    /**
     * @description 获取列宽
     */
    getColumnWidth(item, index) {
      return item.width || this.columnWidth;
    },

    /**
     * @description 获取标签内容
     */
    getLabel(item) {
      let temp = item.label;
      if (item.labelFormat == "lastYear") {
        let date = new Date();
        temp = `${date.getFullYear() - 1}年${item.label}`;
      }
      return temp;
    },

    /**
     * @description 获取索引
     */
    getIndex(scope) {
      return this.pagination
        ? (this.pagination.page - 1) * this.pagination.limit + scope.$index + 1
        : scope.$index + 1;
    },

    /**
     * @description 是否是按钮
     */
    isBtnArr(scope, item) {
      return scope.row[this.totalMark] !== "总计" && !!item.operations;
    },

    /**
     * @description 点击按钮
     */
    handleClickBtn(row, btnItem, index) {
      this.$emit("evClickButton", { ev: btnItem.ev, row });
    },

    /**
     * @description 获取按钮文字。优先prop
     */
    getBtnText(scope, btnItem) {
      if (!scope.row) return;
      if (btnItem.prop !== undefined) {
        return scope.row[btnItem.prop];
      }
      if (btnItem.name !== undefined) {
        return btnItem.name;
      }
      return "";
    },

    /**
     * @description 获取内容
     */
    getContent(scope, item) {
      if (!scope.row) {
        return "";
      }
      if (item.contentFormat) {
        if (toString.call(scope.row[item.prop]) == "[object Null]") {
          return "";
        }
        // 如果是传入的方法直接执行返回
        if (typeof item.contentFormat == "function") {
          return item.contentFormat(scope.row);
        }
        switch (item.contentFormat) {
          case "upperRed":
          case "upperRed2":
          case "upperGreen":
          case "upperGreen2": {
            return this[item.contentFormat](scope.row[item.prop]);
          }
          case "percentage": {
            return formatPercentage(scope.row[item.prop]);
          }
          case "formatDicts": {
            return this.transFromDicts(scope, item);
          }
          case "setRedColorByCompare": {
            return this.setRedColorByCompare(scope.row, item);
          }
          case "formatDecimal": {
            return this.formatDecimalLocal(scope, item);
          }
          default:
            return "";
        }
      }
    },

    //红色升高/绿色偏低
    upperRed(value) {
      if (value === "") return;
      if (value == 0) return '<span style="color:white;">相等 </span>';
      else if (value == 1) return '<span style="color:#ff3333;">升高 </span>';
      else if (value == -1) return '<span style="color:#33ff33;">降低 </span>';
      else return "";
    },
    //红色偏高/绿色偏低
    upperRed2(value) {
      if (value === "") return;
      if (value == 0) return '<span style="color:white;">相等 </span>';
      else if (value == 1) return '<span style="color:#ff3333;">偏高 </span>';
      else if (value == -1) return '<span style="color:#33ff33;">偏低 </span>';
      else return "";
    },
    //绿色升高/红色偏低
    upperGreen(value) {
      if (value === "") return;
      if (value == 0) return '<span style="color:white;">相等 </span>';
      else if (value == 1) return '<span style="color:#33ff33;">升高 </span>';
      else if (value == -1) return '<span style="color:#ff3333;">降低 </span>';
      else return "";
    },
    //绿色偏高/红色偏低
    upperGreen2(value) {
      if (value === "") return;
      if (value == 0) return '<span style="color:white;">相等 </span>';
      else if (value == 1) return '<span style="color:#33ff33;">偏高 </span>';
      else if (value == -1) return '<span style="color:#ff3333;">偏低 </span>';
      else return "";
    },

    /**
     * @description 从字典翻译
     */
    transFromDicts(scope, item) {
      if (scope.row[this.totalMark] == "总计") return "总计";
      if (item.contentFormatArgs == "deptTypeList") {
        const value = this.selectDictLabel(
          this.dicts[item.contentFormatArgs],
          scope.row[item.prop]
        );
        return value;
      } else {
        return this.dicts[item.contentFormatArgs][scope.row[item.prop]];
      }
    },

    /**
     * @description 比较
     * @param obj 行数据
     * @param item 表头配置
     */
    setRedColorByCompare(obj, item) {
      let tar = obj[item.contentFormatArgs];
      let cur = obj[item.prop];
      if (cur > tar) {
        return `<span style="color:#ff3333;">${cur}</span>`;
      } else {
        return cur;
      }
    },

    /**
     * 保留两位小数
     */
    formatDecimalLocal(scope, item) {
      let num = scope.row[item.prop];
      if (num === null || num === undefined) {
        return "";
      }
      return formatDecimal(num);
    },
    /**
     * @description 点击排序按钮
     */
    clickSort(column) {
      let obj = {
        prop: null,
        order: null
      };
      if (column.order) {
        // 去掉自建属性前面的$符号
        let tempProp = column.prop;
        if (tempProp) {
          let index = tempProp.lastIndexOf("$");
          index > -1 && (tempProp = tempProp.slice(index + 1));
        }
        obj.prop = tempProp;
        obj.order = column.order == "ascending" ? 1 : 0;
      }
      this.$emit("evChangeOrder", obj);
    },
    /**
     * 点击选择框事件
     */
    selectionChange(ev) {
      this.$emit("evSelectionChange", ev);
    },
    /**
     * 检查是否显示导出按钮
     */
    checkIsShowExportBtn() {
      return this.exportFunction && this.data.length > 0;
    },
    /**
     * @description 翻页
     */
    turnPage({ page, limit }) {
      this.$emit("evTurnPage", { page, limit });
    },
    /**
     * 获取普通格子显示内容数据
     */
    getCommonContent(scope, item) {
      let value = scope.row ? scope.row[item.prop] : "";
      let vType = typeof value;
      if (vType != "number" && !value) {
        return this.fillingNull ? "null" : "";
      }
      return value;
    },
    /**
     * 点击导出按钮
     */
    handleClickExportBtn() {
      this.exportFunction && this.exportFunction();
    },
    /**
     * @description 确认自定义
     */
    handleConfirmCustomrize() {
      let boo = this.tempHeaderOptions.some(item => {
        return item.selected;
      });
      if (!boo) {
        this.msgInfo("至少选择一列");
        return;
      }
      this.headerOptions = this.tempHeaderOptions;
      this.generateRealHeadInfoByOptions();
      this.customrizeShow = false;
      if (this.customrizeKey) {
        localStorage.setItem(
          this.customrizeKey,
          JSON.stringify(this.headerOptions)
        );
      }
    },
    /**
     * @description 重置表头
     */
    handleResetCustomrize() {
      this.headerOptions = [];
      this.generateRealHeadInfoByDefault();
      this.customrizeShow = false;
    },
    /**
     * @description 开启自定义
     */
    handleClickCustomrize() {
      if (this.headerOptions.length == 0) {
        this.generateHeaderOptions();
      }
      this.tempHeaderOptions = JSON.parse(JSON.stringify(this.headerOptions));
      this.customrizeShow = true;
    },
    /**
     * @description 生成根据默认生成headerOptions
     */
    generateHeaderOptions() {
      this.headerOptions = this.headInfo.reduce((pre, cur) => {
        pre.push({
          label: cur.label,
          prop: cur.prop,
          clickable: cur.select.clickable,
          draggable: cur.select.draggable,
          selected: cur.select.default
        });
        return pre;
      }, []);
    },
    /**
     * @description 根据缓存生成headerOptions
     * @param {Array} arr arr是已经排除不存在项的数组了
     */
    generateHeaderOptionsByStorage(arr) {
      let result = [];
      let diffArr = [];
      for (let j = 0; j < arr.length; j++) {
        let index = -1;
        for (let i = 0; i < this.headInfo.length; i++) {
          if (arr[j].prop === this.headInfo[i].prop) {
            index = j;
            break;
          }
        }
        if (index > -1) {
          result.push(arr[index]);
        }
      }
      for (let i = 0; i < this.headInfo.length; i++) {
        let have = result.find(one => {
          return one.prop === this.headInfo[i].prop;
        });
        if (!have) {
          let item = this.headInfo[i];
          diffArr.push({
            label: item.label,
            prop: item.prop,
            clickable: item.select.clickable,
            draggable: item.select.draggable,
            selected: false
          });
        }
      }
      this.headerOptions = result.concat(diffArr);
    },
    /**
     * @description 根据headerOptions生成新的realHeadInfo
     */
    generateRealHeadInfoByOptions() {
      let result = [];
      this.headerOptions.forEach(item => {
        if (item.selected) {
          result.push(this.headerObj[item.prop]);
        }
      });
      this.realHeadInfo = result;
    },
    /**
     * @description 生成默认realHeadInfo
     */
    generateRealHeadInfoByDefault() {
      // 排除保留和非默认
      let header = this.headInfo.filter(item => {
        return item && item.select && item.select.default;
      });
      this.realHeadInfo = header;
    },
    /**
     * @description 起步的时候生成realHeadInfo
     * @description 读取localStorage
     */
    generateRealHeadInfoFirst() {
      if (this.configurable) {
        // 读取浏览器存储来配置
        if (this.customrizeKey) {
          //当有标识时去检测localStorage有无相关的配置
          let jsonObj = localStorage.getItem(this.customrizeKey);
          if (jsonObj) {
            //如果有保存数据，顺便生成headerOptions
            try {
              // 通过缓存的数据生成realHeadInfo，同时通过比对headInfo，将不存在的列过滤掉；
              let arr = JSON.parse(jsonObj);
              let result = [];
              for (let i = 0, len = arr.length; i < len; i++) {
                let item = arr[i];
                if (item && this.headerObj[item.prop]) {
                  if (item.selected) {
                    result.push(this.headerObj[item.prop]);
                  }
                } else {
                  arr[i] = null;
                }
              }
              this.realHeadInfo = result;
              arr = arr.filter(item => {
                return !!item;
              });
              localStorage.setItem(this.customrizeKey, JSON.stringify(arr));
              this.generateHeaderOptionsByStorage(arr);
            } catch (e) {
              console.error(e);
              //如果捕获到错误，直接删除该配置并使用默认的配置
              localStorage.removeItem(this.customrizeKey);
              this.generateRealHeadInfoByDefault();
            }
          } else {
            this.generateRealHeadInfoByDefault();
          }
        } else {
          // 如果没有浏览器存储, 即根据选项生成一个默认的
          this.generateRealHeadInfoByDefault();
        }
      } else {
        this.realHeadInfo = this.headInfo;
      }
    },
    /**
     * @description 控制部分选项的拖动
     */
    onMove(e) {
      //不允许拖拽
      if (e.relatedContext.element.draggable == false) return false;
      if (e.draggedContext.element.draggable == false) return false;
      return true;
    },
    /**
     * @description 获取需要导出的列
     */
    getExportColumns() {
      let result = [];
      if (this.configurable) {
        // 如果是可配置的，需要查看当前选择显示的选项
        if (this.headerOptions && this.headerOptions.length > 0) {
          result = this.headerOptions.reduce((pre, cur) => {
            if (this.checkIsNeedExportInHeader(cur)) {
              pre.push(cur.prop);
            }
            return pre;
          }, []);
        } else {
          result = this.headInfo.reduce((pre, cur) => {
            if (this.checkIsNeedExportInHeadInfo(cur)) {
              pre.push(cur.prop);
            }
            return pre;
          }, []);
        }
      }
      return result;
    },

    /**
     * @description 检查是否需要导出
     */
    checkIsNeedExportInHeadInfo(item) {
      let boo = item.type === undefined && item.operations === undefined;
      return item && item.select && item.select.default && boo;
    },
    /**
     * @description 检查是否需要导出
     */
    checkIsNeedExportInHeader(item) {
      let boo =
        this.headerObj[item.prop].type === undefined &&
        this.headerObj[item.prop].operations === undefined;
      return item && item.selected && boo;
    },
    /**
     * @description 全选
     */
    selectAll() {
      for (let key in this.tempHeaderOptions) {
        if (this.tempHeaderOptions[key].clickable) {
          this.tempHeaderOptions[key].selected = true;
        }
      }
    },

    /**
     *@description 过滤按钮，主要是去除prop按钮时该行prop无值的情况
     */
    getBtnArr(operations, row) {
      let temp = (operations || []).filter(item => {
        if (item.prop) {
          return row[item.prop] !== undefined && row[item.prop] !== "";
        } else {
          return true;
        }
      });
      return temp;
    },

    /**
     * @description 检查是否不可用，主要是针对总计
     */
    checkIsSpecial(row, btnItem) {
      if (btnItem.prop && btnItem.prop == this.totalMark) {
        return row[btnItem.prop] == "总计";
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.group-table {
  width: 100%;
  height: 100%;
}
.table-footer {
  height: 60px;
  margin-top: 10px;
}
.export-btn {
  float: left;
  margin-top: 10px;
  margin-left: 10px;
}
.btn-row {
  padding-bottom: 10px;
}
</style>
