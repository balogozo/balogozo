<?php
session_start();
$bdd = new PDO('mysql:host=localhost;dbname=said;', 'said', 'QeCCRSDW.H6NugzC');

$getProduit = $bdd->query('SELECT *  FROM  produits ');


$produits = $getProduit->fetchAll();

echo json_encode($produits);



