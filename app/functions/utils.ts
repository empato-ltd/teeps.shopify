export function capitalizeWords(sentence: string): string {
  return sentence.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
