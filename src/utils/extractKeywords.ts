import { CheerioAPI } from "cheerio";
import { META_CONTENT, META_KEYWORDS, OG_KEYWORDS } from "../constants";

export const extractKeywords = ($: CheerioAPI): string[] => {
  const keywords =
    $(OG_KEYWORDS).attr(META_CONTENT) ||
    $(META_KEYWORDS).attr(META_CONTENT) ||
    "";
  return keywords ? keywords.split(",") : [];
};
