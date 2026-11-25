// O index.html é escrito sem <head>, no formato que o claude.ai publica.
// Esta função monta o documento completo, com a meta viewport que o celular precisa.
// É usada pelo servidor local (server.js) e pelo build do site (scripts/build.js).

const ICON = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" shape-rendering="crispEdges">' +
  '<rect width="12" height="12" rx="2" fill="#160f2b"/>' +
  '<g fill="#ff6fb5"><rect x="1" y="2" width="10" height="1"/><rect x="2" y="3" width="8" height="1"/>' +
  '<rect x="3" y="4" width="1" height="6"/><rect x="8" y="4" width="1" height="6"/><rect x="2" y="5" width="8" height="1"/></g></svg>'
);

// Configuração da nuvem (Supabase). Vem de variáveis de ambiente ou do dojo.config.json.
// Só a URL do projeto e a chave pública "anon" vão para a página. A chave service_role nunca deve ser usada aqui.
// Ordem: variáveis de ambiente, depois dojo.config.json, depois supabase/config.json (versionado, só a chave pública).
function cloudConfig(config = {}) {
  let pub = {};
  try { pub = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', 'supabase', 'config.json'), 'utf8')); } catch (e) { /* sem config pública */ }
  const url = String(process.env.SUPABASE_URL || config.supabaseUrl || pub.supabaseUrl || '').trim().replace(/\/+$/, '');
  const key = String(process.env.SUPABASE_ANON_KEY || config.supabaseAnonKey || pub.supabaseAnonKey || '').trim();
  if (!url && !key) return null;
  if (!/^(https:\/\/[a-z0-9.-]+|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/i.test(url)) throw new Error('SUPABASE_URL inválida: use algo como https://abcd.supabase.co');
  if (!/^[A-Za-z0-9._-]{20,}$/.test(key)) throw new Error('SUPABASE_ANON_KEY inválida');
  if (isServiceRole(key)) throw new Error('Essa é a chave service_role (secreta). Use a chave pública anon / publishable.');
  return { url, key };
}
function isServiceRole(key) {
  if (/^sb_secret_/.test(key)) return true;
  try { return JSON.parse(Buffer.from(key.split('.')[1] || '', 'base64url').toString()).role === 'service_role'; } catch (e) { return false; }
}

function wrapPage(body, cloud) {
  if (/^\s*<!doctype/i.test(body)) return body;
  const cloudTag = cloud ? '<script>window.DOJO_CLOUD=' + JSON.stringify(cloud).replace(/</g, '\\u003c') + '</script>' : '';
  return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
    '<meta name="description" content="Pomodoro de estudos em pixel art japonesa: sua personagem estuda, luta contra yōkais, toma chá e vai ao onsen com você.">' +
    '<meta name="theme-color" content="#160f2b">' +
    `<link rel="icon" href="${ICON}">` +
    '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}' +
    'body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>' + cloudTag + '</head><body>' + body + '</body></html>';
}

module.exports = { wrapPage, cloudConfig };
