# 基础收起展开组件

## 基本用法

```javascript
<template>
  <div style="width: 100%; padding: 10px; box-sizing: border-box">
    <base-collapse :defaultExpand="true">
      <template v-slot:title>
        <p>异常信息</p>
      </template>
      <el-table :data="tableData">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
      </el-table>
    </base-collapse>
  </div>
</template>

<script>
import BaseCollapse from "@/components/base-collapse/index.vue";
export default {
  components: {
    BaseCollapse
  },
  data() {
    return {
      tableData: [
        {
          name: "name1",
          age: "28",
        },
        {
          name: "name2",
          age: "23",
        },
      ],
    };
  },
};
</script>

```

## props

| 属性            | 说明     | 类型    | 可选值          | 默认值 |
| --------------- | -------- | ------- | --------------- | ------ |
| defaultExpand   | 默认展开 | Boolean | true/false      | false  |
| backgroundColor | 背景颜色 | String  | "white"，"#fff" | white  |

## event

| 事件   | 说明             | 参数                 |
| ------ | ---------------- | -------------------- |
| change | 展开收缩状态改变 | 是否收缩，true/false |
