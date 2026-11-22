# Desempenho: menos trabalho para a placa de vídeo

**Data:** 2026-11-22

## O problema

O jogo travava num Mac com placa de vídeo integrada (Intel UHD 630). O JavaScript gastava pouco, uns 3 ms por quadro. A placa de vídeo é que não dava conta:

- A cena em pixel art tinha um canvas de **2000×900** (até 8× o tamanho base) redesenhado **60 vezes por segundo**.
- A barra de navegação usava `backdrop-filter: blur`, que precisa ser recalculado a cada quadro porque o fundo em 3D está sempre se mexendo.
- O 3D disputava a placa com tudo isso. No reino das Ilhas flutuantes com tempestade, `renderer.render` levava **~125 ms**, e `frame3d` levava 29 ms em média.

## O que mudou

| Mudança | Antes | Depois |
| --- | --- | --- |
| Tamanho do canvas da cena (tela 1024 px, retina) | 2000×900 | 1200×540 (no máximo 3× o tamanho base) |
| Quadros da cena | 60 por segundo | 30 por segundo |
| Quadros do 3D no fundo | 30 por segundo | 25 por segundo (30 na visão do reino) |
| Desfoque da barra de navegação | `blur(8px)` | Sem desfoque, fundo 97% opaco |
| Cena durante a visão do reino | Desenhada mesmo escondida | Não é desenhada |
| Texturas ao trocar de reino | Ficavam na memória | Liberadas com `dispose()` |

O CSS amplia a pixel art com `image-rendering: pixelated`, então ela continua nítida.

**Modo leve automático (`PERF`):** se o navegador fica abaixo de 18 quadros por segundo durante duas janelas seguidas de 3 s, o jogo sobe um nível.

- Nível 1: a cena fica no máximo 2× e a 20 quadros por segundo; o 3D passa para 15 quadros por segundo e usa menos pixels.
- Nível 2: o 3D é pausado nesta sessão e um aviso explica como religar.

Os níveis nunca descem sozinhos, para não oscilar. A aba escondida e os intervalos de mais de 250 ms (o navegador freando de propósito) não contam.

## Medição

Numa cópia com medidores, no reino Ilhas flutuantes com tempestade e o foco rodando: o `renderer.render` do 3D caiu de ~125 ms para ~6 ms, com a mesma resolução do 3D (342×256).

Depois, no site publicado, no Chrome do Mac com Intel UHD 630 (janela de 1624×888, tela retina), no reino Ilhas flutuantes com o 3D ligado:

| Situação | Quadros por segundo | Mediana | 95% dos quadros abaixo de | Quadros acima de 50 ms |
| --- | --- | --- | --- | --- |
| Céu limpo (8 s) | 58,5 | 16,7 ms | 17,4 ms | 2 |
| Tempestade (10 s) | 47,9 | 17,0 ms | 33,4 ms | 4 |

Nos dois casos o jogo ficou no nível 0: o modo leve não precisou entrar.

## Alternativas consideradas

- Desenhar a cena em 1× (320×180) e deixar o CSS ampliar tudo: dá ainda menos trabalho, mas os textos de neon com brilho (`shadowBlur`) ficam serrilhados.
- Desligar o 3D por padrão: perde a principal novidade visual; o modo leve automático resolve sem tirar o 3D de quem tem um computador forte.
