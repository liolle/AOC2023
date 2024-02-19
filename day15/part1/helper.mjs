export function extractWords(fileContent) {
  const lines = fileContent.split(",").map((val) => val.trim());
  const tables = [];
  for (const words of lines) {
    tables.push(words.trim());
  }
  return tables;
}

export function stringCode(word) {
  let result = 0;
  for (const char of word) {
    const base = result + char.charCodeAt(0);
    result = (base * 17) % 256;
  }
  return result;
}
