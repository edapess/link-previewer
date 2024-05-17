"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractKeywords = void 0;
var constants_1 = require("../constants");
var extractKeywords = function ($) {
    var keywords = $(constants_1.OG_KEYWORDS).attr(constants_1.META_CONTENT) ||
        $(constants_1.META_KEYWORDS).attr(constants_1.META_CONTENT) ||
        "";
    return keywords ? keywords.split(",") : [];
};
exports.extractKeywords = extractKeywords;
