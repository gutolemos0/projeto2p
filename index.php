<?php
// Lista de promoções (ajuste nomes, preços e imagens como quiser)
$promocoes = [
    ["id" => 1, "nome" => "Carne fresca",     "preco" => 29.90, "img" => "img/carne.png"],
    ["id" => 2, "nome" => "Carne em cubos",   "preco" => 24.90, "img" => "img/cubinhos.png"],
    ["id" => 3, "nome" => "Pão francês",      "preco" => 12.50, "img" => "img/pao.png"],
    ["id" => 4, "nome" => "Carne em cubos 2", "preco" => 26.90, "img" => "img/cubinhos.png"],
    ["id" => 5, "nome" => "Carne em cubos 3", "preco" => 22.90, "img" => "img/cubinhos.png"],
    ["id" => 6, "nome" => "Carne em cubos 4", "preco" => 27.90, "img" => "img/cubinhos.png"],
    ["id" => 7, "nome" => "Carne em cubos 5", "preco" => 23.90, "img" => "img/cubinhos.png"],
    ["id" => 8, "nome" => "Carne em cubos 6", "preco" => 25.90, "img" => "img/cubinhos.png"],
];
?>
<?php include 'inc/header.inc.php'; ?>

<div class="container">
    <div class="side">
        <section class="busca">
            <h2>Buscar Item</h2>
            <form action="index.php" method="get">
                <input type="search" name="busca" placeholder="O que você procura?">
                <button type="submit">Buscar</button>
            </form>
        </section>

        <section class="menu-departamentos">
            <h2>Departamentos</h2>

            <nav>
                <h3>Setor de Alimentos Frescos</h3>
                <ul>
                    <li>
                        <a href="#">Horti-Frúti</a>
                        <ul>
                            <li><a href="#">Frutas</a></li>
                            <li><a href="#">Legumes</a></li>
                            <li><a href="#">Verduras</a></li>
                            <li><a href="#">Temperos</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Padaria</a>
                        <ul>
                            <li><a href="#">Pão</a></li>
                            <li><a href="#">Bolo</a></li>
                            <li><a href="#">Salgados</a></li>
                            <li><a href="#">Doces</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Açougue</a>
                        <ul>
                            <li><a href="#">Carnes Vermelhas</a></li>
                            <li><a href="#">Aves</a></li>
                            <li><a href="#">Peixes</a></li>
                            <li><a href="#">Suínos</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Frios e Laticínios</a>
                        <ul>
                            <li><a href="#">Queijo</a></li>
                            <li><a href="#">Presunto</a></li>
                            <li><a href="#">Iogurte</a></li>
                            <li><a href="#">Manteiga</a></li>
                            <li><a href="#">Leite</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <nav>
                <h3>Setor de Despensa e Bebidas</h3>
                <ul>
                    <li>
                        <a href="#">Mercearia</a>
                        <ul>
                            <li><a href="#">Arroz</a></li>
                            <li><a href="#">Feijão</a></li>
                            <li><a href="#">Massas</a></li>
                            <li><a href="#">Óleos</a></li>
                            <li><a href="#">Açúcar</a></li>
                            <li><a href="#">Café</a></li>
                            <li><a href="#">Empanados</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Bebidas</a>
                        <ul>
                            <li><a href="#">Águas</a></li>
                            <li><a href="#">Sucos</a></li>
                            <li><a href="#">Refrigerantes</a></li>
                            <li><a href="#">Cerveja</a></li>
                            <li><a href="#">Vinhos</a></li>
                            <li><a href="#">Destilados</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Congelados</a>
                        <ul>
                            <li><a href="#">Pratos Prontos</a></li>
                            <li><a href="#">Pizzas</a></li>
                            <li><a href="#">Pão de Queijo</a></li>
                            <li><a href="#">Vegetais Congelados</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <nav>
                <h3>Setor de Uso Pessoal e da Casa</h3>
                <ul>
                    <li>
                        <a href="#">Higiene e Perfumaria</a>
                        <ul>
                            <li><a href="#">Sabonetes</a></li>
                            <li><a href="#">Shampoos</a></li>
                            <li><a href="#">Cremes</a></li>
                            <li><a href="#">Desodorantes</a></li>
                            <li><a href="#">Papel Higiênico</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Limpeza</a>
                        <ul>
                            <li><a href="#">Sabão em Pó</a></li>
                            <li><a href="#">Desinfetante</a></li>
                            <li><a href="#">Amaciantes</a></li>
                            <li><a href="#">Esponjas</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Utilidades e Pet Shop</a>
                        <ul>
                            <li><a href="#">Ração</a></li>
                            <li><a href="#">Sachês</a></li>
                            <li><a href="#">Brinquedos</a></li>
                            <li><a href="#">Petiscos</a></li>
                            <li><a href="#">Sacos de Lixo</a></li>
                            <li><a href="#">Roupas de Pet</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </section>
    </div>

    <div class="main">
        <img class="banner" src="img/carrocel.png" alt="Banner de promoções">

        <div class="promocoes" id="promocoes">
            <?php foreach ($promocoes as $p): ?>
                <div class="produto"
                     data-id="<?= $p['id'] ?>"
                     data-nome="<?= htmlspecialchars($p['nome']) ?>"
                     data-preco="<?= $p['preco'] ?>">
                    <img src="<?= $p['img'] ?>" alt="<?= htmlspecialchars($p['nome']) ?>">
                    <h3><?= htmlspecialchars($p['nome']) ?></h3>
                    <p class="preco">R$ <?= number_format($p['preco'], 2, ',', '.') ?></p>
                    <button type="button" class="btn-add">Adicionar ao carrinho</button>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<script src="js/carrinho.js"></script>
<?php include 'inc/footer.inc.php'; ?>
