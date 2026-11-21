# Dojo do Foco 道場

Pomodoro de estudos em pixel art japonesa. Você escolhe uma personagem, escreve o que vai fazer e ela estuda junto: luta contra yōkais durante o foco, toma chá na pausa curta e entra no onsen na pausa longa. No fim do dia sai um resumo completo.

## Como rodar

Precisa do [Node.js](https://nodejs.org) 18 ou mais novo. Não há dependências para instalar.

```bash
npm start
```

Depois abra <http://localhost:4321>.

No VS Code, também dá para usar **Executar e depurar → Dojo do Foco (servidor local)**, que abre o navegador sozinho.

## Salvamento no Obsidian

Rodando pelo servidor local, o jogo salva tudo num cofre do Obsidian sempre que algo muda e quando você fecha a aba. Ao abrir de novo, ele carrega o progresso de lá.

Por padrão o cofre fica em `~/Documents/Obsidian/Dojo do Foco`. Para usar outra pasta, crie um `dojo.config.json` na raiz do projeto (ele não vai para o Git):

```json
{ "vaultPath": "~/Documents/MeuCofre/Dojo do Foco", "port": 4321 }
```

Ou use variáveis de ambiente: `DOJO_VAULT=/caminho/do/cofre PORT=4321 npm start`.

No Obsidian, use **Abrir pasta como cofre** e escolha essa pasta. O jogo cria:

| Arquivo | O que tem |
| --- | --- |
| `Dojo do Foco.md` | Painel com a personagem ativa, nível, o dia de hoje e links |
| `Resumos/AAAA-MM-DD.md` | Resumo de cada dia: batalhas, plano e resultado, missões, distrações, energia |
| `Missões.md` | Missões e passos em checklist |
| `Pergaminho de distrações.md` | O que você anotou para resolver depois |
| `Personagens/<nome>.md` | Ficha de cada personagem, com classe, arma, habilidade, especificações e história |
| `_dados/dojo-save.json` | O estado completo do jogo, lido ao abrir |

As notas são geradas pelo jogo. O que você editar nelas é substituído no próximo salvamento, então escreva suas próprias anotações em outras notas do cofre.

Abrindo o `index.html` direto (sem o servidor), o jogo funciona igual, mas salva só no navegador.

## O que tem no jogo

- **Dojo:** timer pomodoro com cena animada que segue a hora do dia e o clima, caixa de diálogo para planejar e revisar cada batalha, botão "Só 5 minutos" e modo foco.
- **Cenários:** dojo da cidade, bosque de bambu, templo na montanha, rua de Tóquio e jardim de sakura.
- **Personagens:** 12 classes e 14 modelos prontos. O editor permite criar quantas personagens quiser e mudar tudo: nome, título, classe, arma, habilidade, personalidade, frase de efeito, história, penteado, traje, acessório, rosto, cada cor, um desenho à mão pixel por pixel e as especificações (força, agilidade, mente e espírito).
- **Missões:** tarefas divididas em passos pequenos, com estimativa de pomodoros.
- **Jogo:** tempos, sons, penalidades, céu, clima e cenário.
- **Resumo:** o dia inteiro com batalhas, missões, melhor horário, energia e sugestões para amanhã.

## Estrutura

```
index.html        o jogo inteiro (HTML, CSS e JavaScript)
server.js         servidor local e gravação no cofre do Obsidian
package.json      script npm start
.vscode/          configuração para rodar pelo VS Code
```
