# Separação entre criação e desenvolvimento

**Data:** 2026-11-22

## O que

O projeto foi dividido em duas pastas:

- `dojo_desenvolvimento/`: código, repositório git e GitHub, build, Netlify, pesquisas técnicas e decisões. É o único repositório git.
- `dojo-do-foco/`: criação. Mundo, personagens, mecânicas, princípios de TDAH, arte, música e ideias. Só Markdown, sem código e fora do git.

## Por quê

Pensar no jogo (o que ele é) e construir o jogo (como funciona) são trabalhos diferentes. Misturados, as ideias ficavam escondidas no README técnico e no código.

## Como foi feito

- O código e a pasta `.git` foram movidos com `mv`, então o histórico e o `origin` (`mirella-alcantara/dojo-do-foco`) continuam iguais.
- O Netlify publica a partir do GitHub, então o site não foi afetado.
- `docs/` ficou aqui porque o README do GitHub usa essas imagens. A criação tem uma cópia em `imagens/`.
- O conteúdo da criação foi tirado do README e dos dados do `index.html` (classes, modelos, falas, yōkais, conquistas).

## Alternativas consideradas

- Renomear as pastas para `dojo-criacao` e `dojo-dev`: não, para manter os nomes atuais.
- Transformar a criação num cofre do Obsidian: não por enquanto. Ela é só Markdown e pode ser aberta no Obsidian depois.
- Colocar a criação no git: não por enquanto.

Prompt usado: [2026-11-22-prompt-da-separacao.md](2026-11-22-prompt-da-separacao.md)
