// O index.html é escrito sem <head>, no formato que o claude.ai publica.
// Esta função monta o documento completo, com a meta viewport que o celular precisa.
// É usada pelo servidor local (server.js) e pelo build do site (scripts/build.js).

const ICON = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" shape-rendering="crispEdges">' +
  '<rect width="12" height="12" rx="2" fill="#160f2b"/>' +
  '<g fill="#ff6fb5"><rect x="1" y="2" width="10" height="1"/><rect x="2" y="3" width="8" height="1"/>' +
  '<rect x="3" y="4" width="1" height="6"/><rect x="8" y="4" width="1" height="6"/><rect x="2" y="5" width="8" height="1"/></g></svg>'
);

function wrapPage(body) {
  if (/^\s*<!doctype/i.test(body)) return body;
  return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
    '<meta name="description" content="Pomodoro de estudos em pixel art japonesa: sua personagem estuda, luta contra yōkais, toma chá e vai ao onsen com você.">' +
    '<meta name="theme-color" content="#160f2b">' +
    `<link rel="icon" href="${ICON}">` +
    '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}' +
    'body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>' + body + '</body></html>';
}

module.exports = { wrapPage };
