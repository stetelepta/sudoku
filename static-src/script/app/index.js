(function () {
    "use strict";
    /*global document*/
    var grid = require("./grid.js"),
        app = {
            /**
             * initialize new instance
             * @param {}
             * @returns {Object}
             */
            initialize: function () {
                grid.initialize();
            },
        };
    app.initialize();
}());