# 锚点组件

## 例1 基本使用

```javascript
<template>
  <div>
    <BaseAnchor
      :labelList="labelList"
      elRefName="scrollEl"
    />
    <div>
        <div title="患者基础信息" id="info">
        	<template>...</template>
        </div>
        <div title="非重阳详情" id="detail">
        	<template>...</template>
        </div>
        <div title="认领详情" id="claim">
        	<template>...</template>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 顶部标签锚点
      labelList: [
        {
          label: "患者基础信息",
          href: "info",
        },
        {
          label: "非重阳详情",
          href: "detail",
        },
        {
          label: "认领详情",
          href: "claim",
        },
      ],
    };
  },
};
</script>

```

## props

| 属性      | 说明                       | 类型               | 说明                                                                         |
| --------- | -------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| labelList | 选项列表                   | Array `<Object>` | 描述标签列表的对象数组。对象包括两个属性：label为显示名，href为对应的div块id |
| elRefName | 父组件中需要滚动的元素引用 | string             | 将父组件中的refname作为prop传递进来，在初始化阶段绑定滚动监听事件。          |
