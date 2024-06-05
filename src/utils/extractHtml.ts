import axios from "axios";

import {
  USER_AGENT,
  ACCEPT_LANGUAGE,
  ACCESS_CONTROL_ALLOW_ORIGIN,
  ACCEPT,
  CONTENT_TYPE,
} from "../constants";
import { LinkPreviewerHeaderType } from "../types/types";

export const fetchHTML = async (
  url: string,
  options?: {
    headers?: LinkPreviewerHeaderType;
    noHeaders?: boolean;
    timeout?: number;
  }
): Promise<string> => {
  const { headers, noHeaders, timeout } = options || {};
  const response = await axios.get(url, {
    headers: noHeaders
      ? {}
      : headers ?? {
          "user-agent": USER_AGENT,
          "Accept-Language": ACCEPT_LANGUAGE,
          "Access-Control-Allow-Origin": ACCESS_CONTROL_ALLOW_ORIGIN,
          Accept: ACCEPT,
          "Content-Type": CONTENT_TYPE,
        },
    timeout: timeout ?? 3000,
  });
  return response.data.toString();
};
