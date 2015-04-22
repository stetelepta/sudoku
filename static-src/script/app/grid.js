"use strict";
/*global document*/

var cell = require('./cell.js');
var set = require('./set.js');
var smokesignals = require('smokesignals');

/*
    -› x
  --------------
|  | (0,0) | (1,0) | (2,0) .. | (9,0)
v  | (0,1) | (1,1) | (2,1) .. | (9,1) 
   |  ..
y  | (0,9) | (1,9) | (2,9) .. | (9,9)

*/

var grid = {
        /**
         * initialize new instance
         * @param {}
         * @returns {Object}
         */
        data: [],
        rows: [],
        columns: [],
        blocks: [],
        initialize: function () {
            // create sudoku rows, columns and blocks
            this.createRows();
            this.createColumns();
            this.createBlocks();

            // create sudoku cells
            this.createCells();

            console.log(this.blocks);

            this.data[3][8].setValue(7);
            // this.test();
        },
        /**
         * initializes this.data to a 9x9 2D array
         * @param {}
         * @returns {undefined}
         */
        createCells: function () {
            for (var i=0;i<=8;i++) {
                this.data.push([]);
                for (var j=0;j<=8;j++) {
                    
                    // create new cell instance
                    var c = cell.create(i, j);

                    // add cell to the sets
                    this.getRow(i,j).addCell(c);
                    this.getColumn(i,j).addCell(c);
                    this.getBlock(i,j).addCell(c);

                    // keep track of all cells
                    this.data[i][j] = c;
                }
            }
        },
        createRows: function () {
            for (var i=0;i<=8;i++) {
                var row = set.create(i, "row");
                row.i = i;
                this.rows.push(row);
            }
        },
        createColumns: function () {
            for (var i=0;i<=8;i++) {
                this.columns.push(set.create(i, "column"));
            }
        },
        createBlocks: function () {
            for (var i=0;i<=8;i++) {
                this.blocks.push(set.create(i, "block"));
            }
        },
        getColumn: function(x, y) {
            return this.columns[x];
        },
        getRow: function(x, y) {
            return this.rows[y];
        },
        /* return the block given cell coordinates
         * blocks in array [b0, b1, .., b8]
         * blocks in sudoku grid:
            |b0, b1, b2|
            |b3, b4, b5|
            |b6, b7, b8|
         * 
         */
        getBlock: function(x, y) {
            // first convert cell coordinates to block coordinates (0,0) -› (2,2) (divide by 3, floor result)
            // then to array index (block is wrapped modulo 3)
            return this.blocks[(Math.floor(y/3) * 3) + Math.floor(x/3)];
        },
        test: function () {
            console.log(this.getColumn(4, 4));
            console.log(this.data[0][0]);
            console.log(this.data[0][1]);
        }
};

module.exports = grid;