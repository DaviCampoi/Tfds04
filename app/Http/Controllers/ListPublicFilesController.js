import { join } from 'path';
import { readdir } from 'fs';
import CONSTANTS from '../Constants.js'; // ajuste o caminho se necessário

export default async (request, response) => {
  const dirPath = join(CONSTANTS.DIR, 'public');

  readdir(dirPath, (err, files) => {
    if (err) {
      // aqui usamos "response" que é o parâmetro correto
      return response.status(CONSTANTS.HTTP.SERVER_ERROR).send('Erro ao ler o diretório');
    }

    const fileList = files.map(file => `<li><a href="/${file}">${file}</a></li>`).join('');

    return response.send(`
      <html>
        <head><title>Lista de Arquivos</title></head>
        <body>
          <h2>Lista de Arquivos</h2>
          <ul>${fileList}</ul>
        </body>
      </html>
    `);
  });
};
