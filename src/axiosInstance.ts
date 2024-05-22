import axios from "axios";
import {
  ACCEPT,
  ACCEPT_LANGUAGE,
  ACCESS_CONTROL_ALLOW_ORIGIN,
  CONTENT_TYPE,
  USER_AGENT,
} from "./constants";

export const axiosInstance = axios.create({
  headers: {
    "user-agent": USER_AGENT,
    "Accept-Language": ACCEPT_LANGUAGE,
    "Access-Control-Allow-Origin": ACCESS_CONTROL_ALLOW_ORIGIN,
    Accept: ACCEPT,
    "Content-Type": CONTENT_TYPE,
  },
  timeout: 3000,
});
