# Prompt: separar a criação do Dojo do Foco do seu desenvolvimento

> Prompt original: *"Separe a criação do dojo do seu desenvolvimento, deixe o código, pesquisas, github e tudo o que funciona por trás do projeto aqui."*
>
> Versão detalhada abaixo. Pode colar inteira numa sessão aberta em `~/Documents/Projects`.

---

## Contexto

O **Dojo do Foco** é um Pomodoro de estudos em pixel art japonesa (site: dojo-do-foco.netlify.app, repositório: `mirella-alcantara/dojo-do-foco`). Hoje tudo está misturado numa pasta só:

```
~/Documents/Projects/dojo-do-foco/
├── index.html          o jogo inteiro (≈260 KB, um arquivo só)
├── server.js           servidor local que salva no Obsidian
├── lib/page.js         monta o <head> (usado pelo servidor e pelo build)
├── scripts/build.js    gera dist/ para o Netlify
├── netlify.toml        configuração de publicação
├── package.json        scripts npm start / npm run build
├── .vscode/launch.json atalho "Executar e depurar"
├── .gitignore, .git/   histórico e ligação com o GitHub
├── dist/               saída do build (ignorada pelo git)
├── README.md           vitrine do jogo + instruções técnicas
└── docs/               banner, demo.gif, telas/ e cenarios/ (imagens)
```

E existe uma pasta nova e vazia: `~/Documents/Projects/dojo_desenvolvimento/`.

## Objetivo

Dividir o projeto em **duas pastas com papéis diferentes**:

| Pasta | Papel | Pergunta que ela responde |
| --- | --- | --- |
| `dojo-do-foco/` | **Criação** | *O que é o jogo e como ele deve ser?* |
| `dojo_desenvolvimento/` | **Desenvolvimento** | *Como o jogo é feito, testado e publicado?* |

### O que vai para `dojo_desenvolvimento/` (tudo o que funciona por trás)

- **Código:** `index.html`, `server.js`, `lib/`, `scripts/`, `package.json`
- **Git e GitHub:** a pasta `.git/` inteira (com todo o histórico), `.gitignore`, o `remote origin`
- **Publicação:** `netlify.toml`, `dist/`
- **Ferramentas:** `.vscode/`, `dojo.config.json` (se existir; contém o caminho do cofre e não vai para o git)
- **Documentação técnica:** o README que fica no GitHub, incluindo as imagens de `docs/` que ele usa (o README do GitHub quebra sem elas)
- **Pesquisas técnicas:** criar `pesquisas/` para estudos de bibliotecas, APIs (Open-Meteo, three.js), desempenho, acessibilidade, testes, ideias de arquitetura
- **Registro de decisões:** criar `decisoes/` (um arquivo curto por decisão técnica: o que, por quê, alternativas)

### O que fica em `dojo-do-foco/` (criação)

Uma pasta **sem código**, só com o lado criativo e de produto:

```
dojo-do-foco/
├── README.md            o que é o jogo, para quem, a sensação que ele passa
├── mundo/               reinos, clima, hora do dia, ambientação
├── personagens/         as 12 classes, os 14 modelos, habilidades, personalidades
├── mecanicas/           pomodoro, XP, níveis, títulos, ryō, conquistas, loja
├── tdah/                princípios de design para TDAH (uma ação por vez, sem bronca...)
├── arte/                direção de arte, paleta, referências visuais, rascunhos
├── musica/              ideias e referências para a trilha lo-fi
├── ideias/              backlog de ideias ainda não feitas
└── imagens/             cópia das telas e cenários para consulta
```

O conteúdo inicial desses arquivos sai do **README atual** e do **próprio `index.html`** (nomes de reinos, classes, títulos, conquistas). Não inventar nada que não esteja no projeto; onde faltar informação, deixar um tópico marcado `> A definir`.

## Regras

1. **Mover, não copiar,** o código e o `.git/`. No fim só pode existir um repositório git, em `dojo_desenvolvimento/`. Usar `mv` para preservar o histórico; nunca recriar o repositório com `git init`.
2. **Não perder nada.** Antes de começar, rodar `git status` em `dojo-do-foco/`. Se houver mudanças não commitadas, parar e me perguntar o que fazer com elas.
3. **Não fazer push, não mexer no GitHub nem no Netlify** sem me perguntar. O Netlify publica a partir do GitHub, então mover a pasta local não afeta o site; confirmar isso lendo o `netlify.toml`.
4. **Não apagar a pasta `dojo-do-foco/`** — ela passa a ser a pasta de criação.
5. A pasta de criação **não entra no git** por enquanto (a menos que eu peça).
6. Tudo escrito em **português**, no mesmo tom do README atual: frases curtas, diretas, sem jargão.

## Passo a passo

1. **Inventário:** listar todos os arquivos de `dojo-do-foco/` (incluindo ocultos) e mostrar para onde cada um vai.
2. **Checagem:** `git status` e `git log -1` em `dojo-do-foco/`; confirmar que está tudo commitado.
3. **Mover** o código, o `.git/`, as configurações e `docs/` para `dojo_desenvolvimento/`.
4. **Verificar o desenvolvimento:**
   - `git status` limpo e `git log` com o histórico completo
   - `git remote -v` apontando para `mirella-alcantara/dojo-do-foco`
   - `npm run build` gera `dist/index.html`
   - `npm start` abre em `http://localhost:4321` e o jogo carrega
5. **Criar a estrutura de criação** em `dojo-do-foco/` e preencher os arquivos a partir do README e do `index.html`.
6. **Criar `pesquisas/` e `decisoes/`** em `dojo_desenvolvimento/`, cada uma com um `LEIAME.md` explicando o que guardar ali. Primeira decisão registrada: *"Separação entre criação e desenvolvimento"*, com data de hoje.
7. **Ligar as duas pastas:** cada README ganha uma linha no topo dizendo onde fica a outra metade.
8. **Ajustar o `.vscode/launch.json`** se algum caminho deixou de funcionar.
9. **Resumo final:** o que foi movido, o que foi criado, o que foi verificado e o que ficou pendente.

## Pronto quando

- [ ] `dojo_desenvolvimento/` é o único repositório git, com histórico intacto e remote correto
- [ ] `npm start` e `npm run build` funcionam em `dojo_desenvolvimento/`
- [ ] O README do GitHub continua mostrando as imagens
- [ ] `dojo-do-foco/` não tem nenhum arquivo de código, só criação
- [ ] Cada pasta de criação tem pelo menos um arquivo com conteúdo real tirado do projeto
- [ ] Nada foi enviado ao GitHub, e nada foi apagado sem confirmação

## Antes de começar, me pergunte

- Se devo fazer um commit no git registrando a separação (sem push).
- Se a pasta de criação deve virar um cofre do Obsidian (o jogo já salva o progresso num cofre em `~/Documents/Obsidian/Dojo do Foco`).
- Se prefiro renomear as pastas para algo mais claro, como `dojo-criacao/` e `dojo-dev/`.
