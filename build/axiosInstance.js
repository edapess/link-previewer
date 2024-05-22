"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
var axios_1 = __importDefault(require("axios"));
var constants_1 = require("./constants");
exports.axiosInstance = axios_1.default.create({
    headers: {
        "user-agent": constants_1.USER_AGENT,
        "Accept-Language": constants_1.ACCEPT_LANGUAGE,
        "Access-Control-Allow-Origin": constants_1.ACCESS_CONTROL_ALLOW_ORIGIN,
        Accept: constants_1.ACCEPT,
        "Content-Type": constants_1.CONTENT_TYPE,
    },
    timeout: 3000,
});
