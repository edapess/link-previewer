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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlinkPreviewData = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
function getlinkPreviewData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        axios_1.default
            .get(url, {
            headers: {
                "user-agent": "google-bot",
                "Accept-Language": "en-US",
                "Access-Control-Allow-Origin": "*",
                Accept: "multipart/form-data",
                "Content-Type": "text/html",
            },
        })
            .then((result) => result.data.toString())
            .then((html) => {
            const $ = (0, cheerio_1.load)(html);
            const title = $('meta[property="og:title"]').attr("content") ||
                $("title").text() ||
                $('meta[name="title"]').attr("content");
            const description = $('meta[property="og:description"]').attr("content") ||
                $('meta[name="description"]').attr("content");
            const url = $('meta[property="og:url"]').attr("content");
            const site_name = $('meta[property="og:site_name"]').attr("content");
            const images = [];
            $('meta[property="og:image"]').each(function (index, element) {
                const imageSrc = $(this).attr("content");
                if (imageSrc) {
                    images.push(imageSrc);
                }
            });
            $('meta[property="og:image:url"]').each(function (index, element) {
                const imageUrl = $(this).attr("content");
                if (imageUrl) {
                    images.push(imageUrl);
                }
            });
            const icon = $('link[rel="icon"]').attr("href") ||
                $('link[rel="shortcut icon"]').attr("href");
            let keywords = [];
            const ogKeywords = $('meta[property="og:keywords"]').attr("content");
            const metaKeywords = $('meta[name="keywords"]').attr("content");
            if (ogKeywords) {
                keywords = ogKeywords.split(",");
            }
            else if (metaKeywords) {
                keywords = metaKeywords.split(",");
            }
            const data = {
                description: description,
                keywords: keywords,
                icon: icon || "",
                images: images,
                url: url || "",
                title: title || "",
                siteName: site_name || "",
            };
            return data;
        })
            .catch((error) => {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        });
    });
}
exports.getlinkPreviewData = getlinkPreviewData;
