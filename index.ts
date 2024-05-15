import axios from "axios";
import { load } from "cheerio";

export async function getlinkPreviewData(url: string) {
  axios
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
      const $ = load(html);
      const title =
        $('meta[property="og:title"]').attr("content") ||
        $("title").text() ||
        $('meta[name="title"]').attr("content");
      const description =
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content");
      const url = $('meta[property="og:url"]').attr("content");
      const site_name = $('meta[property="og:site_name"]').attr("content");

      const images: string[] = [];
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
      const icon =
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href");

      let keywords: string[] = [];
      const ogKeywords = $('meta[property="og:keywords"]').attr("content");
      const metaKeywords = $('meta[name="keywords"]').attr("content");
      if (ogKeywords) {
        keywords = ogKeywords.split(",");
      } else if (metaKeywords) {
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
    .then((data) => data)
    .catch((error) => {
      throw new Error(error?.message);
    });
}
