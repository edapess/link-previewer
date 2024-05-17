import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
import { load } from "cheerio";

import {
  extractBaseUrl,
  extractDescription,
  extractFavicons,
  extractImages,
  extractKeywords,
  extractMediaType,
  extractSiteName,
  extractTitle,
  fetchHTML,
  fetchTikTokData,
} from "./utils";

type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

export type LinkPreviewerHeaderType =
  | (RawAxiosRequestHeaders & MethodsHeaders)
  | AxiosHeaders;

async function getlinkPreviewData(
  url: string,
  options?: {
    headers?: LinkPreviewerHeaderType;
    noHeaders?: boolean;
    timeout?: number;
  }
): Promise<{
  url: string;
  title: string;
  siteName: string;
  description: string;
  mediaType: string;
  contentType: any;
  images: string[];
  favicons: string[];
  charset: any;
  keywords: string[];
}> {
  try {
    const html = await fetchHTML(url, options);
    const $ = load(html);
    const baseUrl = extractBaseUrl(url);

    let tiktokDescription = "";
    let tiktokImage = "";
    let tiktokMediaType = "";
    let tiktokFavIcon = "";

    if (baseUrl.includes("tiktok.com")) {
      const tiktokData = await fetchTikTokData($);
      tiktokDescription = tiktokData.description;
      tiktokImage = tiktokData.image;
      tiktokMediaType = tiktokData.mediaType;
      tiktokFavIcon = tiktokData.favIcon;
    }

    const title = extractTitle($);
    const description = tiktokDescription || extractDescription($);
    const siteName = extractSiteName($);
    const images = tiktokImage
      ? [tiktokImage, ...extractImages($, baseUrl)]
      : extractImages($, baseUrl);
    const favicons = tiktokFavIcon
      ? [tiktokFavIcon, ...extractFavicons($, baseUrl)]
      : extractFavicons($, baseUrl);
    const keywords = extractKeywords($);
    const mediaType = tiktokMediaType || extractMediaType($);
    const contentType = options?.headers?.common?.["Content-Type"] || "";

    const charset = contentType ? contentType.split("charset=")[1] : "";

    return {
      url,
      title,
      siteName,
      description,
      mediaType,
      contentType,
      images,
      favicons,
      charset,
      keywords,
    };
  } catch (error) {
    throw error;
  }
}
