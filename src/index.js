// clean-history.js
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
//import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { styleText } from 'node:util';

async function cleanGitBashHistory() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const historyPath = join(__dirname, '..', 'data', '.bash_history');
  const newHistoryPath = join(__dirname, '..', 'data', '.bash_history_clean');

  console.log(`\n${styleText(['yellow', 'dim'], 'Ruta del historial:')} ${historyPath}`);

  try {
    console.log(`\n${styleText('cyan', 'Leyendo historial desde:')} ${historyPath}`);
    const fileContent = await readFile(historyPath, 'utf-8');

    // Dividir el archivo por líneas y limpiar espacios
    const lines = fileContent
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const uniqueCommands = new Set();
    const result = [];

    // Filtrar duplicados desde el final hacia el principio
    for (let i = lines.length - 1; i >= 0; i--) {
      const command = lines[i];
      if (!uniqueCommands.has(command)) {
        uniqueCommands.add(command);
        result.push(command);
      }
    }

    // Restaurar el orden cronológico original
    result.reverse();

    const cleanedContent = result.join('\n') + '\n';
    await writeFile(newHistoryPath, cleanedContent, 'utf-8');

    console.log(`\n${styleText(['green', 'bold'], '¡Historial limpiado con éxito!')}`);
    console.log(
      `\n${styleText('dim', 'Líneas originales:')} ${styleText('yellow', String(lines.length))} ` +
        `-> ${styleText('dim', 'Líneas únicas guardadas:')} ${styleText(['green', 'bold'], String(result.length))}\n`
    );
  } catch (error) {
    console.error(
      `\n${styleText(['red', 'bold'], 'Error al procesar el historial de Git Bash:')} ${error.message}`
    );
  }
}

cleanGitBashHistory();
