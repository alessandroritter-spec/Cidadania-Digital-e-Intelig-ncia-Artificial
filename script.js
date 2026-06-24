/* ==========================================================================
   1. SISTEMA DO JOGO COM VÁRIAS FASES (QUIZ ANTI-DESINFORMAÇÃO)
   ========================================================================== */
// Banco de dados das fases do jogo
const bancoFases = [
    {
        titulo: "Fase 1: O Vídeo do Político",
        descricao: "Você recebeu um vídeo de um candidato confessando um crime na véspera da eleição. O movimento da boca parece levemente borrado e ele não pisca os olhos. O que você faz?",
        alternativas: [
            { texto: "Compartilho imediatamente nos grupos para alertar todo mundo.", correta: false, feedback: "Errado! Isso espalha desinformação. Rostos que não piscam ou borrões são sinais clássicos de Deepfake." },
            { texto: "Não compartilho e procuro em portais de checagem confiáveis.", correta: true, feedback: "Excelente! Você agiu como um verdadeiro cidadão digital." }
        ]
    },
    {
        titulo: "Fase 2: A Ligação de Emergência",
        descricao: "Seu telefone toca. Uma voz idêntica à do seu irmão diz que ele sofreu um acidente e precisa de um Pix urgente. O áudio está meio robótico ao fundo. Qual sua ação?",
        alternativas: [
            { texto: "Faço o Pix correndo para ajudar o mais rápido possível.", correta: false, feedback: "Perigo! Golpistas usam clonagem de voz por IA. Sempre desligue e ligue de volta para o número oficial do seu parente." },
            { texto: "Desligo e ligo diretamente para o número do meu irmão para confirmar.", correta: true, feedback: "Perfeito! Quebrar o canal de comunicação impede os golpes de clonagem de voz por IA." }
        ]
    },
    {
        titulo: "Fase 3: A Notícia do Super Desconto",
        descricao: "Um site idêntico a um grande portal de e-commerce anuncia que, graças à IA deles, qualquer celular sai por R$ 50. A URL do site termina em '.net.ru/promocao'. É confiável?",
        alternativas: [
            { texto: "Com certeza, o design do site é idêntico ao original!", correta: false, feedback: "Cuidado! Clonar a identidade visual de um site com IA é facílimo. O segredo está em olhar o link esquisito." },
            { texto: "Falso. Domínios estranhos e preços milagrosos indicam Phishing.", correta: true, feedback: "Incrível! Você concluiu o treinamento com sucesso!" }
        ]
    }
];

let faseAtual = 0;
let pontuacao = 0;

function processarResposta(ehCorreta) {
    const faseDados = bancoFases[faseAtual];
    
    if (ehCorreta) {
        pontuacao += 10;
        document.getElementById('pontuacao').innerText = pontuacao;
        atualizarMascote("🎉 Muito bem! Você acertou em cheio!");
    } else {
        atualizarMascote("⚠️ Cuidado! Esse é um truque comum da IA maliciosa.");
    }
    
    alert(ehCorreta ? "Correto! \n\n" + faseDados.alternativas[1].feedback : "Aviso! \n\n" + faseDados.alternativas[0].feedback);

    // Avançar de fase
    faseAtual++;
    if (faseAtual < bancoFases.length) {
        carregarFase();
    } else {
        // Fim do Jogo
        document.getElementById('container-fases').innerHTML = `
            <div class="card-fase" style="text-align: center;">
                <h3>🏆 Treinamento Concluído!</h3>
                <p>Sua pontuação final foi de <strong>${pontuacao}</strong> pontos.</p>
                <button onclick="reiniciarJogo()">Jogar Novamente</button>
            </div>
        `;
        atualizarMascote("Parabéns! Você concluiu todas as fases e está protegido contra as fraudes de IA!");
    }
}

function carregarFase() {
    const faseDados = bancoFases[faseAtual];
    document.getElementById('fase-atual').innerText = faseAtual + 1;
    document.getElementById('titulo-fase').innerText = faseDados.titulo;
    document.getElementById('descricao-fase').innerText = faseDados.descricao;
    
    const containerAlternativas = document.querySelector('.alternativas');
    containerAlternativas.innerHTML = ''; // Limpa anteriores
    
    faseDados.alternativas.forEach(alt => {
        const btn = document.createElement('button');
        btn.className = 'btn-alternativa';
        btn.innerText = alt.texto;
        btn.onclick = () => processarResposta(alt.correta);
        containerAlternativas.appendChild(btn);
    });
}

function reiniciarJogo() {
    faseAtual = 0;
    pontuacao = 0;
    document.getElementById('pontuacao').innerText = "0";
    // Restaura a estrutura inicial do HTML do jogo
    document.getElementById('container-fases').innerHTML = `
        <div class="card-fase">
            <h3 id="titulo-fase"></h3>
            <p id="descricao-fase"></p>
            <div class="alternativas"></div>
        </div>
    `;
    carregarFase();
}

/* ==========================================================================
   2. VERIFICADOR DINÂMICO DE LINKS (DOMÍNIOS SUSPEITOS)
   ========================================================================== */
document.getElementById('btn-verificar').addEventListener('click', function() {
    const urlDigitada = document.getElementById('input-url').value.trim();
    const resultadoDiv = document.getElementById('resultado-verificacao');
    
    if (!urlDigitada) {
        alert("Por favor, digite ou cole um link primeiro!");
        return;
    }
    
    resultadoDiv.classList.remove('hidden');
    
    // Algoritmo simples de análise de segurança de string (Critério Nível 4)
    const ehSuspeito = urlDigitada.includes('.ru') || 
                       urlDigitada.includes('.tk') || 
                       urlDigitada.includes('promocao') || 
                       urlDigitada.includes('ganhe-gratis') ||
                       !urlDigitada.startsWith('https://');

    if (ehSuspeito) {
        resultadoDiv.className = "perigo";
        resultadoDiv.innerHTML = "❌ ALERTA: Este link possui padrões fortemente associados a golpes de Phishing ou Desinformação automatizada.";
        atualizarMascote("Atenção! Esse link parece malicioso. Não clique!");
    } else {
        resultadoDiv.className = "seguro";
        resultadoDiv.innerHTML = "✅ ESTRUTURA PADRÃO: O domínio parece usar formatos comuns de segurança (HTTPS), mas lembre-se de conferir se o nome oficial está correto.";
        atualizarMascote("O formato do link parece ok, mas fique sempre atento à fonte!");
    }
});

/* ==========================================================================
   3. ACESSIBILIDADE (MODO ESCURO / CLARO)
   ========================================================================== */
function toggleModoEscuro() {
    document.body.classList.toggle('modo-claro');
    const botao = document.getElementById('btn-acessibilidade');
    if(document.body.classList.contains('modo-claro')) {
        botao.innerText = "Mudar Tema 🌙";
    } else {
        botao.innerText = "Mudar Tema 🌓";
    }
}

/* ==========================================================================
   4. SISTEMA DO MASCOTE (CYBERGUARD)
   ========================================================================== */
function atualizarMascote(mensagem) {
    document.getElementById('texto-bot').innerHTML = mensagem;
}

// Configura o formulário para simular o envio de estatísticas sem recarregar a página
document.getElementById('form-pesquisa').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    alert(`Obrigado, ${nome}! Seus dados de percepção comunitária foram guardados para o nosso relatório.`);
    atualizarMascote("Obrigado por enviar o formulário! Isso nos ajuda a combater a desinformação local.");
    this.reset();
});

// Inicializar o jogo assim que a página abrir
window.onload = () => {
    carregarFase();
};
