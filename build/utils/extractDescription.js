"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDescription = void 0;
var constants_1 = require("../constants");
var extractDescription = function ($) {
    return ($(constants_1.OG_DESCRIPTION).attr("content") ||
        $(constants_1.META_DESCRIPTION).attr("content") ||
        "");
};
exports.extractDescription = extractDescription;
