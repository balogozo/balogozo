<?php
session_start();
$bdd = new PDO('mysql:host=localhost;dbname=said;', 'said', 'QeCCRSDW.H6NugzC');
if(!$_SESSION['mdp']){
    header('location:connexion.php');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afficher les membres</title>
    <meta charset="UTF-8">
</head>
<body>
    <!--Afficher tous les membres -->
<?php
     $recupUsers = $bdd->query('SELECT * FROM membre');
     while($user=$recupUsers->fetch()){
         ?>
         <p><?= $user['pseudo']; ?><a href="bannir.php?id= $user['id']; ?>" style=color:red;text-decoration:none;>"bannir le membre"</a></p>
         <?php
    }
?>
    <!--Fin d'afficher tous les membres-->    
    
</body>
</html>

