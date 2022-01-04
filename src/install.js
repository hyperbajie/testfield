import comfirst from "@/components/comfirst";
import comsecond from "@/components/comsecond";

export default {
    install(vue) {
        vue.component("ComFirst", comfirst);
        vue.component("ComSecond", comsecond);
    }
}