import { AxiosHeaders } from "axios";
export declare function getlinkPreviewData(url: string, headers?: AxiosHeaders): Promise<{
    url: string;
    title: string;
    siteName: string;
    description: string;
    mediaType: string;
    contentType: any;
    images: string[];
    favicons: string[];
    charset: any;
    keywords: string[];
}>;
