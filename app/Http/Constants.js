import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Para obter o diretório raiz no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONSTANTS = {
  DIR: resolve(__dirname, '../../'), // raiz do projeto
  HTTP: {
    SERVER_ERROR: 500
  }
};

export default CONSTANTS;
