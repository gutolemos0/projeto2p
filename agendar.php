<?php
$titulo = 'Agendar';
include 'header.php';
include 'dados.php';

$enviado = false;   // vira true quando o formulário é enviado sem erros
$erro = '';         // guarda a mensagem de erro, se houver

// Só entra aqui quando o formulário foi enviado (método POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $nome    = trim($_POST['nome']);
  $oficina = $_POST['oficina'];
  $dia     = $_POST['dia'];

  if ($nome === '') {
    $erro = 'Informe seu nome.';
  } elseif (!isset($_POST['consentimento'])) {
    $erro = 'Precisamos do seu consentimento para continuar.';
  } else {
    $enviado = true;
  }
}
?>

<h1>Agendar atendimento</h1>

<?php if ($enviado) { ?>

  <p class="sucesso">
    Pedido recebido, <?php echo htmlspecialchars($nome); ?>!
    A <?php echo htmlspecialchars($oficina); ?> confirma o dia <?php echo htmlspecialchars($dia); ?> com você.
  </p>

<?php } else { ?>

  <?php if ($erro !== '') { ?>
    <p class="erro"><?php echo $erro; ?></p>
  <?php } ?>

  <form method="post">
    <label>Seu nome
      <input type="text" name="nome">
    </label>

    <label>Oficina
      <select name="oficina">
        <?php foreach ($oficinas as $o) { ?>
          <option><?php echo $o['nome']; ?></option>
        <?php } ?>
      </select>
    </label>

    <label>Dia
      <input type="date" name="dia" required>
    </label>

    <label class="consentimento">
      <input type="checkbox" name="consentimento">
      Concordo em compartilhar meu nome com a oficina escolhida para este agendamento.
    </label>

    <button class="botao" type="submit">Pedir agendamento</button>
  </form>

<?php } ?>

<?php include 'footer.php'; ?>