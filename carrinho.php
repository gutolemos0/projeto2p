<?php include 'inc/header.inc.php'; ?>

<main class="pagina">
    <h1>🛒 Meu Carrinho</h1>

    <section id="carrinho-vazio" class="carrinho-vazio" hidden>
        <p>Seu carrinho está vazio.</p>
        <a href="index.php" class="btn btn-principal">Ver promoções</a>
    </section>

    <section id="carrinho-conteudo" hidden>
        <div id="lista-carrinho" class="lista-carrinho"></div>

        <div class="resumo-carrinho">
            <div class="resumo-total">
                <span>Total</span>
                <strong id="total-carrinho">R$ 0,00</strong>
            </div>
            <div class="resumo-acoes">
                <a href="index.php" class="btn btn-secundario">Continuar comprando</a>
                <button type="button" id="btn-limpar" class="btn btn-perigo">Esvaziar carrinho</button>
                <a href="pagamento.php" class="btn btn-principal">Finalizar compra</a>
            </div>
        </div>
    </section>
</main>

<script src="js/carrinho.js"></script>
<?php include 'inc/footer.inc.php'; ?>
