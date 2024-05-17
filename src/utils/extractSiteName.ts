import { CheerioAPI } from "cheerio";
import { META_CONTENT, OG_SITE_NAME } from "../constants";

export const extractSiteName = ($: CheerioAPI): string => {
  return $(OG_SITE_NAME).attr(META_CONTENT) || "";
};
