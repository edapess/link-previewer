import { CheerioAPI } from "cheerio";
import { OG_TYPE } from "../constants";

export const extractMediaType = ($: CheerioAPI): string => {
  return $(OG_TYPE).attr("content") || "";
};
