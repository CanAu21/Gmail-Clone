// HTML'den Çağrılanlar
export const ele = {
    categoryList : document.querySelector(".categories"),
    menu: document.querySelector("#menu"),
    nav: document.querySelector("nav"),
    mailsArea: document.querySelector(".mails"),
    createBtn: document.querySelector(".create"),
    modal: document.querySelector(".modal-wrapper"),
    closeBtn: document.querySelector(".close-modal"),
    modalForm : document.querySelector(".modal-wrapper form"),
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


//! Ekrana Mailleri Basan Fonksiyon
// outlet : verilerin ekrana basılacağı yer
// maildata : ekrana basılacak maillerin verisi
export function renderMails(mailData){
    // Mail yoksa fonksiyonu çalıştırma
    if (!mailData) return;

    // mailler dizisini dön ve her bir eleman için bir tane mail htmli oluştur
    const html = mailData.map((mail) =>
    `
    <div data-id="${mail.id}" class="mail">
    <div class="info">
        <input type="checkbox">
        <i id="star" class="bi ${mail.starred ? "bi-star-fill" : "bi-star"}"></i>
        <b>${mail.sender}</b>
    </div>

    <div class="content">
        <p class="title">${mail.title.slice(0,30) + "..."}</p>
        <p class="text">${mail.message.slice(0, 35) + "..."}</p>
    </div>

    
        <p class="time">${mail.date}</p>
    
        <button id="delete">Sil</button>
</div>
    ` 
    )

    // Ekrana mailleri basma
    ele.mailsArea.innerHTML = html.join(" "); // join diziyi htmle çevirir
}


// Modal ekranı aç kapa yapma
export function toggleModal(willOpen){
    ele.modal.style.display = willOpen ? "grid" : "none"; 
};



