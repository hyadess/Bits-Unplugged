"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          // id: 1,
          fullname: "Mahir Labib Dihan",
          username: "mahirlabibdihan",
          image: "/images/dihan.jpg",
        },
        {
          // id: 2,
          fullname: "Mahir Labib Dihan",
          username: "dihan",
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
          fullname: "Sayem Shahad Soummo",
          username: "sayem",
          image: "/images/sayem.jpg",
        },
        {
          // id: 5,
          fullname: "Souvik Ghosh",
          username: "sheldor7701",
          image: "/images/souvik.jpg",
        },
        {
          // id: 6,
          fullname: "Souvik Ghosh",
          username: "souvik",
          image: "/images/souvik.jpg",
        },
        {
          // id: 7,
          fullname: null,
          username: "admin",
          image: null,
        },
        {
          // id: 8,
          fullname: "Roqunuzzaman Sojib",
          username: "roqun",
          image:
            "https://pics.craiyon.com/2023-09-13/c195261e4ae94815a26761786726d83a.webp",
        },
        {
          // id: 9,
          fullname: "Ami Sakib",
          username: "sakib",
          image:
            "https://cdn.prod.www.spiegel.de/images/d2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg",
        },
        {
          // id: 10,
          fullname: "Md. Ashrafur Rahman",
          username: "ashraf",
          image: "/images/tutor14.jpg",
        },
        {
          // id: 11,
          fullname: "Shattik Islam Rhythm",
          username: "shattik",
          image: "/images/tutor11.jpg",
        },
        {
          // id: 12,
          fullname: "Md. Ishrak Ahsan",
          username: "ishrak",
          image: "/images/tutor21.jpg",
        },
        {
          // id: 13,
          fullname: "Asif Azad",
          username: "asif",
          image: "/images/tutor9.jpg",
        },
        {
          // id: 14,
          fullname: "Nafis Tahmid",
          username: "nafis",
          image: "/images/tutor12.jpg",
        },
        {
          // id: 15,
          fullname: "Sadat Hossain",
          username: "sadat",
          image: "/images/tutor5.jpg",
        },
        {
          // id: 16,
          fullname: "Md. Shafiul Haque",
          username: "shafiul",
          image: "/images/tutor20.jpg",
        },
        {
          // id: 17,
          fullname: "Rayan Islam",
          username: "rayan",
          image: "/images/tutor18.jpg",
        },
        {
          // id: 18,
          fullname: "Saad Mohammad Rafid",
          username: "pial",
          image: "/images/tutor15.jpg",
        },
        {
          // id: 19,
          fullname: "Tahsin Wahid",
          username: "tahsin",
          image: "/images/tutor19.jpg",
        },
        {
          // id: 20,
          fullname: "Tareq Ahmed",
          username: "tareq",
          image: "/images/tutor3.jpg",
        },
        {
          // id: 21,
          fullname: "Anindya Hoque",
          username: "anindya",
          image: "/images/tutor6.jpg",
        },
        {
          // id: 22,
          fullname: "Mashroor Hasan Bhuiyan",
          username: "mashroor",
          image: "/images/tutor10.jpg",
        },
        {
          // id: 23,
          fullname: "Prottoy Barai",
          username: "bara",
          image: "/images/tutor13.jpg",
        },
        {
          // id: 24,
          fullname: "Nazmus Sakib",
          username: "nazmus",
          image: "/images/tutor17.jpg",
        },
        {
          // id: 25,
          fullname: "Md. Labid Al Nahiyan",
          username: "labid",
          // image: "/images/male_student.jpg",
        },
        {
          // id: 26,
          fullname: "Lara Khanom",
          username: "lara",
          // image: "/images/",
        },
        {
          // id: 27,
          fullname: "Md. Jarif Ahsan",
          username: "jarif",
          // image: "/images/",
        },
        {
          // id: 28,
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
