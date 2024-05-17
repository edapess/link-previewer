import { CheerioAPI } from "cheerio";
import { OG_SITE_NAME } from "../constants";

export const extractSiteName = ($: CheerioAPI): string => {
  return $(OG_SITE_NAME).attr("content") || "";
};
