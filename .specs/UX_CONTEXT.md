# Roadmap de Experiência e Design System (UX_CONTEXT)
## Projeto: Aniversário de 2 Anos (Web App)

### 1. Visão Geral
Este documento atua como o Single Source of Truth (SSOT) para o fluxo de navegação e as diretrizes de interface. O objetivo é criar uma experiência de "Scrollytelling" imersiva, dividida em quatro atos narrativos, utilizando Next.js, Tailwind CSS e Framer Motion.

### 2. Design System & Assets
* **Cores:** Fundo escuro texturizado (ex: `zinc-950` com SVG de ruído) para alto contraste com as fotos. 
* **Tipografia:** 
  * Elegante (Serifada) para títulos e citações.
  * Geométrica (Sem serifa) para leitura limpa na carta final.
  * *Handwritten* para notas nos post-its.
* **Ícones/Ilustrações:** Vetores minimalistas (traços finos) para interações, incluindo ilustrações customizadas de gatos interagindo com o layout.

### 3. A Jornada do Usuário (Roadmap em 4 Atos)

#### Ato 1: O Portal (Hero Section)
* **Visual:** Tela minimalista e imersiva. Uma frase elegante centralizada. Exatamente no centro da tela, abaixo ou ao redor da frase, um ícone de coração.
* **Interação (Framer Motion):** Ao clicar (ou após um leve scroll), o coração sofre uma animação de `scale` massiva, expandindo até preencher 100% da viewport (podemos usar `clip-path: circle()` animado para garantir performance). Isso cria a sensação de "entrar" no coração, servindo como transição fluida para o próximo ato.

#### Ato 2: O Fio Condutor (Photo Wall)
* **Visual:** O mural principal. O background já assumiu a textura definitiva pós-transição do coração.
* **Interação:** Scroll vertical. O fio SVG guia o olhar. Os "post-its" com fotos vão surgindo em perspectiva (`fade-in`, `scale`), acompanhados da animação física do "pin" (tachinha) fincando e balançando a foto levemente.

#### Ato 3: Símbolos de Amor (Bento Box)
* **Visual:** O fio condutor termina ou se transforma em um layout de grid assimétrico (Bento Box), com o título "Símbolos de amor".
* **Conteúdo:** Dedicado exclusivamente a fotos dos dois gatos (o preto e o cinza rajado).
* **Easter Egg & UI:** Ilustrações animadas em SVG dos dois gatinhos "brincando" com as bordas das caixas do layout.

#### Ato 4: O Cofre (Envelope Final)
* **Visual:** Um envelope digital fechado repousa no centro da tela.
* **Interação (State Management):** Um input minimalista pede uma senha. O componente valida a entrada `1608`. 
* **O Clímax:** Ao validar a senha correta, o Framer Motion orquestra a abertura da aba do envelope (`rotateX`), e a carta desliza para fora (`translateY`), expandindo-se para leitura com uma tipografia limpa e emocionante.