# Task: Bento Box "Símbolos de Amor"
## Escopo
Construir o Ato 3 da experiência: um grid assimétrico focado em conteúdo específico e easter eggs estruturais.

## Requisitos de UI/UX
* **Título:** "Símbolos de amor" (fonte serifada elegante).
* **Conteúdo:** Imagens focadas em dois gatos específicos (um preto e um cinza rajado).
* **Layout:** Grid CSS no estilo Bento Box (caixas assimétricas com cantos arredondados).
* **Easter Egg Estrutural:** A disposição de uma das seções do grid deve mimetizar proporções arquitetônicas. Estruture colunas específicas do layout com a exata proporção de 5:1 (representando a relação de uma base de 200cm com um armazém de 40cm adjacente).
* **Ilustrações:** Posicionar SVGs animados minimalistas do gato preto e do gato cinza rajado brincando pelas bordas e escalando a estrutura que segue a proporção arquitetônica.

## Requisitos Técnicos (Tailwind & Framer)
* Aplicar utilitários do Tailwind para o CSS Grid (`grid-cols-5` ou `grid-cols-10` para abstrair as proporções de forma limpa).
* Garantir otimização de imagem via `next/image` para evitar repaints desnecessários.
* Vincular micro-animações dos SVGs a *scroll states* do Framer Motion.