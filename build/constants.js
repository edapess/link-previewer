"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIK_TOK_BASE = exports.ICON_LINK_TAGS = exports.OG_TYPE = exports.META_KEYWORDS = exports.OG_KEYWORDS = exports.OG_IMAGE_URL = exports.OG_IMAGE = exports.OG_SITE_NAME = exports.META_DESCRIPTION = exports.OG_DESCRIPTION = exports.META_TITLE = exports.TITLE_TAG = exports.OG_TITLE = exports.CONTENT_TYPE = exports.ACCEPT = exports.ACCESS_CONTROL_ALLOW_ORIGIN = exports.ACCEPT_LANGUAGE = exports.USER_AGENT = void 0;
// Constants for request headers
exports.USER_AGENT = "google-bot";
exports.ACCEPT_LANGUAGE = "en-US";
exports.ACCESS_CONTROL_ALLOW_ORIGIN = "*";
exports.ACCEPT = "multipart/form-data";
exports.CONTENT_TYPE = "text/html";
// Constants for meta tag properties
exports.OG_TITLE = 'meta[property="og:title"]';
exports.TITLE_TAG = "title";
exports.META_TITLE = 'meta[name="title"]';
exports.OG_DESCRIPTION = 'meta[property="og:description"]';
exports.META_DESCRIPTION = 'meta[name="description"]';
exports.OG_SITE_NAME = 'meta[property="og:site_name"]';
exports.OG_IMAGE = 'meta[property="og:image"]';
exports.OG_IMAGE_URL = 'meta[property="og:image:url"]';
exports.OG_KEYWORDS = 'meta[property="og:keywords"]';
exports.META_KEYWORDS = 'meta[name="keywords"]';
exports.OG_TYPE = 'meta[property="og:type"]';
exports.ICON_LINK_TAGS = 'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]';
//tik tok base url for scrapping
exports.TIK_TOK_BASE = "https://www.tiktok.com/oembed?url=";
