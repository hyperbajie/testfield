export default {
    id: "changecolor",
    bind: function (el) {
        // console.log("el bind");
    },
    inserted: function (el) {
        // console.log("el inserted", el);
        el.style.color= "red"
    }
}