export const extractFirstImage = (content: string): string | null => {
  const imgRegex = /<img [^>]*src=["']([^"']*)["'][^>]*>/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
};
