// Gera a versão estática do jogo em dist/, pronta para o Netlify (ou qualquer hospedagem estática).
// Uso: npm run build

const fs = require('fs');
const path = require('path');
const { wrapPage } = require('../lib/page');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, 'index.html'), wrapPage(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')));

const size = fs.statSync(path.join(DIST, 'index.html')).size;
console.log(`dist/index.html pronto (${Math.round(size / 1024)} KB)`);
