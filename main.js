function irPara(indice) {
            const trilho = document.getElementById('trilho');
            const pontos = document.querySelectorAll('.ponto-tempo');
            
            // 1. Move o carrossel
            trilho.style.transform = `translateX(${-indice * 100}%)`;
            
            // 2. Atualiza a cor do ano na linha do tempo
            pontos.forEach(p => p.classList.remove('ativo'));
            pontos[indice].classList.add('ativo');
        }