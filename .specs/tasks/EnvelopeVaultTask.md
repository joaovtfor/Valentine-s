# Task: O Cofre e a Carta Final
## Escopo
Construir o Ato 4 (Clímax): o componente do envelope digital com controle de acesso e a exibição da carta final.

## Requisitos de UI/UX
* **Visual Inicial:** Envelope digital fechado repousando no centro da tela.
* **Controle de Acesso:** Input minimalista solicitando senha.
* **Leitura da Carta:** Ao ser revelada, a carta deve adotar uma tipografia geométrica, limpa e focada em máxima legibilidade.

## Requisitos Técnicos (React State & Framer Motion)
* **Gerenciamento de Estado:** Controlar o valor do input em um client component, validando estritamente a entrada para liberar o fluxo apenas quando o valor for "1608".
* **Animação de Abertura:** 
  1. Fade-out no componente de input (`opacity: 0`).
  2. Rotação 3D da aba superior do envelope (`rotateX` de 0 a 180 graus com `transform-origin` no topo).
  3. A carta desliza para fora do container do envelope (`translateY`) e ganha escala (`scale`) para ocupar o centro da tela.
* **Arquitetura (YAGNI):** Toda validação de string será feita em client-side de forma lúdica. Sob nenhuma circunstância incorpore rotas de API (Route Handlers) ou chamadas de backend para resolver a validação do input.