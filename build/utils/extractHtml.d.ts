import { LinkPreviewerHeaderType } from "../MainExtractor";
export declare const fetchHTML: (url: string, options?: {
    headers?: LinkPreviewerHeaderType;
    noHeaders?: boolean;
    timeout?: number;
}) => Promise<string>;
