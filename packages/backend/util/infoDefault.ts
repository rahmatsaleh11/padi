import { RegisterUser } from "../controller/User";
import prisma from "../prisma/prisma"

export const infoDefaultValue = [
    {
        tinggi: 20,
        info: `pada usia tersebut biasanya tanaman padi masih dalam tahap perkecambahan dan belum memiliki akar yang kuat. Tanaman juga membutuhkan air dan sinar matahari yang cukup untuk tumbuh dengan baik.`
    },
    {
        tinggi: 25,
        info: `pada usia tersebut tanaman padi sudah memiliki akar dan daun yang lebih banyak. Air masih tetap dibutuhkan oleh tanaman untuk tumbuh dengan baik, namun sebaiknya tidak tergenang di lahan karena bisa memicu pertumbuhan gulma atau hama penyakit. Selain itu, penting juga untuk memberi pupuk sesuai dosis agar pertumbuhan tanaman optimal.	1 minggu 	25 cm	7 hari`
    },
    {
        tinggi: 25,
        info: "pada usia tersebut tanaman sudah memiliki akar dan batang yang kuat serta daun yang lebih lebar. Pada tahap ini, tanaman membutuhkan air dan pupuk secara teratur untuk mendapatkan hasil panen yang optimal nantinya. Selain itu, pengairan harus diatur dengan baik agar tidak terlalu banyak atau sedikit sehingga bisa mempengaruhi pertumbuhan tanaman."
    },
    {
        tinggi: 30,
        info: `pada usia tersebut tanaman sudah memiliki akar dan batang yang lebih kuat serta daun dan bunga kelamin. Tanaman ini juga membutuhkan air secara teratur untuk tumbuh dengan baik. Selain itu, pemupukan pun harus dilakukan sesuai dengan kebutuhan tanaman agar pertumbuhannya optimal.`
    },
    {
        tinggi: 35,
        info: "pada usia ini tanaman padi sudah memiliki akar, batang, daun serta bunga kelamin yang lebih banyak. Saat ini tanaman mulai tumbuh tinggi dan membutuhkan pupuk dengan dosis yang tepat agar pertumbuhan optimal. Selain itu, pengairan perlu diatur sesuai dengan kondisi lahan supaya tidak terlalu basah atau kering sehingga hasil panen nantinya bisa maksimal."
    },
    {
        tinggi: 40,
        info: "pada usia tersebut tanaman padi sudah memiliki akar dan batang yang lebih tebal serta daun yang lebih lebar. Tanaman ini juga mulai membentuk malai dengan jumlah butir beras yang semakin banyak. Saat ini membutuhkan perawatan seperti pemupukan dan pengairan secara teratur agar pertumbuhan optimal."
    },
    {
        tinggi: 45,
        info: "tanaman sudah memiliki akar dan batang yang kuat serta daun yang lebih lebar. Tanaman ini juga mulai membentuk malai dengan jumlah butir beras yang semakin banyak. Selain itu, pada usia ini tanaman membutuhkan pupuk secara teratur agar pertumbuhan optimal dan pengairan harus diatur sedemikian rupa untuk menjaga kelembaban lahan."
    },
    {
        tinggi: 55,
        info: "pada usia ini tanaman sudah memiliki akar dan batang yang kuat serta mulai dengan adanya butir padi. Tanaman juga membutuhkan perawatan seperti pemupukan yang tepat agar pertumbuhan optimal dan pengairan yang cukup untuk menjaga kelembaban lahan. Selain itu, biasanya pada usia ini mulai dilakukan penyiangan atau pembasmian gulma karena dapat mengganggu pertumbuhan tanaman padi."
    },
    {
        tinggi: 70,
        info: "pada usia ini tanaman sudah mulai memasuki masa pembungaan dan memiliki malai dengan jumlah butir beras yang semakin banyak. Pada tahap ini, pengairan harus diatur secara teratur untuk menjaga kelembaban lahan dan pemupukan pun tetap diperlukan agar hasil panen nantinya optimal. Selain itu, biasanya pada usia ini dilakukan penyiangan atau pembasmian gulma secara rutin untuk menjaga kebersihan lahan pertanian."
    },
    {
        tinggi: 80,
        info: "pada usia ini tanaman sudah memasuki masa pembungaan dan malai dengan jumlah butir beras semakin banyak. Tanaman juga masih membutuhkan pengairan secara teratur untuk menjaga kelembaban lahan serta pemupukan agar pertumbuhan optimal. Selain itu, biasanya pada usia ini dilakukan pemangkasan daun yang tidak produktif untuk meningkatkan hasil panen nantinya."
    },
    {
        tinggi: 90,
        info: "pada usia ini tanaman sudah memasuki masa pembungaan dan malai dengan jumlah butir beras semakin banyak. Tanaman juga masih membutuhkan perawatan seperti pengairan secara teratur untuk menjaga kelembaban lahan serta pemupukan agar pertumbuhan optimal. Selain itu, biasanya pada usia ini dilakukan pemangkasan daun yang tidak produktif dan penyiangan atau pembasmian gulma secara rutin untuk menjaga kebersihan lahan pertanian."
    },
    {
        tinggi: 100,
        info: "pada usia ini tanaman sudah mulai memasuki masa pengisian gabah dan memiliki malai dengan jumlah butir beras yang semakin banyak. Tanaman masih membutuhkan perawatan seperti pemupukan agar pertumbuhan optimal serta pengairan secara teratur untuk menjaga kelembaban lahan. Selain itu, selama masa panen nanti, pemanenan sebaiknya dilakukan secara hati-hati agar tidak merusak atau mengganggu kualitas hasil panen nantinya."
    },
    {
        tinggi: 100,
        info: `pada usia ini tanaman sudah memasuki masa pengisian gabah dan memiliki malai dengan jumlah butir beras yang semakin banyak. Tanaman masih membutuhkan perawatan seperti pemupukan agar pertumbuhan optimal serta pengairan secara teratur untuk menjaga kelembaban lahan.`
    },
    {
        tinggi: 110,
        info: "Pada usia ini, butir tanaman padi butir tanaman padi belum menguning semua artinya tanaman padi blum siap di panen karena dapat mengurangi hasil dari jumlah dan kualitas panen petani jadi panen yang baik ketika butir padi sudah kunin semua agar mendapatkan hasil yang maksimal."
    },
    {
        tinggi: 120,
        info: `pada usia ini, malai dengan butir beras sudah terisi penuh dan warna daun dan butir telah menguning. Sebelum memulai panen, sebaiknya petani melakukan pengamatan kualitas gabah secara menyeluruh untuk menentukan waktu panen yang tepat agar hasil panen nantinya optimal.`
    },
    {
        tinggi: 130,
        info: `pada usia ini, malai dengan butir beras sudah terisi penuh dan warna daun dan butir telah menguning. Sebelum memulai panen, sebaiknya petani melakukan pengamatan kualitas gabah secara menyeluruh untuk menentukan waktu panen yang tepat agar hasil panen nantinya optimal.`
    },
    {
        tinggi: 130,
        info: `
        pada usia ini, malai dengan butir beras sudah terisi penuh dan warna daun dan butir telah menguning. Sebelum memulai panen, sebaiknya petani melakukan pengamatan kualitas gabah secara menyeluruh untuk menentukan waktu panen yang tepat agar hasil panen nantinya optimal.	16 minggu 	1,4 m	119 hari
        `},
    {
        tinggi: 140,
        info: `
        pada usia ini, malai dengan butir beras sudah terisi penuh dan warna daun dan butir telah menguning. Sebelum memulai panen, sebaiknya petani melakukan pengamatan kualitas gabah secara menyeluruh untuk menentukan waktu panen yang tepat agar hasil panen nantinya optimal.	16 minggu 	1,4 m	119 hari
        `},
    {
        tinggi: 150,
        info: `
        pada usia ini, malai dengan butir beras sudah terisi penuh dan warna daun dan butir telah menguning. Sebelum memulai panen, sebaiknya petani melakukan pengamatan kualitas gabah secara menyeluruh untuk menentukan waktu panen yang tepat agar hasil panen nantinya optimal.	16 minggu 	1,4 m	119 hari
        `},
    {
        tinggi: 160,
        info: `
        pada usia ini, malai dengan butir beras sudah terisi penuh dan warna daun dan butir telah menguning. Sebelum memulai panen, sebaiknya petani melakukan pengamatan kualitas gabah secara menyeluruh untuk menentukan waktu panen yang tepat agar hasil panen nantinya optimal.	16 minggu 	1,4 m	119 hari
        `},


]

export async function initInfo() {
    const data = await prisma.info.count();
    if (data >= 19) return
    await prisma.info.createMany({
        data: infoDefaultValue.map((el, ind) => ({
            ...el,
            umur: ind
        })),
        skipDuplicates : true
    })

}

export const AccountDetails = [
    {
        username: "Super_admin",
        password: "Super_admin"
    },
    {
        username: "Super_admin2",
        password: "Super_admin"
    },
    {
        username: "Super_admin3",
        password: "Super_admin"
    },
    {
        username: "Super_admin4",
        password: "Super_admin"
    },
]

export async function initAccount() {
    const data = await prisma.user.count()
    if (data > 0) return
    const promise = AccountDetails.map(async (el) => {
        await RegisterUser({ ...el, no_hp: "08", role: "admin" })
    })
    await Promise.all(promise)
}