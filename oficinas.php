<?php
$titulo = 'Oficinas';
include 'header.php';
include 'dados.php';
?>

<h1>Oficinas</h1>

<?php foreach ($oficinas as $oficina) { ?>
  <div class="cartao">
    <h3><?php echo $oficina['nome']; ?></h3>
    <p><?php echo $oficina['cidade']; ?> · <?php echo $oficina['servicos']; ?></p>
  </div>
<?php } ?>

<?php include 'footer.php'; ?>