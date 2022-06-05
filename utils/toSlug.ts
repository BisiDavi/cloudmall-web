export default function toSlug(word: string) {
  const slug = word.toLowerCase().replaceAll(" ", "-");
  return slug;
}
