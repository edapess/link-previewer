import axios from "axios";
import { CheerioAPI } from "cheerio";
import { TIK_TOK_BASE } from "../constants";

export async function fetchTikTokData($: CheerioAPI): Promise<{
  description: string;
  image: string;
  mediaType: string;
  favIcon: string;
}> {
  let description = "";
  let image = "";
  let mediaType = "";
  const favIcon =
    "https://pbs.twimg.com/profile_images/1478853185129238530/S4frAsl-_400x400.jpg";

  const appContext = $("#__UNIVERSAL_DATA_FOR_REHYDRATION__").text();
  const json = JSON.parse(appContext);
  const key = Object.keys(json)[0];
  const tdata = json[key];
  const tikTokoembedLink = tdata["seo.abtest"].canonical;

  if (tikTokoembedLink.includes("/video/")) {
    const tiktokData = await axios.get(`${TIK_TOK_BASE}${tikTokoembedLink}`);
    description = tiktokData?.data?.title;
    image = tiktokData.data.thumbnail_url;
    mediaType = tiktokData.data.type;
  } else {
    image = favIcon;
  }

  return { description, image, mediaType, favIcon };
}
