var panier = document.getElementsByClassName("panier");
//console.log(panier);
var images = document.getElementsByClassName("image");
//console.log(images);
const tbody = document.getElementById("table-panier");
var dataDiv = document.getElementById("import-data");
async function  fetchTotal(){


    try {
        let data = await fetch('http://127.0.0.1/balogozoweld/pages/panier.php');
        let prixTotal= await data.json();
        
        //console.log(prixTotal,'text');
    
    }   catch (error) {

    
    }


}
fetchTotal();

async function  fetchProduits(){
    

    try {
        let data = await fetch('http://127.0.0.1/balogo/pages/getproduit.php');
        let produits = await data.json();
        console.log(data)
        console.log(produits,'text');

        let chaises = produits.filter(produit => produit.categorie ==='chaise');
        let htmlchaise = makeCategorie('chaises' ,chaises);

        let tabourets = produits.filter(produit => produit.categorie ==='tabouret');
        let htmltabouret = makeCategorie('tabourets' ,tabourets);

        let lampes= produits.filter(produit => produit.categorie ==='lampe');
        let htmllampe = makeCategorie('lampes' ,lampes);

        dataDiv.innerHTML = htmlchaise+ htmltabouret+htmllampe ;

    
    }   catch (error) {
console.log(error)
    
    }


}
fetchProduits();


function makeTr(name, price) {
    return 
    `<tr>
        <td>${name}</td>
        <td>${price}</td>
        <td>1</td>
        <td>${1*price}</td>
    </tr>`;
}
for (const img of images) {
    img.onclick = (e) => {
        e.preventDefault();
        console.log(img.nextElementSibling.firstElementChild.textContent);
        let name = img.nextElementSibling.firstElementChild.textContent;
        let  pricestr = img.nextElementSibling.lastElementChild.textContent;
        let pricenb = Number(pricestr.substr(0,pricestr.length-1));
        let tr = makeTr(name,pricenb);
tbody.innerHTML = tbody.innerHTML+tr;



    }
}

function somme (){
    $total =$chaise1["amount"] + $lampe1["amount"] + $lampe2["amount"] + $table1["amount"] + $tabout1["amount"] + $tabouret2;

}


const $openNav = document.querySelector(".icone1")
const $menu = document.querySelector(".menu");
const $produitsByCat = document.querySelector(".import-data");

$openNav.onclick = (e) => {
    if ($menu.style.display === "block") {
        $menu.style.display = "none";
        $openNav.innerHTML = "<i class='bx bx-menu'></i>";


    } else {
        $menu.style.display = "block";
        $openNav.innerHTML = "<i class='bx bx-x'></i>";
    }
}

function makeCategorie(catName, produits) {
    let str = `
<section class="categorie">
    <h1>${catName}</h1>
        <div class="produits">`;
    produits.forEach(produit => {
        str += makeProduit(produit);
    });

    str += `</div>
    </section>`;
    return str;
}
function makeProduit(produit) {
    console.log(produit)
    return `
<div class="produit">
        <img src="../images/${produit.nom}.jpeg" alt="lampe">
        <div class="info-produit">
            <h2>${produit.nom}</h2>
            <p>${produit.prix}</p>
        </div>
    </div>`;
}

const mockDataCategories = [
    { 
        lampes: [ // nom de categorie => catName l'objet est les produits
            { lampe1: { img: "lampe1.jpeg", name: "lampe1", price: 180 } }, // produit
            { lampe1: { img: "lampe2.jpeg", name: "lampe2", price: 150 } }  // produit
        ] 
    },

];


mockDataCategories.forEach(cat => {
    let catName = Object.keys(cat)[0];
// $produitsByCat.append(makeCategorie(catName, cat));

})

let prixTotalCalcul = [];
