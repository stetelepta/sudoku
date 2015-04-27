"use strict";
/*global document*/

var velocity = require('velocity-animate');

/**
 * Velocity animations from a queue
 * basically Velocity sequence 
 * [{el: element, options: velocity options object ]
 */
var animationQueue = {
    queue: [], // [ {el:element, properties: {opacity: 1}, options: {duration:1000, msg: logMessage }, {el:element2, ... } ]
    stopped: false,
    logging: false,
    logElm: undefined, // textarea element to output logging, if logging is true
    delay: 10, // delay between actions
    add: function (item) {
        this.queue.push(item);
    },
    start: function () {
        this.stopped = false;
        this.next();
    },
    stop: function () {
        this.stopped = true;
    },
    next: function () {
        if (this.queue.length > 0 && !this.stopped) {
            var item = this.queue.pop();
            // run some 
            velocity(item.el, item.properties, item.options);
            if (this.logging && item.msg) {
                this.logElm.value += item.msg;
                this.logElm.scrollTop = this.logElm.scrollHeight;
            }
            if (item.value) {
                item.el.innerHTML = item.value;
            }
            setTimeout(this.next.bind(this), this.delay);
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
        if (this.queue.length === 0) {
            console.log('queue empty');
        } else {
            this.stopped = false;
            this.next();
            this.stopped = true;
        }
    }
};

module.exports = animationQueue;