import { TOptions } from "./types/types";
export declare const getLinkPreviewData: (url: string, options?: TOptions) => Promise<{
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
