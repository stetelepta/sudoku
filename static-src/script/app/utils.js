"use strict";

var utils = {
    hasClass: function (el, cls) {
        return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
    }
};

module.exports = utils;