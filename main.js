import { categories } from "./scripts/constant.js";
import { getDate } from './scripts/helpers.js';
import { renderCategories, ele, renderMails, toggleModal } from "./scripts/ui.js";





// localden verilere erişme
const strData = localStorage.getItem("MAILS");
let mailData = JSON.parse(strData);

// Sayfanın Yükleme Anını İzleme
document.addEventListener("DOMContentLoaded",() =>{
    renderCategories(categories,"Gelen Kutusu");
    renderMails(mailData);
});

//! Kategori İşlemleri
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
});


//! Modal İşlemleri
// Oluştur butonuna basınca modal ekranı gelmesi
ele.createBtn.addEventListener("click", () => toggleModal(true));

// x basınca modal'ı kapatma
ele.closeBtn.addEventListener("click", () => toggleModal(false));


// Formun Gönderilme olayını izleme
ele.modalForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Sahip olduğu varsayılan özellikleri devre dışı bırakma(sayfa yenilenmesi)

    // formdaki inputların verilerine erişme
    const reciever = e.target[1].value;
    const title = e.target[2].value;
    const message = e.target[3].value;

    // verileri kontrol etme
    if(!reciever || !title || !message){
        alert("Lütfen bütün alanları doldurunuz..")
    } else {
        // diziye eklemek için mail objesi oluşturma
        const newMail = {
            id: new Date().getTime(),
            sender:"Furkan",
            reciever,
            title,
            message,
            date: getDate(),
        };

        // mailleri diğer maillerin en başına ekleme
        mailData.unshift(newMail);

        // yeni oluşan diziyi local storageye kaydetme
        const strData = JSON.stringify(mailData);
        localStorage.setItem("MAILS", strData);

        // gönder butonuna bastıktan sonra modalın kapanması
        toggleModal(false);

        // güncel mailleri ekrana basma
        renderMails(mailData);
    }
});

//! Mail İşlemleri

// Maillere Tıklanma olayını izleme
ele.mailsArea.addEventListener("click", updateMail);

// maili hem ekrandan hem lokalden silme
function updateMail(e){
    //güncellenecek mailin ıd sine erişme
    const mail = e.target.parentElement;
    const id = mail.dataset.id;

    if(e.target.id === "delete" &&  
    //maili silerken uyarı gönderme
    window.confirm("Maili silmek istiyor musunuz?")
    ) {
       
        // id si silinecek elemana eşit olmayanları alma
        const filtred = mailData.filter((i) => i.id !== Number(id));

        // local storage güncelleme
        localStorage.setItem("MAILS", JSON.stringify(filtred));

        // maili htmlden kaldırma
        mail.remove();
    }



    // Kullanıcı yıldız butonuna tıkladıysa
    if(e.target.id == "star") {
        const like_id = Number(mail.parentElement.dataset.id);

        // dizideki id sini bildiğimiz elemana erişme
        const found = mailData.find((i) => i.id === Number(like_id));

        // bulduğumuz elemanın yıldızlı değerini tersine çevir
        const updated = {...found, starred: !found.starred};

        // dizideki eski eleman yerine güncel haline koymak
        mailData = mailData.map((mail) => 
        mail.id === like_id ? updated : mail
        );

        // local storage güncelleme
        localStorage.setItem("MAILS", JSON.stringify(mailData));

        // Arayüzü güncelleme
        renderMails(mailData);
    };
};
