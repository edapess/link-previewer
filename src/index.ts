import axios from "axios";
import { load } from "cheerio";

export async function getlinkPreviewData(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        "user-agent": "google-bot",
        "Accept-Language": "en-US",
        "Access-Control-Allow-Origin": "*",
        Accept: "multipart/form-data",
        "Content-Type": "text/html",
      },
    });

    const html = response.data.toString();
    const $ = load(html);
    const baseUrl = new URL(url).origin;

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $('meta[name="title"]').attr("content");
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content");
    const siteName = $('meta[property="og:site_name"]').attr("content");

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

    const favicons: string[] = [];
    $(
      'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
    ).each(function (index, element) {
      const iconHref = $(this).attr("href");
      if (iconHref) {
        favicons.push(new URL(iconHref, baseUrl).href);
      }
    });

    let keywords: string[] = [];
    const ogKeywords = $('meta[property="og:keywords"]').attr("content");
    const metaKeywords = $('meta[name="keywords"]').attr("content");
    if (ogKeywords) {
      keywords = ogKeywords.split(",");
    } else if (metaKeywords) {
      keywords = metaKeywords.split(",");
    }

    // Get media type and content type
    const mediaType = $('meta[property="og:type"]').attr("content");
    const contentType = response.headers["content-type"];

    // Get charset
    const charset = response.headers["content-type"]
      ? response.headers["content-type"].split("charset=")[1]
      : "";

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
    throw new Error(error?.message);
  }
}

const getData = async () => {
  const mydata = await getlinkPreviewData(
    "https://alpha-links.chalkboard.io/join-board/MTI5/WTRWaVkwMnhVNVBDRHk3ZmMyRzdwMVZKWUJwMg=="
  );

  console.log("🚀 : mydata:", mydata);
};
getData();
