"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractBaseUrl = void 0;
var extractBaseUrl = function (url) {
    var parts = url.split("/");
    return parts[0] + "//" + parts[2];
};
exports.extractBaseUrl = extractBaseUrl;
