"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "ContestSubmissions",
      [
        {
          participantId: 1,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 182,
          duration: 364,
          submittedAt: 365000,
        },

        {
          participantId: 1,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 284,
          submittedAt: 995000,
        },

        {
          participantId: 1,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 259,
          duration: 159,
          submittedAt: 1210000,
        },

        {
          participantId: 1,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 242,
          duration: 599,
          submittedAt: 2390000,
        },

        {
          participantId: 1,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 262,
          submittedAt: 1665000,
        },

        {
          participantId: 1,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 492,
          duration: 273,
          submittedAt: 1340000,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 152,
          submittedAt: 2865000,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 298,
          submittedAt: 1400000,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 554,
          submittedAt: 1380000,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 72,
          submittedAt: 625000,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 353,
          submittedAt: 1910000,
        },

        {
          participantId: 1,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 334,
          submittedAt: 3115000,
        },

        {
          participantId: 1,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 289,
          submittedAt: 275000,
        },

        {
          participantId: 1,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 499,
          submittedAt: 2035000,
        },

        {
          participantId: 1,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 502,
          submittedAt: 2705000,
        },

        {
          participantId: 1,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 319,
          submittedAt: 855000,
        },

        {
          participantId: 1,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 456,
          submittedAt: 3390000,
        },

        {
          participantId: 1,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 482,
          submittedAt: 410000,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 579,
          submittedAt: 3105000,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 542,
          submittedAt: 3490000,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 289,
          submittedAt: 3120000,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 65,
          submittedAt: 75000,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 367,
          submittedAt: 855000,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 470,
          submittedAt: 495000,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 478,
          submittedAt: 1835000,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 113,
          submittedAt: 1620000,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 353,
          submittedAt: 2270000,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 274,
          submittedAt: 785000,
        },

        {
          participantId: 2,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 179,
          duration: 105,
          submittedAt: 2810000,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 427,
          submittedAt: 2260000,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 538,
          submittedAt: 2210000,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 103,
          duration: 221,
          submittedAt: 3085000,
        },

        {
          participantId: 2,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 578,
          submittedAt: 1545000,
        },

        {
          participantId: 2,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 6,
          submittedAt: 3300000,
        },

        {
          participantId: 2,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 549,
          submittedAt: 2445000,
        },

        {
          participantId: 2,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 606,
          duration: 354,
          submittedAt: 975000,
        },

        {
          participantId: 2,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 82,
          submittedAt: 1810000,
        },

        {
          participantId: 2,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 562,
          submittedAt: 1360000,
        },

        {
          participantId: 2,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 394,
          submittedAt: 3015000,
        },

        {
          participantId: 2,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 481,
          submittedAt: 2130000,
        },

        {
          participantId: 2,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 231,
          submittedAt: 1775000,
        },

        {
          participantId: 2,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 550,
          submittedAt: 2075000,
        },

        {
          participantId: 2,
          contestProblemId: 7,
          verdict: "Accepted",
          points: null,
          duration: 73,
          submittedAt: 3255000,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 425,
          submittedAt: 755000,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 479,
          submittedAt: 3515000,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 294,
          submittedAt: 3035000,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 118,
          submittedAt: 1810000,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 191,
          submittedAt: 1355000,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 164,
          submittedAt: 1550000,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 377,
          submittedAt: 2285000,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 289,
          submittedAt: 3145000,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 144,
          submittedAt: 835000,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 389,
          submittedAt: 2645000,
        },

        {
          participantId: 3,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 570,
          submittedAt: 3255000,
        },

        {
          participantId: 3,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 23,
          submittedAt: 1025000,
        },

        {
          participantId: 3,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 86,
          duration: 481,
          submittedAt: 3025000,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 175,
          submittedAt: 1835000,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 345,
          submittedAt: 1525000,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 178,
          submittedAt: 2675000,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 345,
          submittedAt: 2145000,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 76,
          submittedAt: 3235000,
        },

        {
          participantId: 3,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 550,
          submittedAt: 245000,
        },

        {
          participantId: 3,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 105,
          submittedAt: 175000,
        },

        {
          participantId: 3,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 606,
          duration: 282,
          submittedAt: 1175000,
        },

        {
          participantId: 3,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 286,
          submittedAt: 2230000,
        },

        {
          participantId: 3,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 155,
          submittedAt: 2085000,
        },

        {
          participantId: 3,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 483,
          submittedAt: 1050000,
        },

        {
          participantId: 3,
          contestProblemId: 7,
          verdict: "Accepted",
          points: null,
          duration: 330,
          submittedAt: 2605000,
        },

        {
          participantId: 4,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 489,
          submittedAt: 2850000,
        },

        {
          participantId: 4,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 201,
          submittedAt: 3475000,
        },

        {
          participantId: 4,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 587,
          submittedAt: 2335000,
        },

        {
          participantId: 4,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 458,
          submittedAt: 1385000,
        },

        {
          participantId: 4,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 504,
          submittedAt: 2840000,
        },

        {
          participantId: 4,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 297,
          duration: 516,
          submittedAt: 1035000,
        },

        {
          participantId: 4,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 306,
          submittedAt: 2565000,
        },

        {
          participantId: 4,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 480,
          submittedAt: 870000,
        },

        {
          participantId: 4,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 554,
          submittedAt: 2530000,
        },

        {
          participantId: 4,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 452,
          submittedAt: 3080000,
        },

        {
          participantId: 4,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 230,
          submittedAt: 2540000,
        },

        {
          participantId: 4,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 332,
          submittedAt: 2925000,
        },

        {
          participantId: 4,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 80,
          duration: 95,
          submittedAt: 3550000,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 244,
          submittedAt: 2525000,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 572,
          submittedAt: 3390000,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 50,
          submittedAt: 65000,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 509,
          submittedAt: 3500000,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 396,
          submittedAt: 3490000,
        },

        {
          participantId: 4,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 222,
          submittedAt: 850000,
        },

        {
          participantId: 4,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 294,
          submittedAt: 2060000,
        },

        {
          participantId: 4,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 577,
          submittedAt: 1340000,
        },

        {
          participantId: 4,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 430,
          submittedAt: 2545000,
        },

        {
          participantId: 4,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 555,
          submittedAt: 2615000,
        },

        {
          participantId: 4,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 91,
          submittedAt: 1225000,
        },

        {
          participantId: 4,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 191,
          submittedAt: 2930000,
        },

        {
          participantId: 4,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 550,
          submittedAt: 735000,
        },

        {
          participantId: 4,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 238,
          submittedAt: 1410000,
        },

        {
          participantId: 4,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 346,
          submittedAt: 2490000,
        },

        {
          participantId: 5,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 282,
          submittedAt: 1485000,
        },

        {
          participantId: 5,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 134,
          submittedAt: 3515000,
        },

        {
          participantId: 5,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 32,
          duration: 351,
          submittedAt: 2960000,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 377,
          submittedAt: 300000,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 469,
          submittedAt: 2535000,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 196,
          submittedAt: 660000,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 534,
          submittedAt: 320000,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 169,
          submittedAt: 1365000,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 173,
          submittedAt: 995000,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 427,
          submittedAt: 1685000,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 172,
          submittedAt: 1620000,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 508,
          submittedAt: 2020000,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 55,
          submittedAt: 2965000,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 85,
          submittedAt: 750000,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 249,
          submittedAt: 2540000,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 153,
          submittedAt: 490000,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 242,
          submittedAt: 2185000,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 321,
          submittedAt: 2640000,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 76,
          submittedAt: 3525000,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 585,
          submittedAt: 3120000,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 30,
          submittedAt: 855000,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 367,
          submittedAt: 3590000,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 499,
          submittedAt: 3235000,
        },

        {
          participantId: 5,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 552,
          submittedAt: 970000,
        },

        {
          participantId: 5,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 481,
          submittedAt: 1265000,
        },

        {
          participantId: 5,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 73,
          submittedAt: 2270000,
        },

        {
          participantId: 5,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 597,
          submittedAt: 2545000,
        },

        {
          participantId: 5,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 42,
          submittedAt: 2180000,
        },

        {
          participantId: 5,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 494,
          submittedAt: 1635000,
        },

        {
          participantId: 5,
          contestProblemId: 7,
          verdict: "Accepted",
          points: null,
          duration: 553,
          submittedAt: 1405000,
        },

        {
          participantId: 6,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 374,
          submittedAt: 3020000,
        },

        {
          participantId: 6,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 590,
          submittedAt: 1565000,
        },

        {
          participantId: 6,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 114,
          duration: 199,
          submittedAt: 1315000,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 385,
          submittedAt: 2075000,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 380,
          submittedAt: 3485000,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 309,
          submittedAt: 90000,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 152,
          submittedAt: 1540000,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 30,
          submittedAt: 755000,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 510,
          submittedAt: 380000,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 523,
          submittedAt: 3190000,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 36,
          submittedAt: 3375000,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 363,
          submittedAt: 3520000,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 169,
          submittedAt: 1375000,
        },

        {
          participantId: 6,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 581,
          submittedAt: 710000,
        },

        {
          participantId: 6,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 282,
          submittedAt: 1685000,
        },

        {
          participantId: 6,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 598,
          submittedAt: 3030000,
        },

        {
          participantId: 6,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 223,
          duration: 8,
          submittedAt: 2285000,
        },

        {
          participantId: 6,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 445,
          submittedAt: 850000,
        },

        {
          participantId: 6,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 419,
          submittedAt: 1035000,
        },

        {
          participantId: 6,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 491,
          duration: 416,
          submittedAt: 1635000,
        },

        {
          participantId: 6,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 436,
          submittedAt: 750000,
        },

        {
          participantId: 6,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 490,
          submittedAt: 565000,
        },

        {
          participantId: 6,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 598,
          submittedAt: 1160000,
        },

        {
          participantId: 6,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 531,
          submittedAt: 1365000,
        },

        {
          participantId: 6,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 277,
          submittedAt: 3560000,
        },

        {
          participantId: 6,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 253,
          submittedAt: 2700000,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 305,
          submittedAt: 870000,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 469,
          submittedAt: 2785000,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 499,
          submittedAt: 2970000,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 395,
          submittedAt: 1515000,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 296,
          submittedAt: 505000,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 247,
          submittedAt: 2525000,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 555,
          submittedAt: 2330000,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 66,
          submittedAt: 2240000,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 440,
          submittedAt: 330000,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 448,
          submittedAt: 520000,
        },

        {
          participantId: 7,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 150,
          duration: 337,
          submittedAt: 3000000,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 569,
          submittedAt: 2460000,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 541,
          submittedAt: 3255000,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 485,
          duration: 536,
          submittedAt: 1175000,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 63,
          submittedAt: 255000,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 500,
          submittedAt: 2420000,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 507,
          submittedAt: 2805000,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 689,
          duration: 518,
          submittedAt: 645000,
        },

        {
          participantId: 7,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 430,
          submittedAt: 425000,
        },

        {
          participantId: 7,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 464,
          submittedAt: 1140000,
        },

        {
          participantId: 7,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 354,
          submittedAt: 1245000,
        },

        {
          participantId: 7,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 490,
          submittedAt: 2330000,
        },

        {
          participantId: 7,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 284,
          submittedAt: 1425000,
        },

        {
          participantId: 7,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 458,
          submittedAt: 400000,
        },

        {
          participantId: 7,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 361,
          submittedAt: 2825000,
        },

        {
          participantId: 7,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 514,
          submittedAt: 465000,
        },

        {
          participantId: 7,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 519,
          submittedAt: 180000,
        },

        {
          participantId: 7,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 436,
          submittedAt: 2550000,
        },

        {
          participantId: 8,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 317,
          submittedAt: 1205000,
        },

        {
          participantId: 8,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 584,
          submittedAt: 170000,
        },

        {
          participantId: 8,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 211,
          submittedAt: 825000,
        },

        {
          participantId: 8,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 41,
          duration: 482,
          submittedAt: 2580000,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 329,
          submittedAt: 100000,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 313,
          submittedAt: 1640000,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 597,
          submittedAt: 790000,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 1,
          submittedAt: 725000,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 116,
          submittedAt: 1305000,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 75,
          submittedAt: 3270000,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 580,
          submittedAt: 1885000,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 382,
          submittedAt: 1070000,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 452,
          submittedAt: 515000,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 5,
          submittedAt: 3025000,
        },

        {
          participantId: 8,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 324,
          submittedAt: 415000,
        },

        {
          participantId: 8,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 570,
          submittedAt: 3300000,
        },

        {
          participantId: 8,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 672,
          duration: 519,
          submittedAt: 240000,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 25,
          submittedAt: 825000,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 397,
          submittedAt: 2465000,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 214,
          submittedAt: 2435000,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 81,
          submittedAt: 2125000,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 127,
          submittedAt: 1900000,
        },

        {
          participantId: 8,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 512,
          submittedAt: 3310000,
        },

        {
          participantId: 8,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 306,
          submittedAt: 3395000,
        },

        {
          participantId: 8,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 207,
          submittedAt: 1715000,
        },

        {
          participantId: 8,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 445,
          submittedAt: 3405000,
        },

        {
          participantId: 8,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 218,
          submittedAt: 2245000,
        },

        {
          participantId: 8,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 315,
          submittedAt: 2260000,
        },

        {
          participantId: 8,
          contestProblemId: 7,
          verdict: "Accepted",
          points: null,
          duration: 282,
          submittedAt: 2955000,
        },

        {
          participantId: 9,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 429,
          submittedAt: 690000,
        },

        {
          participantId: 9,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 186,
          duration: 173,
          submittedAt: 80000,
        },

        {
          participantId: 9,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 64,
          submittedAt: 55000,
        },

        {
          participantId: 9,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 472,
          submittedAt: 1915000,
        },

        {
          participantId: 9,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 190,
          duration: 252,
          submittedAt: 1705000,
        },

        {
          participantId: 9,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 520,
          duration: 371,
          submittedAt: 535000,
        },

        {
          participantId: 9,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 55,
          submittedAt: 130000,
        },

        {
          participantId: 9,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 238,
          submittedAt: 455000,
        },

        {
          participantId: 9,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 541,
          submittedAt: 3525000,
        },

        {
          participantId: 9,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 161,
          duration: 165,
          submittedAt: 2595000,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 30,
          submittedAt: 2760000,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 162,
          submittedAt: 190000,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 426,
          submittedAt: 2550000,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 566,
          submittedAt: 1475000,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 342,
          submittedAt: 2395000,
        },

        {
          participantId: 9,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 483,
          submittedAt: 1090000,
        },

        {
          participantId: 9,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 23,
          submittedAt: 3585000,
        },

        {
          participantId: 9,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 43,
          submittedAt: 1810000,
        },

        {
          participantId: 9,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 24,
          submittedAt: 2540000,
        },

        {
          participantId: 9,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 108,
          submittedAt: 2525000,
        },

        {
          participantId: 9,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 541,
          submittedAt: 440000,
        },

        {
          participantId: 9,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 513,
          submittedAt: 525000,
        },

        {
          participantId: 9,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 483,
          submittedAt: 455000,
        },

        {
          participantId: 9,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 484,
          submittedAt: 935000,
        },

        {
          participantId: 9,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 594,
          submittedAt: 1270000,
        },

        {
          participantId: 10,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 116,
          duration: 397,
          submittedAt: 1680000,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 53,
          submittedAt: 3215000,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 117,
          submittedAt: 915000,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 461,
          submittedAt: 1845000,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 121,
          submittedAt: 1755000,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 40,
          duration: 373,
          submittedAt: 2875000,
        },

        {
          participantId: 10,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 114,
          submittedAt: 1920000,
        },

        {
          participantId: 10,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 91,
          duration: 283,
          submittedAt: 3195000,
        },

        {
          participantId: 10,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 263,
          duration: 423,
          submittedAt: 2685000,
        },

        {
          participantId: 10,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 593,
          submittedAt: 490000,
        },

        {
          participantId: 10,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 211,
          submittedAt: 1545000,
        },

        {
          participantId: 10,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 102,
          submittedAt: 3375000,
        },

        {
          participantId: 10,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 279,
          submittedAt: 360000,
        },

        {
          participantId: 10,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 676,
          duration: 14,
          submittedAt: 495000,
        },

        {
          participantId: 10,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 459,
          submittedAt: 1490000,
        },

        {
          participantId: 10,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 493,
          submittedAt: 280000,
        },

        {
          participantId: 10,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 183,
          submittedAt: 65000,
        },

        {
          participantId: 10,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 269,
          submittedAt: 1835000,
        },

        {
          participantId: 10,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 83,
          submittedAt: 2130000,
        },

        {
          participantId: 10,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 480,
          submittedAt: 3385000,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 485,
          submittedAt: 3410000,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 530,
          submittedAt: 1245000,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 205,
          submittedAt: 1605000,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 299,
          submittedAt: 3405000,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 441,
          submittedAt: 1155000,
        },

        {
          participantId: 11,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 367,
          duration: 418,
          submittedAt: 330000,
        },

        {
          participantId: 11,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 365,
          duration: 369,
          submittedAt: 1570000,
        },

        {
          participantId: 11,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 429,
          submittedAt: 10000,
        },

        {
          participantId: 11,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 407,
          submittedAt: 1755000,
        },

        {
          participantId: 11,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 205,
          submittedAt: 745000,
        },

        {
          participantId: 11,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 308,
          duration: 529,
          submittedAt: 1860000,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 22,
          submittedAt: 1660000,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 170,
          submittedAt: 1600000,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 309,
          duration: 222,
          submittedAt: 2365000,
        },

        {
          participantId: 11,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 323,
          submittedAt: 565000,
        },

        {
          participantId: 11,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 90,
          submittedAt: 3310000,
        },

        {
          participantId: 11,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 332,
          submittedAt: 555000,
        },

        {
          participantId: 11,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 204,
          submittedAt: 3535000,
        },

        {
          participantId: 11,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 49,
          submittedAt: 175000,
        },

        {
          participantId: 11,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 576,
          submittedAt: 2975000,
        },

        {
          participantId: 12,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 167,
          submittedAt: 1875000,
        },

        {
          participantId: 12,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 277,
          submittedAt: 3370000,
        },

        {
          participantId: 12,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 457,
          submittedAt: 2955000,
        },

        {
          participantId: 12,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 20,
          duration: 492,
          submittedAt: 3335000,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 239,
          submittedAt: 2335000,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 392,
          submittedAt: 2930000,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 164,
          submittedAt: 1090000,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 365,
          submittedAt: 490000,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 475,
          submittedAt: 3040000,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 524,
          submittedAt: 1795000,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 376,
          submittedAt: 1725000,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 402,
          submittedAt: 2495000,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 259,
          submittedAt: 2265000,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 11,
          submittedAt: 480000,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 52,
          submittedAt: 785000,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 455,
          submittedAt: 2510000,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 183,
          submittedAt: 590000,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 588,
          submittedAt: 1450000,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 147,
          duration: 526,
          submittedAt: 2465000,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 349,
          submittedAt: 965000,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 392,
          submittedAt: 1555000,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 323,
          submittedAt: 25000,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 553,
          submittedAt: 465000,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 174,
          submittedAt: 3015000,
        },

        {
          participantId: 12,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 480,
          submittedAt: 645000,
        },

        {
          participantId: 12,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 82,
          submittedAt: 2655000,
        },

        {
          participantId: 12,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 228,
          submittedAt: 3185000,
        },

        {
          participantId: 12,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 270,
          submittedAt: 1810000,
        },

        {
          participantId: 12,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 589,
          submittedAt: 220000,
        },

        {
          participantId: 12,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 531,
          submittedAt: 710000,
        },

        {
          participantId: 12,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 504,
          submittedAt: 2680000,
        },

        {
          participantId: 12,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 206,
          submittedAt: 2625000,
        },

        {
          participantId: 12,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 155,
          submittedAt: 2450000,
        },

        {
          participantId: 12,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 344,
          submittedAt: 2435000,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 367,
          submittedAt: 3300000,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 202,
          submittedAt: 1025000,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 159,
          submittedAt: 2160000,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 449,
          submittedAt: 1800000,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 355,
          submittedAt: 3250000,
        },

        {
          participantId: 13,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 220,
          duration: 596,
          submittedAt: 1805000,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 155,
          submittedAt: 3175000,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 84,
          submittedAt: 1785000,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 425,
          submittedAt: 490000,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 178,
          submittedAt: 760000,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 58,
          submittedAt: 1885000,
        },

        {
          participantId: 13,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 535,
          submittedAt: 750000,
        },

        {
          participantId: 13,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 173,
          submittedAt: 2835000,
        },

        {
          participantId: 13,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 485,
          duration: 363,
          submittedAt: 1175000,
        },

        {
          participantId: 13,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 23,
          submittedAt: 2715000,
        },

        {
          participantId: 13,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 236,
          submittedAt: 10000,
        },

        {
          participantId: 13,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 524,
          submittedAt: 2845000,
        },

        {
          participantId: 13,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 100,
          duration: 246,
          submittedAt: 3150000,
        },

        {
          participantId: 13,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 228,
          submittedAt: 3525000,
        },

        {
          participantId: 13,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 529,
          submittedAt: 170000,
        },

        {
          participantId: 13,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 537,
          submittedAt: 1490000,
        },

        {
          participantId: 13,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 137,
          submittedAt: 2655000,
        },

        {
          participantId: 13,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 139,
          submittedAt: 2715000,
        },

        {
          participantId: 13,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 155,
          submittedAt: 3445000,
        },

        {
          participantId: 13,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 20,
          submittedAt: 1140000,
        },

        {
          participantId: 13,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 378,
          submittedAt: 2485000,
        },

        {
          participantId: 13,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 19,
          submittedAt: 610000,
        },

        {
          participantId: 13,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 375,
          submittedAt: 1640000,
        },

        {
          participantId: 14,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 189,
          duration: 389,
          submittedAt: 215000,
        },

        {
          participantId: 14,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 212,
          submittedAt: 3495000,
        },

        {
          participantId: 14,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 291,
          duration: 84,
          submittedAt: 890000,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 479,
          submittedAt: 2295000,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 569,
          submittedAt: 120000,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 287,
          submittedAt: 1110000,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 168,
          duration: 293,
          submittedAt: 2280000,
        },

        {
          participantId: 14,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 136,
          submittedAt: 2920000,
        },

        {
          participantId: 14,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 53,
          submittedAt: 165000,
        },

        {
          participantId: 14,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 110,
          duration: 189,
          submittedAt: 3050000,
        },

        {
          participantId: 14,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 395,
          submittedAt: 3215000,
        },

        {
          participantId: 14,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 544,
          duration: 262,
          submittedAt: 1625000,
        },

        {
          participantId: 14,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 518,
          submittedAt: 890000,
        },

        {
          participantId: 14,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 298,
          submittedAt: 2690000,
        },

        {
          participantId: 14,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 92,
          submittedAt: 575000,
        },

        {
          participantId: 14,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 195,
          submittedAt: 375000,
        },

        {
          participantId: 14,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 492,
          submittedAt: 3095000,
        },

        {
          participantId: 14,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 537,
          submittedAt: 425000,
        },

        {
          participantId: 14,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 276,
          submittedAt: 3535000,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 107,
          submittedAt: 675000,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 403,
          submittedAt: 605000,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 421,
          submittedAt: 2935000,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 210,
          submittedAt: 445000,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 141,
          duration: 278,
          submittedAt: 380000,
        },

        {
          participantId: 15,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 149,
          submittedAt: 3320000,
        },

        {
          participantId: 15,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 310,
          duration: 254,
          submittedAt: 700000,
        },

        {
          participantId: 15,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 369,
          submittedAt: 215000,
        },

        {
          participantId: 15,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 100,
          duration: 196,
          submittedAt: 3135000,
        },

        {
          participantId: 15,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 338,
          submittedAt: 1390000,
        },

        {
          participantId: 15,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 463,
          submittedAt: 2490000,
        },

        {
          participantId: 15,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 124,
          submittedAt: 190000,
        },

        {
          participantId: 15,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 80,
          duration: 107,
          submittedAt: 3240000,
        },

        {
          participantId: 15,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 369,
          duration: 428,
          submittedAt: 2525000,
        },

        {
          participantId: 15,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 396,
          submittedAt: 950000,
        },

        {
          participantId: 15,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 490,
          submittedAt: 3225000,
        },

        {
          participantId: 15,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 154,
          submittedAt: 2890000,
        },

        {
          participantId: 15,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 272,
          submittedAt: 2415000,
        },

        {
          participantId: 15,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 305,
          submittedAt: 355000,
        },

        {
          participantId: 15,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 38,
          submittedAt: 145000,
        },

        {
          participantId: 15,
          contestProblemId: 7,
          verdict: "Accepted",
          points: null,
          duration: 289,
          submittedAt: 2630000,
        },

        {
          participantId: 16,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 392,
          submittedAt: 2735000,
        },

        {
          participantId: 16,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 222,
          submittedAt: 2490000,
        },

        {
          participantId: 16,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 418,
          submittedAt: 1675000,
        },

        {
          participantId: 16,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 25,
          submittedAt: 230000,
        },

        {
          participantId: 16,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 134,
          submittedAt: 2255000,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 339,
          submittedAt: 1720000,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 198,
          submittedAt: 2150000,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 260,
          submittedAt: 680000,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 206,
          duration: 312,
          submittedAt: 1345000,
        },

        {
          participantId: 16,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 543,
          duration: 513,
          submittedAt: 380000,
        },

        {
          participantId: 16,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 18,
          submittedAt: 760000,
        },

        {
          participantId: 16,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 193,
          submittedAt: 515000,
        },

        {
          participantId: 16,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 399,
          submittedAt: 1165000,
        },

        {
          participantId: 16,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 425,
          submittedAt: 1120000,
        },

        {
          participantId: 16,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 319,
          submittedAt: 2715000,
        },

        {
          participantId: 16,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 202,
          submittedAt: 2185000,
        },

        {
          participantId: 16,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 191,
          submittedAt: 690000,
        },

        {
          participantId: 16,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 293,
          duration: 590,
          submittedAt: 2430000,
        },

        {
          participantId: 16,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 125,
          submittedAt: 1280000,
        },

        {
          participantId: 16,
          contestProblemId: 6,
          verdict: "Accepted",
          points: null,
          duration: 447,
          submittedAt: 110000,
        },

        {
          participantId: 16,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 283,
          submittedAt: 1115000,
        },

        {
          participantId: 16,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 352,
          submittedAt: 65000,
        },

        {
          participantId: 16,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 187,
          submittedAt: 3385000,
        },

        {
          participantId: 16,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 93,
          submittedAt: 1070000,
        },

        {
          participantId: 16,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 496,
          submittedAt: 2245000,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 565,
          submittedAt: 1405000,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 21,
          submittedAt: 1920000,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 425,
          submittedAt: 2110000,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 550,
          submittedAt: 2845000,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 461,
          submittedAt: 1620000,
        },

        {
          participantId: 17,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 284,
          duration: 167,
          submittedAt: 1160000,
        },

        {
          participantId: 17,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 75,
          submittedAt: 930000,
        },

        {
          participantId: 17,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 205,
          submittedAt: 635000,
        },

        {
          participantId: 17,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 538,
          duration: 485,
          submittedAt: 15000,
        },

        {
          participantId: 17,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 384,
          submittedAt: 705000,
        },

        {
          participantId: 17,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 421,
          submittedAt: 760000,
        },

        {
          participantId: 17,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 255,
          duration: 80,
          submittedAt: 2325000,
        },

        {
          participantId: 17,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 584,
          submittedAt: 1505000,
        },

        {
          participantId: 17,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 512,
          submittedAt: 455000,
        },

        {
          participantId: 17,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 269,
          duration: 277,
          submittedAt: 2525000,
        },

        {
          participantId: 17,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 368,
          submittedAt: 765000,
        },

        {
          participantId: 17,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 482,
          submittedAt: 1170000,
        },

        {
          participantId: 17,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 359,
          submittedAt: 2785000,
        },

        {
          participantId: 17,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 550,
          submittedAt: 1050000,
        },

        {
          participantId: 17,
          contestProblemId: 6,
          verdict: "Wrong answer",
          points: 0,
          duration: 27,
          submittedAt: 2530000,
        },

        {
          participantId: 17,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 390,
          submittedAt: 760000,
        },

        {
          participantId: 17,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 298,
          submittedAt: 2045000,
        },

        {
          participantId: 17,
          contestProblemId: 7,
          verdict: "Wrong answer",
          points: 0,
          duration: 131,
          submittedAt: 2120000,
        },

        {
          participantId: 17,
          contestProblemId: 7,
          verdict: "Accepted",
          points: null,
          duration: 491,
          submittedAt: 1040000,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', 100, {});
     */
    await queryInterface.bulkDelete("ContestSubmissions", 100, {});
  },
};
