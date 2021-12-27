import Timer from "./timer.mjs";

const durationInput = document.querySelector('#duration')
const startBtn = document.querySelector('#start')
const pauseBtn = document.querySelector('#pause')
const circle = document.querySelector('circle')

const perimeter = circle.getAttribute('r') * Math.PI * 2
circle.setAttribute('stroke-dasharray', perimeter)

let duration
new Timer(durationInput, startBtn, pauseBtn, {
    onStart(totalDuration) {
        duration = totalDuration
    },
    onTick(timeReaming) {
        circle.setAttribute('stroke-dashoffset', perimeter * timeReaming / duration - perimeter)
    },
    onComplete() {
        console.log('timer is completed')
    }
})


