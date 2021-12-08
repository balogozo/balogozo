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
    return `
<div class="produit">
        <img src="../images/${produit.img}" alt="lampe">
        <div class="info-produit">
            <h2>${produit.name}</h2>
            <p>${produit.price}/p>
        </div>
    </div>`;
}

