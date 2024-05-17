"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSiteName = void 0;
var constants_1 = require("../constants");
var extractSiteName = function ($) {
    return $(constants_1.OG_SITE_NAME).attr("content") || "";
};
exports.extractSiteName = extractSiteName;
