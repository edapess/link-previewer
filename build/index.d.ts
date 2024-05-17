import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
type MethodsHeaders = Partial<{
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
} & {
    common: AxiosHeaders;
}>;
export type LinkPreviewerHeaderType = (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
export declare function getlinkPreviewData(url: string, options?: {
    headers?: LinkPreviewerHeaderType;
    noHeaders?: boolean;
    timeout?: number;
}): Promise<{
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
export {};
