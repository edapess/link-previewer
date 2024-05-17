import { CheerioAPI } from "cheerio";
import { OG_IMAGE, OG_IMAGE_URL } from "../constants";

export function extractImages($: CheerioAPI, baseUrl: string): string[] {
  const images: string[] = [];
  $(".ArticleTile_tileImage__no39y img").each(function () {
    const src = $(this).attr("src");
    if (src) images.push(src);
  });

  $(OG_IMAGE).each(function () {
    const src = $(this).attr("content");
    if (src) images.push(src);
  });

  $(OG_IMAGE_URL).each(function () {
    const src = $(this).attr("content");
    if (src) images.push(src);
  });

  return images;
}
