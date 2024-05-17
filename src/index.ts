import MainExtractor, { TOptions } from "./MainExtractor";

export const getlinkPreviewData = async (url: string, options?: TOptions) => {
  const extractor = new MainExtractor(url, options);

  const previewData = await extractor.getlinkPreviewData();
  return previewData;
};
