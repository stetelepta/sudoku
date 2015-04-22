"use strict";

var smokesignals = require('smokesignals');
var POSSIBILITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/*global document*/
var cell = {
        x: undefined,
        y: undefined,
        value: undefined,
        p: undefined,
        /**
         * create instance of cell using protypal inheritance, see:
         * http://aaditmshah.github.io/why-prototypal-inheritance-matters/#constructors_vs_prototypes
         * @param {x,y}
         * @returns cell instance
         */
        create: function (x, y) {
            var self = Object.create(this);
            self.initialize();
            self.x = x;
            self.y = y;
            return self;
        },
        /**
         * initialize new instance
         * @param {}
         * @returns {}
         */
        initialize: function () {
            // make cell a event emitter
            smokesignals.convert(this);

            this.p = POSSIBILITIES.slice(0);
        },
        /**
         * remove possibily for this cell
         * @param {nr}
         * @returns [deleted item] 
         */
        del: function (nr) {
            var index = this.p.indexOf(nr);
            if (index >= 0) {
                var removedItem = this.p.splice(index, 1);
                //console.log('removed: ' + removedItem + ', p:[' + this.p + "]");
                if (this.p.length === 1) {
                    console.log('one possibility left: now set value, emit change event');
                    this.emit('change', {target: this, value: this.p[0]});
                }
            } else {
                throw "IndexError: '" + nr + "' does not exist in Array p:[" + this.p + "]";
            }
        },
        /**
         * removes all possibilities for this cell, expect for passed nr
         * @param {exceptNr}
         * @returns [deleted item] 
         */
        delAll: function (exceptNr) {
            for (var i in POSSIBILITIES) {
                if (POSSIBILITIES[i] !== exceptNr) {
                    // console.log('now delete POSSIBILITIES[i]:' + POSSIBILITIES[i]);
                    this.del(POSSIBILITIES[i]);
                }
            }
        },
        setValue: function(nr) {
            this.value = nr;
            // console.log('setValue, now emit event, this.value:' + this.value);

            this.delAll(nr);
        }
};

module.exports = cell;