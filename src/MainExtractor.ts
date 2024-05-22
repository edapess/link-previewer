import { CheerioAPI, load } from "cheerio";
import {
  ACCEPT,
  ACCEPT_LANGUAGE,
  ACCESS_CONTROL_ALLOW_ORIGIN,
  CONTENT_TYPE,
  ICON_LINK_TAGS,
  META_CONTENT,
  META_DESCRIPTION,
  META_KEYWORDS,
  META_TITLE,
  OG_DESCRIPTION,
  OG_IMAGE,
  OG_IMAGE_URL,
  OG_KEYWORDS,
  OG_SITE_NAME,
  OG_TITLE,
  OG_TYPE,
  TIK_TOK_BASE,
  TITLE_TAG,
  USER_AGENT,
} from "./constants";

import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
import { axiosInstance } from "./axiosInstance";
import { TOptions } from "./types/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default class MainExtractor {
  private cheerioApi: CheerioAPI;
  private url: string;
  private options?: TOptions;

  constructor(url: string, options?: TOptions) {
    this.url = url;
    this.cheerioApi = load("");
    this.options = options;
  }
  protected getBaseUrl(): string {
    const parts = this.url.split("/");
    return parts[0] + "//" + parts[2];
  }

  public async getlinkPreviewData(): Promise<{
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
      const html = await this.fetchHTML();
      if (html) {
        this.cheerioApi = load(html);
      }
      const baseUrl = this.getBaseUrl();

      let tiktokDescription = "";
      let tiktokImage = "";
      let tiktokMediaType = "";
      let tiktokFavIcon = "";

      if (baseUrl.includes("tiktok.com")) {
        const tiktokData = await this.fetchTikTokData();
        tiktokDescription = tiktokData.description;
        tiktokImage = tiktokData.image;
        tiktokMediaType = tiktokData.mediaType;
        tiktokFavIcon = tiktokData.favIcon;
      }

      const title = this.getTitle();
      const description = tiktokDescription || this.getDescription();
      const siteName = this.getSiteName();
      const images = [tiktokImage, ...this.getImages()].filter(Boolean);
      const favicons = [tiktokFavIcon, ...this.getFavicons()].filter(Boolean);

      const keywords = this.getKeywords();
      const mediaType = tiktokMediaType || this.getMediaType();
      const contentType = this.options?.headers?.common?.["Content-Type"] || "";

      const charset = contentType ? contentType.split("charset=")[1] : "";

      return {
        url: this.url,
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

  protected fetchHTML = async (): Promise<string | undefined> => {
    const { headers, timeout } = this.options || {};
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second delay between retries
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        attempt++;
        let response = await axiosInstance.get(this.url, {
          headers: headers ?? {
            "user-agent": USER_AGENT,
            "Accept-Language": ACCEPT_LANGUAGE,
            "Access-Control-Allow-Origin": ACCESS_CONTROL_ALLOW_ORIGIN,
            Accept: ACCEPT,
            "Content-Type": CONTENT_TYPE,
          },
          timeout: timeout ?? 3000,
        });
        console.log("🚀 : attempt:", attempt);
        return response.data.toString();
      } catch (error) {
        if (attempt >= maxRetries) {
          throw error;
        }
        await delay(retryDelay);
      }
    }
  };

  protected getDescription = (): string => {
    return (
      this.cheerioApi(OG_DESCRIPTION).attr(META_CONTENT) ||
      this.cheerioApi(META_DESCRIPTION).attr(META_CONTENT) ||
      ""
    );
  };
  protected getFavicons(): string[] {
    const favicons: string[] = [];
    this.cheerioApi(ICON_LINK_TAGS).each((_, element) => {
      const href = this.cheerioApi(element).attr("href");
      if (href) favicons.push(new URL(href, this.getBaseUrl()).href);
    });
    return favicons;
  }

  protected getImages(): string[] {
    const images: string[] = [];

    this.cheerioApi(OG_IMAGE).each((_, element) => {
      const src = this.cheerioApi(element).attr(META_CONTENT);
      if (src) images.push(src);
    });

    this.cheerioApi(OG_IMAGE_URL).each((_, element) => {
      const src = this.cheerioApi(element).attr(META_CONTENT);
      if (src) images.push(src);
    });

    if (!images.length) {
      this.cheerioApi("*[class*='VideoThumbnail']").each((_, element) => {
        const src = this.cheerioApi(element).attr("src");
        if (src) images.push(src);
      });
    }

    if (!images.length) {
      this.cheerioApi("img").each((_, element) => {
        const src = this.cheerioApi(element).attr("src");
        if (src) images.push(src);
      });
    }

    return images;
  }
  protected getKeywords(): string[] {
    const keywords =
      this.cheerioApi(OG_KEYWORDS).attr(META_CONTENT) ||
      this.cheerioApi(META_KEYWORDS).attr(META_CONTENT) ||
      "";
    return keywords ? keywords.split(",") : [];
  }
  protected getMediaType = (): string => {
    return this.cheerioApi(OG_TYPE).attr(META_CONTENT) || "";
  };
  protected getSiteName = (): string => {
    return this.cheerioApi(OG_SITE_NAME).attr(META_CONTENT) || "";
  };
  protected async fetchTikTokData(): Promise<{
    description: string;
    image: string;
    mediaType: string;
    favIcon: string;
  }> {
    let description = "";
    let image = "";
    let mediaType = "";
    const favIcon =
      "https://github.com/edapess/link-previewer/blob/master/src/assets/tiktokpreview.jpeg";

    const appContext = this.cheerioApi(
      "#__UNIVERSAL_DATA_FOR_REHYDRATION__"
    ).text();
    const json = JSON.parse(appContext);
    const key = Object.keys(json)[0];
    const tdata = json[key];
    const tikTokoembedLink = tdata["seo.abtest"].canonical;

    if (tikTokoembedLink.includes("/video/")) {
      const { headers, timeout } = this.options || {};
      const tiktokData = await axiosInstance.get(
        `${TIK_TOK_BASE}${tikTokoembedLink}`,

        {
          headers: headers ?? {
            "user-agent": USER_AGENT,
            "Accept-Language": ACCEPT_LANGUAGE,
            "Access-Control-Allow-Origin": ACCESS_CONTROL_ALLOW_ORIGIN,
            Accept: ACCEPT,
            "Content-Type": CONTENT_TYPE,
          },
          timeout: timeout ?? 3000,
        }
      );
      description = tiktokData?.data?.title;
      image = tiktokData.data.thumbnail_url;
      mediaType = tiktokData.data.type;
    } else {
      image = favIcon;
    }

    return { description, image, mediaType, favIcon };
  }

  protected getTitle = (): string => {
    return (
      this.cheerioApi(OG_TITLE).attr(META_CONTENT) ||
      this.cheerioApi(TITLE_TAG).text() ||
      this.cheerioApi(META_TITLE).attr(META_CONTENT) ||
      ""
    );
  };
}
