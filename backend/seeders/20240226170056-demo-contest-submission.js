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
          verdict: "Wrong answer",
          points: 0,
          duration: 296,
          submittedAt: 1770792,
        },

        {
          participantId: 1,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 205,
          submittedAt: 1385963,
        },

        {
          participantId: 1,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 348,
          submittedAt: 2821633,
        },

        {
          participantId: 1,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 575,
          submittedAt: 2587702,
        },

        {
          participantId: 1,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 513,
          submittedAt: 1110652,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 364,
          submittedAt: 1855837,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 177,
          submittedAt: 3002257,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 277,
          submittedAt: 2767322,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 167,
          submittedAt: 2620680,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 424,
          submittedAt: 2466273,
        },

        {
          participantId: 2,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 378,
          submittedAt: 1826221,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 471,
          submittedAt: 1813056,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 534,
          submittedAt: 1881591,
        },

        {
          participantId: 2,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 212,
          submittedAt: 2272971,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 88,
          submittedAt: 2804770,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 222,
          submittedAt: 3347177,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 154,
          submittedAt: 1990174,
        },

        {
          participantId: 3,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 300,
          submittedAt: 648712,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 53,
          submittedAt: 1148196,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 95,
          submittedAt: 1420210,
        },

        {
          participantId: 3,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 92,
          submittedAt: 2106606,
        },

        {
          participantId: 4,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 510,
          submittedAt: 3344969,
        },

        {
          participantId: 4,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 239,
          submittedAt: 2585438,
        },

        {
          participantId: 4,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 140,
          submittedAt: 1660892,
        },

        {
          participantId: 4,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 417,
          submittedAt: 473371,
        },

        {
          participantId: 4,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 573,
          submittedAt: 3363148,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 512,
          submittedAt: 2414206,
        },

        {
          participantId: 5,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 249,
          submittedAt: 2405358,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 553,
          submittedAt: 2118869,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 16,
          submittedAt: 3371356,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 589,
          submittedAt: 67989,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 488,
          submittedAt: 3334457,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 244,
          submittedAt: 2295967,
        },

        {
          participantId: 6,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 90,
          submittedAt: 2499033,
        },

        {
          participantId: 6,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 277,
          submittedAt: 2404859,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 160,
          submittedAt: 1072434,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 332,
          submittedAt: 3507677,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 311,
          submittedAt: 1509398,
        },

        {
          participantId: 6,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 559,
          submittedAt: 1345234,
        },

        {
          participantId: 6,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 147,
          submittedAt: 1810117,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 397,
          submittedAt: 1869907,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 467,
          submittedAt: 1415569,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 57,
          submittedAt: 482634,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 580,
          submittedAt: 2146133,
        },

        {
          participantId: 7,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 66,
          submittedAt: 2858244,
        },

        {
          participantId: 7,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 104,
          submittedAt: 535023,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 106,
          submittedAt: 3501566,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 124,
          submittedAt: 3306760,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 444,
          submittedAt: 685687,
        },

        {
          participantId: 8,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 277,
          submittedAt: 1800961,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 247,
          submittedAt: 1800626,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 160,
          submittedAt: 1854053,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 169,
          submittedAt: 1687149,
        },

        {
          participantId: 8,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 16,
          submittedAt: 653501,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 130,
          submittedAt: 3565825,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 355,
          submittedAt: 3145823,
        },

        {
          participantId: 9,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 461,
          submittedAt: 1915707,
        },

        {
          participantId: 9,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 7,
          submittedAt: 1568361,
        },

        {
          participantId: 9,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 66,
          submittedAt: 1939227,
        },

        {
          participantId: 9,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 264,
          submittedAt: 2775910,
        },

        {
          participantId: 9,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 168,
          submittedAt: 2750579,
        },

        {
          participantId: 9,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 208,
          submittedAt: 404163,
        },

        {
          participantId: 9,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 577,
          submittedAt: 1732662,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 478,
          submittedAt: 1800979,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 282,
          submittedAt: 1300442,
        },

        {
          participantId: 10,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 310,
          submittedAt: 11888,
        },

        {
          participantId: 10,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 374,
          submittedAt: 52336,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 515,
          submittedAt: 487676,
        },

        {
          participantId: 10,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 189,
          submittedAt: 3577599,
        },

        {
          participantId: 10,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 141,
          submittedAt: 1684874,
        },

        {
          participantId: 10,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 330,
          submittedAt: 2515621,
        },

        {
          participantId: 10,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 212,
          submittedAt: 2436655,
        },

        {
          participantId: 10,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 544,
          submittedAt: 804153,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 418,
          submittedAt: 228930,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 512,
          submittedAt: 482189,
        },

        {
          participantId: 11,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 531,
          submittedAt: 3307642,
        },

        {
          participantId: 11,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 234,
          submittedAt: 186653,
        },

        {
          participantId: 11,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 17,
          submittedAt: 3058206,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 592,
          submittedAt: 2810233,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 270,
          submittedAt: 243090,
        },

        {
          participantId: 12,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 98,
          submittedAt: 723429,
        },

        {
          participantId: 12,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 417,
          submittedAt: 1764031,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 478,
          submittedAt: 923500,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 507,
          submittedAt: 2126130,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 136,
          submittedAt: 2426795,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 496,
          submittedAt: 2382724,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 342,
          submittedAt: 718287,
        },

        {
          participantId: 13,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 599,
          submittedAt: 1814058,
        },

        {
          participantId: 13,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 123,
          submittedAt: 2592120,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 134,
          submittedAt: 2500884,
        },

        {
          participantId: 13,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 60,
          submittedAt: 3373905,
        },

        {
          participantId: 13,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 372,
          submittedAt: 671076,
        },

        {
          participantId: 13,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 480,
          submittedAt: 3467154,
        },

        {
          participantId: 14,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 496,
          submittedAt: 3065955,
        },

        {
          participantId: 14,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 281,
          submittedAt: 316788,
        },

        {
          participantId: 14,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 107,
          submittedAt: 2320670,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 139,
          submittedAt: 268264,
        },

        {
          participantId: 14,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 377,
          submittedAt: 933596,
        },

        {
          participantId: 14,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 4,
          submittedAt: 3055151,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 200,
          submittedAt: 1505005,
        },

        {
          participantId: 15,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 332,
          submittedAt: 1328925,
        },

        {
          participantId: 15,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 572,
          submittedAt: 1777985,
        },

        {
          participantId: 15,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 595,
          submittedAt: 335583,
        },

        {
          participantId: 15,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 551,
          submittedAt: 2070130,
        },

        {
          participantId: 15,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 419,
          submittedAt: 674925,
        },

        {
          participantId: 16,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 161,
          submittedAt: 250288,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 10,
          submittedAt: 2203200,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 502,
          submittedAt: 777109,
        },

        {
          participantId: 16,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 235,
          submittedAt: 3045203,
        },

        {
          participantId: 16,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 198,
          submittedAt: 270687,
        },

        {
          participantId: 16,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 107,
          submittedAt: 3327424,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 260,
          submittedAt: 542726,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 139,
          submittedAt: 1304391,
        },

        {
          participantId: 17,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 444,
          submittedAt: 491551,
        },

        {
          participantId: 17,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 324,
          submittedAt: 3348145,
        },

        {
          participantId: 17,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 277,
          submittedAt: 136651,
        },

        {
          participantId: 17,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 18,
          submittedAt: 2261608,
        },

        {
          participantId: 18,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 36,
          submittedAt: 1039041,
        },

        {
          participantId: 18,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 249,
          submittedAt: 2834041,
        },

        {
          participantId: 18,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 147,
          submittedAt: 2262238,
        },

        {
          participantId: 18,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 268,
          submittedAt: 1875777,
        },

        {
          participantId: 18,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 259,
          submittedAt: 335004,
        },

        {
          participantId: 18,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 355,
          submittedAt: 2775492,
        },

        {
          participantId: 18,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 478,
          submittedAt: 2672682,
        },

        {
          participantId: 18,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 354,
          submittedAt: 2660899,
        },

        {
          participantId: 18,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 389,
          submittedAt: 1014462,
        },

        {
          participantId: 19,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 50,
          submittedAt: 2406120,
        },

        {
          participantId: 19,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 523,
          submittedAt: 901819,
        },

        {
          participantId: 19,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 507,
          submittedAt: 720505,
        },

        {
          participantId: 19,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 587,
          submittedAt: 171642,
        },

        {
          participantId: 19,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 559,
          submittedAt: 403121,
        },

        {
          participantId: 19,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 337,
          submittedAt: 1952799,
        },

        {
          participantId: 19,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 555,
          submittedAt: 1559256,
        },

        {
          participantId: 20,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 409,
          submittedAt: 163736,
        },

        {
          participantId: 20,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 358,
          submittedAt: 2393534,
        },

        {
          participantId: 20,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 375,
          submittedAt: 532673,
        },

        {
          participantId: 20,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 482,
          submittedAt: 2765777,
        },

        {
          participantId: 20,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 458,
          submittedAt: 3596135,
        },

        {
          participantId: 20,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 397,
          submittedAt: 524603,
        },

        {
          participantId: 21,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 530,
          submittedAt: 1658158,
        },

        {
          participantId: 21,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 86,
          submittedAt: 3498053,
        },

        {
          participantId: 21,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 421,
          submittedAt: 629208,
        },

        {
          participantId: 21,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 264,
          submittedAt: 681990,
        },

        {
          participantId: 21,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 522,
          submittedAt: 2068511,
        },

        {
          participantId: 21,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 323,
          submittedAt: 1552125,
        },

        {
          participantId: 21,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 75,
          submittedAt: 2426897,
        },

        {
          participantId: 22,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 295,
          submittedAt: 440004,
        },

        {
          participantId: 22,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 353,
          submittedAt: 2057770,
        },

        {
          participantId: 22,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 184,
          submittedAt: 2089691,
        },

        {
          participantId: 22,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 409,
          submittedAt: 865796,
        },

        {
          participantId: 22,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 333,
          submittedAt: 3465302,
        },

        {
          participantId: 22,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 486,
          submittedAt: 3159328,
        },

        {
          participantId: 22,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 26,
          submittedAt: 1493448,
        },

        {
          participantId: 22,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 553,
          submittedAt: 3507653,
        },

        {
          participantId: 23,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 480,
          submittedAt: 1183040,
        },

        {
          participantId: 23,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 50,
          submittedAt: 3336296,
        },

        {
          participantId: 23,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 198,
          submittedAt: 2971084,
        },

        {
          participantId: 23,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 156,
          submittedAt: 1910815,
        },

        {
          participantId: 23,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 489,
          submittedAt: 1812103,
        },

        {
          participantId: 23,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 112,
          submittedAt: 855925,
        },

        {
          participantId: 23,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 57,
          submittedAt: 1651175,
        },

        {
          participantId: 23,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 567,
          submittedAt: 104068,
        },

        {
          participantId: 24,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 561,
          submittedAt: 1210181,
        },

        {
          participantId: 24,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 398,
          submittedAt: 540231,
        },

        {
          participantId: 24,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 48,
          submittedAt: 1253306,
        },

        {
          participantId: 24,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 388,
          submittedAt: 1555459,
        },

        {
          participantId: 24,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 577,
          submittedAt: 700041,
        },

        {
          participantId: 24,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 189,
          submittedAt: 1055131,
        },

        {
          participantId: 24,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 574,
          submittedAt: 181695,
        },

        {
          participantId: 24,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 412,
          submittedAt: 3211335,
        },

        {
          participantId: 25,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 484,
          submittedAt: 874758,
        },

        {
          participantId: 25,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 479,
          submittedAt: 2287062,
        },

        {
          participantId: 25,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 286,
          submittedAt: 547421,
        },

        {
          participantId: 25,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 202,
          submittedAt: 2816199,
        },

        {
          participantId: 25,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 222,
          submittedAt: 3476663,
        },

        {
          participantId: 25,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 236,
          submittedAt: 110264,
        },

        {
          participantId: 25,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 439,
          submittedAt: 3161884,
        },

        {
          participantId: 25,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 299,
          submittedAt: 69299,
        },

        {
          participantId: 26,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 415,
          submittedAt: 178170,
        },

        {
          participantId: 26,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 308,
          submittedAt: 680055,
        },

        {
          participantId: 26,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 542,
          submittedAt: 2192563,
        },

        {
          participantId: 26,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 247,
          submittedAt: 649959,
        },

        {
          participantId: 26,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 467,
          submittedAt: 204644,
        },

        {
          participantId: 26,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 148,
          submittedAt: 768152,
        },

        {
          participantId: 27,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 28,
          submittedAt: 1766463,
        },

        {
          participantId: 27,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 18,
          submittedAt: 42752,
        },

        {
          participantId: 27,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 145,
          submittedAt: 2295214,
        },

        {
          participantId: 27,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 240,
          submittedAt: 3056130,
        },

        {
          participantId: 27,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 375,
          submittedAt: 24347,
        },

        {
          participantId: 27,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 567,
          submittedAt: 2779140,
        },

        {
          participantId: 27,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 236,
          submittedAt: 730616,
        },

        {
          participantId: 27,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 332,
          submittedAt: 3390155,
        },

        {
          participantId: 28,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 96,
          submittedAt: 2924550,
        },

        {
          participantId: 28,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 266,
          submittedAt: 2995046,
        },

        {
          participantId: 28,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 448,
          submittedAt: 2111925,
        },

        {
          participantId: 28,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 434,
          submittedAt: 2126164,
        },

        {
          participantId: 28,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 445,
          submittedAt: 2346627,
        },

        {
          participantId: 28,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 139,
          submittedAt: 2029497,
        },

        {
          participantId: 28,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 520,
          submittedAt: 2367891,
        },

        {
          participantId: 29,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 448,
          submittedAt: 595915,
        },

        {
          participantId: 29,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 211,
          submittedAt: 2120287,
        },

        {
          participantId: 29,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 166,
          submittedAt: 2825562,
        },

        {
          participantId: 29,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 102,
          submittedAt: 2805846,
        },

        {
          participantId: 29,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 257,
          submittedAt: 1445672,
        },

        {
          participantId: 29,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 182,
          submittedAt: 2132867,
        },

        {
          participantId: 29,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 311,
          submittedAt: 640868,
        },

        {
          participantId: 29,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 518,
          submittedAt: 2538906,
        },

        {
          participantId: 30,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 155,
          submittedAt: 67055,
        },

        {
          participantId: 30,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 150,
          submittedAt: 2547852,
        },

        {
          participantId: 30,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 31,
          submittedAt: 1288564,
        },

        {
          participantId: 30,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 5,
          submittedAt: 3403005,
        },

        {
          participantId: 30,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 573,
          submittedAt: 1999512,
        },

        {
          participantId: 30,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 216,
          submittedAt: 467114,
        },

        {
          participantId: 31,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 12,
          submittedAt: 614796,
        },

        {
          participantId: 31,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 114,
          submittedAt: 2445504,
        },

        {
          participantId: 31,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 328,
          submittedAt: 65331,
        },

        {
          participantId: 31,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 546,
          submittedAt: 2080505,
        },

        {
          participantId: 31,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 27,
          submittedAt: 1695641,
        },

        {
          participantId: 31,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 485,
          submittedAt: 2416873,
        },

        {
          participantId: 31,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 187,
          submittedAt: 1535978,
        },

        {
          participantId: 31,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 263,
          submittedAt: 3518197,
        },

        {
          participantId: 32,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 206,
          submittedAt: 2033519,
        },

        {
          participantId: 32,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 377,
          submittedAt: 1058511,
        },

        {
          participantId: 32,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 200,
          submittedAt: 1332462,
        },

        {
          participantId: 32,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 200,
          submittedAt: 3332360,
        },

        {
          participantId: 32,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 40,
          submittedAt: 413215,
        },

        {
          participantId: 32,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 279,
          submittedAt: 1106129,
        },

        {
          participantId: 32,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 306,
          submittedAt: 3028101,
        },

        {
          participantId: 32,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 371,
          submittedAt: 3586550,
        },

        {
          participantId: 32,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 171,
          submittedAt: 2440402,
        },

        {
          participantId: 33,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 203,
          submittedAt: 2561257,
        },

        {
          participantId: 33,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 426,
          submittedAt: 753701,
        },

        {
          participantId: 33,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 127,
          submittedAt: 2060284,
        },

        {
          participantId: 33,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 395,
          submittedAt: 866188,
        },

        {
          participantId: 33,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 492,
          submittedAt: 909570,
        },

        {
          participantId: 33,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 528,
          submittedAt: 508782,
        },

        {
          participantId: 33,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 165,
          submittedAt: 874904,
        },

        {
          participantId: 34,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 373,
          submittedAt: 3390918,
        },

        {
          participantId: 34,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 313,
          submittedAt: 410440,
        },

        {
          participantId: 34,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 390,
          submittedAt: 2284348,
        },

        {
          participantId: 34,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 578,
          submittedAt: 3318064,
        },

        {
          participantId: 34,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 328,
          submittedAt: 1930380,
        },

        {
          participantId: 34,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 51,
          submittedAt: 210609,
        },

        {
          participantId: 34,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 481,
          submittedAt: 157479,
        },

        {
          participantId: 34,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 477,
          submittedAt: 412236,
        },

        {
          participantId: 34,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 279,
          submittedAt: 461728,
        },

        {
          participantId: 35,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 431,
          submittedAt: 579870,
        },

        {
          participantId: 35,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 509,
          submittedAt: 1505895,
        },

        {
          participantId: 35,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 412,
          submittedAt: 654939,
        },

        {
          participantId: 35,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 380,
          submittedAt: 2602264,
        },

        {
          participantId: 35,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 565,
          submittedAt: 3581590,
        },

        {
          participantId: 35,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 226,
          submittedAt: 1332519,
        },

        {
          participantId: 36,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 197,
          submittedAt: 63916,
        },

        {
          participantId: 36,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 529,
          submittedAt: 1715585,
        },

        {
          participantId: 36,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 556,
          submittedAt: 23018,
        },

        {
          participantId: 36,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 429,
          submittedAt: 2476461,
        },

        {
          participantId: 36,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 324,
          submittedAt: 813722,
        },

        {
          participantId: 36,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 449,
          submittedAt: 3389434,
        },

        {
          participantId: 36,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 360,
          submittedAt: 1140190,
        },

        {
          participantId: 37,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 519,
          submittedAt: 995457,
        },

        {
          participantId: 37,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 155,
          submittedAt: 748293,
        },

        {
          participantId: 37,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 355,
          submittedAt: 1627588,
        },

        {
          participantId: 37,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 10,
          submittedAt: 1194472,
        },

        {
          participantId: 37,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 102,
          submittedAt: 1622829,
        },

        {
          participantId: 37,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 54,
          submittedAt: 446106,
        },

        {
          participantId: 37,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 443,
          submittedAt: 2181180,
        },

        {
          participantId: 37,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 385,
          submittedAt: 2229760,
        },

        {
          participantId: 37,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 183,
          submittedAt: 1854388,
        },

        {
          participantId: 38,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 315,
          submittedAt: 830535,
        },

        {
          participantId: 38,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 599,
          submittedAt: 2687632,
        },

        {
          participantId: 38,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 316,
          submittedAt: 220578,
        },

        {
          participantId: 38,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 389,
          submittedAt: 2945638,
        },

        {
          participantId: 38,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 418,
          submittedAt: 3343660,
        },

        {
          participantId: 38,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 159,
          submittedAt: 3068199,
        },

        {
          participantId: 38,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 48,
          submittedAt: 321028,
        },

        {
          participantId: 38,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 377,
          submittedAt: 1986254,
        },

        {
          participantId: 39,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 207,
          submittedAt: 573810,
        },

        {
          participantId: 39,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 379,
          submittedAt: 2043235,
        },

        {
          participantId: 39,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 274,
          submittedAt: 3138178,
        },

        {
          participantId: 39,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 509,
          submittedAt: 1633449,
        },

        {
          participantId: 39,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 512,
          submittedAt: 2057482,
        },

        {
          participantId: 39,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 404,
          submittedAt: 934870,
        },

        {
          participantId: 40,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 243,
          submittedAt: 242942,
        },

        {
          participantId: 40,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 442,
          submittedAt: 442958,
        },

        {
          participantId: 40,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 458,
          submittedAt: 2547240,
        },

        {
          participantId: 40,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 399,
          submittedAt: 2097633,
        },

        {
          participantId: 40,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 255,
          submittedAt: 1661047,
        },

        {
          participantId: 40,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 284,
          submittedAt: 3406087,
        },

        {
          participantId: 40,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 434,
          submittedAt: 147629,
        },

        {
          participantId: 40,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 397,
          submittedAt: 2743684,
        },

        {
          participantId: 40,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 351,
          submittedAt: 2463041,
        },

        {
          participantId: 41,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 230,
          submittedAt: 394947,
        },

        {
          participantId: 41,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 117,
          submittedAt: 1610579,
        },

        {
          participantId: 41,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 509,
          submittedAt: 3461537,
        },

        {
          participantId: 41,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 464,
          submittedAt: 2560166,
        },

        {
          participantId: 41,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 95,
          submittedAt: 1748712,
        },

        {
          participantId: 41,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 120,
          submittedAt: 2550512,
        },

        {
          participantId: 42,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 528,
          submittedAt: 2611765,
        },

        {
          participantId: 42,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 309,
          submittedAt: 3172132,
        },

        {
          participantId: 42,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 203,
          submittedAt: 3150539,
        },

        {
          participantId: 42,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 195,
          submittedAt: 165782,
        },

        {
          participantId: 42,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 3,
          submittedAt: 2437492,
        },

        {
          participantId: 42,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 57,
          submittedAt: 3161670,
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
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ContestSubmissions", null, {});
  },
};
