# Task: O Fio Condutor e Mural de Fotos
## Escopo
Construir o Ato 2 da experiência: o scroll narrativo principal onde as fotos aparecem conectadas por um fio.

## Requisitos de UI/UX
* **Fundo:** Textura aplicada após a transição da Hero Section.
* **Elementos:** Fotos com aspecto polaroid/post-it acompanhadas de textos curtos (fonte manuscrita) e uma tachinha (pin) no topo.
* **Disposição:** Intercaladas espacialmente (esquerda e direita) acompanhando o scroll central.

## Requisitos Técnicos (Framer Motion)
* **O Fio (SVG):** Criar um caminho contínuo utilizando o hook `useScroll`. Animar a propriedade `pathLength` atrelada ao scroll da página.
* **As Fotos:** Disparar a entrada em perspectiva (`scale`, `opacity`, leve `rotateZ`) apenas quando entrarem na viewport.
* **Física dos Pins:** Orquestrar uma animação encadeada. Quando o post-it atingir o centro e estabilizar, o elemento visual do "pin" desce com uma animação de mola (`type: spring`), causando um micro-sobressalto na foto simulando impacto físico.
* **Arquitetura:** Manter estrita Separação de Responsabilidades (SoC). Os dados devem vir exclusivamente do arquivo estático de configuração.