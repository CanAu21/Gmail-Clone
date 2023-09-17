// HTML'den Çağrılanlar
export const ele = {
    categoryList : document.querySelector(".categories"),
    menu: document.querySelector("#menu"),
    nav: document.querySelector("nav"),
};

//! Ekrana Kategorileri Basma
export function renderCategories(data,active){
    // Daha Önce Eklenen Kategorileri Temizleme
    ele.categoryList.innerHTML = '';
    // Dizideki her bir kategori için fonksiyon çalıştırma
    data.forEach((category) => {
        // ul'ye Göndermek istediğimiz elementi oluşturma
        const categoryItem = document.createElement("li")
        // Elemana hangisi olduğunu belirtme
        categoryItem.dataset.id = category.id;
        // Elemen seçilmiş ise active classı atama
        categoryItem.classList = category.id == active &&  "active";
        // li İçeriğini Belirleme
        categoryItem.innerHTML = 
        `
        <i class="${category.icon}"></i>
        <span>${category.title}</span>
        `;

        // Oluşturduğumuz elementi html'e gönderme
        ele.categoryList.appendChild(categoryItem);

        console.log(categoryItem)

    });
}