<?php
session_start();
$bdd = new PDO('mysql:host=localhost;dbname=said;', 'said', 'QeCCRSDW.H6NugzC');
//var_dump($_POST);
['username' => $name, "usermail"=>$mail, "password" => $pwd] = $_POST;
$sql = "INSERT INTO users (name, mail, password) VALUES (?,?,?)";
$bdd->prepare($sql)->execute([$name, $mail, $pwd]);


header('Location: http://localhost/balogo');



