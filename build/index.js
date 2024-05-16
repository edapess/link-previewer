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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlinkPreviewData = void 0;
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = require("cheerio");
var constants_1 = require("./constants");
// Constants for link tags related to icons
var ICON_LINK_TAGS = 'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]';
function getlinkPreviewData(url, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var response, html, $_1, parts, baseUrl_1, tiktokDescription, tiktokImage, tiktokMediaType, tiktokFavIcon, appContext, json, key, tdata, tikTokoembedLink, tiktokData, title, description, siteName, images_1, favicons_1, keywords, ogKeywords, metaKeywords, mediaType, contentType, charset, data, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: headers
                                ? headers
                                : {
                                    "user-agent": constants_1.USER_AGENT,
                                    "Accept-Language": constants_1.ACCEPT_LANGUAGE,
                                    "Access-Control-Allow-Origin": constants_1.ACCESS_CONTROL_ALLOW_ORIGIN,
                                    Accept: constants_1.ACCEPT,
                                    "Content-Type": constants_1.CONTENT_TYPE,
                                },
                        })];
                case 1:
                    response = _b.sent();
                    html = response.data.toString();
                    $_1 = (0, cheerio_1.load)(html);
                    parts = url.split("/");
                    baseUrl_1 = parts[0] + "//" + parts[2];
                    tiktokDescription = "";
                    tiktokImage = "";
                    tiktokMediaType = "";
                    tiktokFavIcon = "";
                    if (!baseUrl_1.includes("tiktok.com")) return [3 /*break*/, 4];
                    appContext = $_1("#__UNIVERSAL_DATA_FOR_REHYDRATION__").text();
                    json = JSON.parse(appContext);
                    key = Object.keys(json)[0];
                    tdata = json[key];
                    tikTokoembedLink = tdata["seo.abtest"].canonical;
                    tiktokFavIcon =
                        "https://pbs.twimg.com/profile_images/1478853185129238530/S4frAsl-_400x400.jpg";
                    if (!tikTokoembedLink.includes("/video/")) return [3 /*break*/, 3];
                    return [4 /*yield*/, axios_1.default.get("".concat(constants_1.TIK_TOK_BASE).concat(tikTokoembedLink))];
                case 2:
                    tiktokData = _b.sent();
                    tiktokDescription = (_a = tiktokData === null || tiktokData === void 0 ? void 0 : tiktokData.data) === null || _a === void 0 ? void 0 : _a.title;
                    tiktokImage = tiktokData.data.thumbnail_url;
                    tiktokMediaType = tiktokData.data.type;
                    return [3 /*break*/, 4];
                case 3:
                    tiktokImage = tiktokFavIcon;
                    _b.label = 4;
                case 4:
                    title = $_1(constants_1.OG_TITLE).attr("content") ||
                        $_1(constants_1.TITLE_TAG).text() ||
                        $_1(constants_1.META_TITLE).attr("content");
                    description = $_1(constants_1.OG_DESCRIPTION).attr("content") || $_1(constants_1.META_DESCRIPTION).attr("content");
                    siteName = $_1(constants_1.OG_SITE_NAME).attr("content");
                    images_1 = [];
                    if (tiktokImage) {
                        images_1.push(tiktokImage);
                    }
                    $_1(constants_1.OG_IMAGE).each(function (index, element) {
                        var imageSrc = $_1(this).attr("content");
                        if (imageSrc) {
                            images_1.push(imageSrc);
                        }
                    });
                    $_1(constants_1.OG_IMAGE_URL).each(function (index, element) {
                        var imageUrl = $_1(this).attr("content");
                        if (imageUrl) {
                            images_1.push(imageUrl);
                        }
                    });
                    favicons_1 = [];
                    if (tiktokFavIcon) {
                        favicons_1.push(tiktokFavIcon);
                    }
                    $_1(ICON_LINK_TAGS).each(function (index, element) {
                        var iconHref = $_1(this).attr("href");
                        if (iconHref) {
                            favicons_1.push(new URL(iconHref, baseUrl_1).href);
                        }
                    });
                    keywords = [];
                    ogKeywords = $_1(constants_1.OG_KEYWORDS).attr("content");
                    metaKeywords = $_1(constants_1.META_KEYWORDS).attr("content");
                    if (ogKeywords) {
                        keywords = ogKeywords.split(",");
                    }
                    else if (metaKeywords) {
                        keywords = metaKeywords.split(",");
                    }
                    mediaType = tiktokMediaType !== null && tiktokMediaType !== void 0 ? tiktokMediaType : $_1(constants_1.OG_TYPE).attr("content");
                    contentType = response.headers["content-type"];
                    charset = contentType ? contentType.split("charset=")[1] : "";
                    data = {
                        url: url,
                        title: title || "",
                        siteName: siteName || "",
                        description: tiktokDescription || description || "",
                        mediaType: mediaType || "",
                        contentType: contentType || "",
                        images: images_1,
                        favicons: favicons_1,
                        charset: charset || "",
                        keywords: keywords,
                    };
                    return [2 /*return*/, data];
                case 5:
                    error_1 = _b.sent();
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getlinkPreviewData = getlinkPreviewData;
