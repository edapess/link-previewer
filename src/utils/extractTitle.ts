import { CheerioAPI } from "cheerio";
import { META_CONTENT, META_TITLE, OG_TITLE, TITLE_TAG } from "../constants";

export const extractTitle = ($: CheerioAPI): string => {
  return (
    $(OG_TITLE).attr(META_CONTENT) ||
    $(TITLE_TAG).text() ||
    $(META_TITLE).attr(META_CONTENT) ||
    ""
  );
};
