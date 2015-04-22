"use strict";

var smokesignals = require('smokesignals');

var set = {
        /**
         * create instance of a set
         * @param {x,y}
         * @returns cell instance
         */
        create: function (id, type) {
            var self = Object.create(this);
            self.id = id;
            self.cells = [];
            self.type = type;
            return self;
        },
        addCell: function (cell) {
            // console.log('addCell, set.id:' + this.id + ' cell (' + cell.x + ', ' + cell.y + ')');
            this.cells.push(cell);

            // listen to change events of the cell
            cell.on('change', this.onCellChanged.bind(this));
        },
        onCellChanged: function (evt) {
            //console.log('set.onCellChanged, set.id: ' + this.id + ', type:' + this.type);
            //console.log(evt.target);
            //console.log(evt.value);

            // on cell changed: update all cells in this set, remove possibility
            for (var i in this.cells) {
                if (this.cells[i] !== evt.target) {
                    // console.log(this.cells[i]);
                    this.cells[i].del(evt.value);
                } else {
                    //console.log('no need to update the cell that caused the change');
                }

            }
        },
    };

module.exports = set;