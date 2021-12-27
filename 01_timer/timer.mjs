class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput
        this.startButton = startButton
        this.pauseButton = pauseButton

        if (callbacks) {
            this.onStart = callbacks.onStart
            this.onTick = callbacks.onTick
            this.onComplete = callbacks.onComplete
        }

        this.startButton.addEventListener('click', this.start)
        this.pauseButton.addEventListener('click', this.pause)
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining)
        }
        this.tick()
        // every 50ms
        this.intervalId = setInterval(this.tick, 50)
    }

    pause = () => {
        clearInterval(this.intervalId)
    }

    tick = () => {
        if (this.timeRemaining <= 0) {

            if (this.onComplete) {
                this.onComplete()
            }

            this.pause()
        } else {
            // every 50ms
            this.timeRemaining = this.timeRemaining - .05
            if (this.onTick) {
                this.onTick(this.timeRemaining)
            }
        }
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value)
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2)
    }

}

export default Timer;