# Prompt: personagens chibi de frente

> Prompt original: *"Analise essas imagens de personagens 2d, crie com base nesses traços e modelo, fotos de opções dos personagens que já existem dentro do dojo. Para cada um, melhore. Quero que os personagens do dojo fiquem de frente na tela."*
>
> Versão detalhada abaixo. Junto com ela vão as três imagens de referência (folhas de personagens chibi).

---

## Contexto

O Dojo do Foco desenha as personagens em pixel art no canvas, em `index.html`:

- `drawSide()`: personagem **de lado**, 12 × 17 pixels. Usada no estudo, no ataque, no chá, no onsen, nos retratos, no elenco e nos modelos prontos.
- `drawBack()`: personagem **de costas**, usada quando o timer está parado.
- Aparência montada por `charPal()` a partir da classe (`HPAL`, `CLASS_LOOK`) e do que a pessoa escolheu (`look`, `col`).
- Existem **14 modelos prontos** (`PRESETS`): Sakura, Aiko, Hana, Yuki, Rin, Mei, Akane, Kiko, Nami, Sora, Kenji, Taro, Jin e Hoshi.

## O que as referências têm em comum

1. **Proporção chibi:** cabeça grande, mais ou menos do tamanho do corpo.
2. **Olhos grandes** com um ponto de brilho branco, e **blush** nas bochechas.
3. **Contorno suave e colorido** (uma versão escura da cor de cada parte, nunca preto puro).
4. **Silhueta marcada por uma peça grande:** chapéu largo, capuz com orelhinhas, capa, cachecol volumoso, cabelo cacheado e fofo.
5. **Paleta pastel e aconchegante**, com uma ou duas cores de destaque.
6. **Pose de frente**, parada, olhando para quem vê.

## O que fazer

1. **Novo sprite de frente** (`drawFront`), chibi, 14 pixels de largura, com contorno automático, brilho nos olhos, blush e sombra no cabelo. Ele precisa aceitar tudo o que o sprite de lado aceita: penteados, trajes, acessórios, rosto, cores, piscar, braços (parado, segurando, escrevendo, golpe, erguido, xícara) e todas as armas.
2. **Peças novas inspiradas nas referências**, todas no editor:
   - Penteados: *Chanel* e *Cacheado*.
   - Acessórios: *Capuz com orelhinhas* e *Chapéu eboshi* (o chapéu dos onmyōji).
   - Rosto: *Óculos redondos*.
   - Um campo novo, **Roupa extra**: *Cachecol* (Cor livre 1), *Capa* (Cor livre 2) ou os dois.
   - Cor dos olhos própria para cada modelo.
3. **Três opções (A, B, C) para cada um dos 14 modelos**, e uma imagem de cada um mostrando o sprite de hoje ao lado das três opções. A opção A vira o visual novo do modelo no jogo.
4. **Personagens de frente na tela** em todas as cenas: parada (no lugar das costas), estudando atrás da mesa, indo atacar e voltando, comemorando, no chá, no onsen, nos retratos, no elenco e na lista de modelos.
5. **Não perder nada de quem já joga:** personagens salvas ganham só as peças novas que estiverem faltando. O que a pessoa escolheu não muda.

## Restrições

- Sem dependências novas. As imagens das opções são geradas por um script em Node que reaproveita o código do sprite do `index.html` e escreve PNG direto.
- O desenho à mão passa a pintar a versão de frente. Desenhos antigos (de lado) não servem no sprite novo.
- Manter o desempenho: o sprite é só um punhado de `fillRect`.

## Pronto quando

- `docs/personagens/` tem uma imagem por modelo (hoje + A, B, C) e uma folha com todos.
- No jogo, nenhuma cena mostra a personagem de lado ou de costas.
- O editor mostra as peças novas e o desenho à mão funciona no sprite de frente.
- Sem erros no console.
