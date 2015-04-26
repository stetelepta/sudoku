(function () {
    "use strict";
    /*global document*/
    var sudoku = require("./sudoku/sudoku.js");
    var samples = require("./samples.js");
    var app = {
            /**
             * initialize new instance
             * @param {}
             * @returns {Object}
             */
            s: undefined,
            solveBtn: document.querySelector(".solve"),
            pauseBtn: document.querySelector(".pause"),
            stepBtn: document.querySelector(".step"),
            initialize: function () {
                this.s = sudoku.create();
                this.s.setGrid(samples.simple);
                this.s.plotInitial();
                this.addEventListeners();
            },
            addEventListeners: function () {
                this.solveBtn.addEventListener("click", this.onSolveClick.bind(this));
                this.pauseBtn.addEventListener("click", this.onPauseClick.bind(this));
                this.stepBtn.addEventListener("click", this.onStepClick.bind(this));
            },
            onSolveClick: function () {
                this.s.solve();
                this.solveBtn.classList.toggle("hide");
                //this.stopBtn.classList.toggle("hide");
                this.pauseBtn.classList.toggle("hide");
            },
            onPauseClick: function () {
                this.s.pause();
                this.pauseBtn.classList.toggle("hide");
                this.solveBtn.classList.toggle("hide");
            },
            onStepClick: function () {
                this.s.step();
            }
        };
    app.initialize();
}());