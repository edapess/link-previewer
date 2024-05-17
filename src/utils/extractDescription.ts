import { CheerioAPI } from "cheerio";
import { META_CONTENT, META_DESCRIPTION, OG_DESCRIPTION } from "../constants";

export const extractDescription = ($: CheerioAPI): string => {
  return (
    $(OG_DESCRIPTION).attr(META_CONTENT) ||
    $(META_DESCRIPTION).attr(META_CONTENT) ||
    ""
  );
};
