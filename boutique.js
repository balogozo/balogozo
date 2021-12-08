var panier = document.getElementsByClassName("panier");
//console.log(panier);
//var images = [];
const tbody = document.getElementById("table-panier");
var dataDiv = document.getElementById("import-data");
//var oReq = new XMLHttpRequest();

//oReq.open("GET", url, true);
//oReq.responseType = "arraybuffer";
//oReq.onload = function(e) {
  //var arraybuffer = oReq.response; // n'est pas responseText
  /* ... */
//  }
//oReq.send();
///////////////////////////////
//////// Fonction génératrice de html
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
    return `
    <div class="produit">
        <a href="http://localhost/balogo/php/pages/produit.php?id=${produit.id}"><img src="../../images/${produit.nom}.jpeg" alt="lampe"></a>
        <div class="info-produit">
            <h2>${produit.nom}</h2>
            <p>${produit.prix} €</p>
            <h3>Ajouter au Panier</h3>
            <div class="btns-panier">
                <button class="plus-panier">+</button>
                <button class="moins-panier">-</button>
            </div>
        </div>
    </div>`;
}

function makeTr(name, price) {
    return `
    <tr id="row-${name}">
        <td>${name}</td>
        <td>${price}</td>
        <td class="quantity-nb">1</td>
        <td class="price-total">${1*price}</td>
    </tr>`;
}
async function createBoutiqueHtml() {
    const produits = await fetchProduits();
    // puis pour chaque categorie on crée le html des fiche produits
    let chaises = produits.filter(produit => produit.categorie ==='chaise');
    let htmlchaise = makeCategorie('chaises' ,chaises);
    
    let tabourets = produits.filter(produit => produit.categorie ==='tabouret');
    let htmltabouret = makeCategorie('tabourets' ,tabourets);
    
    let lampes= produits.filter(produit => produit.categorie ==='lampe');
    let htmllampe = makeCategorie('lampes' ,lampes);
    
    // on insére le html
    dataDiv.innerHTML = htmlchaise+ htmltabouret+htmllampe ;
    insertPanierEventOnButtons();
    //insertPanierEventOnImage(img)

    
}
////////////////////////////////////////////////////
/////// Create event function
function insertPanierEventOnButtons() {
    let plus = document.querySelectorAll(".plus-panier");
    let moins = document.querySelectorAll(".moins-panier");
    console.log(plus)
    
        for (let i = 0; i < plus.length; i++) {

        plus.item(i).onclick = (e) => {
            let name = plus.item(i).parentNode.parentNode.firstElementChild.textContent;
            e.preventDefault();
            let  pricestr =  plus.item(i).parentNode.parentNode.firstElementChild.nextElementSibling.textContent;
            let pricenb = Number(pricestr.substr(0,pricestr.length-2));
            let isAlreadyChoose = document.getElementById(`row-${name}`);
            if (isAlreadyChoose) {
                let tdQuantity = document.querySelector(`#row-${name}>td.quantity-nb`);
                let tdPrice = document.querySelector(`#row-${name}>td.price-total`);
                console.log(isAlreadyChoose)
                let oldQuantity = Number(tdQuantity.textContent);
                let newQuantity = oldQuantity + 1;
                var data = {
                    "name": name,
                    "quantity": newQuantity
                };
                    
                tdQuantity.textContent = newQuantity;
                tdPrice.textContent = newQuantity*pricenb;
            } else {
                let tr = makeTr(name,pricenb);
                var data = {
                    "name": name,
                    "quantity": 1
                };
                
               
                  
                tbody.innerHTML = tbody.innerHTML+tr;
            }
            fetch("http://localhost/balogo/php/addproduitpanier.php",{

            
                method: "POST",
                body: data
           });
            makeGlobalTotal();
        }
        moins.item(i).onclick = (e) => {
            let name = moins.item(i).parentNode.parentNode.firstElementChild.textContent;
            e.preventDefault();
            let  pricestr =  plus.item(i).parentNode.parentNode.firstElementChild.nextElementSibling.textContent;
            let pricenb = Number(pricestr.substr(0,pricestr.length-2));
            let isAlreadyChoose = document.getElementById(`row-${name}`);
            if (isAlreadyChoose) {
                let tdQuantity = document.querySelector(`#row-${name}>td.quantity-nb`);
                let tdPrice = document.querySelector(`#row-${name}>td.price-total`);
                console.log(isAlreadyChoose)
                let oldQuantity = Number(tdQuantity.textContent);
                let newQuantity = oldQuantity - 1;
                if(newQuantity > 0) {
                    tdQuantity.textContent = newQuantity;
                    tdPrice.textContent = newQuantity * pricenb;
                }
                else {
                    tdQuantity.textContent = 0;
                    tdPrice.textContent = 0
                }
            }
            makeGlobalTotal();
        }
    }    
}
function makeGlobalTotal() {
    let totals = document.querySelectorAll(".price-total");
    let globalTotal = 0;
    if(totals) totals.forEach((val, idx) => globalTotal += Number(totals.item(idx).textContent));

    console.log(totals, globalTotal);
    document.getElementById("global-total").textContent = globalTotal;
}
////////////////////////////////////////////////////
/// fonction pour aller chercher données en db
/*async function  fetchTotal(){
    try {
        let data = await fetch('http://localhost/balogo/php/panier.php');
        let prixTotal = await data.json();
        //console.log(prixTotal,'text');
    }   catch (error) {
        console.log(error);
    }
}
fetchTotal();*/

async function  fetchProduits(){
    try {
        // on va chercher la données en db
        let data = await fetch('http://localhost/balogo/php/getproduit.php');
        let produits = await data.json();
        //console.log(produits, "PRODUITS")
        return produits;    
    }   catch (error) {
        console.log(error)
    }
}
/////////////////////////////////////////

///////// Process//////////////
createBoutiqueHtml();
console.log(tbody)

///////////////////////



/*function somme (){
    $total =$chaise1["amount"] + $lampe1["amount"] + $lampe2["amount"] + $table1["amount"] + $tabout1["amount"] + $tabouret2;

}*/


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




let prixTotalCalcul = [];
