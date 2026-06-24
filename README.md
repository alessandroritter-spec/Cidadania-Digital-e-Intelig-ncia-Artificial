# Portal Conexão Segura: Cidadania Digital e IA 🛡️🤖

> Projeto voltado para a conscientização comunitária sobre os impactos das Deepfakes e da desinformação automatizada na sociedade moderna. Desenvolvido para a disciplina de Educação Digital e IA.

---

## 🎯 Objetivo do Projeto

Com o avanço das ferramentas de Inteligência Artificial, a criação de mídias sintéticas (deepfakes) e a automação de notícias falsas tornaram-se desafios críticos para a democracia e a segurança digital. Este portal interativo foi construído como uma ferramenta pedagógica para capacitar cidadãos comuns a:
1. **Identificar** anomalias em vídeos e clonagens de voz por IA.
2. **Analisar** a segurança de links e estruturas de URL suspeitas.
3. **Mapear** o impacto da desinformação na comunidade local através de coleta de dados estatísticos.

---

## 🎮 Funcionalidades Principais

* **Missão Mídia Segura (Jogo em Fases):** Um simulador de tomadas de decisão onde o usuário avança por 3 fases críticas enfrentando dilemas reais sobre deepfakes e engenharia social. O placar e os textos mudam dinamicamente.
* **Laboratório de Ameaças (Ligação Fake):** Área dedicada à análise de clonagem de voz via IA, instruindo o usuário sobre os padrões robóticos de golpes telefônicos.
* **Verificador Instantâneo de Links:** Um script dinâmico baseado em lógica de string que varre URLs em busca de termos fraudulentos (`.ru`, `promocao`, `ganhe-gratis`) ou ausência de protocolos de segurança (`https`).
* **CyberGuard (Mascote Bot):** Um assistente flutuante que interage com o usuário, fornecendo dicas e feedbacks em tempo real baseados nas ações tomadas no site.
* **Acessibilidade (Modo Escuro/Claro):** Inversão dinâmica de paleta de cores para garantir conforto visual e usabilidade em múltiplos ambientes.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído do zero, sem o uso de frameworks ou templates genéricos, garantindo um código limpo e semântico:

* **HTML5:** Estruturação semântica avançada (`<main>`, `<section>`, `<video>`, `<audio>`, `<form>`).
* **CSS3:** Layout moderno utilizando **Flexbox**, animações de flutuação para o mascote (`@keyframes`), variáveis de ambiente (`:root`) e total responsividade via **Media Queries** para dispositivos móveis.
* **JavaScript (Vanilla):** Manipulação dinâmica do DOM, controle de fluxo e estado das fases do jogo, lógica de validação de texto e escutadores de eventos (`addEventListener`).

---

## 🤖 Documentação de Prompts de IA

Em conformidade com as diretrizes de ética digital e originalidade, os seguintes blocos de prompt foram utilizados em assistentes de IA para a co-criação da estrutura lógica do projeto:

### 1. Ideação e Estrutura Semântica (HTML)
> *"Atue como um desenvolvedor Front-End experiente. Preciso da estrutura HTML5 semântica para um site sobre Cidadania Digital e IA. O site deve conter seções para explicar deepfakes, um player para uma ligação fake simulada, um verificador de links, um jogo em fases do tipo quiz, um formulário de coleta de dados comunitários e uma div para um mascote bot de navegação. Não utilize frameworks."*

### 2. Identidade Visual e Flexbox (CSS)
> *"Crie o arquivo style.css para o HTML anterior. Quero uma identidade visual própria e futurista (estilo dark tech/cyberpunk com azul e roxo neon). Utilize Flexbox para alinhar as seções e os botões de alternativas de forma fluida. O mascote do bot deve ficar fixo no canto inferior direito com uma animação suave de flutuação. Adicione Media Queries para que o menu e o bot se adaptem perfeitamente a celulares."*

### 3. Mecânica do Jogo e Manipulação do DOM (JavaScript)
> *"Escreva o script.js para tornar o portal interativo. Desenvolva uma lógica de jogo com um array de objetos contendo 3 fases (perguntas sobre IA). Ao clicar na alternativa, o JS deve validar a resposta, atualizar um placar na tela, enviar uma mensagem personalizada através do mascote bot e carregar a próxima fase dinamicamente sem recarregar a página. Crie também uma função de Modo Escuro que alterne classes no body e um validador de strings para o input de links."*

---

## 📂 Organização dos Arquivos

```text
├── index.html          # Página principal e estrutura semântica
├── README.md           # Documentação completa do projeto
├── css/
│   └── style.css       # Estilização, Flexbox, Animações e Responsividade
├── js/
│   └── script.js       # Lógica do jogo, Validador, Modo Escuro e Bot
└── audio/
    └── ligacao_fake.mp3 # Áudio de simulação para a seção de Engenharia Social
