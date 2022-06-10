import changecolor from "./changecolor";
import animation from "./animation";

export function install(vue) {
    vue.directive("change", changecolor);
    vue.directive("animate", animation);
}