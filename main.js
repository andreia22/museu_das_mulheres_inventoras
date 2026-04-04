let seletorIndice = 0;
let toqueInicialX = 0;
let toqueFinalX = 0;

function irPara(indice) {
    seletorIndice = indice; // Atualiza o rastreador
    const trilho = document.getElementById('trilho');
    const pontos = document.querySelectorAll('.ponto-tempo');

    // Move o carrossel
    trilho.style.transform = `translateX(${-indice * 100}%)`;

    // Atualiza a cor do ano
    pontos.forEach(p => p.classList.remove('ativo'));
    pontos[indice].classList.add('ativo');

    // Scroll suave da barra de anos para o ano ativo não sumir
    const nav = document.querySelector('.nav-timeline');
    const pontoAtivo = pontos[indice];
    if (nav && pontoAtivo) {
        nav.scrollTo({
            left: pontoAtivo.offsetLeft - (nav.offsetWidth / 2) + (pontoAtivo.offsetWidth / 2),
            behavior: 'smooth'
        });
    }
}

// --- LÓGICA PARA DESLIZAR COM O DEDO ---

const container = document.querySelector('.container-museu');
const totalCards = document.querySelectorAll('.card-inventora').length;

container.addEventListener('touchstart', e => {
    toqueInicialX = e.changedTouches[0].screenX;
}, { passive: true });

container.addEventListener('touchend', e => {
    toqueFinalX = e.changedTouches[0].screenX;
    verificarDeslize();
}, { passive: true });

function verificarDeslize() {
    const sensibilidade = 50; // pixels mínimos para considerar um deslize

    if (toqueInicialX - toqueFinalX > sensibilidade) {
        // Deslizou para a ESQUERDA (Próximo)
        if (seletorIndice < totalCards - 1) {
            irPara(seletorIndice + 1);
        }
    }

    if (toqueFinalX - toqueInicialX > sensibilidade) {
        // Deslizou para a DIREITA (Anterior)
        if (seletorIndice > 0) {
            irPara(seletorIndice - 1);
        }
    }
}