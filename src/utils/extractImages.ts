import { CheerioAPI } from "cheerio";
import { META_CONTENT, OG_IMAGE, OG_IMAGE_URL } from "../constants";

export function extractImages($: CheerioAPI): string[] {
  const images: string[] = [];

  $(OG_IMAGE).each(function () {
    const src = $(this).attr(META_CONTENT);
    if (src) images.push(src);
  });

  $(OG_IMAGE_URL).each(function () {
    const src = $(this).attr(META_CONTENT);
    if (src) images.push(src);
  });
  if (!images.length) {
    $("*[class*='VideoThumbnail']").each(function () {
      const src = $(this).attr("src");
      if (src) images.push(src);
    });
  }
  if (!images.length) {
    $("img").each(function () {
      const src = $(this).attr("src");
      if (src) images.push(src);
    });
  }
  return images;
}
