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
} from "./constants";

// Constants for link tags related to icons
const ICON_LINK_TAGS =
  'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]';

export async function getlinkPreviewData(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        "user-agent": "BLAH",
        "Accept-Language": ACCEPT_LANGUAGE,
        "Access-Control-Allow-Origin": ACCESS_CONTROL_ALLOW_ORIGIN,
        Accept: ACCEPT,
        "Content-Type": CONTENT_TYPE,
      },
    });

    const html = response.data.toString();
    const $ = load(html);
    const baseUrl = new URL(url).origin;

    const title =
      $(OG_TITLE).attr("content") ||
      $(TITLE_TAG).text() ||
      $(META_TITLE).attr("content");
    const description =
      $(OG_DESCRIPTION).attr("content") || $(META_DESCRIPTION).attr("content");
    const siteName = $(OG_SITE_NAME).attr("content");

    const images: string[] = [];
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
    const mediaType = $(OG_TYPE).attr("content");
    const contentType = response.headers["content-type"];

    // Get charset
    const charset = contentType ? contentType.split("charset=")[1] : "";

    const data = {
      url,
      title: title || "",
      siteName: siteName || "",
      description: description || "",
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

const getData = async () => {
  const mydata = await getlinkPreviewData("https://vt.tiktok.com/ZSYewDtr7/");

  console.log("🚀 : mydata:", mydata);
};
getData();
