/* ===== Carrinho do mercado (front-end, usa localStorage) ===== */
const CHAVE_CARRINHO = 'carrinho_mercado';

const formatarMoeda = (v) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function lerCarrinho() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
    } catch (e) {
        return [];
    }
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
    atualizarContador();
}

function totalCarrinho(carrinho = lerCarrinho()) {
    return carrinho.reduce((soma, i) => soma + i.preco * i.qtd, 0);
}

function adicionarAoCarrinho(item) {
    const carrinho = lerCarrinho();
    const existente = carrinho.find((i) => i.id === item.id);
    if (existente) {
        existente.qtd += 1;
    } else {
        carrinho.push({ ...item, qtd: 1 });
    }
    salvarCarrinho(carrinho);
}

function alterarQuantidade(id, delta) {
    const carrinho = lerCarrinho();
    const item = carrinho.find((i) => i.id === id);
    if (!item) return;
    item.qtd += delta;
    const resultado = item.qtd <= 0 ? carrinho.filter((i) => i.id !== id) : carrinho;
    salvarCarrinho(resultado);
    renderizarCarrinho();
}

function removerDoCarrinho(id) {
    salvarCarrinho(lerCarrinho().filter((i) => i.id !== id));
    renderizarCarrinho();
}

function limparCarrinho() {
    salvarCarrinho([]);
    renderizarCarrinho();
}

/* Contador no cabeçalho: <span class="contador-carrinho"></span> */
function atualizarContador() {
    const qtd = lerCarrinho().reduce((s, i) => s + i.qtd, 0);
    document.querySelectorAll('.contador-carrinho').forEach((el) => {
        el.textContent = qtd;
    });
}

/* Botões "Adicionar ao carrinho" da vitrine */
function ligarBotoesAdicionar() {
    document.querySelectorAll('.btn-add').forEach((botao) => {
        botao.addEventListener('click', () => {
            const card = botao.closest('.produto');
            const img = card.querySelector('img');
            adicionarAoCarrinho({
                id: card.dataset.id,
                nome: card.dataset.nome,
                preco: parseFloat(card.dataset.preco),
                img: img ? img.getAttribute('src') : '',
            });
            const textoOriginal = botao.textContent;
            botao.textContent = 'Adicionado ✓';
            botao.disabled = true;
            setTimeout(() => {
                botao.textContent = textoOriginal;
                botao.disabled = false;
            }, 900);
        });
    });
}

/* Desenha a lista na página carrinho.php */
function renderizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    if (!lista) return;

    const carrinho = lerCarrinho();
    const vazio = document.getElementById('carrinho-vazio');
    const conteudo = document.getElementById('carrinho-conteudo');

    if (carrinho.length === 0) {
        vazio.hidden = false;
        conteudo.hidden = true;
        return;
    }
    vazio.hidden = true;
    conteudo.hidden = false;

    lista.innerHTML = '';
    carrinho.forEach((item) => {
        const linha = document.createElement('div');
        linha.className = 'item-carrinho';

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.nome;

        const info = document.createElement('div');
        info.className = 'item-info';
        const nome = document.createElement('strong');
        nome.textContent = item.nome;
        const unit = document.createElement('span');
        unit.textContent = formatarMoeda(item.preco) + ' / un.';
        info.append(nome, unit);

        const qtd = document.createElement('div');
        qtd.className = 'item-qtd';
        const menos = document.createElement('button');
        menos.type = 'button';
        menos.textContent = '−';
        menos.setAttribute('aria-label', 'Diminuir quantidade');
        menos.addEventListener('click', () => alterarQuantidade(item.id, -1));
        const num = document.createElement('span');
        num.textContent = item.qtd;
        const mais = document.createElement('button');
        mais.type = 'button';
        mais.textContent = '+';
        mais.setAttribute('aria-label', 'Aumentar quantidade');
        mais.addEventListener('click', () => alterarQuantidade(item.id, 1));
        qtd.append(menos, num, mais);

        const subtotal = document.createElement('div');
        subtotal.className = 'item-subtotal';
        subtotal.textContent = formatarMoeda(item.preco * item.qtd);

        const remover = document.createElement('button');
        remover.type = 'button';
        remover.className = 'item-remover';
        remover.textContent = '✕';
        remover.setAttribute('aria-label', 'Remover ' + item.nome);
        remover.addEventListener('click', () => removerDoCarrinho(item.id));

        linha.append(img, info, qtd, subtotal, remover);
        lista.appendChild(linha);
    });

    document.getElementById('total-carrinho').textContent = formatarMoeda(totalCarrinho(carrinho));
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarContador();
    ligarBotoesAdicionar();
    renderizarCarrinho();

    const btnLimpar = document.getElementById('btn-limpar');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            if (confirm('Esvaziar o carrinho?')) limparCarrinho();
        });
    }
});
