// ==========================================
// 1. GERENCIAMENTO DE TEMA (MODO ESCURO)
// ==========================================
function toggleModoEscuro() {
    document.body.classList.toggle('dark-mode');
    
    // Salva a preferência do usuário no navegador
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Aplica o tema salvo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    // Inicializa o jogo ao carregar a página
    carregarFase();
});


// ==========================================
// 2. VERIFICADOR INSTANTÂNEO DE LINKS
// ==========================================
const btnVerificar = document.getElementById('btn-verificar');
const inputUrl = document.getElementById('input-url');
const resultadoVerificacao = document.getElementById('resultado-verificacao');

btnVerificar.addEventListener('click', () => {
    const urlText = inputUrl.value.trim();
    
    if (!urlText) {
        exibirResultado("Por favor, insira uma URL para analisar.", "aviso");
        return;
    }

    resultadoVerificacao.classList.remove('hidden');
    
    // Termos comuns usados em links maliciosos ou falsos
    const termosSuspeitos = ['ganhe', 'premios', 'vagas-urgentes', 'promocao', 'desconto-exclusivo', 'atualize-sua-conta'];
    const possuiTermoSuspeito = termosSuspeitos.some(termo => urlText.toLowerCase().includes(termo));
    
    // Validação simplificada de domínios confiáveis comuns no Brasil
    const dominiosConfiaveis = ['.gov.br', '.edu.br', '://globo.com', 'uol.com.br', 'estadao.com.br'];
    const ehConfiavel = dominiosConfiaveis.some(dominio => urlText.toLowerCase().includes(dominio));

    if (possuiTermoSuspeito && !ehConfiavel) {
        exibirResultado("⚠ Alta probabilidade de golpe ou desinformação. O link usa termos alarmistas ou falsos.", "perigo");
        atualizarTextoBot("Cuidado! Esse link parece suspeito. Não compartilhe seus dados.");
    } else if (ehConfiavel) {
        exibirResultado("✓ Este link parece pertencer a um domínio institucional ou de mídia reconhecida.", "sucesso");
        atualizarTextoBot("Esse domínio parece seguro, mas sempre cheque o conteúdo da notícia!");
    } else {
        exibirResultado("⚡ Atenção: Domínio desconhecido. Verifique a fonte em canais oficiais antes de clicar.", "alerta");
    }
});

function exibirResultado(mensagem, classe) {
    resultadoVerificacao.className = `resultado-box ${classe}`;
    resultadoVerificacao.innerHTML = `<p>${mensagem}</p>`;
}


// ==========================================
// 3. JOGO: MISSÃO MÍDIA SEGURA
// ==========================================
const fasesJogo = [
    {
        titulo: "O Vídeo do Prefeito",
        descricao: "Você recebeu um vídeo do prefeito da sua cidade anunciando feriado na próxima segunda-feira. A boca dele se move de forma desalinhada com o áudio e ele não pisca os olhos nenhuma vez. O que é?",
        alternativas: [
            { texto: "Vídeo Real", correta: false },
            { texto: "Deepfake / Gerado por IA", correta: true }
        ],
        justificativa: "Movimentos faciais artificiais e a falta de piscadas são sinais clássicos de Deepfakes de vídeo."
    },
    {
        titulo: "A Imagem Espacial",
        descricao: "Uma foto da NASA mostra uma nova galáxia perfeitamente simétrica, com cores ultra saturadas em formato de coração. As estrelas ao fundo parecem derreter nas bordas. O que é?",
        alternativas: [
            { texto: "Imagem Real da NASA", correta: false },
            { texto: "Imagem Gerada por IA", correta: true }
        ],
        justificativa: "As IAs costumam criar padrões simétricos perfeitos demais ou apresentar distorções bizarras ('derretimentos') em detalhes de fundo."
    },
    {
        titulo: "O Áudio do WhatsApp",
        descricao: "Seu tio enviou um áudio encaminhado muitas vezes. O locutor afirma, sem citar fontes oficiais, que um ingrediente de um alimento famoso foi proibido por causar mutações genéticas. O que é?",
        alternativas: [
            { texto: "Notícia Falsa / Desinformação", correta: true },
            { texto: "Notícia Real", correta: false }
        ],
        justificativa: "Mensagens alarmistas, sem fontes oficiais, cheias de teorias conspiratórias e muito encaminhadas são características de Fake News."
    }
];

let faseAtualIndex = 0;
let pontuacao = 0;

const elFaseAtual = document.getElementById('fase-atual');
const elPontuacao = document.getElementById('pontuacao');
const elTituloFase = document.getElementById('titulo-fase');
const elDescricaoFase = document.getElementById('descricao-fase');
const containerAlternativas = document.querySelector('.alternativas');

function carregarFase() {
    if (faseAtualIndex >= fasesJogo.length) {
        finalizarJogo();
        return;
    }

    const fase = fasesJogo[faseAtualIndex];
    elFaseAtual.textContent = faseAtualIndex + 1;
    elTituloFase.textContent = fase.titulo;
    elDescricaoFase.textContent = fase.descricao;
    
    containerAlternativas.innerHTML = '';

    fase.alternativas.forEach(alt => {
        const botao = document.createElement('button');
        botao.textContent = alt.texto;
        botao.classList.add('btn-alternativa');
        botao.addEventListener('click', () => verificarResposta(alt.correta, fase.justificativa));
        containerAlternativas.appendChild(botao);
    });
}

function verificarResposta(ehCorreta, justificativa) {
    // Desabilita os botões após a escolha
    const botoes = containerAlternativas.querySelectorAll('button');
    botoes.forEach(b => b.disabled = true);

    if (ehCorreta) {
        pontuacao += 10;
        elPontuacao.textContent = pontuacao;
        atualizarTextoBot("Muito bem! Você acertou.");
        alert(`Correto! 🎉\n\n${justificativa}`);
    } else {
        atualizarTextoBot("Ih, essa você errou. Preste mais atenção aos detalhes!");
        alert(`Incorreto... ❌\n\n${justificativa}`);
    }

    faseAtualIndex++;
    setTimeout(carregarFase, 1000);
}

function finalizarJogo() {
    elTituloFase.textContent = "Missão Concluída! 🏆";
    elDescricaoFase.textContent = `Parabéns por finalizar o desafio! Sua pontuação final foi de ${pontuacao} pontos.`;
    containerAlternativas.innerHTML = '<button onclick="reiniciarJogo()" class="btn-reiniciar">Jogar Novamente</button>';
    atualizarTextoBot(`Você terminou o jogo com ${pontuacao} pontos! Excelente esforço.`);
}

function reiniciarJogo() {
    faseAtualIndex = 0;
    pontuacao = 0;
    elPontuacao.textContent = pontuacao;
    carregarFase();
}


// ==========================================
// 4. FORMULÁRIO DE CONSCIENTIZAÇÃO
// ==========================================
const formPesquisa = document.getElementById('form-pesquisa');

formPesquisa.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const experiencia = document.getElementById('experiencia').value;

    if(nome && experiencia) {
        atualizarTextoBot(`Obrigado pelo envio, ${nome}! Seus dados ajudam a fortalecer nossa comunidade.`);
        alert("Dados enviados com sucesso! Obrigado por colaborar com a pesquisa comunitária.");
        formPesquisa.reset();
    }
});


// ==========================================
// 5. INTERAÇÃO DINÂMICA DO MASCOTE (CYBERGUARD)
// ==========================================
function atualizarTextoBot(texto) {
    const textoBot = document.getElementById('texto-bot');
    textoBot.textContent = texto;
}
