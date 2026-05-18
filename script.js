/**
 * Alterna a visualização entre as duas abas principais da plataforma.
 * @param {string} tabId - O ID da aba que será exibida ('visao-geral' ou 'painel-fluxo')
 */
function switchTab(tabId) {
    const tabVisaoGeral = document.getElementById('tab-visao-geral');
    const tabPainelFluxo = document.getElementById('tab-painel-fluxo');
    const btnVisaoGeral = document.getElementById('btn-visao-geral');
    const btnPainelFluxo = document.getElementById('btn-painel-fluxo');

    if (tabId === 'visao-geral') {
        tabVisaoGeral.classList.remove('hidden');
        tabPainelFluxo.classList.add('hidden');
        
        btnVisaoGeral.className = "px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20";
        btnPainelFluxo.className = "px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-slate-800 text-slate-400 hover:text-slate-200";
    } else {
        tabVisaoGeral.classList.add('hidden');
        tabPainelFluxo.classList.remove('hidden');
        
        btnVisaoGeral.className = "px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-slate-800 text-slate-400 hover:text-slate-200";
        btnPainelFluxo.className = "px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20";
    }
}

// Mapa contendo o detalhamento técnico para cada etapa do pipeline
const detailsMap = {
    captura: {
        title: "01. Câmera do Smartphone Android (Edge Processing)",
        text: "Utiliza os recursos nativos de hardware da câmera de dispositivos móveis de entrada. Em vez de depender de sistemas caros instalados em computadores robustos locais, o operador de portaria necessita apenas de um smartphone simples para capturar o fluxo de imagens dos caminhões. Isso reduz em quase 90% o custo de investimento em infraestrutura operacional para a cooperativa."
    },
    ocr: {
        title: "02. Processamento Local OCR (Google ML Kit)",
        text: "O reconhecimento de caracteres (leitura de placas) é feito diretamente na ponta (Edge Computing) por meio de visão computacional embarcada no celular. Isso significa que as imagens capturadas não são enviadas brutas para servidores remotos para processamento. Esta escolha de design economiza largura de banda de dados móveis (4G) e preserva a privacidade e conformidade com boas práticas de proteção de dados."
    },
    contingencia: {
        title: "03. Fila Local Offline (Resiliência SRE)",
        text: "Uma das principais premissas de DevOps é antecipar a falha. Se o sinal de internet cair no pátio periférico de triagem, o aplicativo armazena todos os registros das placas analisadas e cadastros manuais de emergência em um cache local estável (SQLite embarcado). Assim, as entradas de caminhões não são paralisadas e nenhum dado é perdido, garantindo alta disponibilidade da portaria."
    },
    firebase: {
        title: "04. Sincronização em Nuvem (Firebase Realtime Cloud DB)",
        text: "Assim que a integridade da rede é restabelecida, o mecanismo interno de monitoramento de status de conexão do aplicativo identifica o canal online e dispara de forma assíncrona um pipeline de sincronização. Os dados armazenados localmente são transmitidos para o banco de dados Firebase na nuvem, atualizando os dashboards administrativos instantaneamente de forma segura e transparente."
    }
};

/**
 * Atualiza dinamicamente o painel informativo com as regras DevOps da etapa selecionada.
 * @param {string} key - A chave correspondente à etapa clicada no HTML
 */
function showDetail(key) {
    const detailContainer = document.getElementById('technical-details');
    const titleElem = document.getElementById('details-title');
    const textElem = document.getElementById('details-text');

    titleElem.textContent = detailsMap[key].title;
    textElem.textContent = detailsMap[key].text;

    detailContainer.classList.add('scale-[1.01]', 'border-indigo-500/50', 'bg-indigo-950/40');
    setTimeout(() => {
        detailContainer.classList.remove('scale-[1.01]', 'border-indigo-500/50', 'bg-indigo-950/40');
    }, 300);
}