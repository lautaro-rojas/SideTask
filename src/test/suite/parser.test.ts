// src/test/suite/parser.test.ts
import * as assert from 'assert'; 
import { parseDocument } from '../../parser';
import { KeywordRule } from '../../types'; // <-- IMPORTAR KeywordRule

// --- Funciones Helper para crear reglas de prueba ---
const mockRule = (text: string): KeywordRule => ({
  text: text,
  color: '#000',
  backgroundColor: '#FFF'
});

const todoRule = mockRule('TODO');
const fixmeRule = mockRule('FIXME');
const bugRule = mockRule('BUG');
// ---

suite('Parser Unit Tests (con KeywordRule)', () => {

  test('Debe encontrar un TODO simple', () => {
    const content = `
      // Esta es una línea de código
      // TODO: Arreglar esto
      // Otra línea
    `;
    const rules = [todoRule]; // <-- Usar regla de objeto
    const results = parseDocument(content, rules);

    assert.strictEqual(results.length, 1, 'Debería encontrar un solo item');
    assert.strictEqual(results[0].lineNumber, 2, 'Debería estar en la línea correcta (índice 2)');
    assert.strictEqual(results[0].keyword, 'TODO', 'La palabra clave debe ser TODO');
    assert.deepStrictEqual(results[0].style, todoRule, 'Debe adjuntar el objeto de estilo correcto'); // <-- Nuevo test
  });

  test('Debe ser case-insensitive (ignorar mayúsculas/minúsculas)', () => {
    const content = `// todo: minúscula`;
    const rules = [todoRule];
    const results = parseDocument(content, rules);
    
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].keyword, 'TODO');
  });

  test('Debe encontrar múltiples palabras clave', () => {
    const content = `
      // todo: uno
      // FIXME: dos
    `;
    const rules = [todoRule, fixmeRule]; // <-- Usar reglas de objeto
    const results = parseDocument(content, rules);
    
    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[0].keyword, 'TODO');
    assert.strictEqual(results[1].keyword, 'FIXME');
  });

  test('Debe ignorar palabras clave que no están en la lista', () => {
    const content = `// BUG: Esto es un bug`;
    const rules = [todoRule, fixmeRule]; // <-- 'BUG' no está en la lista
    const results = parseDocument(content, rules);
    
    assert.strictEqual(results.length, 0, 'No debería encontrar nada');
  });

  test('Debe encontrar palabras clave personalizadas', () => {
    const content = `// BUG: Esto es un bug`;
    const rules = [todoRule, fixmeRule, bugRule]; // <-- 'BUG' SÍ está en la lista
    const results = parseDocument(content, rules);
    
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].keyword, 'BUG');
  });

  test('No debe encontrar coincidencias sin los dos puntos (:) obligatorios', () => {
    const content = `// TODO sin los dos puntos`;
    const rules = [todoRule];
    const results = parseDocument(content, rules);
    
    assert.strictEqual(results.length, 0);
  });
});