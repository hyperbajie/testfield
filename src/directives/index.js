import changecolor from "./changecolor";

export function install(vue) {
    vue.directive("change", changecolor)
}