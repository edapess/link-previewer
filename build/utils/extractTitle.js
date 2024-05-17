"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTitle = void 0;
var constants_1 = require("../constants");
var extractTitle = function ($) {
    return ($(constants_1.OG_TITLE).attr(constants_1.META_CONTENT) ||
        $(constants_1.TITLE_TAG).text() ||
        $(constants_1.META_TITLE).attr(constants_1.META_CONTENT) ||
        "");
};
exports.extractTitle = extractTitle;
