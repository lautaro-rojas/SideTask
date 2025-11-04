import { KeywordRule } from './types';

/**
 * La estructura "pura" que devuelve el parser.
 * Ahora también incluye el estilo.
 */
export interface ParsedItem {
  lineNumber: number;
  lineText: string;
  keyword: string;
  style: KeywordRule; // <-- AÑADIDO
}

export function parseDocument(fileContent: string, keywordRules: KeywordRule[]): ParsedItem[] {
  const allParsedItems: ParsedItem[] = [];

  if (keywordRules.length === 0) {
    return allParsedItems;
  }

  // 1. Crear un mapa para buscar estilos por palabra clave (en mayúscula)
  const styleMap = new Map<string, KeywordRule>();
  for (const rule of keywordRules) {
    // Asegurarse de que el texto existe antes de ponerlo en mayúsculas
    if (rule.text) {
      styleMap.set(rule.text.toUpperCase(), rule);
    }
  }

  // Si el mapa está vacío (ej. reglas mal configuradas), salir
  if (styleMap.size === 0) {
    return allParsedItems;
  }

  // 2. Construir la RegExp dinámicamente desde las claves del mapa
  const keywordsPattern = Array.from(styleMap.keys()).join('|');
  const todoRegex = new RegExp(`\\b(${keywordsPattern}):(.*)`, 'i'); // 'i' = case-insensitive

  const lines = fileContent.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(todoRegex);

    if (match) {
      const keyword = match[1].toUpperCase();
      const style = styleMap.get(keyword)!; // Sabemos que existe

      const item: ParsedItem = {
        lineNumber: i,
        lineText: line.trim(),
        keyword: keyword,
        style: style // <-- AÑADIDO: Guardamos el estilo encontrado
      };
      allParsedItems.push(item);
    }
  }

  return allParsedItems;
}