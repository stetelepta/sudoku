"use strict";
/*global document*/

var cell = require('./cell.js');
var smokesignals = require('smokesignals');

var grid = {
        /**
         * initialize new instance
         * @param {}
         * @returns {Object}
         */
        data: [],
        initialize: function () {
            // console.log('grid.initialize');

            this.initializeData();
            // console.log(this.data[0][0]);

            this.data[0][1].setValue(7);

            // console.log(this.data[0][1]);
        },
        /**
         * initializes this.data to a 9x9 2D array
         * @param {}
         * @returns {undefined}
         */
        initializeData: function () {
            for (var i=0;i<=8;i++) {
                this.data.push([]);
                for (var j=0;j<=8;j++) {
                    var c = cell.create(i,j);
                    c.on('change', this.onCellChanged.bind(this));
                    this.data[i][j] = c;
                }
            }
        },
        onCellChanged: function (evt) {
            console.log('grid.onCellChanged');
            console.log(evt.target);  
            console.log(evt.value);  
        }
};

module.exports = grid;