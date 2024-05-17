import { CheerioAPI } from "cheerio";
import { META_DESCRIPTION, OG_DESCRIPTION } from "../constants";

export const extractDescription = ($: CheerioAPI): string => {
  return (
    $(OG_DESCRIPTION).attr("content") ||
    $(META_DESCRIPTION).attr("content") ||
    ""
  );
};
