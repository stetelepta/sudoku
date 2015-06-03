"use strict";

var set = {
        /**
         * create instance of a set
         * @param {id, type}
         * @returns cell instance
         */
        create: function (id, type) {
            var self = Object.create(this);
            self.id = id; // identifies a set instance
            self.cells = []; // array to hold all cells in this set.
            self.type = type; // helper/debugging variable to easily find rows, columns or blocks
            self.p = {}; // object for tracking possible positions (cell instances) for numbers 1-9

            return self;
        },
        /**
         * add cell to a set, 
         * @param {cell}
         * @returns undefined
         */
        addCell: function (cell) {
            // add cell instance to this.cells. 
            this.cells.push(cell);

            // add cell as possibility for each number
            this.addPosition(cell);

            // listen to change events of the cell
            cell.on('change', this.onCellChanged.bind(this));
            cell.on('eliminate', this.onCellEliminated.bind(this));
        },
        /**
         * handler for cell 'eliminate' events
         * @param {evt}
         * @returns undefined
         */
        onCellEliminated: function (evt) {
            this.removePosition(evt.target, evt.value);
        },
        /**
         * handler for cell 'change' events
         * @param {evt}
         * @returns undefined
         */
        onCellChanged: function (evt) {
            for (var i in this.cells) {
                if (this.cells[i] !== evt.target) {
                    // on cell changed: update all other cells in this set, remove value as possibility for these cells
                    this.cells[i].eliminate(evt.value);
                }
            }
        },
        /**
         * add cell as a possibility for each number
         * @param {cell}
         * @returns undefined
         */
        addPosition: function(cell) {
            for (var nr=1;nr<=9;nr++) {
                if (this.p[nr] === undefined) {
                    this.p[nr] = {};
                }
                this.p[nr][cell.id] = cell;
            }
        },
        /**
         * return number of available positions for a given number
         * @param {nr}
         * @returns total nr of positions for number 
         */
        nrPositionsLeft: function (nr) {
            var total = 0;
            var cell = undefined;
            for (var prop in this.p[nr]) {
                if (this.p[nr].hasOwnProperty(prop)) {
                    total += 1;
                }
            }
            return total
        },
        /**
         * return cell for first possible position. Used for finding the cell, if there is only 1 possibility left
         * @param {nr}
         * @returns cell instance
         */
        getFirstCellForNumber: function (nr) {
            for (var prop in this.p[nr]) {
                if (this.p[nr].hasOwnProperty(prop)) {
                    return this.p[nr][[prop]];
                }
            }
        }, 
        /**
         * remove cell as possible positino for a number
         * @param {nr}
         * @returns cell instance
         */
        removePosition: function(cell, nr) {
            // delete entry from possibility object
            delete this.p[nr][cell.id];

            // deletion might have caused that there 's just one possibile position left for this number. If so, call setValue of that cell
            if (this.nrPositionsLeft(nr) === 1) {             
                var c = this.getFirstCellForNumber(nr);
                if (c.getValue() === undefined) {
                    console.log('Strategy I: nr ' + nr + ' only fits in ('+ c.row + ', ' + c.col + ') in '+ this.type + ' ' + this.id);
                    c.setValue(nr);                    
                }
            }
         }
    };

module.exports = set;