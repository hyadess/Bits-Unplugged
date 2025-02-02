"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          // id: 1,
          fullname: null,
          username: "admin",
          image: null,
        },
        {
          // id: 2,
          fullname: "Mahir Labib Dihan",
          username: "mahirlabibdihan",
          image: "/images/dihan.jpg",
        },
        {
          // id: 3,
          fullname: "Sayem Shahad Soummo",
          username: "sayemshahadsoummo",
          image: "/images/sayem.jpg",
        },
        {
          // id: 4,
          fullname: "Souvik Ghosh",
          username: "sheldor7701",
          image: "/images/souvik.jpg",
        },
        {
          // id: 5,
          fullname: "Roqunuzzaman Sojib",
          username: "roqun",
          image:
            "https://pics.craiyon.com/2023-09-13/c195261e4ae94815a26761786726d83a.webp",
        },
        {
          // id: 6,
          fullname: "Ami Sakib",
          username: "sakib",
          image:
            "https://cdn.prod.www.spiegel.de/images/d2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg",
        },
        {
          // id: 7,
          fullname: "Mahir Labib Dihan",
          username: "dihan",
          image: "/images/dihan.jpg",
        },
        {
          // id: 8,
          fullname: "Sayem Shahad Soummo",
          username: "sayem",
          image: "/images/sayem.jpg",
        },
        {
          // id: 6,
          fullname: "Souvik Ghosh",
          username: "souvik",
          image: "/images/souvik.jpg",
        },
        {
          // id: 10,
          fullname: "Sadat Hossain",
          username: "sadat",
          image: "/images/tutor5.jpg",
        },
        {
          // id: 11,
          fullname: "Nafis Tahmid",
          username: "nafis",
          image: "/images/tutor12.jpg",
        },
        {
          // id: 12,
          fullname: "Asif Azad",
          username: "asif",
          image: "/images/tutor9.jpg",
        },
        {
          // id: 13,
          fullname: "Md. Ashrafur Rahman",
          username: "ashraf",
          image: "/images/tutor14.jpg",
        },
        {
          // id: 14,
          fullname: "Shattik Islam Rhythm",
          username: "shattik",
          image: "/images/tutor11.jpg",
        },
        {
          // id: 15,
          fullname: "Muhaminul Islam Nafi",
          username: "nafi",
          image:
            "https://preview.redd.it/tried-to-make-the-discord-clyde-logo-more-similar-to-the-v0-g2bha52fh9v91.png?auto=webp&s=f74e8a7068998d18b22fa3bbb3e62ee9975204d3",
        },
        {
          // id: 16,
          fullname: "Faria Binte Awal",
          username: "moushi",
          image:
            "https://preview.redd.it/tried-to-make-the-discord-clyde-logo-more-similar-to-the-v0-g2bha52fh9v91.png?auto=webp&s=f74e8a7068998d18b22fa3bbb3e62ee9975204d3",
        },
        {
          // id: 17,
          fullname: "Hafijul Hoque Chowdhury",
          username: "hafijul",
          // image: "/images/tutor11.jpg",
        },

        {
          // id: 18,
          fullname: "Sayeda Rifah Tasfia",
          username: "rifah",
          image: "/images/tutor7.jpg",
        },
        {
          // id: 19,
          fullname: "Gazi Fardin Zafor Suvro",
          username: "suvro",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 20,
          fullname: "Sakib Mohammed Sobaha",
          username: "sobaha",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 21,
          fullname: "Fatema Tuj Johora",
          username: "ava",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 22,
          fullname: "Wasif Hamid",
          username: "wasif",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 23,
          fullname: "Mijanur Rahman",
          username: "mijan",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 24,
          fullname: "Faihaj Alam Topu",
          username: "topu",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 25,
          fullname: "Syed Tehjeebuzzaman",
          username: "tehjeeb",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 26,
          fullname: "Ajoy Dey",
          username: "ajoy",
          // image: "/images/tutor11.jpg",
        },

        {
          // id: 27,
          fullname: "Mustafa Siam-Ur-Rafique",
          username: "siam",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 28,
          fullname: "Abdullah Al Mohaimin",
          username: "mohaimin",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 29,
          fullname: "Rakib Abdullah",
          username: "mishon",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 30,
          fullname: "Riad Ahmed Anonto",
          username: "anonto",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 31,
          fullname: "Debjany Ghosh Aronno",
          username: "aronno",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 32,
          fullname: "Mahfuzzaman Sizan",
          username: "sizan",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 33,
          fullname: "Nur Uddin Ibne Huda",
          username: "huda",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 34,
          fullname: "Sadif Ahmed",
          username: "sadif",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 35,
          fullname: "Azizul Haque Nadim",
          username: "nadim",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 36,
          fullname: "Sarder Md. Saffatzabin",
          username: "saffat",
          // image: "/images/tutor11.jpg",
        },
        {
          // id: 37,
          fullname: "Md. Ishrak Ahsan",
          username: "ishrak",
          image: "/images/tutor21.jpg",
        },
        {
          // id: 38,
          fullname: "Niaz Rahman",
          username: "niaz",
          // image: "/images/tutor21.jpg",
        },
        {
          // id: 39,
          fullname: "Lara Khanom",
          username: "lara",
          // image: "/images/",
        },
        {
          // id: 40,
          fullname: "Nazmus Sakib",
          username: "nazmus",
          image: "/images/tutor17.jpg",
        },
        {
          // id: 41,
          fullname: "Prottoy Barai",
          username: "bara",
          image: "/images/tutor13.jpg",
        },
        {
          // id: 42,
          fullname: "Mashroor Hasan Bhuiyan",
          username: "mashroor",
          image: "/images/tutor10.jpg",
        },
        {
          // id: 43,
          fullname: "Anindya Hoque",
          username: "anindya",
          image: "/images/tutor6.jpg",
        },
        {
          // id: 44,
          fullname: "Tareq Ahmed",
          username: "tareq",
          image: "/images/tutor3.jpg",
        },
        {
          // id: 45,
          fullname: "Tahmid Tomal",
          username: "tomal",
          image: "/images/tutor16.jpg",
        },
        {
          // id: 46,
          fullname: "Md. Shafiul Haque",
          username: "shafiul",
          image: "/images/tutor20.jpg",
        },
        {
          // id: 47,
          fullname: "Rayan Islam",
          username: "rayan",
          image: "/images/tutor18.jpg",
        },
        {
          // id: 48,
          fullname: "Saad Mohammad Rafid",
          username: "pial",
          image: "/images/tutor15.jpg",
        },
        {
          // id: 49,
          fullname: "Tahsin Wahid",
          username: "tahsin",
          image: "/images/tutor19.jpg",
        },
        {
          // id: 50,
          fullname: "Md. Labid Al Nahiyan",
          username: "labid",
          // image: "/images/male_student.jpg",
        },
        {
          // id: 51,
          fullname: "Md. Jarif Ahsan",
          username: "jarif",
          // image: "/images/",
        },
        {
          // id: 50,
          fullname: "Kazi Istiak Uddin Torique",
          username: "torique",
          // image: "/images/",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
