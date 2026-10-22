(() => {
    const CHAVE = 'saveurs_carrinho_v1';
    const moeda = centavos => new Intl.NumberFormat('pt-BR', {
        style: 'currency', currency: 'BRL'
    }).format(centavos / 100);

    function lerCarrinho() {
        try {
            const salvo = JSON.parse(localStorage.getItem(CHAVE) || '[]');
            if (!Array.isArray(salvo)) return [];
            return salvo.filter(item =>
                item && typeof item.id === 'string' &&
                typeof item.nome === 'string' &&
                typeof item.imagem === 'string' &&
                Number.isInteger(item.preco) && item.preco >= 0 &&
                Number.isInteger(item.quantidade) && item.quantidade > 0
            );
        } catch (erro) {
            return [];
        }
    }

    function salvarCarrinho(carrinho) {
        localStorage.setItem(CHAVE, JSON.stringify(carrinho));
        atualizarAtalho();
    }

    function quantidadeTotal(carrinho) {
        return carrinho.reduce((total, item) => total + item.quantidade, 0);
    }

    function atualizarAtalho() {
        const atalho = document.querySelector('.atalho-carrinho');
        if (!atalho) return;
        const quantidade = quantidadeTotal(lerCarrinho());
        atalho.querySelector('.atalho-carrinho-contagem').textContent = quantidade;
        atalho.setAttribute('aria-label', `Ver carrinho com ${quantidade} produto(s)`);
    }

    function iniciarVitrine() {
        const cards = document.querySelectorAll('.promocoes .card-promocao');
        if (!cards.length) return;

        cards.forEach((card, indice) => {
            const imagem = card.querySelector('img');
            const nome = card.querySelector('h3');
            const preco = card.querySelector('.preco');
            if (!imagem || !nome || !preco) return;

            const valor = preco.textContent
                .replace(/[^\d,.]/g, '')
                .replace(/\./g, '')
                .replace(',', '.');
            const precoCentavos = Math.round(Number(valor) * 100);
            if (!Number.isFinite(precoCentavos) || precoCentavos < 0) return;

            const botao = document.createElement('button');
            botao.type = 'button';
            botao.className = 'adicionar-carrinho';
            botao.textContent = '🛒 Adicionar ao carrinho';
            card.appendChild(botao);

            botao.addEventListener('click', () => {
                const carrinho = lerCarrinho();
                const id = `produto-${indice + 1}`;
                const existente = carrinho.find(item => item.id === id);
                if (existente) {
                    existente.quantidade += 1;
                } else {
                    carrinho.push({
                        id,
                        nome: nome.textContent.trim(),
                        imagem: imagem.getAttribute('src'),
                        preco: precoCentavos,
                        quantidade: 1
                    });
                }
                salvarCarrinho(carrinho);
                botao.textContent = '✓ Adicionado!';
                setTimeout(() => { botao.textContent = '🛒 Adicionar ao carrinho'; }, 1000);
            });
        });

        const atalho = document.createElement('a');
        atalho.href = 'carrinho.php';
        atalho.className = 'atalho-carrinho';
        atalho.innerHTML = '<span aria-hidden="true">🛒</span> Meu carrinho <span class="atalho-carrinho-contagem">0</span>';
        document.body.appendChild(atalho);
        atualizarAtalho();
    }

    function escapar(texto) {
        return String(texto).replace(/[&<>"']/g, caractere => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;',
            '"': '&quot;', "'": '&#39;'
        })[caractere]);
    }

    function mudarQuantidade(id, diferenca) {
        const carrinho = lerCarrinho();
        const item = carrinho.find(produto => produto.id === id);
        if (!item) return;
        item.quantidade += diferenca;
        salvarCarrinho(carrinho.filter(produto => produto.quantidade > 0));
        renderizarCarrinho();
    }

    function removerProduto(id) {
        salvarCarrinho(lerCarrinho().filter(produto => produto.id !== id));
        renderizarCarrinho();
    }

    function renderizarCarrinho() {
        const lista = document.getElementById('lista-carrinho');
        if (!lista) return;

        const carrinho = lerCarrinho();
        const vazio = document.getElementById('carrinho-vazio');
        const limpar = document.getElementById('limpar-carrinho');
        const quantidade = quantidadeTotal(carrinho);
        const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

        vazio.hidden = carrinho.length > 0;
        limpar.disabled = carrinho.length === 0;
        document.getElementById('contagem-carrinho').textContent = quantidade;
        document.getElementById('resumo-quantidade').textContent = quantidade;
        document.getElementById('resumo-subtotal').textContent = moeda(total);
        document.getElementById('resumo-total').textContent = moeda(total);
        lista.replaceChildren();

        carrinho.forEach(item => {
            const elemento = document.createElement('article');
            elemento.className = 'cart-item';
            elemento.innerHTML = `
                <div class="cart-foto"><img src="${escapar(item.imagem)}" alt="${escapar(item.nome)}"></div>
                <div class="cart-detalhes">
                    <h3>${escapar(item.nome)}</h3>
                    <p>Preço unitário: ${moeda(item.preco)}</p>
                    <button type="button" class="cart-remover">Remover produto</button>
                </div>
                <div class="cart-acoes">
                    <div class="cart-quantidade" aria-label="Quantidade de ${escapar(item.nome)}">
                        <button type="button" class="cart-menos" aria-label="Diminuir quantidade">−</button>
                        <span>${item.quantidade}</span>
                        <button type="button" class="cart-mais" aria-label="Aumentar quantidade">+</button>
                    </div>
                    <strong class="cart-subtotal">${moeda(item.preco * item.quantidade)}</strong>
                </div>
            `;
            elemento.querySelector('.cart-menos').addEventListener('click', () => mudarQuantidade(item.id, -1));
            elemento.querySelector('.cart-mais').addEventListener('click', () => mudarQuantidade(item.id, 1));
            elemento.querySelector('.cart-remover').addEventListener('click', () => removerProduto(item.id));
            lista.appendChild(elemento);
        });
    }

    function iniciarPaginaCarrinho() {
        const limpar = document.getElementById('limpar-carrinho');
        if (!limpar) return;
        limpar.addEventListener('click', () => {
            salvarCarrinho([]);
            renderizarCarrinho();
        });
        renderizarCarrinho();
    }

    iniciarVitrine();
    iniciarPaginaCarrinho();
})();