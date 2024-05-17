"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMediaType = void 0;
var constants_1 = require("../constants");
var extractMediaType = function ($) {
    return $(constants_1.OG_TYPE).attr("content") || "";
};
exports.extractMediaType = extractMediaType;
