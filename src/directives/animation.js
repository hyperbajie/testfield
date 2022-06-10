
function handleMutation(mutationList, observer) {
    mutationList.forEach(mutation => {
        console.log(mutation);
        if (mutation.type == "childList") {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(element => {
                    // element.animate(
                    //     [
                    //         { transform: "scale(.98)", opacity: 0 },
                    //         { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
                    //         { transform: "scale(1)", opacity: 1 },
                    //     ],
                    //     {
                    //         duration: 500,
                    //         easing: "ease-in",
                    //     }
                    // )
                    // 两种写法
                    element.classList.add("add-anim")
                })
            }
            if (mutation.removedNodes) {
                mutation.removedNodes.forEach(element => {
                    console.log(element);
                    element.animate(
                        [
                            { transform: "scale(1)", opacity: 1 },
                            { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
                            { transform: "scale(.98)", opacity: 0 },

                        ],
                        {
                            duration: 1000,
                            easing: "ease-in",
                        }
                    )
                })
            }
        }
    });
}

let mutations = new MutationObserver(handleMutation);

export default {
    bind(el, bind) {
        mutations.observe(el, {
            childList: true
        })
    }
}