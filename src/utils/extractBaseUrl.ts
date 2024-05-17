export const extractBaseUrl = (url: string): string => {
  const parts = url.split("/");
  return parts[0] + "//" + parts[2];
};
