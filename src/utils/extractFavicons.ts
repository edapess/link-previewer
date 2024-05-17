import { CheerioAPI } from "cheerio";
import { ICON_LINK_TAGS } from "../constants";

export function extractFavicons($: CheerioAPI, baseUrl: string): string[] {
  const favicons: string[] = [];
  $(ICON_LINK_TAGS).each(function () {
    const href = $(this).attr("href");
    if (href) favicons.push(new URL(href, baseUrl).href);
  });
  return favicons;
}
