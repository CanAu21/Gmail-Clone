import { categories } from "./scripts/constant.js";
import { renderCategories, ele } from "./scripts/ui.js";

// Sayfanın Yükleme Anını İzleme
document.addEventListener("DOMContentLoaded",() =>{
    renderCategories(categories,"Gelen Kutusu");
});

// Kategoriler alanındaki tıklanma olayını izleme
ele.categoryList.addEventListener("click", (event) => {
    // Seçilen Kategoriyi Belirleme (icon mu değil mi)
    const selected = event.target.dataset.id;
    // Active olanı güncelleme için kategorileri tekrardan ekrana bas
    renderCategories(categories, selected);
});


// Hamburger menüye tıklanma olayı (list iconunun açılıp kapanması)
ele.menu.addEventListener("click", () => {
    // Eğer hide classı yoksa ekler, varsa olan classı kaldırır
    ele.nav.classList.toggle("hide");
})