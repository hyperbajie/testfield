import BasePop from "./index.vue";
import Vue from "vue";

export const popfunc = function() {
    let basePop = Vue.extend(BasePop);
    let ins = new basePop();
    ins.$mount();

    document.body.appendChild(ins.$el);
    ins.show = true;
}
