"use strict";

var smokesignals = require('smokesignals');
var settings = require('./settings.js');

var cell = {
        /**
         * create instance of cell using protypal inheritance
         * @param {x,y}
         * @returns cell instance
         */
        create: function (x, y) {
            var self = Object.create(this);
            self.x = x;
            self.y = y;
            self.p = settings.cell.possibilities.slice(0);

            // make cell a event emitter
            smokesignals.convert(self);

            return self;
        },
        /**
         * remove possibily for this cell
         * @param {nr}
         * @returns [deleted item] 
         */
        del: function (nr) {
            var index = this.p.indexOf(nr);
            if (index >= 0) {
                this.p.splice(index, 1);
                if (this.p.length === 1) {
                    //console.log('one possibility left: now set value, emit change event');
                    this.emit('change', {target: this, value: this.getValue() });
                }
            } else {
                // would be better to prevent duplicate deletions by different sets, but for now allow it
                // throw 'IndexError: "' + nr + '"" does not exist in Array p:[' + this.p + ']';
            }
        },
        /**
         * removes all possibilities for this cell, expect for the passed nr
         * @param {exceptNr}
         * @returns [deleted item] 
         */
        delAll: function (exceptNr) {
            for (var i in settings.cell.possibilities) {
                if (settings.cell.possibilities[i] !== exceptNr) {
                    this.del(settings.cell.possibilities[i]);
                }
            }
        },
        setValue: function(nr) {
            this.value = nr;
            // console.log('setValue, now emit event, this.value:' + this.value);

            // value is known, now delete all other possibilities
            this.delAll(nr);
        },
        /** getter for the value of the cell
         * @param {}
         * @returns value
         */
        getValue: function () {
            if (this.p.length === 1) {
                return this.p[0];
            }
        }
};

module.exports = cell;