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
    let allTasks = document.querySelector(".allTasks")

    let currentTask = []

    if (localStorage.getItem("currentTask")) {
        currentTask = JSON.parse(localStorage.getItem("currentTask"))
    }

    function renderTask() {
        let sum = ""

        currentTask.forEach((curTask, index) => {
            sum += `
            <div class="task">
                <h5>${curTask.task} <span>${curTask.imp ? "Imp" : ""}</span></h5>
                <button data-index="${index}">Mark as Completed</button>
            </div>`
        })

        allTasks.innerHTML = sum
        localStorage.setItem("currentTask", JSON.stringify(currentTask))
    }

    renderTask()

    // ✅ ONE TIME delete handler (EVENT DELEGATION)
    allTasks.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            let index = e.target.dataset.index
            currentTask.splice(index, 1)
            renderTask()
        }
    })

    // ✅ Add task
    form.addEventListener("submit", function (e) {
        e.preventDefault()

        if (!taskInput.value.trim()) return

        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckbox.checked
        })

        renderTask()

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




function motivationalQuote() {
    let motivationQuote = document.querySelector(".motivation2 h1")
    let motivationAuthor = document.querySelector(".motivation3 h2")


    async function fetchQuote() {
        motivationQuote.innerHTML = "Loading..."
        motivationAuthor.innerHTML = ""

        let res = await fetch('https://dummyjson.com/quotes/random')
        let quoteData = await res.json()

        motivationQuote.innerHTML = quoteData.quote
        motivationAuthor.innerHTML = quoteData.author
    }
    fetchQuote()
}


let motivationCard = document.querySelector(".motivation")
motivationCard.addEventListener("click", motivationalQuote)



let timerInterval = null;
let totalSeconds = 25 * 60;
let timer = document.querySelector(".pomo-timer h1")
let startTimerButton = document.querySelector(".start-timer")
let pauseTimerButton = document.querySelector(".pause-timer")
let resetTimerButton = document.querySelector(".reset-timer")
let sessionRole = document.querySelector(".session")
let isWorkSession = true;


function updateTime() {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

}
updateTime()

function startTimer() {
    clearInterval(timerInterval)


    if (isWorkSession) {
        totalSeconds = 25 * 60;
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTime()
            } else {
                isWorkSession = false
                timer.innerHTML = `05:00`
                sessionRole.innerHTML = "Break Time"
                sessionRole.style.backgroundColor = "var(--primary)"
                clearInterval(timerInterval)
            }
        }, 1000);

    } else {
        totalSeconds = 5 * 60;
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTime()
            } else {
                isWorkSession = true
                timer.innerHTML = `25:00`
                sessionRole.innerHTML = "Work Session"
                sessionRole.style.backgroundColor = "var(--secondary)"
                clearInterval(timerInterval)
            }
        }, 1000);
    }




}
function pauseTimer() {
    clearInterval(timerInterval)
}
function resetTimer() {
    totalSeconds = 25 * 60
    clearInterval(timerInterval)
    updateTime()
}

startTimerButton.addEventListener("click", startTimer)
pauseTimerButton.addEventListener("click", pauseTimer)
resetTimerButton.addEventListener("click", resetTimer)