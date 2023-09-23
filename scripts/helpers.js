import { month_tr } from "./constant.js"

// Bugünün tarihini gün ve ay cinsinden geri döndüren fonksiyon
export function getDate() {
    const date = new Date();

    // bugünün gününe erişme
    const day = date.getDate();
    const monthIndex = date.getMonth();

    // fonksiyonun çağrıldığı yere döndürme
    return day + " " + month_tr[monthIndex];
}
