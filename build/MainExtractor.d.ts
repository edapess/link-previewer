import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
type MethodsHeaders = Partial<{
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
} & {
    common: AxiosHeaders;
}>;
export type LinkPreviewerHeaderType = (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
export type TOptions = {
    headers?: LinkPreviewerHeaderType;
    noHeaders?: boolean;
    timeout?: number;
};
export default class MainExtractor {
    private cheerioApi;
    private url;
    private options?;
    constructor(url: string, options?: TOptions);
    protected getBaseUrl(): string;
    getlinkPreviewData(): Promise<{
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
    protected fetchHTML: () => Promise<string>;
    protected getDescription: () => string;
    protected getFavicons(): string[];
    protected getImages(): string[];
    protected getKeywords(): string[];
    protected getMediaType: () => string;
    protected getSiteName: () => string;
    protected fetchTikTokData(): Promise<{
        description: string;
        image: string;
        mediaType: string;
        favIcon: string;
    }>;
    protected getTitle: () => string;
}
export {};
