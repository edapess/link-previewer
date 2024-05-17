import { CheerioAPI } from "cheerio";
import { META_KEYWORDS, OG_KEYWORDS } from "../constants";

export const extractKeywords = ($: CheerioAPI): string[] => {
  const keywords =
    $(OG_KEYWORDS).attr("content") || $(META_KEYWORDS).attr("content") || "";
  return keywords ? keywords.split(",") : [];
};
