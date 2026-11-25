<div align="center">

<img src="docs/banner.png" alt="A miko Sakura, chibi e de frente, lê um livro atrás da mesinha em frente ao dojo, à noite, debaixo de chuva, com letreiros de neon e um yōkai à direita. O timer marca 24:38." width="100%">

# Dojo do Foco 道場

**Pomodoro de estudos em pixel art japonesa.**
Sua personagem estuda junto com você, luta contra yōkais durante o foco,<br>
toma chá na pausa curta e entra no onsen na pausa longa.

<img alt="Node.js 18 ou mais novo" src="https://img.shields.io/badge/Node.js-18%2B-5fa04e?style=flat-square&logo=node.js&logoColor=white">
<img alt="Sem dependências" src="https://img.shields.io/badge/depend%C3%AAncias-nenhuma-8b5cf6?style=flat-square">
<img alt="Salva no Obsidian" src="https://img.shields.io/badge/salva%20no-Obsidian-7c3aed?style=flat-square&logo=obsidian&logoColor=white">
<img alt="Em português" src="https://img.shields.io/badge/idioma-portugu%C3%AAs-ff6fb5?style=flat-square">

### [▶ Jogar agora: dojo-do-foco.netlify.app](https://dojo-do-foco.netlify.app)

[Como rodar](#-como-rodar) · [O jogo](#-o-jogo) · [Reinos](#-reinos) · [Personagens](#-personagens) · [Obsidian](#-salvamento-no-obsidian) · [Publicar](#-publicar-no-netlify)

</div>

<br>

<div align="center">
  <img src="docs/demo.gif" alt="Animação com dez reinos e uma personagem diferente em cada: Sakura no dojo com chuva, Kiko tomando chá no bambu, Sora no templo, Hana na floresta dos vagalumes, Rin nas ilhas flutuantes, Nami no terraço neon, Taro na casa de chá nas nuvens, Hoshi na janela do Fuji, Akane no café do canal e Yuki no onsen com neve" width="88%">
</div>

<br>

## 🚀 Como rodar

Precisa do [Node.js](https://nodejs.org) 18 ou mais novo. Não há nada para instalar.

```bash
npm start
```

Abra **<http://localhost:4321>**. No VS Code também dá para usar **Executar e depurar → Dojo do Foco (servidor local)**, que já abre o navegador.

> Abrir o `index.html` direto também funciona, mas aí o progresso fica salvo só no navegador. Pelo servidor ele vai para o Obsidian.

## 🎮 O jogo

<img src="docs/telas/dojo.png" alt="Tela do Dojo: cena do dojo à noite com chuva e a Sakura lendo de frente atrás da mesinha, timer, caixa de diálogo com o plano da batalha, a carta da personagem e a próxima ação." width="100%">

| | |
| --- | --- |
| ⏱️ **Pomodoro completo** | Foco, pausa curta e pausa longa a cada ciclo, com o chefe no último pomodoro |
| ✍️ **Plano e revisão** | Antes de cada batalha você escreve o que vai fazer. Depois, conta se conseguiu tudo, parte ou se travou |
| 🌗 **Hora e clima de verdade** | A cena escurece com o dia, os neons acendem à noite e o clima da sua cidade aparece, pela [Open-Meteo](https://open-meteo.com): chuva, neve, neblina, tempestade. Se o céu estiver fixo, um clique no relógio volta ao horário real |
| 🧠 **Feito para TDAH** | Uma ação de cada vez, botão "Só 5 minutos", aviso 1 minuto antes do fim, modo foco e nenhuma bronca |
| 🌄 **Reinos em 3D** | 11 reinos em pixel art, cada um com uma paisagem em 3D ([three.js](https://threejs.org)) animada no fundo e uma visão sem distrações para as pausas |
| 🎵 **Música nas pausas** | Uma música lo-fi aconchegante, composta no próprio jogo, começa com a pausa e para quando ela acaba. Mais lenta no onsen |
| 📜 **Pergaminho de distrações** | Pensou em outra coisa? Anota em um toque e volta. Você resolve na pausa |
| 🏆 **RPG** | XP, nível, títulos de Aprendiz a Shōgun, energia, moedas ryō, conquistas e uma loja de recompensas que você mesmo cria |

### Durante o foco, a pausa e o onsen

A personagem não fica parada. Ela estuda de frente para você, atrás da mesinha, conforme o tipo de missão: lê um livro, escreve com pincel, usa o ábaco, programa no notebook ou revisa cartões. A cada 40 segundos corre até o yōkai e ataca. Na casa de chá o mestre serve o chá e ela bebe. No onsen ela entra devagar na água quente.

Durante o foco ela também reage ao que você faz, sem pedir nenhum clique a mais:

- **Golpe especial:** marcar um passo da missão solta o poder da classe no yōkai ("Fogo de raposa!", "Corte do sol!", "Selo de cinco pontas!"...). Cada passo tira 5% da vida dele, até 30% por foco.
- **Voltou da aba?** Se você sai do dojo por mais de alguns segundos, ela aparece cochilando e o yōkai chega mais perto. Ela acorda, acena e diz "Voltou! Bora continuar.". Sem castigo.
- **Surpresas:** duas por foco, em momentos sorteados: o gato traz um ryō, cai uma pétala dourada, desce um pergaminho com uma dica ou, à noite, passa uma estrela cadente.

## 🏯 Reinos

São 11 reinos. Troque no seletor acima da cena ou na aba **Jogo**. Todos acompanham a hora do dia e o clima.

<table>
  <tr>
    <td width="50%"><img src="docs/cenarios/dojo.png" alt="Dojo da cidade à noite com chuva, com a Sakura lendo"><br><b>Dojo da cidade</b> · letreiros de neon e lanternas</td>
    <td width="50%"><img src="docs/cenarios/bambu.png" alt="Bosque de bambu de dia, com o Kiko tomando chá com o mestre"><br><b>Bosque de bambu</b> · lanternas de pedra e vaga-lumes à noite</td>
  </tr>
  <tr>
    <td><img src="docs/cenarios/templo.png" alt="Templo na montanha ao pôr do sol, com torii vermelho, monte Fuji e o Sora escrevendo"><br><b>Templo na montanha</b> · torii, escadaria e o monte Fuji</td>
    <td><img src="docs/cenarios/rua.png" alt="Rua de Tóquio à noite com prédios iluminados, placas de neon e o Jin no notebook"><br><b>Rua de Tóquio</b> · placas de neon, máquina de bebidas e poste</td>
  </tr>
  <tr>
    <td><img src="docs/cenarios/sakura.png" alt="Jardim de sakura de dia com cerejeira, ponte vermelha, lago e a Mei lendo"><br><b>Jardim de sakura</b> · pétalas caindo, lago com carpas e ponte</td>
    <td><img src="docs/cenarios/onsen-neve.png" alt="Onsen à noite com neve caindo no templo, com a Yuki na água quente"><br><b>Onsen com neve</b> · a pausa longa, em qualquer reino</td>
  </tr>
  <tr>
    <td><img src="docs/cenarios/floresta.png" alt="Floresta dos vagalumes à noite, com a árvore gigante de janela acesa, porta azul brilhante e a Hana revisando cartões"><br><b>Floresta dos vagalumes</b> · árvore-casa, lago e vaga-lumes</td>
    <td><img src="docs/cenarios/ilhas.png" alt="Ilhas flutuantes ao pôr do sol, com castelo, cachoeiras, mar de nuvens e a Rin erguendo o arco contra o yōkai"><br><b>Ilhas flutuantes</b> · castelo, cachoeiras, lanternas e aurora à noite</td>
  </tr>
  <tr>
    <td><img src="docs/cenarios/neon.png" alt="Terraço neon à noite com garoa, prédios iluminados, torre vermelha e a Nami no notebook"><br><b>Terraço neon</b> · a cidade vista do telhado, com a torre ao fundo</td>
    <td><img src="docs/cenarios/cha.png" alt="Casa de chá nas nuvens ao pôr do sol, com lanternas, carpas nadando nas nuvens e o Taro tomando chá com o mestre"><br><b>Casa de chá nas nuvens</b> · lanternas e carpas nadando no céu</td>
  </tr>
  <tr>
    <td><img src="docs/cenarios/janela.png" alt="Janela do Fuji de dia, uma sala com shoji olhando o monte Fuji, a vila, um pagode e o Hoshi escrevendo"><br><b>Janela do Fuji</b> · sala de tatame com vista para o monte</td>
    <td><img src="docs/cenarios/canal.png" alt="Café do canal de dia, com café de madeira, bicicleta, cerejeiras, canal de pedras e a Akane atacando o yōkai com o martelo"><br><b>Café do canal</b> · café, bicicleta e cerejeiras na beira da água</td>
  </tr>
</table>

### Reino em 3D

Atrás do jogo, uma paisagem em 3D do mesmo reino se move devagar: ilhas que flutuam, cachoeiras, carpas, vaga-lumes, pétalas e lanternas subindo à noite. O botão **🌄 Reino 3D** esconde todo o resto e mostra só o reino e o tempo que falta, bom para a pausa. As setas trocam de reino e `Esc` volta. O link `#reino` abre direto nessa visão.

<div align="center">
  <img src="docs/telas/reino-3d.png" alt="Visão do reino em 3D: ilhas flutuantes à noite sobre um mar de nuvens, com aurora e lanternas" width="88%">
</div>

O 3D é feito com three.js, carregado do cdnjs. Se o computador não der conta, o jogo entra sozinho num modo leve, com menos quadros e menos pixels. Se ainda assim travar, ele pausa o 3D e avisa. Também dá para desligar em **Jogo → Reino**. Sem internet ou sem WebGL, o jogo volta para o fundo em pixel art.

<div align="center">
  <img src="docs/cenarios/tempestade.png" alt="Dojo ao pôr do sol durante uma tempestade, com a Aiko escrevendo" width="60%"><br>
  <sub>O clima muda tudo: aqui, uma tempestade no fim da tarde, com a Aiko.</sub>
</div>

## 🥷 Personagens

<img src="docs/telas/personagens.png" alt="Tela de Personagens: editor com o retrato chibi da Sakura, identidade, classe, arma e habilidade, e ao lado o elenco com Sakura, Kiko, Yuki, Kenji, Hana e Taro." width="100%">

Crie quantas personagens quiser, do zero ou a partir de **14 modelos prontos**, e mude tudo nelas:

- **Identidade:** nome, título, classe, arma, habilidade, personalidade, frase de efeito e história
- **Visual pronto:** três opções (A, B e C) para cada personagem, em Perfil → Aparência
- **Aparência:** penteado (até Chanel e cacheado), traje, acessório (laço, kanzashi, chapéu kasa, eboshi, capuz com orelhinhas, orelhas de raposa, chifres de oni...) e rosto (com cílios ou óculos redondos)
- **Roupa extra:** cachecol, capa ou os dois
- **Cores:** pele, cabelo, olhos, roupa, detalhes, arma e duas cores livres
- **Especificações:** 24 pontos para distribuir entre força, agilidade, mente e espírito

As personagens são chibis em pixel art, sempre de frente na tela. As três opções de visual de cada modelo estão em [docs/personagens](docs/personagens/LEIAME.md) (gere de novo com `node scripts/opcoes-personagens.js`).

### 🃏 A carta da personagem

Ao lado da cena, a personagem ativa aparece numa carta colecionável: nome, kanji da classe, estrelas, arte, classe e arma, habilidade, frase, LV, ATQ e DEF. O ATQ vem da força e da agilidade, e a DEF, da mente e do espírito.

<img src="docs/telas/cartas.jpg" alt="Os 14 modelos prontos em cartas, com molduras de raridades diferentes e o efeito de poder de cada classe na arte" width="100%">

A carta **sobe de raridade conforme você conclui missões**, e a arte segue a hora real:

| Raridade | Missões | Moldura |
| --- | --- | --- |
| Comum | 0 | cinza |
| Incomum | 1 | verde |
| Rara | 3 | azul |
| Épica | 6 | roxa, com brilho holográfico |
| Lendária | 10 | dourada, com brilho holográfico |
| Mítica | 20 | rosa, com brilho holográfico |

Cada classe tem um efeito de poder na arte: corte e sol vermelho (samurai), fumaça e shurikens (ninja), ofudas e espíritos (miko), auréola dourada (monge), vento e pétalas (onna-bugeisha), clones de sombra (kunoichi), alvo e flecha (arqueira), círculo mágico (onmyōji), brasas da forja (ferreira), fogo de raposa (kitsune), montanhas na névoa (yamabushi) e lua com folhas caindo (rōnin).

<details>
<summary><b>As 12 classes e suas habilidades</b></summary>

| Classe | Arma | Habilidade |
| --- | --- | --- |
| Samurai 侍 | Katana | +10% de XP em cada pomodoro |
| Ninja 忍 | Kunai | +5 ryō por yōkai derrotado |
| Miko 巫 | Gohei | Pausas recuperam +10 de energia |
| Monge 僧 | Cajado | Missões concluídas dão +20 XP |
| Onna-bugeisha 女武 | Naginata | Chefes dão +25% de XP |
| Kunoichi くノ一 | Kunai | +3 ryō por pausa completa |
| Arqueira 弓 | Arco e flecha | Cada passo marcado dá +2 XP extra |
| Onmyōji 陰陽 | Talismãs ofuda | Revisões dão +5 XP extra |
| Ferreira 鍛 | Martelo | +20 ryō ao bater a meta diária |
| Kitsune 狐 | Leque | "Só 5 minutos" dá o dobro de XP |
| Yamabushi 山伏 | Cajado | A pausa longa recupera toda a energia |
| Rōnin 浪人 | Katana | +5% de XP por dia seguido, até 25% |

A arma e a habilidade podem ser trocadas no editor, independente da classe.

</details>

## 📋 Missões, resumo e ajustes

<table>
  <tr>
    <td width="50%"><img src="docs/telas/missoes.png" alt="Tela de Missões com tarefas divididas em passos, pergaminho de distrações e diário"></td>
    <td width="50%"><img src="docs/telas/resumo.png" alt="Tela Resumo dos meus pomodoros com números do dia, frase do mestre, batalhas e missões"></td>
  </tr>
  <tr>
    <td><b>Missões</b> · cada tarefa vira passos pequenos, com a estimativa de pomodoros e o que você realmente gastou</td>
    <td><b>Resumo do dia</b> · batalhas com plano e resultado, melhor horário, energia e sugestões para amanhã</td>
  </tr>
</table>

<img src="docs/telas/jogo.png" alt="Tela Especificações com ritmo, ajuda para o foco, som, céu, reino, Obsidian e clima" width="100%">

Na aba **Jogo** você ajusta os tempos (15/5, 25/5, 50/10 ou do seu jeito), a meta diária, o modo foco, as penalidades, o som, a música, o céu, o reino (e o 3D) e o clima.

### No celular

<p align="center">
  <img src="docs/telas/celular-dia.png" alt="Jogo no celular de dia, no jardim de sakura, com a Mei lendo" width="260">
  &nbsp;&nbsp;
  <img src="docs/telas/celular-noite.png" alt="Jogo no celular à noite, no dojo com chuva, com a Sakura escrevendo" width="260">
</p>

## 📁 Salvamento no Obsidian

Rodando pelo servidor local, o jogo salva tudo num cofre do Obsidian **sempre que algo muda e quando você fecha a aba**. Ao abrir de novo, ele carrega o progresso de lá.

```mermaid
flowchart LR
  A[Jogo no navegador] -- salva a cada mudança --> B[server.js]
  B --> C[(Cofre do Obsidian)]
  C -- ao abrir --> B
  B -- carrega o progresso --> A
```

Por padrão o cofre fica em `~/Documents/Obsidian/Dojo do Foco`. No Obsidian, use **Abrir pasta como cofre** e escolha essa pasta. O jogo cria:

| Arquivo | O que tem |
| --- | --- |
| `Dojo do Foco.md` | Painel com a personagem ativa, nível, o dia de hoje e links |
| `Resumos/AAAA-MM-DD.md` | Resumo de cada dia: batalhas, plano e resultado, missões, distrações, energia |
| `Missões.md` | Missões e passos em checklist |
| `Pergaminho de distrações.md` | O que você anotou para resolver depois |
| `Personagens/<nome>.md` | Ficha de cada personagem |
| `_dados/dojo-save.json` | O estado completo do jogo, lido ao abrir |

As notas são geradas pelo jogo, então o que você editar nelas é substituído no próximo salvamento. Escreva suas próprias anotações em outras notas do cofre.

<details>
<summary><b>Usar outra pasta ou outra porta</b></summary>

Crie um `dojo.config.json` na raiz do projeto (ele não vai para o Git):

```json
{ "vaultPath": "~/Documents/MeuCofre/Dojo do Foco", "port": 4321 }
```

Ou use variáveis de ambiente:

```bash
DOJO_VAULT=/caminho/do/cofre PORT=4321 npm start
```

</details>

## 🔐 Login e progresso na nuvem

Com o login ligado, o jogo pede e-mail e senha (ou um link de entrada no e-mail) antes de abrir o dojo. O progresso de cada pessoa fica na conta dela, no [Supabase](https://supabase.com), e volta em qualquer aparelho. Cada pessoa só vê o próprio progresso.

**Como os dados ficam protegidos**

- As senhas ficam com o Supabase, guardadas com criptografia. O jogo nunca as recebe.
- A tabela `saves` tem RLS (Row Level Security): o banco só entrega a linha da conta que fez o pedido. Quem abrir o código do site e tentar pedir os dados de outra pessoa recebe uma resposta vazia.
- A página só recebe a chave **pública** (`anon` / `publishable`). Ela foi feita para ficar no navegador. O build se recusa a usar a chave `service_role`, que é secreta e nunca deve sair do painel do Supabase.
- O cliente do Supabase é carregado com verificação de integridade (SRI): se o arquivo da CDN for alterado, o navegador não o executa.
- Ao sair da conta, a cópia local daquele navegador é apagada. Num computador compartilhado, a próxima pessoa não vê nada.

**Configurar (uma vez só)**

1. Crie uma conta e um projeto grátis em <https://supabase.com>.
2. Em **SQL Editor** → **New query**, cole o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) e clique em **Run**.
3. Em **Authentication** → **URL Configuration**, coloque em **Site URL** o endereço do site (por exemplo `https://dojo-do-foco.netlify.app`). Em **Redirect URLs**, adicione esse mesmo endereço e `http://localhost:4321`.
4. Em **Project Settings** → **API**, copie a **Project URL** e a chave **anon / publishable**.
5. Coloque os dois valores no `netlify.toml`, em `[build.environment]`, como `SUPABASE_URL` e `SUPABASE_ANON_KEY` (ou crie essas variáveis no painel do Netlify). O próximo `git push` publica com o login ligado.

Este projeto já está configurado: o `netlify.toml` aponta para o projeto `nxtecdtjrxmzdubkmjrh` do Supabase.

Para o servidor local, coloque as duas no `dojo.config.json`:

```json
{ "supabaseUrl": "https://abcd.supabase.co", "supabaseAnonKey": "sua-chave-anon" }
```

Sem essas variáveis, o jogo funciona como antes, sem login, com o progresso no navegador. Com login ligado no servidor local, o progresso vem da conta, e o cofre do Obsidian só recebe uma cópia de quem estiver conectado.

Na primeira vez que alguém entra, o progresso que já estava naquele navegador vai para a conta dela. Se o mesmo dojo ficar aberto em dois aparelhos ao mesmo tempo, vale o último salvamento.

## 🌐 Publicar no Netlify

O projeto já vem pronto para o [Netlify](https://www.netlify.com), que é gratuito e funciona com repositório privado. O `netlify.toml` diz tudo o que ele precisa: roda `npm run build` e publica a pasta `dist/`.

1. Entre em <https://app.netlify.com> com a sua conta do GitHub.
2. Clique em **Add new site** (ou **Add new project**) → **Import an existing project** → **GitHub** e autorize o acesso ao repositório `dojo-do-foco`.
3. Escolha o repositório. O comando de build e a pasta de publicação já aparecem preenchidos pelo `netlify.toml`. Clique em **Deploy**.
4. Nas configurações do site, troque o nome para ganhar um endereço como `dojo-do-foco.netlify.app`.

Depois disso, cada `git push` publica uma versão nova sozinho.

| | No site publicado | Rodando `npm start` |
| --- | --- | --- |
| Onde o progresso fica | Na conta de cada pessoa (com login) ou no navegador | No cofre do Obsidian (e na conta, com login) |
| Clima | Automático, pela cidade ou pela localização do aparelho | Automático, pela cidade ou pela localização |
| Onde abre | Em qualquer aparelho, celular incluído | Só no computador onde o servidor está rodando |

Para conferir o site antes de publicar:

```bash
npm run build
```

O resultado fica em `dist/index.html`.

## 🧱 Estrutura

```
index.html        o jogo inteiro: HTML, CSS e JavaScript, com a pixel art desenhada em canvas
server.js         servidor local e gravação no cofre do Obsidian
lib/page.js       monta o documento completo (viewport, ícone, config da nuvem) a partir do index.html
supabase/schema.sql  tabela de progresso e regras de acesso (RLS) do login
scripts/build.js  gera a versão estática em dist/ para o Netlify
scripts/opcoes-personagens.js  desenha as opções de visual dos modelos em docs/personagens/
netlify.toml      configuração de publicação no Netlify
package.json      scripts npm start e npm run build
docs/             capturas de tela e GIF deste README
docs/personagens/ opções de visual (A, B e C) de cada modelo
decisoes/         registro das decisões técnicas e do porquê
.vscode/          configuração para rodar pelo VS Code
```

<div align="center">
<sub>As ideias de design (mundo, personagens, mecânicas) ficam numa pasta de criação separada, fora deste repositório.</sub><br>
<sub>As capturas usam dados de exemplo. Sem pressa. Sem culpa. Só o próximo passo.</sub>
</div>
