import { CheerioAPI } from "cheerio";
import { META_CONTENT, OG_TYPE } from "../constants";

export const extractMediaType = ($: CheerioAPI): string => {
  return $(OG_TYPE).attr(META_CONTENT) || "";
};
