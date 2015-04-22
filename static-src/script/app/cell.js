"use strict";

var smokesignals = require('smokesignals');
var settings = require('./settings.js');

var cell = {
        /**
         * create instance of cell using protypal inheritance, see:
         * http://aaditmshah.github.io/why-prototypal-inheritance-matters/#constructors_vs_prototypes
         * @param {x,y}
         * @returns cell instance
         */
        create: function (x, y) {
            var self = Object.create(this);
            self.x = x;
            self.y = y;
            self.p = settings.cell.POSSIBILITIES.slice(0);

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
                // throw 'IndexError: "' + nr + '"" does not exist in Array p:[' + this.p + ']';
                // perhaps try to prevent duplicate deletions by different sets in the future, for now allow it
            }
        },
        /**
         * removes all cell.POSSIBILITIES for this cell, expect for passed nr
         * @param {exceptNr}
         * @returns [deleted item] 
         */
        delAll: function (exceptNr) {
            for (var i in settings.cell.POSSIBILITIES) {
                if (settings.cell.POSSIBILITIES[i] !== exceptNr) {
                    // console.log('now delete cell.POSSIBILITIES[i]:' + cell.POSSIBILITIES[i]);
                    this.del(settings.cell.POSSIBILITIES[i]);
                }
            }
        },
        setValue: function(nr) {
            this.value = nr;
            // console.log('setValue, now emit event, this.value:' + this.value);

            this.delAll(nr);
        },
        getValue: function () {
            if (this.p.length === 1) {
                return this.p[0];
            }
        }
};

module.exports = cell;