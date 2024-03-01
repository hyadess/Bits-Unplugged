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
          points: 200,
          duration: 324,
          submittedAt: 2551942,
        },

        {
          participantId: 1,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 248,
          submittedAt: 1990154,
        },

        {
          participantId: 1,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 590,
          submittedAt: 3340932,
        },

        {
          participantId: 1,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 788,
          duration: 31,
          submittedAt: 1698001,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 989,
          duration: 82,
          submittedAt: 3327639,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 350,
          submittedAt: 286428,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 544,
          submittedAt: 373596,
        },

        {
          participantId: 2,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 598,
          duration: 109,
          submittedAt: 1427077,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 293,
          submittedAt: 951898,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 78,
          submittedAt: 2258142,
        },

        {
          participantId: 2,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 997,
          duration: 73,
          submittedAt: 995489,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 198,
          duration: 13,
          submittedAt: 624761,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 430,
          submittedAt: 1212546,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 110,
          submittedAt: 360722,
        },

        {
          participantId: 3,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 597,
          duration: 43,
          submittedAt: 791055,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 438,
          submittedAt: 2434188,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 506,
          submittedAt: 1744691,
        },

        {
          participantId: 3,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 73,
          submittedAt: 2550455,
        },

        {
          participantId: 3,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 500,
          duration: 511,
          submittedAt: 1054823,
        },

        {
          participantId: 4,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 198,
          duration: 52,
          submittedAt: 2614487,
        },

        {
          participantId: 4,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 355,
          submittedAt: 211682,
        },

        {
          participantId: 4,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 389,
          submittedAt: 409034,
        },

        {
          participantId: 4,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 798,
          duration: 188,
          submittedAt: 2520987,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 109,
          submittedAt: 2678741,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 500,
          duration: 408,
          submittedAt: 2122142,
        },

        {
          participantId: 5,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 309,
          submittedAt: 3540846,
        },

        {
          participantId: 5,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 324,
          submittedAt: 2294889,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 518,
          submittedAt: 1254422,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 510,
          submittedAt: 1636623,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 76,
          submittedAt: 3422643,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 103,
          submittedAt: 1197569,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 283,
          submittedAt: 1015982,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 954,
          duration: 13,
          submittedAt: 2183669,
        },

        {
          participantId: 6,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 518,
          submittedAt: 2161014,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 535,
          submittedAt: 3544083,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 292,
          submittedAt: 2553052,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 346,
          submittedAt: 1874863,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 369,
          submittedAt: 690075,
        },

        {
          participantId: 6,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 768,
          duration: 12,
          submittedAt: 1747859,
        },

        {
          participantId: 6,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 532,
          submittedAt: 1004003,
        },

        {
          participantId: 6,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 79,
          submittedAt: 1956530,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 425,
          submittedAt: 2510466,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 146,
          submittedAt: 583548,
        },

        {
          participantId: 7,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 318,
          submittedAt: 709603,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 76,
          submittedAt: 2069512,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 574,
          submittedAt: 1534432,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 477,
          submittedAt: 3264863,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 494,
          duration: 13,
          submittedAt: 584006,
        },

        {
          participantId: 8,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 260,
          submittedAt: 921607,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 525,
          submittedAt: 3320085,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 569,
          submittedAt: 953610,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 597,
          duration: 89,
          submittedAt: 1766448,
        },

        {
          participantId: 8,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 122,
          submittedAt: 2585176,
        },

        {
          participantId: 8,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 399,
          duration: 344,
          submittedAt: 3463802,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 436,
          submittedAt: 2781036,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 133,
          submittedAt: 34860,
        },

        {
          participantId: 9,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 399,
          submittedAt: 932214,
        },

        {
          participantId: 9,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 419,
          submittedAt: 2364094,
        },

        {
          participantId: 9,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 599,
          duration: 336,
          submittedAt: 2657276,
        },

        {
          participantId: 9,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 799,
          duration: 255,
          submittedAt: 2280265,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 521,
          submittedAt: 628264,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 500,
          duration: 195,
          submittedAt: 976007,
        },

        {
          participantId: 10,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 238,
          submittedAt: 190733,
        },

        {
          participantId: 10,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 430,
          submittedAt: 514195,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 150,
          submittedAt: 998889,
        },

        {
          participantId: 10,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 418,
          submittedAt: 1948209,
        },

        {
          participantId: 10,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 5,
          submittedAt: 1822423,
        },

        {
          participantId: 10,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 451,
          submittedAt: 920262,
        },

        {
          participantId: 10,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 996,
          duration: 172,
          submittedAt: 2790685,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 591,
          submittedAt: 2924595,
        },

        {
          participantId: 11,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 393,
          submittedAt: 1645554,
        },

        {
          participantId: 11,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 598,
          duration: 209,
          submittedAt: 2773465,
        },

        {
          participantId: 11,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 797,
          duration: 169,
          submittedAt: 2861377,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 25,
          submittedAt: 1653548,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 239,
          submittedAt: 1215531,
        },

        {
          participantId: 12,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 198,
          duration: 42,
          submittedAt: 2019386,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 249,
          submittedAt: 835274,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 314,
          submittedAt: 1964165,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 598,
          duration: 109,
          submittedAt: 1673949,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 287,
          submittedAt: 1689086,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 351,
          submittedAt: 1266048,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 998,
          duration: 56,
          submittedAt: 569433,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 13,
          submittedAt: 575706,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 338,
          submittedAt: 2494924,
        },

        {
          participantId: 13,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 250,
          submittedAt: 1009510,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 591,
          duration: 47,
          submittedAt: 2598601,
        },

        {
          participantId: 13,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 711,
          duration: 8,
          submittedAt: 3230825,
        },

        {
          participantId: 13,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 277,
          submittedAt: 792725,
        },

        {
          participantId: 14,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 456,
          submittedAt: 467974,
        },

        {
          participantId: 14,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 302,
          submittedAt: 1416842,
        },

        {
          participantId: 14,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 200,
          duration: 225,
          submittedAt: 2700461,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 346,
          submittedAt: 1785509,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 59,
          submittedAt: 2325544,
        },

        {
          participantId: 14,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 796,
          duration: 95,
          submittedAt: 2011915,
        },

        {
          participantId: 14,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 304,
          submittedAt: 434623,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 349,
          submittedAt: 3371744,
        },

        {
          participantId: 15,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 399,
          duration: 247,
          submittedAt: 2522900,
        },

        {
          participantId: 15,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 40,
          submittedAt: 1126736,
        },

        {
          participantId: 15,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 28,
          submittedAt: 2501976,
        },

        {
          participantId: 15,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 126,
          submittedAt: 482849,
        },

        {
          participantId: 15,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 975,
          duration: 16,
          submittedAt: 1478294,
        },

        {
          participantId: 16,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 568,
          submittedAt: 3014418,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 247,
          submittedAt: 1982066,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 200,
          duration: 530,
          submittedAt: 2684653,
        },

        {
          participantId: 16,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 596,
          duration: 43,
          submittedAt: 1065899,
        },

        {
          participantId: 16,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 455,
          submittedAt: 556039,
        },

        {
          participantId: 16,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 999,
          duration: 245,
          submittedAt: 1163796,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 15,
          submittedAt: 1922416,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 41,
          submittedAt: 73503,
        },

        {
          participantId: 17,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 396,
          duration: 23,
          submittedAt: 868083,
        },

        {
          participantId: 17,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 449,
          submittedAt: 2182629,
        },

        {
          participantId: 17,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 235,
          submittedAt: 995755,
        },

        {
          participantId: 17,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 346,
          submittedAt: 668928,
        },

        {
          participantId: 17,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 35,
          submittedAt: 247639,
        },

        {
          participantId: 17,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 489,
          duration: 23,
          submittedAt: 1955403,
        },

        {
          participantId: 18,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 466,
          submittedAt: 3329116,
        },

        {
          participantId: 18,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 488,
          submittedAt: 31691,
        },

        {
          participantId: 18,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 239,
          submittedAt: 2584790,
        },

        {
          participantId: 18,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 415,
          submittedAt: 3166910,
        },

        {
          participantId: 18,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 526,
          submittedAt: 516743,
        },

        {
          participantId: 18,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 798,
          duration: 158,
          submittedAt: 1851439,
        },

        {
          participantId: 18,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 547,
          submittedAt: 2329338,
        },

        {
          participantId: 18,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 422,
          submittedAt: 3326479,
        },

        {
          participantId: 19,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 217,
          submittedAt: 1194780,
        },

        {
          participantId: 19,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 285,
          submittedAt: 3311829,
        },

        {
          participantId: 19,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 501,
          submittedAt: 2775927,
        },

        {
          participantId: 19,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 548,
          submittedAt: 62997,
        },

        {
          participantId: 19,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 355,
          submittedAt: 798813,
        },

        {
          participantId: 19,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 300,
          duration: 505,
          submittedAt: 1573149,
        },

        {
          participantId: 19,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 347,
          submittedAt: 132479,
        },

        {
          participantId: 19,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 988,
          duration: 67,
          submittedAt: 2957899,
        },

        {
          participantId: 20,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 196,
          duration: 26,
          submittedAt: 2278049,
        },

        {
          participantId: 20,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 399,
          duration: 227,
          submittedAt: 3422972,
        },

        {
          participantId: 20,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 19,
          submittedAt: 2295748,
        },

        {
          participantId: 20,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 300,
          duration: 166,
          submittedAt: 1385807,
        },

        {
          participantId: 20,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 351,
          submittedAt: 1520631,
        },

        {
          participantId: 20,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 422,
          submittedAt: 563695,
        },

        {
          participantId: 21,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 9,
          submittedAt: 1894263,
        },

        {
          participantId: 21,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 14,
          submittedAt: 62620,
        },

        {
          participantId: 21,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 585,
          submittedAt: 572901,
        },

        {
          participantId: 21,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 599,
          duration: 288,
          submittedAt: 3445040,
        },

        {
          participantId: 21,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 234,
          submittedAt: 1510360,
        },

        {
          participantId: 21,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 391,
          submittedAt: 3379877,
        },

        {
          participantId: 21,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 996,
          duration: 81,
          submittedAt: 1455416,
        },

        {
          participantId: 22,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 241,
          submittedAt: 3176388,
        },

        {
          participantId: 22,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 177,
          submittedAt: 1530667,
        },

        {
          participantId: 22,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 399,
          duration: 3,
          submittedAt: 52861,
        },

        {
          participantId: 22,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 598,
          duration: 145,
          submittedAt: 2023410,
        },

        {
          participantId: 22,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 92,
          submittedAt: 3426143,
        },

        {
          participantId: 22,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 588,
          submittedAt: 3015337,
        },

        {
          participantId: 22,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 464,
          submittedAt: 808546,
        },

        {
          participantId: 23,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 199,
          duration: 116,
          submittedAt: 3400246,
        },

        {
          participantId: 23,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 155,
          submittedAt: 3199025,
        },

        {
          participantId: 23,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 581,
          submittedAt: 2626458,
        },

        {
          participantId: 23,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 490,
          submittedAt: 1753167,
        },

        {
          participantId: 23,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 45,
          submittedAt: 1487783,
        },

        {
          participantId: 23,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 143,
          submittedAt: 401367,
        },

        {
          participantId: 23,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 387,
          duration: 13,
          submittedAt: 1568974,
        },

        {
          participantId: 23,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 50,
          submittedAt: 1473927,
        },

        {
          participantId: 23,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 482,
          duration: 24,
          submittedAt: 3191476,
        },

        {
          participantId: 24,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 321,
          submittedAt: 2080810,
        },

        {
          participantId: 24,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 571,
          submittedAt: 2105282,
        },

        {
          participantId: 24,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 200,
          duration: 191,
          submittedAt: 2779083,
        },

        {
          participantId: 24,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 566,
          submittedAt: 2381171,
        },

        {
          participantId: 24,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 600,
          submittedAt: 2675272,
        },

        {
          participantId: 24,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 999,
          duration: 441,
          submittedAt: 2651535,
        },

        {
          participantId: 25,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 280,
          submittedAt: 1103831,
        },

        {
          participantId: 25,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 600,
          submittedAt: 424552,
        },

        {
          participantId: 25,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 217,
          submittedAt: 1405277,
        },

        {
          participantId: 25,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 50,
          submittedAt: 3218142,
        },

        {
          participantId: 25,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 300,
          duration: 530,
          submittedAt: 2656054,
        },

        {
          participantId: 25,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 471,
          submittedAt: 551904,
        },

        {
          participantId: 25,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 434,
          submittedAt: 2049210,
        },

        {
          participantId: 25,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 186,
          submittedAt: 910067,
        },

        {
          participantId: 25,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 4,
          submittedAt: 2104464,
        },

        {
          participantId: 26,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 347,
          submittedAt: 1847223,
        },

        {
          participantId: 26,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 503,
          submittedAt: 477836,
        },

        {
          participantId: 26,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 89,
          submittedAt: 13246,
        },

        {
          participantId: 26,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 547,
          submittedAt: 2736407,
        },

        {
          participantId: 26,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 799,
          duration: 214,
          submittedAt: 1906259,
        },

        {
          participantId: 26,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 309,
          submittedAt: 799681,
        },

        {
          participantId: 27,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 406,
          submittedAt: 2951162,
        },

        {
          participantId: 27,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 399,
          duration: 118,
          submittedAt: 1473385,
        },

        {
          participantId: 27,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 585,
          submittedAt: 331859,
        },

        {
          participantId: 27,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 388,
          submittedAt: 512496,
        },

        {
          participantId: 27,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 582,
          submittedAt: 831948,
        },

        {
          participantId: 27,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 517,
          submittedAt: 831333,
        },

        {
          participantId: 27,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 441,
          submittedAt: 380398,
        },

        {
          participantId: 27,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 500,
          duration: 322,
          submittedAt: 671582,
        },

        {
          participantId: 28,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 358,
          submittedAt: 177190,
        },

        {
          participantId: 28,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 429,
          submittedAt: 1147291,
        },

        {
          participantId: 28,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 461,
          submittedAt: 2368828,
        },

        {
          participantId: 28,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 39,
          submittedAt: 1118584,
        },

        {
          participantId: 28,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 300,
          duration: 414,
          submittedAt: 3277998,
        },

        {
          participantId: 28,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 110,
          submittedAt: 2987334,
        },

        {
          participantId: 28,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 394,
          duration: 55,
          submittedAt: 3190788,
        },

        {
          participantId: 28,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 149,
          submittedAt: 807354,
        },

        {
          participantId: 28,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 497,
          duration: 137,
          submittedAt: 3386721,
        },

        {
          participantId: 29,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 354,
          submittedAt: 716180,
        },

        {
          participantId: 29,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 393,
          submittedAt: 835141,
        },

        {
          participantId: 29,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 307,
          submittedAt: 2201456,
        },

        {
          participantId: 29,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 240,
          submittedAt: 2534388,
        },

        {
          participantId: 29,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 519,
          submittedAt: 3476467,
        },

        {
          participantId: 29,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 300,
          duration: 255,
          submittedAt: 2667152,
        },

        {
          participantId: 29,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 441,
          submittedAt: 2500169,
        },

        {
          participantId: 29,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 46,
          submittedAt: 2748355,
        },

        {
          participantId: 29,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 292,
          submittedAt: 2497669,
        },

        {
          participantId: 29,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 500,
          duration: 579,
          submittedAt: 446469,
        },

        {
          participantId: 30,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 544,
          submittedAt: 2125692,
        },

        {
          participantId: 30,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 494,
          submittedAt: 984402,
        },

        {
          participantId: 30,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 587,
          duration: 13,
          submittedAt: 1017229,
        },

        {
          participantId: 30,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 169,
          submittedAt: 3260105,
        },

        {
          participantId: 30,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 400,
          submittedAt: 1212634,
        },

        {
          participantId: 30,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 133,
          submittedAt: 670267,
        },

        {
          participantId: 30,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 500,
          duration: 237,
          submittedAt: 210274,
        },

        {
          participantId: 31,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 142,
          submittedAt: 913510,
        },

        {
          participantId: 31,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 226,
          submittedAt: 1683939,
        },

        {
          participantId: 31,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 572,
          submittedAt: 3179041,
        },

        {
          participantId: 31,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 430,
          submittedAt: 592550,
        },

        {
          participantId: 31,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 429,
          submittedAt: 1357519,
        },

        {
          participantId: 32,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 32,
          submittedAt: 3279354,
        },

        {
          participantId: 32,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 252,
          submittedAt: 566234,
        },

        {
          participantId: 32,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 60,
          submittedAt: 3565694,
        },

        {
          participantId: 32,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 440,
          submittedAt: 1592210,
        },

        {
          participantId: 32,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 399,
          submittedAt: 758073,
        },

        {
          participantId: 32,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 177,
          submittedAt: 2246237,
        },

        {
          participantId: 32,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 394,
          submittedAt: 3465538,
        },

        {
          participantId: 32,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 999,
          duration: 301,
          submittedAt: 1981467,
        },

        {
          participantId: 33,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 336,
          submittedAt: 1269959,
        },

        {
          participantId: 33,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 308,
          submittedAt: 2876428,
        },

        {
          participantId: 33,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 296,
          submittedAt: 3013977,
        },

        {
          participantId: 33,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 126,
          submittedAt: 2468371,
        },

        {
          participantId: 33,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 554,
          submittedAt: 2512321,
        },

        {
          participantId: 33,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 798,
          duration: 205,
          submittedAt: 2077257,
        },

        {
          participantId: 33,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 386,
          submittedAt: 1165720,
        },

        {
          participantId: 34,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 514,
          submittedAt: 2985478,
        },

        {
          participantId: 34,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 583,
          submittedAt: 496002,
        },

        {
          participantId: 34,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 461,
          submittedAt: 405126,
        },

        {
          participantId: 34,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 267,
          submittedAt: 3264409,
        },

        {
          participantId: 34,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 228,
          submittedAt: 3188578,
        },

        {
          participantId: 34,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 4,
          submittedAt: 246259,
        },

        {
          participantId: 34,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 379,
          submittedAt: 764684,
        },

        {
          participantId: 34,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 399,
          duration: 28,
          submittedAt: 389993,
        },

        {
          participantId: 34,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 997,
          duration: 131,
          submittedAt: 1419439,
        },

        {
          participantId: 35,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 316,
          submittedAt: 3316446,
        },

        {
          participantId: 35,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 455,
          submittedAt: 2518282,
        },

        {
          participantId: 35,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 400,
          submittedAt: 969263,
        },

        {
          participantId: 35,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 523,
          submittedAt: 2746663,
        },

        {
          participantId: 35,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 318,
          submittedAt: 1894468,
        },

        {
          participantId: 35,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 218,
          submittedAt: 450090,
        },

        {
          participantId: 35,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 474,
          submittedAt: 398365,
        },

        {
          participantId: 35,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 148,
          submittedAt: 921511,
        },

        {
          participantId: 35,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 499,
          duration: 293,
          submittedAt: 2963757,
        },

        {
          participantId: 36,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 357,
          submittedAt: 1705598,
        },

        {
          participantId: 36,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 452,
          submittedAt: 1138556,
        },

        {
          participantId: 36,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 230,
          submittedAt: 188763,
        },

        {
          participantId: 36,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 799,
          duration: 332,
          submittedAt: 1980677,
        },

        {
          participantId: 36,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 983,
          duration: 49,
          submittedAt: 3063108,
        },

        {
          participantId: 37,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 154,
          submittedAt: 485545,
        },

        {
          participantId: 37,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 6,
          submittedAt: 2756909,
        },

        {
          participantId: 37,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 402,
          submittedAt: 644358,
        },

        {
          participantId: 37,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 296,
          submittedAt: 564362,
        },

        {
          participantId: 37,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 598,
          duration: 201,
          submittedAt: 2790593,
        },

        {
          participantId: 37,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 216,
          submittedAt: 934317,
        },

        {
          participantId: 37,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 419,
          submittedAt: 950122,
        },

        {
          participantId: 38,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 158,
          submittedAt: 1192472,
        },

        {
          participantId: 38,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 578,
          submittedAt: 1010546,
        },

        {
          participantId: 38,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 74,
          submittedAt: 2446640,
        },

        {
          participantId: 38,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 119,
          submittedAt: 747963,
        },

        {
          participantId: 38,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 440,
          submittedAt: 1527765,
        },

        {
          participantId: 38,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 799,
          duration: 243,
          submittedAt: 2124465,
        },

        {
          participantId: 38,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 348,
          submittedAt: 1698828,
        },

        {
          participantId: 38,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 499,
          duration: 321,
          submittedAt: 2443881,
        },

        {
          participantId: 39,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 103,
          submittedAt: 593164,
        },

        {
          participantId: 39,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 401,
          submittedAt: 3434531,
        },

        {
          participantId: 39,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 3,
          submittedAt: 1780623,
        },

        {
          participantId: 39,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 199,
          duration: 34,
          submittedAt: 1085794,
        },

        {
          participantId: 39,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 487,
          submittedAt: 1326108,
        },

        {
          participantId: 39,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 422,
          submittedAt: 1698581,
        },

        {
          participantId: 39,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 126,
          submittedAt: 2790539,
        },

        {
          participantId: 39,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 35,
          submittedAt: 2295825,
        },

        {
          participantId: 39,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 266,
          submittedAt: 185151,
        },

        {
          participantId: 40,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 237,
          submittedAt: 648230,
        },

        {
          participantId: 40,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 140,
          submittedAt: 2052572,
        },

        {
          participantId: 40,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 238,
          submittedAt: 2599199,
        },

        {
          participantId: 40,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 97,
          submittedAt: 2620445,
        },

        {
          participantId: 40,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 156,
          submittedAt: 1084304,
        },

        {
          participantId: 40,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 299,
          duration: 176,
          submittedAt: 3386564,
        },

        {
          participantId: 40,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 179,
          submittedAt: 1662259,
        },

        {
          participantId: 40,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 400,
          duration: 356,
          submittedAt: 1508091,
        },

        {
          participantId: 40,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 999,
          duration: 505,
          submittedAt: 2135679,
        },

        {
          participantId: 41,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 377,
          submittedAt: 2810771,
        },

        {
          participantId: 41,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 84,
          submittedAt: 779024,
        },

        {
          participantId: 41,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 200,
          duration: 319,
          submittedAt: 3099578,
        },

        {
          participantId: 41,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 599,
          duration: 288,
          submittedAt: 3243455,
        },

        {
          participantId: 41,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 427,
          submittedAt: 3448931,
        },

        {
          participantId: 41,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 451,
          submittedAt: 513914,
        },

        {
          participantId: 41,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 999,
          duration: 327,
          submittedAt: 2351676,
        },

        {
          participantId: 42,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 7,
          submittedAt: 3410549,
        },

        {
          participantId: 42,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 100,
          duration: 290,
          submittedAt: 2334732,
        },

        {
          participantId: 42,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 305,
          submittedAt: 35249,
        },

        {
          participantId: 42,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 53,
          submittedAt: 3115183,
        },

        {
          participantId: 42,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 578,
          submittedAt: 392362,
        },

        {
          participantId: 42,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 418,
          submittedAt: 2377274,
        },

        {
          participantId: 42,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 796,
          duration: 159,
          submittedAt: 2981803,
        },

        {
          participantId: 42,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 366,
          submittedAt: 54876,
        },

        {
          participantId: 42,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 500,
          duration: 499,
          submittedAt: 1836243,
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
