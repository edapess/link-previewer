"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlinkPreviewData = void 0;
var cheerio_1 = require("cheerio");
var utils_1 = require("./utils");
function getlinkPreviewData(url, options) {
    return __awaiter(this, void 0, void 0, function () {
        var html, $, baseUrl, tiktokDescription, tiktokImage, tiktokMediaType, tiktokFavIcon, tiktokData, title, description, siteName, images, favicons, keywords, mediaType, contentType, charset, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, utils_1.fetchHTML)(url, options)];
                case 1:
                    html = _c.sent();
                    $ = (0, cheerio_1.load)(html);
                    baseUrl = (0, utils_1.extractBaseUrl)(url);
                    tiktokDescription = "";
                    tiktokImage = "";
                    tiktokMediaType = "";
                    tiktokFavIcon = "";
                    if (!baseUrl.includes("tiktok.com")) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, utils_1.fetchTikTokData)($)];
                case 2:
                    tiktokData = _c.sent();
                    tiktokDescription = tiktokData.description;
                    tiktokImage = tiktokData.image;
                    tiktokMediaType = tiktokData.mediaType;
                    tiktokFavIcon = tiktokData.favIcon;
                    _c.label = 3;
                case 3:
                    title = (0, utils_1.extractTitle)($);
                    description = tiktokDescription || (0, utils_1.extractDescription)($);
                    siteName = (0, utils_1.extractSiteName)($);
                    images = __spreadArray([tiktokImage], (0, utils_1.extractImages)($), true).filter(Boolean);
                    favicons = tiktokFavIcon
                        ? __spreadArray([tiktokFavIcon], (0, utils_1.extractFavicons)($, baseUrl), true) : (0, utils_1.extractFavicons)($, baseUrl);
                    keywords = (0, utils_1.extractKeywords)($);
                    mediaType = tiktokMediaType || (0, utils_1.extractMediaType)($);
                    contentType = ((_b = (_a = options === null || options === void 0 ? void 0 : options.headers) === null || _a === void 0 ? void 0 : _a.common) === null || _b === void 0 ? void 0 : _b["Content-Type"]) || "";
                    charset = contentType ? contentType.split("charset=")[1] : "";
                    return [2 /*return*/, {
                            url: url,
                            title: title,
                            siteName: siteName,
                            description: description,
                            mediaType: mediaType,
                            contentType: contentType,
                            images: images,
                            favicons: favicons,
                            charset: charset,
                            keywords: keywords,
                        }];
                case 4:
                    error_1 = _c.sent();
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getlinkPreviewData = getlinkPreviewData;
var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var myData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getlinkPreviewData(
                //photo tik tok
                //"https://vt.tiktok.com/ZSYewDtr7/"
                //video tik tok
                "https://vt.tiktok.com/ZSYewf7CB/"
                //"https://www.nba.com/news/nuggets-timberwolves-takeaways-game-6-2024-nba-playoffs"
                //"https://www.nba.com/awards/2024"
                //"https://youtube.com/watch?v=NMfBdEV03j8&si=Ouo_TRGJHo21ijkA"
                )];
            case 1:
                myData = _a.sent();
                console.log("🚀 : myData:", myData);
                return [2 /*return*/];
        }
    });
}); };
getData();
