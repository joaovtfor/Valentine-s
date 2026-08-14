# Task: Hero Section & Portal Transition
## Escopo
Construir a interface inicial (Ato 1) da aplicação e a transição imersiva para o mural de fotos.

## Requisitos de UI/UX
* **Layout:** Tela 100vh/100vw, fundo escuro (`zinc-950`).
* **Tipografia:** Frase elegante centralizada (fonte serifada).
* **Elemento Central:** Ícone de coração posicionado perfeitamente no centro ou logo abaixo da frase.
* **Interação:** O usuário deve interagir (clique ou primeiro scroll) para iniciar a experiência.

## Requisitos Técnicos (Framer Motion)
* Ao receber o gatilho, disparar uma animação onde o coração expande exponencialmente até cobrir toda a viewport.
* **Estratégia de Performance:** Utilizar `transform: scale()` com `will-change: transform` ou animar um `clip-path: circle()` para garantir 60fps constantes sem sobrecarregar o navegador.
* **Transição de Estado:** Ao finalizar a expansão do coração (quando a tela estiver de uma cor sólida), disparar a montagem do componente `PhotoWall` (Ato 2) por baixo, desvanecendo a máscara do coração para revelar o mural de forma fluida.