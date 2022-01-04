<template>
  <div>
    <h1>say lalala</h1>
    <h2 v-change="11">ttt</h2>
    <span>{{ msg | capitalize }}</span>
    <span>{{ msg2 | lower }}</span>

    <com-first></com-first>
    <com-second></com-second>

    <span>{{ name | capitalize }}</span>

    <div>
      <button @click="handleAddNotice">add notice</button>
    </div>
    <div>
      <button @click="handleClickViewData">view data</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Father from "@/components/father";
import changecolor from "@/directives/changecolor.js";
import Name from "@/mixin/name.js";
export default {
  mixins: [Name],
  data() {
    return {
      msg: "hello world",
      msg2: "Fucking world",
    };
  },
  directives: {
    change: changecolor,
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    handleClickBtn() {
      console.log("click event");
      let Profile = Vue.extend(Father);
      let div = document.createElement("div");
      div.setAttribute("id", "mount-point");
      document.body.appendChild(div);
      new Profile().$mount("#mount-point");
    },
    handleClickHide() {},
    handleAddNotice() {
      // let renderF = Vue.compile("<p>{{firstName}}-{{secondName}}</p>");
      // let Profile = Vue.extend({
      //   render: renderF,
      //   data() {
      //     return {
      //       firstName: "joe",
      //       secondName: "johnson",
      //     };
      //   },
      // });
      let Profile = Vue.extend(Father);
      let div = document.createElement("div");
      div.setAttribute("id", "app2");
      let nodeNew = new Profile();
      document.body.appendChild(div);
      nodeNew.$mount("#app2");
      setTimeout(() => {
        document.body.removeChild(nodeNew.$el);
      }, 3000);
      
    },
    handleClickViewData() {
      alert(this.msg);
    }
  },
};
</script>

<style scoped>
th,
td {
  padding: 10px;
}
</style>
