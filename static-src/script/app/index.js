(function () {
    "use strict";
    /*global document*/
    var sudoku = require("./sudoku.js");
    var samples = require("./samples.js");
    var app = {
            /**
             * initialize new instance
             * @param {}
             * @returns {Object}
             */
            initialize: function () {
                var s = sudoku.create();
                s.setGrid(samples.simple);
                s.solve();
                s.plot();
            },
        };
    app.initialize();
}());