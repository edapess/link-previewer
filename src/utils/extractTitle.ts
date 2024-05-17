import { CheerioAPI } from "cheerio";
import { META_TITLE, OG_TITLE, TITLE_TAG } from "../constants";

export const extractTitle = ($: CheerioAPI): string => {
  return (
    $(OG_TITLE).attr("content") ||
    $(TITLE_TAG).text() ||
    $(META_TITLE).attr("content") ||
    ""
  );
};
