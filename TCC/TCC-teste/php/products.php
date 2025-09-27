<?php
require 'db.php';

$stmt = $pdo->query("SELECT * FROM products");
$products = $stmt->fetchAll();

foreach ($products as $p) {
    echo "<div><h3>{$p['name']}</h3><p>{$p['description']}</p><strong>R$ {$p['price']}</strong></div><hr>";
}
?>
