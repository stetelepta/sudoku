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
                this.addEventListeners();
            },
            /**
             * add event listeners for all elements in this view
             * @param {}
             * @returns {undefined}
             */
            addEventListeners: function () {
                console.log('addEventListeners');
            },
        };
    app.initialize();
}());