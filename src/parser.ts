// src/parser.ts

export interface ParsedItem {
  lineNumber: number;
  lineText: string;
  keyword: string;
}

export function parseDocument(fileContent: string, keywords: string[]): ParsedItem[] {
  const allParsedItems: ParsedItem[] = [];

  if (keywords.length === 0) {
    return allParsedItems;
  }

  // 1. Construir la RegExp (SIN el flag 'g', solo 'i' para case-insensitive)
  const keywordsPattern = keywords.join('|');
  const todoRegex = new RegExp(`\\b(${keywordsPattern}):(.*)`, 'i'); // <-- CAMBIO AQUÍ

  const lines = fileContent.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 2. Usar 'line.match()' que es más simple y no guarda estado
    const match = line.match(todoRegex); // <-- CAMBIO AQUÍ

    // 3. Si hay coincidencia, procesarla
    if (match) { // <-- CAMBIO AQUÍ
      const item: ParsedItem = {
        lineNumber: i,
        lineText: line.trim(),
        keyword: match[1].toUpperCase()
      };
      allParsedItems.push(item);
    }
    // (Se elimina el bucle 'while' que era la fuente del bug)
  }

  return allParsedItems;
}