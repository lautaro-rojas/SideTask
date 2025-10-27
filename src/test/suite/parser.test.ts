// src/test/suite/parser.test.ts

// 'assert' es el módulo de aserción de Node.js,
// 'mocha' está disponible globalmente en el entorno de prueba.
import * as assert from 'assert';

// Importamos la función "pura" que queremos probar
import { parseDocument, ParsedItem } from '../../parser';

// 'suite' es un sinónimo de 'describe' en mocha
suite('Parser Unit Tests', () => {

    // Un test simple
    test('Debe encontrar un TODO simple', () => {
        const content = `
      // Esta es una línea de código
      // TODO: Arreglar esto
      // Otra línea
    `;
        const keywords = ['TODO'];
        const results = parseDocument(content, keywords);

        // Afirmaciones (Assertions)
        assert.strictEqual(results.length, 1, 'Debería encontrar un solo item');
        assert.strictEqual(results[0].lineNumber, 2, 'Debería estar en la línea correcta (índice 2)');
        assert.strictEqual(results[0].keyword, 'TODO', 'La palabra clave debe ser TODO');
    });

    test('Debe ser case-insensitive (ignorar mayúsculas/minúsculas)', () => {
        const content = `// todo: minúscula`;
        const keywords = ['TODO'];
        const results = parseDocument(content, keywords);

        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].keyword, 'TODO');
    });

    test('Debe encontrar múltiples palabras clave', () => {
        const content = `
      // todo: uno
      // FIXME: dos
    `;
        const keywords = ['TODO', 'FIXME'];
        const results = parseDocument(content, keywords);

        assert.strictEqual(results.length, 2);
        assert.strictEqual(results[0].keyword, 'TODO');
        assert.strictEqual(results[1].keyword, 'FIXME');
    });

    test('Debe ignorar palabras clave que no están en la lista', () => {
        const content = `// BUG: Esto es un bug`;
        const keywords = ['TODO', 'FIXME'];
        const results = parseDocument(content, keywords);

        assert.strictEqual(results.length, 0, 'No debería encontrar nada');
    });

    test('Debe encontrar palabras clave personalizadas', () => {
        const content = `// BUG: Esto es un bug`;
        // Esta vez, 'BUG' SÍ está en la lista
        const keywords = ['TODO', 'FIXME', 'BUG'];
        const results = parseDocument(content, keywords);

        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].keyword, 'BUG');
    });

    test('No debe encontrar coincidencias sin los dos puntos (:) obligatorios', () => {
        const content = `// TODO sin los dos puntos`;
        const keywords = ['TODO'];
        const results = parseDocument(content, keywords);

        assert.strictEqual(results.length, 0);
    });
});