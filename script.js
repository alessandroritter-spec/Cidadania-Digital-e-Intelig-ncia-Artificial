// Dados do Jogo de Fases
const dadosJogo = [
    {
        fase: 1,
        pergunta: "Você recebe um vídeo de um candidato político confessando um crime, mas os movimentos dos lábios dele parecem levemente dessincronizados do áudio e os olhos piscam de forma artificial. O que é mais provável?",
        opcoes: [
            { texto: "É uma gravação secreta real e 100% confiável.", correta: false },
            { texto: "É um indício clássico de mídia gerada por IA (Deepfake).", correta: true },
            { texto: "É apenas um problema técnico na câmera do celular.", correta: false }
        ],
        dicaMascote: "🤖 CyberGuard diz: Preste atenção nos detalhes! Falhas de iluminação ao redor dos olhos e boca costumam denunciar rostos clonados eletronicamente."
    },
    {
        fase: 2,
        pergunta: "Um portal de notícias desconhecido afirma que uma nova lei cancelará todas as contas de internet que não pagarem uma taxa extra de segurança digital hoje. Qual o procedimento seguro?",
        opcoes: [
            { texto: "Ignorar a mensagem e verificar em portais jornalísticos consolidados.", correta: true },
            { texto: "Acessar correndo para pagar antes que sua internet caia.", correta: false },
            { texto: "Compartilhar imediatamente em todos os grupos de amigos.", correta: false }
        ],
        dicaMascote: "🤖 CyberGuard diz: Golpistas criam situações de urgência artificial para fazer você agir pelo impulso e pelo medo. Respire e cheque!"
    },
    {
        fase: 3,
        pergunta: "O que caracteriza a 'Cidadania Digital' ativa diante do ecossistema moderno da Inteligência Artificial?",
        opcoes: [
            { texto: "Acreditar em todos os áudios recebidos por aplicativos de mensagens.", correta: false },
            { texto: "Não usar a internet para evitar cair em mentiras automatizadas.",  correta: false },
            { texto: "Consumir conteúdo criticamente, checar fontes e responsabilizar-se pelo que compartilha.", correta: true }
        ],
        dicaMascote: "🤖 CyberGuard diz: Você chegou ao teste final da sua consciência digital. Use suas ferramentas!"
    }
];

// Estado do Aplicativo
let faseAtual = 0;
let pontuacao = 0;
let sinteseVoz = window.speechSynthesis;
let expressaoVoz = null;

// Inicializadores de Eventos no carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    inicializarTema();
    inicializarVerificadorLinks();
    inicializarChamadaVoz();
    renderizarFaseJogo();
});

// 1. Controle de Modo Escuro (Manipulação de DOM / Acessibilidade)
function inicializarTema() {
    const btnTema = document.getElementById("btn-tema");
    btnTema.addEventListener("click", () => {
        const temaAtual = document.body.getAttribute("data-theme");
        if (temaAtual === "dark") {
            document.body.removeAttribute("data-theme");
            btnTema.textContent = "🌓 Modo Escuro";
        } else {
            document.body.setAttribute("data-theme", "dark");
            btnTema.textContent = "☀️ Modo Claro";
        }
    });
}

// 2. Sistema de Verificação de Links
function inicializarVerificadorLinks() {
    const btnAnalisar = document.getElementById("btn-analisar");
    const inputUrl = document.getElementById("input-url");
    const containerResultado = document.getElementById("resultado-link");

    btnAnalisar.addEventListener("click", () => {
        const url = inputUrl.value.trim().toLowerCase();
        if (!url) return;

        containerResultado.className = "resultado"; // Limpa estados anteriores
        
        // Regras simples de validação demonstrativa para segurança
        const contemSubdominioSuspeito = url.includes("ganhe-gratis") || url.includes("promocao-urgente") || url.includes("atualize-sua-senha");
        const naoTemHttps = !url.startsWith("https://");

        if (contemSubdominioSuspeito || naoTemHttps) {
            containerResultado.textContent = "⚠️ Alerta de Risco! Este link possui padrões de engenharia social (URLs alarmistas ou ausência de protocolo seguro HTTPS). Não insira dados corporativos ou pessoais.";
            containerResultado.classList.add("invalido");
            alterarTextoMascote("🤖 CyberGuard: Detectei riscos nessa URL! Links falsificados simulam portais reais mudando apenas uma letra.");
        } else {
            containerResultado.textContent = "✅ Estrutura Inicial Comum. Contudo, lembre-se: mesmo links HTTPS podem abrigar fraudes de desinformação. Sempre valide a identidade do site oficial.";
            containerResultado.classList.add("valido");
            alterarTextoMascote("🤖 CyberGuard: O formato básico parece padrão, mas mantenha-se vigilante sobre o remetente!");
        }
    });
}

// 3. Simulador de Áudio Fake (Ligação com Clonagem de Voz por IA)
function inicializarChamadaVoz() {
    const btnLigar = document.getElementById("btn-ligar");
    const btnDesligar = document.getElementById("btn-desligar");
    const statusChamada = document.getElementById("status-chamada");

    btnLigar.addEventListener("click", () => {
        btnLigar.classList.add("hidden");
        btnDesligar.classList.remove("hidden");
        statusChamada.textContent = "📞 EM LINHA COM: 'Seu Parente' (Voz Sintética)...";
        
        alterarTextoMascote("🤖 CyberGuard Alerta: Perceba a fala levemente robótica, sem respiração natural ou pausas humanas legítimas. Isto é engenharia social baseada em IA!");

        // Executa a voz simulada usando Web Speech API
        const textoDiscurso = "Oi! Sou eu, seu primo. Eu quebrei o meu celular e estou usando esse número provisório. Preciso que você faça uma transferência urgente para pagar o guincho do carro agora! Posso te passar a chave?";
        expressaoVoz = new SpeechSynthesisUtterance(textoDiscurso);
        expressaoVoz.lang = "pt-BR";
        expressaoVoz.rate = 0.9; // Deixa o tom ligeiramente artificial
        
        expressaoVoz.onend = () => encerrarChamada();
        sinteseVoz.speak(expressaoVoz);
    });

    btnDesligar.addEventListener("click", () => encerrarChamada());
}

function encerrarChamada() {
    const btnLigar = document.getElementById("btn-ligar");
    const btnDesligar = document.getElementById("btn-desligar");
    const statusChamada = document.getElementById("status-chamada");

    sinteseVoz.cancel();
    btnDesligar.classList.add("hidden");
    btnLigar.classList.remove("hidden");
    statusChamada.textContent = "Linha ociosa... Ligação terminada.";
}

// 4. Mecânica de Jogo em Fases Compartilhadas
function renderizarFaseJogo() {
    const containerConteudo = document.getElementById("conteudo-fase");
    const containerFeedback = document.getElementById("feedback-jogo");
    
    containerFeedback.classList.add("hidden");

    if (faseAtual >= dadosJogo.length) {
        containerConteudo.innerHTML = `<h4>🎉 Parabéns! Você completou o treinamento básico!</h4><p>Sua pontuação final de cidadão consciente foi de ${pontuacao} pontos.</p>`;
        alterarTextoMascote("🤖 CyberGuard: Incrível! Você demonstrou conhecimento sólido contra as ameaças de manipulação midiática contemporâneas!");
        return;
    }

    const dadosFase = dadosJogo[faseAtual];
    document.getElementById("fase-atual").textContent = dadosFase.fase;

    let htmlOpcoes = "";
    dadosFase.opcoes.forEach((opcao, indice) => {
        htmlOpcoes += `<button class="btn-opcao" onclick="validarRespostaJogo(${indice})">${opcao.texto}</button>`;
    });

    containerConteudo.innerHTML = `
        <p class="pergunta-texto"><strong>Desafio:</strong> ${dadosFase.pergunta}</p>
        <div class="opcoes-container">${htmlOpcoes}</div>
    `;
    
    alterarTextoMascote(dadosFase.dicaMascote);
}

function validarRespostaJogo(indiceSelecionado) {
    const containerFeedback = document.getElementById("feedback-jogo");
    const dadosFase = dadosJogo[faseAtual];
    const correta = dadosFase.opcoes[indiceSelecionado].correta;

    containerFeedback.className = "resultado";

    if (correta) {
        pontuacao += 10;
        document.getElementById("points").textContent = pontuacao;
        containerFeedback.textContent = "🎯 Resposta Correta! Você identificou os critérios de segurança digital.";
        containerFeedback.classList.add("valido");
    } else {
        containerFeedback.textContent = "❌ Resposta Incorreta! Esse comportamento propaga a desinformação ou expõe você a perigos virtuais.";
        containerFeedback.classList.add("invalido");
    }

    containerFeedback.classList.remove("hidden");
    
    // Avança de fase de forma controlada por tempo para leitura do feedback
    faseAtual++;
    setTimeout(renderizarFaseJogo, 4000);
}

// 5. Auxiliares Dinâmicos do Mascote
function alterarTextoMascote(novoTexto) {
    document.getElementById("texto-mascote").textContent = novoTexto;
}
