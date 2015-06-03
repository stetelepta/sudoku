"use strict";
/*global document*/

var cell = require('./cell.js');
var set = require('./set.js');
var smokesignals = require('smokesignals');

var sudoku = {
        cells: [],      // 2D array, containing references to cell instances
        rows: [],       // array with row set instances
        columns: [],    // array column set instances
        blocks: [],     // array contains block set instances
        gridEl: document.querySelector(".grid"),    // div element for plotting
        grid: [],       // 2D array with known values of the sudoku
        stopped: false,
        log: [],
        /**
         * create new sudoku instance
         * @param {options}
         * options['grid'] {2D array with known values of the sudoku}
         * @returns {sudoku instance}
         */
        create: function (options) {
            var self = Object.create(this);

            // create sudoku rows, columns and blocks
            self.createRows();
            self.createColumns();
            self.createBlocks();

            // create sudoku cells
            self.createCells();

            // set grid
            self.setGrid(options.grid);

            return self;
        },
        /**
         * 
         */
        setGrid: function (grid) {
            this.grid = grid;
        },
        /**
         * solve sudoku by constraint propagation
         * @param {}
         * @returns {undefined}
         */
        solve: function () {
            for (var row in this.grid) {
                for (var col in this.grid[row]) {
                    var value = this.grid[row][col];
                    if (value > 0) {
                        // set value
                        this.cells[row][col].setValue(value);

                        // add to log
                        this.log.push({type:'setvalue', row:row, col:col, value:this.grid[row][col]})
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
                    this.getRow(row, col).addCell(c);
                    this.getColumn(row, col).addCell(c);
                    this.getBlock(row, col).addCell(c);

                    // add event handlers for logging purposes
                    c.on("change", this.onCellChanged.bind(this));
                    //c.on("eliminate", this.onCellElimination.bind(this));
                    //c.on("value", this.onCellSetValue.bind(this));

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
        /**
         * getter for log
         */
        getLog: function() {
            return this.log.reverse();
        },
        /* eventhandler for cell 'value' events
         */
        onCellSetValue: function (evt) {
            this.log.push({type:'value', row: evt.target.row, col: evt.target.col, value: evt.value })
        },
        /* eventhandler for cell changes
         */
        onCellChanged: function (evt) {
            this.log.push({type:'change', row: evt.target.row, col: evt.target.col, value: evt.value })
        },
        /* eventhandler for cell possibility changes
         */
        onCellElimination: function (evt) {
            this.log.push({type:'eliminate', row: evt.target.row, col: evt.target.col, value: evt.value }) 
        },
        /* plot initial
         */
        plotInitial: function() {
            var output = '<table class="sudoku">';
            for (var row=0;row<=8;row++) {
                output += "<tr>";
                for (var col=0;col<=8;col++) {
                    var known = this.grid[row][col]
                    if (known) {
                        output += "<td class=\"initial\" id=\"c" + row + col + "\">" + known + "</td>";                        
                    } else {
                        output += "<td id=\"c" + row + col + "\"></td>"; 
                    }
                }
                output += "</tr>";
            }
            output += "</table>";
            
            this.gridEl.innerHTML = output;
        },
        /* plot table with possible values in each cell
         */
        plotPossibilities: function () {
            var output = '<hr><table class="sudoku">';
            for (var row=0;row<=8;row++) {
                output += "<tr>";
                for (var col=0;col<=8;col++) {
                    var known = this.grid[row][col]
                    if (known) {
                        output += "<td class=\"initial\" id=\"c" + row + col + "\">" + known + "</td>";                        
                    } else {
                        var poss = this.cells[row][col].p.reduce(function(p, c, i, a) {return p + "," + c });
                        output += "<td id=\"c" + row + col + "\" class=\"possibilities\">" + poss + "</td>"; 
                    }
                }
                output += "</tr>";
            }
            output += "</table>";

            this.gridEl.innerHTML += output;
        }
};

module.exports = sudoku;