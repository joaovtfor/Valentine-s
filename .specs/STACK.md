# Contexto Arquitetural e de Infraestrutura
## Projeto: Aniversário de 2 Anos (Web App)

### 1. Princípios de Engenharia
* **YAGNI & Pragmatismo:** Aplicação focada no front-end e em conteúdo. Sem necessidade de banco de dados ou backend complexo. Apenas o estritamente necessário para entregar a melhor UX possível.
* **SoC (Separation of Concerns):** Separação total entre lógica de UI e dados. Todo o conteúdo (textos, datas, caminhos de mídia, senhas mockadas) será centralizado em um arquivo de configuração estático (ex: `src/config/content.ts` ou `data.json`). Isso é crucial para o workflow multi-agentes: agentes de conteúdo podem modificar o JSON sem o risco de quebrar os componentes React.

### 2. Tech Stack
* **Core Framework:** Next.js (App Router). Ideal para otimização de rotas, imagens e carregamento rápido.
* **Estilização:** Tailwind CSS. Abordagem utility-first para iteração ágil na interface, garantindo responsividade e consistência visual através do `tailwind.config.ts`.
* **Animações e Interações:** Framer Motion. Utilização avançada de hooks como `useScroll` e `useTransform` para o scrollytelling e animações de entrada/saída (Presence).

### 3. Infraestrutura e Ambientes
* **Desenvolvimento Local (Agent-Ready):** 
  * Containerização standalone via Docker Desktop.
  * `docker-compose.yml` focado em DX (Developer Experience), mapeando volumes para habilitar o *hot-reload* do Next.js.
  * O contêiner serve como uma sandbox segura para que os agentes autônomos de IA possam ler, escrever e testar o código localmente sem interferir na máquina host.
* **Deploy e Produção:** 
  * **Vercel.** Abandono do provisionamento manual em swarm/Portainer em favor da Vercel. Como a aplicação é majoritariamente estática/SSG, a Vercel anula o overhead de DevOps, fornecendo CI/CD nativo a partir do repositório, Edge caching e otimização imediata de assets (Next/Image).

### 4. Segurança e Otimização (By Design)
* Controle estrito de re-renderizações e repaints causados pelas animações do Framer Motion (uso adequado de propriedades transformáveis via GPU).
* Nenhuma senha real ou dado sensível hardcoded (caso a feature de "cofre" seja implementada, a validação será feita no client-side com hashes simples ou lógica obfusca, já que a segurança aqui é apenas lúdica, não corporativa).
* Tipagem rigorosa com TypeScript para contratos bem definidos entre os agentes de dados e os agentes de UI.
