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
openFeatures()



function todoList() {
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

        let markCompletedButton = document.querySelectorAll(".task button")
        markCompletedButton.forEach((markButton) => {
            markButton.addEventListener("click", function () {
                currentTask.splice(markButton.id, 1)
                console.log(currentTask)
                renderTask()
                location.reload()
            })
        })

        taskCheckbox.checked = false
        taskDetailsInput.value = ""
        taskInput.value = ""
    })





}

todoList()


function dailyPlanner() {
    var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {}

    var hours = Array.from({ length: 18 }, (_, index) => {
        return `${6 + index}:00 - ${7 + index}:00 `
    })


    var wholeDaySum = ""

    let dayPlanner = document.querySelector(".day-planner")


    hours.forEach((elem, idx) => {

        var savedData = dayPlanData[idx] || ""
        wholeDaySum += ` <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${savedData}>
                </div>
`
    })


    dayPlanner.innerHTML = wholeDaySum


    let dayPlannerInput = document.querySelectorAll(".day-planner input")
    dayPlannerInput.forEach((elem) => {
        elem.addEventListener("input", function () {
            dayPlanData[elem.id] = elem.value
            localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData))
        })
    })
}
dailyPlanner()