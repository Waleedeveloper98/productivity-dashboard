function openFeatures() {
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
}
// openFeatures()



let form = document.querySelector(".addTask form")
let taskInput = document.querySelector(".addTask form input")
let taskDetailsInput = document.querySelector(".addTask form textarea")
let taskCheckbox = document.querySelector(".addTask form #checkbox")



var currentTask = [];

if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"))
}

function renderTask() {
    let allTasks = document.querySelector(".allTasks")
    let sum = "";

    currentTask.forEach((curTask, index) => {
        sum += `<div class="task">
        <h5>${curTask.task} <span class=${curTask.imp}>Imp</span></h5>
                        <button id=${index}>Mark as Completed</button>
                        </div>`
    })
    allTasks.innerHTML = sum
    localStorage.setItem("currentTask", JSON.stringify(currentTask))
}
renderTask()




form.addEventListener("submit", function (e) {
    e.preventDefault()
    currentTask.push({
        task: taskInput.value,
        details: taskDetailsInput.value,
        imp: taskCheckbox.checked
    })
    renderTask()
    location.reload()
})

console.log(currentTask)



let markCompletedButton = document.querySelectorAll(".task button")
markCompletedButton.forEach((markButton) => {
    markButton.addEventListener("click", function () {
        currentTask.splice(markButton.id, 1)
        console.log(currentTask)
        renderTask()
        location.reload()
    })
})