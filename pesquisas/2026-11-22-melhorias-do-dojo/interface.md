# Interface do Dojo do Foco: o que o X sugere (pesquisa de 22/11/2026)

Fonte: buscas no X feitas pelo Chrome logado, filtradas por curtidas (`min_faves`). Os números entre colchetes são curtidas. Os links dos posts não puderam ser copiados (a extensão bloqueia URLs com query string), então cada post é identificado pelo texto e pela busca usada. Complementa `concorrentes.md` e `tendencias.md`, que já cobrem mercado e mecânicas.

## O que apareceu no X

### 1. Pomodoro rígido incomoda quem tem TDAH (o sinal mais forte)
Busca: `pomodoro TDAH min_faves:50`.
- [851] "Pomodoro não funciona para mim… demoro para pegar no tranco, se eu tiver que parar a cada 25–35 min, os 5 min viram 30 porque eu enrolo para voltar."
- [940] "meu TDAH não me permite fazer a técnica pomodoro pq se eu for depender de conseguir me concentrar de novo cada vez que fizer uma pausa…"
- [631] Sugestão de "Pomodoro pessoal": medir quanto tempo leva para perder o foco e usar isso como duração. A queixa vem junto: "só falta a gente lembrar de parar o cronômetro".
- [722] (espanhol) "se não dá para programar a concentração, programe as distrações".
- [563] Elogio a um app que "a cada 1 hora joga essa tela na minha cara me forçando a parar". Pausa obrigatória e visível funciona para quem hiperfoca.

Leitura: há dois públicos opostos dentro do TDAH. Um perde o embalo na pausa, o outro esquece de parar. O timer precisa deixar a pessoa estender o foco e voltar da pausa sem esforço.

### 2. O timer fora da aba é o que mais gera elogio
Busca: `pomodoro "dynamic island" OR widget OR "picture in picture"`.
- [16794] "Deem um aumento IMEDIATO para quem projetou essa interface de temporizador da Dynamic Island no iOS 27."
- [12915] Um gato que mora na Dynamic Island "como um tamagotchi". Um mascote vivendo no timer pequeno viraliza.
- [112] App de pomodoro "Focus" citado por funcionar na Ilha Dinâmica e na tela bloqueada.
- [3088] "meu timer de foco analógico precisou de pilha, então eu construí um": a estética de objeto físico, com um timer grande e legível, chama atenção.

### 3. Onboarding visual com mascote vende
Busca: `pomodoro app min_faves:30`.
- [512] "Este app de pomodoro fatura 30K/mês e assim ele faz o onboarding: mascote fofo, cores vibrantes e animações suaves, recursos explicados visualmente, fluxo de swipe mostrando como o app funciona." Houve repost em português com [95].
- [94] "precisando de um app pomodoro que seja gamificado! quero ser recompensada por focar por 50 minutos". Esse é exatamente o público do Dojo, falando em português.

### 4. Estudar "junto" num lugar, sem obrigação de falar
- [406] Qahwa: "um café marroquino onde você trabalha, no seu navegador. Entre, escolha uma mesa, inicie um temporizador de foco. Converse se quiser, ninguém precisa."
- [50] "Esse app de pomodoro coop é a coisa mais fofa que você vai ver hoje"; outra pessoa responde que está "na lista de desejos esperando há tempos".
- [663] Body doubling virtual citado como estratégia contra disfunção executiva.
- [439] Elogio ao Deep Focus do Focus Friend, que bloqueia apps até o fim do tempo.

### 5. Referências de UI em pixel art que circulam entre devs
Busca: `pixelart UI gamedev min_faves:300`.
- [2279] "Some useful info on UI/UX #pixelart #gamedev" e [1589] o link do Pixel Blog 26 da SLYNYRD sobre o básico de UX/UI (slynyrd.com/blog/2020/2/23/pixelblog-26-uxui-design-basics).
- [2474] Tiny Swords (Pixel Frog) com variações de elementos de UI. Molduras, botões e painéis desenhados em pixel, e não caixas CSS arredondadas, são o que faz a UI "parecer jogo".

## O que isso significa para a tela atual

Olhei `docs/telas/dojo.png`, `docs/telas/celular-noite.png` e o `index.html`.

| Achado | Situação no Dojo hoje |
| --- | --- |
| Timer legível e central | No desktop está ótimo (16:49 grande). **No celular o timer fica abaixo da dobra**: antes dele aparecem 3 pílulas, abas de modo, seletor de cenário, o inimigo e a cena inteira. |
| Ação principal sempre visível | No desktop a caixa de diálogo (plano e botão) é **cortada pela barra de navegação de baixo**, e "Próxima ação" e o diálogo dividem atenção. |
| Timer fora da aba | Só o título da aba mostra o tempo (`index.html:2896`). Não há favicon com progresso, notificação nem janela flutuante. |
| Estender foco / voltar da pausa | Há "Só 5 minutos" e auto-start (`cfg-auto`). Não há "continuar no embalo" ao fim do foco nem um modo cronômetro livre (flowtime). |
| Reação ao sair da aba | `visibilitychange` só ressincroniza o timer (`index.html:3374`). A personagem não reage. |
| Primeira visita | Não há onboarding (nenhuma ocorrência de onboarding ou tutorial). A pessoa cai direto numa tela com 5 abas e muitos controles. |
| Atalhos | Espaço inicia e pausa, setas trocam de reino. Bom, mas não aparece em lugar nenhum da interface. |

## Recomendações, em ordem de impacto por esforço

1. **Tela de foco no celular com o timer no topo.** Durante o foco, recolher pílulas, abas de modo e seletor de cenário em um único botão "⋯", e sobrepor o timer à cena como no desktop. O modo foco (`cfg-focusMode`) poderia ser o padrão no celular. *Esforço: baixo, só CSS e layout.*
2. **Ação principal fixa acima da barra de navegação.** O botão "Começar batalha" ou "Pausar" deve ficar sempre visível (sticky), e o texto do diálogo pode rolar. Hoje ele é cortado no desktop. *Baixo.*
3. **Fim do foco com duas saídas claras: "Pausar agora" e "Mais 10 min no embalo".** Isso responde aos dois públicos do item 1. Para quem hiperfoca, a pausa pode ocupar a tela inteira (o onsen ou a casa de chá) e ser difícil de ignorar, como no post das 563 curtidas. *Baixo a médio.*
4. **Timer fora da aba:** favicon desenhado em canvas com um anel de progresso e a cor da fase, e uma notificação do navegador no fim (opcional). Também a **janela flutuante com Document Picture-in-Picture** (Chrome), mostrando a personagem e o tempo, que é o "gato na Dynamic Island" do Dojo. *Médio; PiP só funciona em Chromium, então precisa de fallback.*
5. **Modo "Embalo" (flowtime) como opção de duração:** um cronômetro que sobe, e a pausa é proporcional ao tempo focado (por exemplo 1/5). Mostrar no resumo a média de quanto a pessoa aguenta, que é o "Pomodoro pessoal" sugerido no X, calculado sozinho. *Médio.*
6. **Personagem reage quando você sai da aba:** ao voltar, ela está distraída ou o yōkai avançou um passo, sem dano nem XP perdido. Isso reaproveita o `visibilitychange` que já existe. *Baixo.*
7. **Onboarding de 3 telas com a personagem falando:** (1) escreva o que vai fazer, (2) lute enquanto o tempo passa, (3) descanse no chá ou no onsen. Mostrar só na primeira visita, depois revelar as abas Missões, Perfil e Jogo aos poucos. *Médio.*
8. **UI com cara de jogo:** trocar as bordas CSS arredondadas das pílulas e cartões por molduras em pixel (9-slice com `border-image`), seguindo o SLYNYRD #26. Os neons da cena já têm esse estilo, mas os controles ainda parecem um app web. *Médio, é trabalho de arte.*
9. **Dica de atalhos** discreta ("Espaço = pausar") perto do timer no desktop. *Muito baixo.*
10. **Mais adiante, presença coletiva leve:** um contador "N pessoas estudando no dojo agora" ou salas por link, no espírito do Qahwa ("converse se quiser, ninguém precisa"). Precisa de backend, então fica fora do escopo de interface por enquanto.

## Limites desta pesquisa
- As buscas no X trazem muito ruído (o "Top" mistura cripto, arte e anúncios), e apenas posts com texto foram lidos. Imagens e vídeos dos posts de UI não foram analisados.
- As curtidas medem alcance, não validam a ideia. Os relatos sobre TDAH são experiências pessoais, não estudos.
- Não testei a interface ao vivo; a análise da tela se baseia nas capturas em `docs/telas/`, que podem estar desatualizadas em relação ao `index.html`.
