import axios, { AxiosError } from "axios";
import { load } from "cheerio";

import {
  ACCEPT_LANGUAGE,
  ACCESS_CONTROL_ALLOW_ORIGIN,
  ACCEPT,
  CONTENT_TYPE,
  OG_TITLE,
  TITLE_TAG,
  META_TITLE,
  OG_DESCRIPTION,
  META_DESCRIPTION,
  OG_SITE_NAME,
  OG_IMAGE,
  OG_IMAGE_URL,
  OG_KEYWORDS,
  META_KEYWORDS,
  OG_TYPE,
  USER_AGENT,
  TIK_TOK_BASE,
} from "./constants";

// Constants for link tags related to icons
const ICON_LINK_TAGS =
  'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]';

export async function getlinkPreviewData(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        "user-agent": USER_AGENT,
        "Accept-Language": ACCEPT_LANGUAGE,
        "Access-Control-Allow-Origin": ACCESS_CONTROL_ALLOW_ORIGIN,
        Accept: ACCEPT,
        "Content-Type": CONTENT_TYPE,
      },
    });

    const html = response.data.toString();
    const $ = load(html);
    const baseUrl = new URL(url).origin;
    let tiktokDescription = "";
    let tiktokImage = "";
    let tiktokMediaType = "";
    let tiktokFavIcon = "";
    if (baseUrl.includes("tiktok.com")) {
      const appContext = $("#__UNIVERSAL_DATA_FOR_REHYDRATION__").text();
      const json = JSON.parse(appContext);
      const key = Object.keys(json)[0];
      const tdata = json[key];
      const tikTokoembedLink = tdata["seo.abtest"].canonical;
      tiktokFavIcon =
        "https://pbs.twimg.com/profile_images/1478853185129238530/S4frAsl-_400x400.jpg";
      if (tikTokoembedLink.includes("/video/")) {
        const tiktokData = await axios.get(
          `${TIK_TOK_BASE}${tikTokoembedLink}`
        );

        tiktokDescription = tiktokData?.data?.title;
        tiktokImage = tiktokData.data.thumbnail_url;
        tiktokMediaType = tiktokData.data.type;
      } else {
        tiktokImage = tiktokFavIcon;
      }
    }

    const title =
      $(OG_TITLE).attr("content") ||
      $(TITLE_TAG).text() ||
      $(META_TITLE).attr("content");

    const description =
      $(OG_DESCRIPTION).attr("content") || $(META_DESCRIPTION).attr("content");
    const siteName = $(OG_SITE_NAME).attr("content");

    const images: string[] = [];
    if (tiktokImage) {
      images.push(tiktokImage);
    }
    $(OG_IMAGE).each(function (index, element) {
      const imageSrc = $(this).attr("content");
      if (imageSrc) {
        images.push(imageSrc);
      }
    });
    $(OG_IMAGE_URL).each(function (index, element) {
      const imageUrl = $(this).attr("content");
      if (imageUrl) {
        images.push(imageUrl);
      }
    });

    const favicons: string[] = [];
    if (tiktokFavIcon) {
      favicons.push(tiktokFavIcon);
    }
    $(ICON_LINK_TAGS).each(function (index, element) {
      const iconHref = $(this).attr("href");
      if (iconHref) {
        favicons.push(new URL(iconHref, baseUrl).href);
      }
    });

    let keywords: string[] = [];
    const ogKeywords = $(OG_KEYWORDS).attr("content");
    const metaKeywords = $(META_KEYWORDS).attr("content");
    if (ogKeywords) {
      keywords = ogKeywords.split(",");
    } else if (metaKeywords) {
      keywords = metaKeywords.split(",");
    }

    // Get media type and content type
    const mediaType = tiktokMediaType ?? $(OG_TYPE).attr("content");
    const contentType = response.headers["content-type"];

    // Get charset
    const charset = contentType ? contentType.split("charset=")[1] : "";

    const data = {
      url,
      title: title || "",
      siteName: siteName || "",
      description: tiktokDescription || description || "",
      mediaType: mediaType || "",
      contentType: contentType || "",
      images: images,
      favicons: favicons,
      charset: charset || "",
      keywords: keywords,
    };

    return data;
  } catch (error) {
    return error;
  }
}
