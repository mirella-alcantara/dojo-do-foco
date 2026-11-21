// Dojo do Foco — servidor local.
// Serve o jogo e salva o progresso num cofre do Obsidian:
//   <cofre>/_dados/dojo-save.json   estado completo (lido ao abrir o jogo)
//   <cofre>/Dojo do Foco.md          painel com nível, hoje e links
//   <cofre>/Resumos/AAAA-MM-DD.md    resumo de cada dia
//   <cofre>/Missões.md               missões e passos
//   <cofre>/Pergaminho de distrações.md
//   <cofre>/Personagens/<nome>.md    ficha de cada personagem
// As notas são geradas pelo jogo: edições feitas nelas são substituídas no próximo salvamento.

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
let config = {};
try { config = JSON.parse(fs.readFileSync(path.join(ROOT, 'dojo.config.json'), 'utf8')); } catch (e) { /* sem config: usa os padrões */ }

const expandHome = p => (p && p.startsWith('~') ? path.join(os.homedir(), p.slice(1)) : p);
const VAULT = path.resolve(expandHome(process.env.DOJO_VAULT || config.vaultPath || '~/Documents/Obsidian/Dojo do Foco'));
const PORT = Number(process.env.PORT || config.port || 4321);
const SAVE = path.join(VAULT, '_dados', 'dojo-save.json');
const MAX_BODY = 8 * 1024 * 1024;

/* ---------- arquivos ---------- */
function writeIfChanged(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  try { if (fs.readFileSync(file, 'utf8') === content) return; } catch (e) { /* arquivo novo */ }
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, file);
}
const safeName = s => String(s || 'Sem nome').replace(/[\\/:*?"<>|#^[\]]/g, '-').trim().slice(0, 60) || 'Sem nome';
const cell = s => String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
const pad = n => String(n).padStart(2, '0');
const hm = t => { const d = new Date(t); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const brDate = k => { const [y, m, d] = k.split('-'); return `${d}/${m}/${y}`; };
const yaml = v => (typeof v === 'number' ? String(v) : JSON.stringify(String(v)));

/* ---------- notas ---------- */
const CLASS_NAMES = { samurai: 'Samurai', ninja: 'Ninja', miko: 'Miko', monge: 'Monge', onna: 'Onna-bugeisha', kunoichi: 'Kunoichi', kyudo: 'Arqueira', onmyoji: 'Onmyōji', ferreira: 'Ferreira', kitsune: 'Kitsune', yamabushi: 'Yamabushi', ronin: 'Rōnin' };
const WEAPON_NAMES = { katana: 'Katana', naginata: 'Naginata', kunai: 'Kunai', arco: 'Arco e flecha', ofuda: 'Talismãs ofuda', gohei: 'Gohei', cajado: 'Cajado', martelo: 'Martelo', leque: 'Leque' };
const PERK_NAMES = {
  xp10: '+10% de XP em cada pomodoro', ryo5: '+5 ryō por yōkai derrotado', heal10: 'Pausas recuperam +10 de energia', quest20: 'Missões concluídas dão +20 XP',
  boss25: 'Chefes dão +25% de XP', breakRyo: '+3 ryō por pausa completa', step2: 'Cada passo dá +2 XP extra', review5: 'Revisões dão +5 XP extra',
  goalRyo: '+20 ryō ao bater a meta', miniXp: 'Só 5 minutos dá o dobro de XP', longHeal: 'Pausa longa recupera toda a energia', streakXp: '+5% de XP por dia seguido, até 25%'
};
const PERSONA_NAMES = { gentil: 'Gentil', animada: 'Animada', calma: 'Calma', seria: 'Séria', brincalhona: 'Brincalhona' };
const RESULTS = { tudo: 'Tudo', parte: 'Parte', travei: 'Travei', mini: '5 min', interrompida: 'Interrompida' };
const ENERGY = { 1: 'cansada(o)', 2: 'ok', 3: 'animada(o)' };

function dayNote(d, state) {
  const tasks = state.tasks || [];
  const sessions = d.sessions || [];
  const done = sessions.filter(s => !s.abandoned && !s.mini);
  const byTask = {};
  sessions.filter(s => !s.abandoned).forEach(s => {
    const id = s.taskId || '_';
    byTask[id] = byTask[id] || { name: s.taskName || 'Sem missão', n: 0, mins: 0 };
    if (!s.mini) byTask[id].n++;
    byTask[id].mins += s.mins || 0;
  });
  const hours = Array(24).fill(0);
  sessions.forEach(s => { if (!s.abandoned) hours[new Date(s.t).getHours()] += s.mins || 0; });
  const best = hours.reduce((b, v, i) => (v > hours[b] ? i : b), 0);
  const L = [];
  L.push('---');
  L.push(`data: ${d.date}`);
  L.push(`pomodoros: ${d.pomos || 0}`);
  L.push(`minutos_foco: ${d.mins || 0}`);
  L.push(`pausas: ${d.breaks || 0}`);
  L.push(`pausas_puladas: ${d.skips || 0}`);
  L.push(`distracoes: ${(d.distr || []).length}`);
  L.push(`xp: ${d.xp || 0}`);
  L.push(`ryo: ${d.ryo || 0}`);
  L.push('tags: [dojo-do-foco, resumo]');
  L.push('---');
  L.push(`# Resumo de ${brDate(d.date)}`);
  L.push('');
  L.push(`**${d.pomos || 0} pomodoros** · ${d.mins || 0} min de foco · ${d.breaks || 0} pausas feitas · ${d.skips || 0} puladas · ${(d.distr || []).length} distrações`);
  if (hours[best]) L.push(`\nHorário mais forte: ${best}h, com ${hours[best]} min de foco.`);
  L.push('');
  L.push('## Batalhas');
  if (sessions.length) {
    L.push('| Hora | Missão | Plano | Resultado | Nota | Min |');
    L.push('| --- | --- | --- | --- | --- | --- |');
    sessions.forEach(s => L.push(`| ${hm(s.t)} | ${cell(s.taskName || 'Sem missão')} | ${cell(s.plan)} | ${cell(s.abandoned ? 'Interrompida' : RESULTS[s.result] || '')} | ${cell(s.note)} | ${s.mins || 0} |`));
  } else L.push('Nenhuma batalha registrada.');
  L.push('');
  L.push('## Missões trabalhadas');
  const ids = Object.keys(byTask);
  if (ids.length) ids.forEach(id => { const t = tasks.find(x => x.id === id); L.push(`- ${byTask[id].name}: ${byTask[id].n} hoje${t ? ` · ${t.done}/${t.est} no total` : ''}`); });
  else L.push('Nenhuma.');
  if ((d.distr || []).length) {
    L.push('');
    L.push('## O que passou pela cabeça');
    d.distr.forEach(x => L.push(`- ${hm(x.t)} ${x.txt}`));
  }
  if ((d.energy || []).length) {
    L.push('');
    L.push(`Energia: ${ENERGY[d.energy[0].v] || ''} no começo → ${ENERGY[d.energy[d.energy.length - 1].v] || ''} no fim.`);
  }
  L.push('');
  L.push(`Resultados: ${done.filter(s => s.result === 'tudo').length} tudo · ${done.filter(s => s.result === 'parte').length} parte · ${done.filter(s => s.result === 'travei').length} travei.`);
  L.push('');
  L.push('[[Dojo do Foco]]');
  return L.join('\n') + '\n';
}

function charNote(c, active) {
  const spec = c.spec || {};
  const weapon = WEAPON_NAMES[c.weapon] || c.weapon, perk = PERK_NAMES[c.perk] || c.perk, persona = PERSONA_NAMES[c.persona] || c.persona;
  const L = ['---', `nome: ${yaml(c.name || 'Sem nome')}`, `classe: ${yaml(CLASS_NAMES[c.cls] || c.cls)}`, `arma: ${yaml(weapon)}`, `habilidade: ${yaml(perk)}`, `personalidade: ${yaml(persona)}`,
    `forca: ${spec.forca || 0}`, `agilidade: ${spec.agil || 0}`, `mente: ${spec.mente || 0}`, `espirito: ${spec.espirito || 0}`, `no_dojo: ${active ? 'true' : 'false'}`, 'tags: [dojo-do-foco, personagem]', '---',
    `# ${c.name || 'Sem nome'}${c.title ? ` — ${c.title}` : ''}`, ''];
  if (c.phrase) L.push(`> ${c.phrase}`, '');
  L.push(`- Classe: ${CLASS_NAMES[c.cls] || c.cls}`, `- Arma: ${weapon}`, `- Habilidade: ${perk}`, `- Personalidade: ${persona}`,`- Força ${spec.forca} · Agilidade ${spec.agil} · Mente ${spec.mente} · Espírito ${spec.espirito}`);
  if (c.story) L.push('', '## História', '', c.story);
  L.push('', '[[Dojo do Foco]]');
  return L.join('\n') + '\n';
}

function writeNotes(state) {
  const days = state.days || {};
  const keys = Object.keys(days).sort();
  keys.forEach(k => { const d = days[k]; if ((d.pomos || 0) || (d.sessions || []).length || (d.distr || []).length) writeIfChanged(path.join(VAULT, 'Resumos', `${k}.md`), dayNote(d, state)); });

  const tasks = state.tasks || [];
  const ML = ['---', 'tags: [dojo-do-foco, missoes]', '---', '# Missões', ''];
  const open = tasks.filter(t => !t.fin), fin = tasks.filter(t => t.fin);
  if (!tasks.length) ML.push('Nenhuma missão ainda.');
  open.forEach(t => { ML.push(`- [ ] **${t.name}** · ${t.done}/${t.est} pomodoros`); (t.steps || []).forEach(s => ML.push(`    - [${s.ok ? 'x' : ' '}] ${s.txt}`)); });
  if (fin.length) { ML.push('', '## Concluídas'); fin.forEach(t => ML.push(`- [x] ${t.name} · estimou ${t.est}, usou ${t.done}`)); }
  ML.push('', '[[Dojo do Foco]]');
  writeIfChanged(path.join(VAULT, 'Missões.md'), ML.join('\n') + '\n');

  const distr = state.distr || [];
  writeIfChanged(path.join(VAULT, 'Pergaminho de distrações.md'),
    ['---', 'tags: [dojo-do-foco, distracoes]', '---', '# Pergaminho de distrações', '', ...(distr.length ? distr.map(d => `- [ ] ${d.txt}`) : ['Nada anotado. Mente limpa.']), '', '[[Dojo do Foco]]'].join('\n') + '\n');

  const chars = state.chars || [];
  const names = new Set();
  chars.forEach(c => {
    let n = safeName(c.name);
    while (names.has(n)) n += ' (2)';
    names.add(n);
    writeIfChanged(path.join(VAULT, 'Personagens', `${n}.md`), charNote(c, c.id === state.activeChar));
  });
  try {
    fs.readdirSync(path.join(VAULT, 'Personagens')).forEach(f => {
      if (f.endsWith('.md') && !names.has(f.slice(0, -3))) fs.renameSync(path.join(VAULT, 'Personagens', f), path.join(VAULT, '_dados', `antiga-${f}`));
    });
  } catch (e) { /* pasta ainda não existe */ }

  const active = chars.find(c => c.id === state.activeChar) || chars[0] || {};
  const today = new Date();
  const tk = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  const td = days[tk] || {};
  const P = ['---', 'tags: [dojo-do-foco]', '---', '# Dojo do Foco', '',
    `Personagem no dojo: **${active.name || 'Sem nome'}** (${CLASS_NAMES[active.cls] || ''}) · nível ${state.lvl || 1} · ${state.ryo || 0} ryō`, '',
    `Hoje: ${td.pomos || 0} pomodoros, ${td.mins || 0} min de foco.`, '',
    '## Notas', '- [[Missões]]', '- [[Pergaminho de distrações]]', '', '## Personagens', ...[...names].map(n => `- [[Personagens/${n}|${n}]]`), '',
    '## Resumos', ...keys.slice().reverse().filter(k => (days[k].pomos || 0) || (days[k].sessions || []).length).slice(0, 60).map(k => `- [[Resumos/${k}|${brDate(k)}]] · ${days[k].pomos || 0} pomodoros`), ''];
  writeIfChanged(path.join(VAULT, 'Dojo do Foco.md'), P.join('\n') + '\n');
}

/* ---------- http ---------- */
function send(res, code, type, body) {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > MAX_BODY) { reject(new Error('grande demais')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/state') {
    if (req.method === 'GET') {
      let saved = null;
      try { saved = JSON.parse(fs.readFileSync(SAVE, 'utf8')); } catch (e) { /* primeira vez */ }
      return send(res, 200, 'application/json', JSON.stringify({ ok: true, vault: VAULT, state: saved ? saved.state : null, savedAt: saved ? saved.savedAt : 0 }));
    }
    if (req.method === 'PUT' || req.method === 'POST') {
      try {
        const body = JSON.parse(await readBody(req));
        if (!body || typeof body.state !== 'object' || !body.state) return send(res, 400, 'application/json', '{"ok":false,"error":"estado ausente"}');
        const savedAt = Number(body.savedAt) || Date.now();
        writeIfChanged(SAVE, JSON.stringify({ savedAt, state: body.state }, null, 1));
        try { writeNotes(body.state); } catch (e) { console.error('Falha ao gerar notas:', e.message); }
        return send(res, 200, 'application/json', JSON.stringify({ ok: true, savedAt }));
      } catch (e) {
        return send(res, 400, 'application/json', JSON.stringify({ ok: false, error: e.message }));
      }
    }
    return send(res, 405, 'text/plain', 'Método não permitido');
  }
  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    return send(res, 200, 'text/html; charset=utf-8', fs.readFileSync(path.join(ROOT, 'index.html')));
  }
  send(res, 404, 'text/plain; charset=utf-8', 'Não encontrado');
});

server.listen(PORT, '127.0.0.1', () => {
  fs.mkdirSync(path.join(VAULT, '_dados'), { recursive: true });
  console.log(`Dojo do Foco rodando em http://localhost:${PORT}`);
  console.log(`Cofre do Obsidian: ${VAULT}`);
});
