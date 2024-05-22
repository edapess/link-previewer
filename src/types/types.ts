import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";

export type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

export type LinkPreviewerHeaderType =
  | (RawAxiosRequestHeaders & MethodsHeaders)
  | AxiosHeaders;

export type TOptions = {
  headers?: LinkPreviewerHeaderType;
  timeout?: number;
};
