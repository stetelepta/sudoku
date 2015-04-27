"use strict";
/*global document*/

var animate = {
    log: [],
    stopped: false,
    logElm: document.querySelector('.log'),
    start: function () {
        this.stopped = false;
        this.next();
    },
    stop: function () {
        this.stopped = true;
    },
    next: function () {
        if (this.log.length > 0 && !this.stopped) {
            var item = this.log.pop();
            console.log('---');
            console.log('type:' + item.type);
            console.log('row:' + item.row);
            console.log('col:' + item.col);
            console.log('value:' + item.value);
            this.logElm.innerHTML += "(" + item.row + ", " + item.col + ")" + ", " + item.type + " " + item.value + "\n";
            setTimeout(this.next.bind(this), 100);
        }
    },
    pause: function () {
        this.stopped = true;
    },
    play: function () {
        this.stopped = false;
        this.next();
    },
    step: function () {
        if (this.log.length === 0) {
            console.log('log empty');
        } else {
            this.stopped = false;
            this.next();
            this.stopped = true;
        }
    },
    output: function (msg) {

    }
};

module.exports = animate;