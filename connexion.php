<?php
session_start();
if (isset($_POST['valider'])){
    if (!empty($POST["speudo"]) AND !empty($POST["mdp"])) {
        $speudo_par_defaut = "admin";
        $mdt_par_default ="admin12345";

        $speudo_saisi= htmlspecialchars($_POST['speudo']);
        $mdp_saisi =htmlspecialchars($_POST['mdp']);
        if($speudo_saisi == $speudo_par_defaut AND $mdp_saisi == $mdt_par_default){
            $_SESSION['mdp'] = $mdp_saisi;
            header('location:index.php');

        
        }else{
            echo "Veuillez saisir un mot de passe ou un speudo correct";

        }
        # code...
    }else{
        echo "Veuillez remplir tous les champs..."; 
    }
    # code...
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Connexion admin</title>
    <meta charset="utf8">
</head>
<body>
    <form method="POST" action="" align="center">
        <input type="text" name "speudo" autocomplete="off">
        <br>
        <input type="Password" name="mdp">
        <br></<br>
        <input type="submit" name="valider">

    </form>
</body>    
</html>