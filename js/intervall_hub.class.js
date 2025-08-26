/**
 * Utility class to manage and control all game-related intervals.
 * Provides centralized handling to start and stop multiple intervals.
 */
export class IntervalHub {
    /**
     * Stores all active intervals.
     * @type {number[]}
     */
    static allIntervals = [];

    /**
     * Starts a new interval and keeps track of it.
     *
     * @param {Function} func - The function to execute repeatedly.
     * @param {number} timer - Interval time in milliseconds.
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    /**
     * Stops all active intervals and clears the interval list.
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}