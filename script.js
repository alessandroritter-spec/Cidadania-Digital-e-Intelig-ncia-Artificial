const dadosJogo = [
    {
        fase: 1,
        pergunta: "Você recebe um vídeo de um candidato confessando um crime, mas os movimentos dos lábios estão dessincronizados do áudio e as piscadas de olhos são artificiais. O que é?",
        opcoes: [
            { texto: "É uma gravação secreta real e confiável.", correta: false },
            { texto: "É um indício clássico de mídia simulada por IA (Deepfake).", correta: true },
            { texto: "É apenas um defeito físico na lente da câmera antiga.", correta: false }
        ],
        dicaMascote: "🤖 CyberGuard: Preste atenção nos detalhes! Falhas de iluminação ao redor da boca costumam denunciar rostos clonados."
    },
    {
        fase: 2,
        pergunta: "Um portal de notícias desconhecido afirma que uma nova lei vai cortar sua internet caso não pague uma taxa digital hoje. O que fazer?",
        opcoes: [
            { texto: "Ignorar a mensagem e verificar em portais jornalísticos oficiais.", correta: true },
            { texto: "Acessar correndo para pagar e evitar o bloqueio.", correta: false },
            { texto: "Compartilhar em todos os grupos de contatos por aviso.", correta: false }
        ],
        dicaMascote: "🤖 CyberGuard: Golpistas criam falsa urgência para fazer você agir pelo medo. Respire e cheque!"
    },
    {
        fase: 3,
        pergunta: "O que caracteriza a 'Cidadania Digital' ativa diante do avanço moderno da Inteligência Artificial?",
        opcoes: [
            { texto: "Acreditar em áudios de encaminhados múltiplos.", correta: false },
            { texto: "Ficar fora da internet para nunca ver conteúdos sintéticos.",  correta: false },
            { texto: "Consumir conteúdo criticamente, checar fontes e responsabilizar-se pelo que compartilha.", correta: true }
        ],
        dicaMascote: "🤖 CyberGuard: Você chegou ao teste final da sua consciência digital. Use suas ferramentas!"
    }
];

let faseAtual = 0;
let pontuacao = 0;
let contadorDenuncias = 24;
let sinteseVoz = window.speechSynthesis;
let expressaoVoz = null;

document.addEventListener("DOMContentLoaded", () => {
    inicializarTema();
    inicializarChatBot();
    inicializarVerificadorLinks();
    inicializarChamadaVoz();
    inicializarGeradorSenha();
    inicializarFormDenuncia();
    renderizarFaseJogo();
});

// Acessibilidade: Modo Escuro
function inicializarTema() {
    const btnTema = document.getElementById("btn-tema");
    btnTema.addEventListener("click", () => {
        if (document.body.getAttribute("data-theme") === "dark") {
            document.body.removeAttribute("data-theme");
            btnTema.textContent = "🌓 Modo Escuro";
        } else {
            document.body.setAttribute("data-theme", "dark");
            btnTema.textContent = "☀️ Modo Claro";
        }
    });
}

// Fale Conosco - Respostas Automatizadas do Bot
function inicializarChatBot() {
    const btnEnviar = document.getElementById("btn-enviar-chat");
    const inputMensagem = document.getElementById("input-mensagem");
    const containerResposta = document.getElementById("resposta-chat");

    const respostasBot = [
        {
            chaves: ["deepfake", "video", "voz", "rostos", "clonagem"],
            resposta: "🤖 CyberGuard: Deepfakes são vídeos ou áudios simulados por IA. Para identificar, repare em piscadas artificiais e ruídos vocais metálicos."
        },
        {
            chaves: ["fake news", "desinformacao", "noticia", "mentira", "falsa"],
            resposta: "🤖 CyberGuard: Notícias falsas automatizadas usam apelo emocional urgente. Sempre consulte canais de checagem confiáveis."
        },
        {
            chaves: ["senha", "proteger", "seguranca", "seguro", "hacker"],
            resposta: "🤖 CyberGuard: Proteja-se gerando senhas complexas na nossa ferramenta abaixo e ative a verificação em duas etapas (2FA)."
        },
        {
            chaves: ["denuncia", "denunciar", "perfil", "reportar"],
            resposta: "🤖 CyberGuard: Use o recurso de denúncia nativo das plataformas sociais e registre o perfil suspeito no nosso formulário no fim da página."
        },
        {
            chaves: ["ola", "oi", "bom dia", "boa tarde", "ajuda"],
            resposta: "🤖 CyberGuard: Olá! Estou aqui para sanar dúvidas sobre segurança digital. Pergunte sobre deepfakes, senhas ou fakes."
        }
    ];

    btnEnviar.addEventListener("click", () => {
        const mensagemUsuario = inputMensagem.value.trim().toLowerCase();
        if (!mensagemUsuario) return;

        containerResposta.className = "resultado valido";
        let respostaEncontrada = null;

        for (let item of respostasBot) {
            if (item.chaves.some(chave => mensagemUsuario.includes(chave))) {
                respostaEncontrada = item.resposta;
                break;
            }
        }

        if (!respostaEncontrada) {
            respostaEncontrada = "🤖 CyberGuard: Não identifiquei essa dúvida. Tente usar termos chaves como 'deepfake', 'senha' ou 'notícia'.";
            containerResposta.className = "resultado invalido";
        }

        containerResposta.textContent = respostaEncontrada;
        containerResposta.classList.remove("hidden");
        alterarTextoMascote(respostaEncontrada);
        inputMensagem.value = "";
    });
}

// Verificador Visual da Galeria
function verificarImagem(ehHumana) {
    const container = document.getElementById("resultado-imagem");
    container.className = "resultado";
    
    if (ehHumana) {
        container.textContent = "🎯 Excelente escolha! A Imagem B mantém micro-texturas orgânicas e fundos simétricos coerentes.";
        container.classList.add("valido");
    } else {
        container.textContent = "❌ Atenção! A Imagem A possui traços gerados sinteticamente por IA.";
        container.classList.add("invalido");
    }
    container.classList.remove("hidden");
}

// Gerador de Senhas
function inicializarGeradorSenha() {
    const btn = document.getElementById("btn-gerar-senha");
    const input = document.getElementById("input-senha-gerada");
    
    btn.addEventListener("click", () => {
        const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_+=";
        let senhaNova = "";
        for (let i = 0; i < 14; i++) {
            senhaNova += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        input.value = senhaNova;
    });
}

// Validador de Denúncias
function inicializarFormDenuncia() {
    const btn = document.getElementById("btn-denunciar");
    const inputPerfil = document.getElementById("input-perfil");
    const containerRes = document.getElementById("resultado-denuncia");
    const numDisplay = document.getElementById("num-denuncias");

    btn.addEventListener("click", () => {
        if (!inputPerfil.value.trim()) return;
        contadorDenuncias++;
        numDisplay.textContent = contadorDenuncias;
        
        containerRes.className = "resultado valido";
        containerRes.textContent = "🚨 Alerta Simulador: Denúncia computada com sucesso no monitoramento!";
        containerRes.classList.remove("hidden");
        inputPerfil.value = "";
    });
}

// Verificador de Links
function inicializarVerificadorLinks() {
    const btnAnalisar = document.getElementById("btn-analisar");
    const inputUrl = document.getElementById("input-url");
    const containerResultado = document.getElementById("resultado-link");

    btnAnalisar.addEventListener("click", () => {
        const url = inputUrl.value.trim().toLowerCase();
        if (!url) return;

        containerResultado.className = "resultado";
        const fraudulento = url.includes("ganhe-gratis") || url.includes("urgente") || !url.startsWith("https://");

        if (fraudulento) {
            containerResultado.textContent = "⚠️ Alerta de Risco! Estrutura maliciosa ou ausência de protocolo seguro (HTTPS).";
            containerResultado.classList.add("invalido");
        } else {
            containerResultado.textContent = "✅ Formato Comum. Mas lembre-se de conferir canais de imprensa oficiais.";
            containerResultado.classList.add("valido");
        }
        containerResultado.classList.remove("hidden");
    });
}

// Simulador de Ligação por Voz IA
function inicializarChamadaVoz() {
    const btnLigar = document.getElementById("btn-ligar");
    const btnDesligar = document.getElementById("btn-desligar");
    const statusChamada = document.getElementById("status-chamada");

    btnLigar.addEventListener("click", () => {
        btnLigar.classList.add("hidden");
        btnDesligar.classList.remove("hidden");
        statusChamada.textContent = "📞 EM LINHA: Clonagem de Voz de Parente...";
        
        const textoDiscurso = "Oi! Sou eu, seu primo. Meu telefone caiu na água e preciso que faça um PIX urgente para mim agora!";
        expressaoVoz = new SpeechSynthesisUtterance(textoDiscurso);
        expressaoVoz.lang = "pt-BR";
        expressaoVoz.rate = 0.85; 
        
        expressaoVoz.onend = () => encerrarChamada();
        sinteseVoz.speak(expressaoVoz);
    });

    btnDesligar.addEventListener("click", () => encerrarChamada());
}

function encerrarChamada() {
    document.getElementById("btn-desligar").classList.add("hidden");
    document.getElementById("btn-ligar").classList.remove("hidden");
    document.getElementById("status-chamada").textContent = "Linha ociosa... Ligação terminada.";
    sinteseVoz.cancel();
}

// Jogo de Fases
function renderizarFaseJogo() {
    const containerConteudo = document.getElementById("conteudo-fase");
    const containerFeedback = document.getElementById("feedback-jogo");
    containerFeedback.classList.add("hidden");

    if (faseAtual >= dadosJogo.length) {
        containerConteudo.innerHTML = `<h4>🎉 Treinamento Concluído!</h4><p>Pontuação final: ${pontuacao} pontos.</p>`;
        return;
    }

