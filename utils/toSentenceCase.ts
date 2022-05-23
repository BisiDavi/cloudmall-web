export default function toSentenceCase(word: string) {
  const storefirstChar = word?.slice(0, 1);
  const remainLetters = word?.slice(1, word?.length);
  const firstCharUpperCase = storefirstChar?.toUpperCase();
  const sentenceCase = `${firstCharUpperCase}${remainLetters}`;
  return sentenceCase;
}
