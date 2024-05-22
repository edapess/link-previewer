import MainExtractor from "./MainExtractor";
import { TOptions } from "./types/types";

export const getLinkPreviewData = async (url: string, options?: TOptions) => {
  const extractor = new MainExtractor(url, options);

  const previewData = await extractor.getlinkPreviewData();
  return previewData;
};
