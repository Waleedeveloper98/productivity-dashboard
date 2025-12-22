let allElems = document.querySelectorAll(".elem")
let fullElems = document.querySelectorAll(".fullElem")

allElems.forEach((elem) => {
    elem.addEventListener("click", function () {
        fullElems[elem.id].style.display = "block"

    })
})

fullElems.forEach((fullElem) => {
    let closeButton = fullElem.querySelector("button")
    closeButton.addEventListener("click", function () {
        fullElem.style.display = "none"
    })
})