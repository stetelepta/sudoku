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
        gridEl: document.querySelector(".grid"),
        initialize: function () {
            // create sudoku rows, columns and blocks
            this.createRows();
            this.createColumns();
            this.createBlocks();

            // create sudoku cells
            this.createCells();

            // add values
            this.data[1][0].setValue(9);
            this.data[2][0].setValue(1);
            this.data[3][0].setValue(6);
            this.data[6][0].setValue(4);
            this.data[7][0].setValue(7);

            this.data[1][1].setValue(2);
            this.data[3][1].setValue(4);
            this.data[4][1].setValue(9);
            this.data[7][1].setValue(5);

            this.data[0][2].setValue(5);
            this.data[2][2].setValue(4);
            this.data[3][2].setValue(8);
            this.data[8][2].setValue(3);

            this.data[0][3].setValue(1);
            this.data[2][3].setValue(6);
            this.data[6][3].setValue(8);
            this.data[7][3].setValue(3);

            this.data[0][4].setValue(9);
            this.data[8][4].setValue(7);

            this.data[1][5].setValue(7);
            this.data[2][5].setValue(3);
            this.data[6][5].setValue(1);
            this.data[8][5].setValue(9);

            this.data[0][6].setValue(2);
            this.data[5][6].setValue(4);
            this.data[6][6].setValue(7);
            this.data[8][6].setValue(6);

            this.data[1][7].setValue(4);
            this.data[4][7].setValue(1);
            this.data[5][7].setValue(2);
            this.data[7][7].setValue(8);

            this.data[1][8].setValue(1);
            this.data[2][8].setValue(9);
            this.data[5][8].setValue(7);
            this.data[6][8].setValue(3);
            this.data[7][8].setValue(2);

            // console.log(this.columns);

            this.plotgrid();
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
        /**
         * create empty row sets
         */
        createRows: function () {
            for (var i=0;i<=8;i++) {
                var row = set.create(i, "row");
                row.i = i;
                this.rows.push(row);
            }
        },
        /**
         * create empty column sets
         */
        createColumns: function () {
            for (var i=0;i<=8;i++) {
                this.columns.push(set.create(i, "column"));
            }
        },
        /**
         * create empty block sets
         */
        createBlocks: function () {
            for (var i=0;i<=8;i++) {
                this.blocks.push(set.create(i, "block"));
            }
        },
        /**
         * get column by cell coordinate
         * @param {x, y}
         * @returns {set instance}
         */
        getColumn: function(x, y) {
            return this.columns[x];
        },
        /**
         * get row by cell coordinate
         * @param {x, y}
         * @returns {set instance}
         */
        getRow: function(x, y) {
            return this.rows[y];
        },
        /**
         * get row by cell coordinate
         * @param {x, y}
         * @returns {set instance}
         */
        getBlock: function(x, y) {

        /* return the block given cell coordinates
         * blocks in array [b0, b1, .., b8]
         * blocks in sudoku grid:
            |b0, b1, b2|
            |b3, b4, b5|
            |b6, b7, b8|
         * 
         */

            // first convert cell coordinates to block coordinates (0,0) -› (2,2) (divide by 3, floor result)
            // then to array index (block is wrapped modulo 3)
            return this.blocks[(Math.floor(y/3) * 3) + Math.floor(x/3)];
        },
        plotgrid: function() {
            var output = '<table class="sudoku">';
            for (var row=0;row<=8;row++) {
                output += "<tr>";
                for (var col=0;col<=8;col++) {
                    var cell = this.data[col][row];
                    var val = cell.getValue() || "";
                    var nrOptions = cell.p.length;
                    if (nrOptions >  1) {
                        output += "<td>" + val + "<small>(" + cell.p + ")</small>" + "</td>";                        
                    } else {
                        output += "<td>" + val + "</td>";
                    }

                }
                output += "</tr>";
            }
            output += "</table>";
            
            this.gridEl.innerHTML = output;
        }
};

module.exports = grid;