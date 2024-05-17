import { CheerioAPI } from "cheerio";
export declare function fetchTikTokData($: CheerioAPI): Promise<{
    description: string;
    image: string;
    mediaType: string;
    favIcon: string;
}>;
