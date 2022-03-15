import BasePop from "./index.vue";
import Vue from "vue";

let ins;

export const popfunc = function () {
    let basePop = Vue.extend(BasePop);
    if (!ins) {
        ins = new basePop();
        ins.$mount();
        document.body.appendChild(ins.$el);
    }

    ins.show = true;
}
