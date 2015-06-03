"use strict";

var smokesignals = require('smokesignals');

var cell = {
        /**
         * create instance of cell using protypal inheritance
         * @param {row,col}
         * @returns cell instance
         */
        create: function (row, col) {
            var self = Object.create(this);
            self.row = row;
            self.col = col;
            self.id = String(row) + col;
            self.p = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            // make cell a event emitter
            smokesignals.convert(self);

            return self;
        },
        /**
         * remove possibily for this cell
         * @param {nr}
         * @returns [deleted item] 
         */
        eliminate: function (nr) {
            var index = this.p.indexOf(nr);
            if (index >= 0) {
                this.p.splice(index, 1);
                this.emit('eliminate', {target: this, value: nr });
                if (this.p.length === 1) {
                    // one possibility left for this cell, emit change event
                    console.log('Strategy II: nr ' + this.getValue() + ' -› (' + this.row + ', ' + this.col + ')');
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
        eliminateAll: function (exceptNr) {
            for (var nr=1;nr<=9;nr++) {
                if (nr !== exceptNr) {
                    this.eliminate(nr);
                }
            }
        },
        setValue: function(nr) {
            if (this.p.length > 1) {
                this.emit('value', {target: this, value: nr });

                // value is known, now delete all other possibilities
                this.eliminateAll(nr);            
            }
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