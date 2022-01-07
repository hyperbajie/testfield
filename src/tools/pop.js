import PopCom from "@/components/pop-com";
import Vue from "vue";

let PopComExtends = Vue.extend(PopCom);

export const popfunc = function () {
    let ele = document.createElement("div");
    // ele.setAttribute("id", "app2");
    // document.body.appendChild(ele);
    // new PopComExtends().$mount("#app2");
    let instance = new PopComExtends();
    instance.$mount();
    // document.body.appendChild(instance.$el);
    // console.log("instance", instance);
    document.body.appendChild(instance.$el);
}