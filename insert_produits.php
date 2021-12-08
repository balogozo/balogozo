<?php
session_start();
$bdd = new PDO('mysql:host=localhost;dbname=said;', 'said', 'QeCCRSDW.H6NugzC');
if(!$_SESSION['mdp']){
    header('location:connexion.php');
}

if(isset($_POST['envoi'])){

   if(!empty($_POST['nom']) AND ! empty($_POST['produit'])){
       $titre = htmlspecialchars($_POST['nom']);
       $produit = nl2br(htmlspecialchars($_POST['produit']));

       $insererProduit = $bdd->prepare('INSERT INTO produit titre, contenu VALUE ?, ?');
       $insertProduit->execute(array($titre , $contenu));

   }else{
       echo "Veuillez complèter tous les champs...";
   }
}


?>
<!DOCTYPE html>
<html>
<head>
    <title>Publier un produit</title>
    <meta charset="utf-8">

</head>
<body>
    <form method="POST" action="">
        <input type="text" name="titre">
        <br>
        <textarea name="description"></textarea> 
        <br>
        <input type="submit" name="envoi">
    </form>
    
</body>
</html>
