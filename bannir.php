<?php
session_start();
$bdd = new PDO('mysql:host=localhost;dbname=said;', 'said', 'QeCCRSDW.H6NugzC');
if(isset($_GET['id']) AND !empty($_GET['id'])){
    $getid = $_GET['id'];
    $recupUser =$bdd->prepare('SELECT * FROM membre WHERE id = ?');
    $recupUser->execute(array($getid));
    if($recupUser->rowCount() >0){
    
        $bannirUser = $bdd->prepare('DELETE * FROM membre WHERE id = ?');
        $bannirUser->execute(array($getid));
        header('location:membre.php');

    }else{
        echo "Aucun membre n'a été trouvé";
    }
}else{
    echo "L'indentifiant n'a pas été récupérer ";
}

?>