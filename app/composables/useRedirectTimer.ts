import { ref, onUnmounted, getCurrentScope } from 'vue'

export const useRedirectTimer = () => {
    const seconds = ref(0)
    const isRunning = ref(false)
    let timerInterval: ReturnType<typeof setInterval> | null = null

    const stopTimer = () => {
        if (timerInterval) clearInterval(timerInterval)
        isRunning.value = false
        timerInterval = null
    }

    const startTimer = (duration: number, onComplete: () => void) => {
        stopTimer() // Clear any existing timer

        seconds.value = duration
        isRunning.value = true

        timerInterval = setInterval(() => {
            seconds.value--
            if (seconds.value <= 0) {
                stopTimer()
                onComplete()
            }
        }, 1000)
    }

    // Cleanup on unmount if used inside a component scope
    if (getCurrentScope()) {
        onUnmounted(() => {
            stopTimer()
        })
    }

    return {
        seconds,
        isRunning,
        startTimer,
        stopTimer
    }
}
