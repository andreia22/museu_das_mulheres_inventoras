let seletorIndice = 0;
let toqueInicialX = 0;
let toqueFinalX = 0;

// Função principal para mudar de slide
function irPara(indice) {
    const trilho = document.getElementById('trilho');
    const pontos = document.querySelectorAll('.ponto-tempo');
    const totalCards = document.querySelectorAll('.card-inventora').length;

    // Impede que o índice saia dos limites
    if (indice < 0) indice = 0;
    if (indice >= totalCards) indice = totalCards - 1;

    seletorIndice = indice;

    // Move o trilho (Carrossel)
    trilho.style.transform = `translateX(${-seletorIndice * 100}%)`;

    // Atualiza a barra de anos (Destaque)
    pontos.forEach(p => p.classList.remove('ativo'));
    if (pontos[seletorIndice]) {
        pontos[seletorIndice].classList.add('ativo');

        // Faz a barra de anos deslizar sozinha para o ano ativo aparecer
        const nav = document.querySelector('.nav-timeline');
        const pontoAtivo = pontos[seletorIndice];
        nav.scrollTo({
            left: pontoAtivo.offsetLeft - (nav.offsetWidth / 2) + (pontoAtivo.offsetWidth / 2),
            behavior: 'smooth'
        });
    }
}

// --- DETECÇÃO DE TOQUE (SWIPE) ---
const container = document.querySelector('.container-museu');

container.addEventListener('touchstart', (e) => {
    toqueInicialX = e.touches[0].clientX;
}, { passive: true });

container.addEventListener('touchend', (e) => {
    toqueFinalX = e.changedTouches[0].clientX;

    const diffX = toqueInicialX - toqueFinalX;
    const sensibilidade = 50; // distância mínima do dedo

    if (Math.abs(diffX) > sensibilidade) {
        if (diffX > 0) {
            // Deslizou para a esquerda -> Próximo
            irPara(seletorIndice + 1);
        } else {
            // Deslizou para a direita -> Anterior
            irPara(seletorIndice - 1);
        }
    }
}, { passive: true });