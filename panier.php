<?php
session_start();
$bdd = new PDO('mysql:host=localhost;dbname=said;', 'said', 'QeCCRSDW.H6NugzC');

$query = $bdd->query('SELECT * FROM produits');
$produits = $query->fetchAll(PDO::FETCH_ASSOC);
// var_dump($produits);
$prixTotal = 0;
foreach($produits as $produit){
    $prixTotal += $produit['prix']; 
}
echo $prixTotal; 