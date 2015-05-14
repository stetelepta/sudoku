(function () {
    "use strict";
    /*global document*/
    var sudoku = require("./sudoku/sudoku.js");
    var samples = require("./samples.js");
    var animationQueue = require("./animate.js");
    var utils = require('./utils.js');
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
                this.s = sudoku.create({grid: samples.simple});
                this.s.solve();
                this.s.plotInitial();

                this.setupQueue();
                //animationQueue.start();
                this.addEventListeners();
            },
            /**
             * loop through sudoku log, an make animation actions for each item
             */
            setupQueue: function () {
                // use logging 
                animationQueue.logging = true;
                animationQueue.logElm = document.querySelector('.log');

                var colors = {
                    neutral: '#000',
                    change: '#CE7727',
                    value: '#666',
                    setvalue: '#ccc',
                    eliminate: '#B4CA6E',
                    changeInitial: '#ccc',
                    valueInitial: '#666',
                    setvalueInitial: '#666',
                    eliminateInitial: '#333',
                };

                // loop through log, add animation object to queue
                var sudokuLog = this.s.getLog();

                for (var i in sudokuLog) {
                    var item = sudokuLog[i];
                    var cellElm = document.querySelector('#c' + item.row + item.col);
                    
                    if (utils.hasClass(cellElm, "initial")) {
                        item.type += "Initial";
                    }

                    if (item.type !== "setvalueInitial" && item.type !== "valueInitial" && item.type !== "change") {
                        animationQueue.add({
                            el: cellElm,
                            properties: {backgroundColor: colors['neutral']},
                            options: {duration: 0},
                        });
                    }

                    var animationItem = {
                        el: cellElm,
                        properties: {backgroundColor: colors[item.type]},
                        options: {duration: 10},
                        msg: "(" + item.row + ", " + item.col + ")" + ", " + item.type + " " + item.value + "\n",
                    }

                    if (item.type === "change") {
                        animationItem.value = item.value;
                    }
                    animationQueue.add(animationItem);
                }
            },
            addEventListeners: function () {
                this.solveBtn.addEventListener("click", this.onSolveClick.bind(this));
                this.pauseBtn.addEventListener("click", this.onPauseClick.bind(this));
                this.stepBtn.addEventListener("click", this.onStepClick.bind(this));
            },
            onSolveClick: function () {
                animationQueue.start();
                this.solveBtn.classList.toggle("hide");
                //this.stopBtn.classList.toggle("hide");
                this.pauseBtn.classList.toggle("hide");
            },
            onPauseClick: function () {
                animationQueue.pause();
                this.pauseBtn.classList.toggle("hide");
                this.solveBtn.classList.toggle("hide");
            },
            onStepClick: function () {
                animationQueue.step();
            }
        };
    app.initialize();
}());