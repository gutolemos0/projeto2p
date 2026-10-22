<footer class="rodape">
    <p> <?= date('Y') ?> Mercado </p>
</footer>

<script>
    
    (function () {
        var botao = document.getElementById('menu-toggle');
        var menu = document.getElementById('menu');
        if (!botao || !menu) return;
        botao.addEventListener('click', function () {
            var aberto = menu.classList.toggle('ativo');
            botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
        });
    })();
</script>
</body>
</html>
