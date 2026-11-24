/* Gera as imagens das opções de visual dos modelos prontos em docs/personagens/.
   Reaproveita o código dos sprites do index.html (sem dependências): cada imagem mostra o sprite de antes,
   de lado, e as três opções chibi de frente. Uso: node scripts/opcoes-personagens.js */
const fs = require('fs'), path = require('path'), zlib = require('zlib');

const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'docs', 'personagens');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

/* Recorta uma declaração do index.html contando chaves e colchetes a partir do primeiro que abrir. */
function grab(name){
  let i = html.indexOf(`const ${name} = `); if (i < 0) i = html.indexOf(`function ${name}(`);
  if (i < 0) throw new Error(`Não achei ${name} no index.html`);
  const isFn = html.startsWith('function', i);
  let k = isFn ? html.indexOf('{', html.indexOf(')', i)) : html.slice(i).search(/[[{]/) + i, depth = 0;
  for (; k < html.length; k++) { const ch = html[k]; if (ch === '{' || ch === '[') depth++; else if (ch === '}' || ch === ']') { depth--; if (!depth) break; } }
  return html.slice(i, k + 1) + ';';
}
const a = html.indexOf('/* sprite-frente:inicio'), b = html.indexOf('/* sprite-frente:fim */');
if (a < 0 || b < 0) throw new Error('Marcadores do sprite de frente não encontrados.');
const code = ['CLASS_LOOK','CLASS_GEAR','HPAL','PRESETS','PRESET_OPTS','UP','LEGS','LEGS_H','LEGS_K','ARMS','WEAP','WEAP_BY','charPal','drawSide'].map(grab).join('\n')
  + '\n' + html.slice(a, b) + '\nreturn { PRESETS, PRESET_OPTS, CLASS_LOOK, CLASS_GEAR, charPal, drawSide, drawFront };';
const G = new Function(code)();

/* Canvas mínimo: só fillStyle e fillRect, que é tudo o que os sprites usam. */
function canvas(w, h, bg){
  const px = Buffer.alloc(w*h*4); const [r, g, b] = hex(bg);
  for (let i = 0; i < w*h; i++) { px[i*4] = r; px[i*4 + 1] = g; px[i*4 + 2] = b; px[i*4 + 3] = 255; }
  return { w, h, px, fillStyle:'#000000', fillRect(x, y, rw, rh){
    const [r, g, b] = hex(this.fillStyle);
    for (let yy = Math.max(0, Math.round(y)); yy < Math.min(h, Math.round(y + rh)); yy++)
      for (let xx = Math.max(0, Math.round(x)); xx < Math.min(w, Math.round(x + rw)); xx++) { const o = (yy*w + xx)*4; px[o] = r; px[o + 1] = g; px[o + 2] = b; }
  } };
}
function hex(c){ const v = parseInt(c.slice(1), 16); return [v >> 16 & 255, v >> 8 & 255, v & 255]; }
const CRC = Array.from({ length:256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
function crc(buf){ let c = 0xffffffff; for (const x of buf) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data){ const len = Buffer.alloc(4), t = Buffer.from(type), c = Buffer.alloc(4); len.writeUInt32BE(data.length); c.writeUInt32BE(crc(Buffer.concat([t, data]))); return Buffer.concat([len, t, data, c]); }
function png(cv){
  const raw = Buffer.alloc((cv.w*4 + 1)*cv.h);
  for (let y = 0; y < cv.h; y++) { raw[y*(cv.w*4 + 1)] = 0; cv.px.copy(raw, y*(cv.w*4 + 1) + 1, y*cv.w*4, (y + 1)*cv.w*4); }
  const ih = Buffer.alloc(13); ih.writeUInt32BE(cv.w, 0); ih.writeUInt32BE(cv.h, 4); ih[8] = 8; ih[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ih), chunk('IDAT', zlib.deflateSync(raw, { level:9 })), chunk('IEND', Buffer.alloc(0))]);
}

/* Fonte de 3 × 5 pixels para os nomes. */
const FONT = { A:'010101111101101', B:'110101110101110', C:'011100100100011', D:'110101101101110', E:'111100110100111', F:'111100110100100', G:'011100101101011', H:'101101111101101', I:'111010010010111', J:'001001001101010', K:'101101110101101', L:'100100100100111', M:'101111111101101', N:'110101101101101', O:'010101101101010', P:'110101110100100', Q:'010101101110011', R:'110101110101101', S:'011100010001110', T:'111010010010010', U:'101101101101111', V:'101101101101010', W:'101101111111101', X:'101101010101101', Y:'101101010010010', Z:'111001010100111', ' ':'000000000000000', '·':'000000010000000' };
function text(cv, str, cx, y, s, col){
  const chars = [...str.toUpperCase()], w = chars.length*4*s - s; let x = Math.round(cx - w/2);
  cv.fillStyle = col;
  chars.forEach(ch => { const g = FONT[ch] || FONT[' ']; for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (g[j*3 + i] === '1') cv.fillRect(x + i*s, y + j*s, s, s); x += 4*s; });
}
function ellipse(cv, cx, cy, rx, ry, col){ cv.fillStyle = col; for (let j = -ry; j <= ry; j++) { const w = Math.round(rx*Math.sqrt(1 - (j*j)/(ry*ry))); cv.fillRect(cx - w, cy + j, w*2, 1); } }

const BG = '#fbf6ec', CARD = '#f3eadb', INK = '#4a3a4a', PINK = '#ff6fb5', U = 6, CW = 170, CH = 236, PAD = 14;
function pal(p, o){ return G.charPal({ cls:p.cls, look:Object.assign({}, o.look), col:Object.assign({}, o.col) }); }
function oldPal(p){
  const old = { Mei:{ look:{ hs:'longo', tr:'hakama', acc:'flor', face:'delicado' }, col:{ h:'#5a3a22' } }, Nami:{ look:{ hs:'chiquinhas', face:'delicado' }, col:{ h:'#3a5a9a' } }, Hoshi:{ look:{ hs:'curto', acc:'nenhum', face:'simples' }, col:{ h:'#2a1f1a', b:'#2d4a7e' } } }[p.name] || { look:{}, col:{} };
  return pal(p, old);
}
function card(cv, x, y, label, hi){
  cv.fillStyle = hi ? PINK : CARD; cv.fillRect(x, y, CW, CH);
  cv.fillStyle = CARD; cv.fillRect(x + 3, y + 3, CW - 6, CH - 6);
  ellipse(cv, x + CW/2, y + CH - 42, 46, 6, '#e4d8c4');
  text(cv, label, x + CW/2, y + CH - 26, 3, hi ? PINK : INK);
}
function front(cv, x, y, P, weapon){
  G.drawFront(cv, x + CW/2 - 7*U, y + CH - 42, { pal:P, u:U, arm:weapon ? 'raise' : 'down', weapon, cls:weapon });
}

fs.mkdirSync(OUT, { recursive:true });
const rows = [];
G.PRESETS.forEach(p => {
  const opts = G.PRESET_OPTS[p.name], cv = canvas(PAD + 4*(CW + PAD), PAD*2 + CH + 34, BG);
  text(cv, p.name, cv.w/2, PAD, 4, INK);
  const y = PAD + 30;
  card(cv, PAD, y, 'antes', false);
  G.drawSide(cv, PAD + CW/2 - 6*U, y + CH - 42, { pal:oldPal(p), legs:'stand', arm:'down', u:U });
  opts.forEach((o, i) => { const x = PAD + (i + 1)*(CW + PAD); card(cv, x, y, 'ABC'[i], i === 0); front(cv, x, y, pal(p, o)); });
  const file = p.name.toLowerCase() + '.png';
  fs.writeFileSync(path.join(OUT, file), png(cv));
  rows.push(`| ${p.name} | ${p.cls} | ![${p.name}: antes e opções A, B e C](${file}) |`);
});

/* Elenco: a opção A de todos, com a arma erguida. */
const COLS = 7, el = canvas(PAD + COLS*(CW + PAD), PAD + 2*(CH + PAD), BG);
G.PRESETS.forEach((p, i) => {
  const x = PAD + (i % COLS)*(CW + PAD), y = PAD + Math.floor(i/COLS)*(CH + PAD);
  card(el, x, y, p.name, false);
  const o = G.PRESET_OPTS[p.name][0], ch = { cls:p.cls, look:o.look, col:o.col };
  front(el, x, y, G.charPal(ch), G.CLASS_GEAR[p.cls][0]);
});
fs.writeFileSync(path.join(OUT, 'elenco.png'), png(el));

fs.writeFileSync(path.join(OUT, 'LEIAME.md'), `# Opções de visual dos modelos

Gerado por \`node scripts/opcoes-personagens.js\` a partir do código do \`index.html\`. Não edite à mão.

Cada imagem mostra o sprite **antes** (de lado) e as três opções chibi **de frente**. A opção **A** (com borda rosa) é o visual do modelo no jogo. As opções ficam em \`PRESET_OPTS\`, no \`index.html\`.

![Elenco com a opção A de todos os modelos](elenco.png)

| Modelo | Classe | Antes · A · B · C |
| --- | --- | --- |
${rows.join('\n')}
`);
console.log(`Imagens em ${path.relative(ROOT, OUT)}/ (${G.PRESETS.length} modelos + elenco.png).`);
