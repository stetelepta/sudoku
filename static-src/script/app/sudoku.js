"use strict";
/*global document*/

var cell = require('./cell.js');
var set = require('./set.js');
var smokesignals = require('smokesignals');
var velocity = require('velocity-animate');

var sudoku = {
        cells: [],      // 2D array, containing references to cell instances
        rows: [],       // array with row set instances
        columns: [],    // array column set instances
        blocks: [],     // array contains block set instances
        gridEl: document.querySelector(".grid"),    // div element for plotting
        grid: [],       // 2D array with known values of the sudoku
        create: function () {
            var self = Object.create(this);

            // create sudoku rows, columns and blocks
            self.createRows();
            self.createColumns();
            self.createBlocks();

            // create sudoku cells
            self.createCells();

            return self;
        },
        setGrid: function (grid) {
            this.grid = grid;
        },
        solve: function () {
            for (var row in this.grid) {
                for (var col in this.grid[row]) {
                    var value = this.grid[row][col];
                    // console.log(i+','+j+','+value);
                    if (value > 0) {
                        this.cells[row][col].setValue(value);
                    }
                }
            }
        },

        /**
         * initializes this.cells to a 9x9 2D array
         * @param {}
         * @returns {undefined}
         */
        createCells: function () {
            for (var row=0;row<=8;row++) {
                this.cells.push([]);
                for (var col=0;col<=8;col++) {
                    
                    // create new cell instance
                    var c = cell.create(row, col);

                    // add cell to the sets
                    this.getRow(row,col).addCell(c);
                    this.getColumn(row,col).addCell(c);
                    this.getBlock(row,col).addCell(c);

                    //c.on("change", this.onCellChanged.bind(this));

                    // keep track of all cells
                    this.cells[row][col] = c;
                }
            }
        },
        /**
         * create empty row sets
         */
        createRows: function () {
            for (var i=0;i<=8;i++) {
                var row = set.create(i, "row");
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
         * @param {row, col}
         * @returns {set instance}
         */
        getColumn: function(row, col) {
            return this.columns[col];
        },
        /**
         * get row by cell coordinate
         * @param {row, col}
         * @returns {set instance}
         */
        getRow: function(row, col) {
            return this.rows[row];
        },
        /**
         * get row by cell coordinate
         * @param {row, col}
         * @returns {set instance}
         */
        getBlock: function(row, col) {
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
            return this.blocks[(Math.floor(col/3) * 3) + Math.floor(row/3)];
        },
        /* eventhandler for cell changes
         */
        onCellChanged: function (evt) {
            this.animateChange(evt.target);
        },
        /* animate change of a cell
         */
        animateChange: function (cell) {
            var cellElm = document.querySelector("#c" + cell.row.toString() + cell.col.toString());
            console.log('animateChange: (' + cell.row + ", " + cell.col + ")");
            velocity(cellElm, { backgroundColor: '#ff9' }, 1000); // Velocity
        },
        /* plot sudoku
         */
        plot: function() {
            var output = '<table class="sudoku">';
            for (var row=0;row<=8;row++) {
                output += "<tr>";
                for (var col=0;col<=8;col++) {
                    var known = this.grid[row][col];
                    if (known) {
                        output += "<td class=\"initial\" id=\"c" + row + col + "\">" + known + "</td>";                        
                    } else {
                        var cell = this.cells[row][col];
                        var val = cell.getValue() || "";
                        output += "<td id=\"c" + row + col + "\">" + val + "</td>";
                    }
                }
                output += "</tr>";
            }
            output += "</table>";
            
            this.gridEl.innerHTML = output;
        }
};

module.exports = sudoku;