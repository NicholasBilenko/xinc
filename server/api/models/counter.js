const counters = [{
    userId: 0,
    counter: 0,
    nextCounter: 1
}];

module.exports = class Counter {
    static getCounter() {
        return counters;
    }
}