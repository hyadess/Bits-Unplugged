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
          duration: 404,
          submittedAt: 3108000,
        },

        {
          participantId: 1,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 529,
          submittedAt: 2758259,
        },

        {
          participantId: 1,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 488,
          submittedAt: 1127874,
        },

        {
          participantId: 1,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 211,
          submittedAt: 27089,
        },

        {
          participantId: 1,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 167,
          submittedAt: 1892385,
        },

        {
          participantId: 1,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 492,
          submittedAt: 451992,
        },

        {
          participantId: 1,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 190,
          submittedAt: 2342171,
        },

        {
          participantId: 1,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 83,
          submittedAt: 1749659,
        },

        {
          participantId: 1,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 73,
          submittedAt: 2130666,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 27,
          submittedAt: 2687931,
        },

        {
          participantId: 2,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 588,
          submittedAt: 3036827,
        },

        {
          participantId: 2,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 413,
          submittedAt: 165254,
        },

        {
          participantId: 2,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 73,
          submittedAt: 353997,
        },

        {
          participantId: 2,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 10,
          submittedAt: 433609,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 530,
          submittedAt: 15087,
        },

        {
          participantId: 2,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 284,
          submittedAt: 3364452,
        },

        {
          participantId: 2,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 569,
          submittedAt: 2111984,
        },

        {
          participantId: 2,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 566,
          submittedAt: 1126138,
        },

        {
          participantId: 3,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 314,
          submittedAt: 2708785,
        },

        {
          participantId: 3,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 126,
          submittedAt: 1561896,
        },

        {
          participantId: 3,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 187,
          submittedAt: 2327847,
        },

        {
          participantId: 3,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 556,
          submittedAt: 1783791,
        },

        {
          participantId: 3,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 8,
          submittedAt: 3395718,
        },

        {
          participantId: 3,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 296,
          submittedAt: 875418,
        },

        {
          participantId: 3,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 284,
          submittedAt: 2385138,
        },

        {
          participantId: 4,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 305,
          submittedAt: 2002428,
        },

        {
          participantId: 4,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 82,
          submittedAt: 2207831,
        },

        {
          participantId: 4,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 265,
          submittedAt: 182373,
        },

        {
          participantId: 4,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 76,
          submittedAt: 869029,
        },

        {
          participantId: 4,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 575,
          submittedAt: 1932302,
        },

        {
          participantId: 4,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 501,
          submittedAt: 3398082,
        },

        {
          participantId: 4,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 150,
          submittedAt: 3135307,
        },

        {
          participantId: 5,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 574,
          submittedAt: 2741520,
        },

        {
          participantId: 5,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 274,
          submittedAt: 2146192,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 530,
          submittedAt: 3322106,
        },

        {
          participantId: 5,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 68,
          submittedAt: 1191164,
        },

        {
          participantId: 5,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 523,
          submittedAt: 3223640,
        },

        {
          participantId: 5,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 408,
          submittedAt: 2271775,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 245,
          submittedAt: 2302808,
        },

        {
          participantId: 5,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 429,
          submittedAt: 425094,
        },

        {
          participantId: 6,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 574,
          submittedAt: 587083,
        },

        {
          participantId: 6,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 66,
          submittedAt: 24955,
        },

        {
          participantId: 6,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 210,
          submittedAt: 1143789,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 109,
          submittedAt: 2514611,
        },

        {
          participantId: 6,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 293,
          submittedAt: 1677198,
        },

        {
          participantId: 6,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 533,
          submittedAt: 2959114,
        },

        {
          participantId: 6,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 547,
          submittedAt: 134327,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 504,
          submittedAt: 1382351,
        },

        {
          participantId: 7,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 311,
          submittedAt: 3341043,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 83,
          submittedAt: 2599578,
        },

        {
          participantId: 7,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 220,
          submittedAt: 3427814,
        },

        {
          participantId: 7,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 471,
          submittedAt: 1398061,
        },

        {
          participantId: 7,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 237,
          submittedAt: 1843904,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 137,
          submittedAt: 1842309,
        },

        {
          participantId: 7,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 91,
          submittedAt: 3328468,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 68,
          submittedAt: 2807102,
        },

        {
          participantId: 7,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 91,
          submittedAt: 466497,
        },

        {
          participantId: 8,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 159,
          submittedAt: 66504,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 540,
          submittedAt: 3188782,
        },

        {
          participantId: 8,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 314,
          submittedAt: 1417226,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 464,
          submittedAt: 78431,
        },

        {
          participantId: 8,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 415,
          submittedAt: 3068736,
        },

        {
          participantId: 8,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 231,
          submittedAt: 98272,
        },

        {
          participantId: 8,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 258,
          submittedAt: 2190261,
        },

        {
          participantId: 8,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 311,
          submittedAt: 3012942,
        },

        {
          participantId: 9,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 578,
          submittedAt: 416379,
        },

        {
          participantId: 9,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 450,
          submittedAt: 3386308,
        },

        {
          participantId: 9,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 165,
          submittedAt: 2046312,
        },

        {
          participantId: 9,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 2,
          submittedAt: 3379808,
        },

        {
          participantId: 9,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 337,
          submittedAt: 1739893,
        },

        {
          participantId: 9,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 370,
          submittedAt: 396211,
        },

        {
          participantId: 9,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 207,
          submittedAt: 977092,
        },

        {
          participantId: 10,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 350,
          submittedAt: 3526039,
        },

        {
          participantId: 10,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 461,
          submittedAt: 1988253,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 526,
          submittedAt: 2033050,
        },

        {
          participantId: 10,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 293,
          submittedAt: 2471362,
        },

        {
          participantId: 10,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 535,
          submittedAt: 2737311,
        },

        {
          participantId: 10,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 172,
          submittedAt: 1231522,
        },

        {
          participantId: 10,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 446,
          submittedAt: 3491537,
        },

        {
          participantId: 10,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 300,
          submittedAt: 3409492,
        },

        {
          participantId: 10,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 583,
          submittedAt: 2864615,
        },

        {
          participantId: 11,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 242,
          submittedAt: 2655230,
        },

        {
          participantId: 11,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 455,
          submittedAt: 3470559,
        },

        {
          participantId: 11,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 310,
          submittedAt: 2947530,
        },

        {
          participantId: 11,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 261,
          submittedAt: 3581900,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 468,
          submittedAt: 2251659,
        },

        {
          participantId: 11,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 446,
          submittedAt: 1228458,
        },

        {
          participantId: 12,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 113,
          submittedAt: 3083236,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 65,
          submittedAt: 3574492,
        },

        {
          participantId: 12,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 351,
          submittedAt: 1557059,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 155,
          submittedAt: 3579580,
        },

        {
          participantId: 12,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 83,
          submittedAt: 1625001,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 39,
          submittedAt: 1794579,
        },

        {
          participantId: 12,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 444,
          submittedAt: 841897,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 399,
          submittedAt: 1913855,
        },

        {
          participantId: 12,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 399,
          submittedAt: 542169,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 47,
          submittedAt: 2785839,
        },

        {
          participantId: 13,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 205,
          submittedAt: 3473341,
        },

        {
          participantId: 13,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 126,
          submittedAt: 1149194,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 463,
          submittedAt: 370699,
        },

        {
          participantId: 13,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 127,
          submittedAt: 2553008,
        },

        {
          participantId: 13,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 566,
          submittedAt: 539660,
        },

        {
          participantId: 13,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 26,
          submittedAt: 3285052,
        },

        {
          participantId: 13,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 529,
          submittedAt: 2391620,
        },

        {
          participantId: 14,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 369,
          submittedAt: 2403355,
        },

        {
          participantId: 14,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 335,
          submittedAt: 470625,
        },

        {
          participantId: 14,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 554,
          submittedAt: 2762217,
        },

        {
          participantId: 14,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 221,
          submittedAt: 1611183,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 132,
          submittedAt: 2312528,
        },

        {
          participantId: 14,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 280,
          submittedAt: 865415,
        },

        {
          participantId: 14,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 383,
          submittedAt: 162462,
        },

        {
          participantId: 14,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 596,
          submittedAt: 2794052,
        },

        {
          participantId: 14,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 134,
          submittedAt: 1896081,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 202,
          submittedAt: 2077338,
        },

        {
          participantId: 15,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 304,
          submittedAt: 2716019,
        },

        {
          participantId: 15,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 78,
          submittedAt: 3221759,
        },

        {
          participantId: 15,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 540,
          submittedAt: 1558330,
        },

        {
          participantId: 15,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 275,
          submittedAt: 354868,
        },

        {
          participantId: 15,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 47,
          submittedAt: 1358919,
        },

        {
          participantId: 15,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 258,
          submittedAt: 3305287,
        },

        {
          participantId: 15,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 371,
          submittedAt: 1784986,
        },

        {
          participantId: 16,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 480,
          submittedAt: 348973,
        },

        {
          participantId: 16,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 439,
          submittedAt: 1550318,
        },

        {
          participantId: 16,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 312,
          submittedAt: 672557,
        },

        {
          participantId: 16,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 7,
          submittedAt: 378793,
        },

        {
          participantId: 16,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 131,
          submittedAt: 3572120,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 433,
          submittedAt: 2367607,
        },

        {
          participantId: 17,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 281,
          submittedAt: 890632,
        },

        {
          participantId: 17,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 543,
          submittedAt: 3125646,
        },

        {
          participantId: 17,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 502,
          submittedAt: 2435341,
        },

        {
          participantId: 17,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 247,
          submittedAt: 2899912,
        },

        {
          participantId: 17,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 99,
          submittedAt: 1468846,
        },

        {
          participantId: 17,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 582,
          submittedAt: 3105579,
        },

        {
          participantId: 18,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 351,
          submittedAt: 1425490,
        },

        {
          participantId: 18,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 36,
          submittedAt: 963854,
        },

        {
          participantId: 18,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 301,
          submittedAt: 1958067,
        },

        {
          participantId: 18,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 154,
          submittedAt: 324134,
        },

        {
          participantId: 18,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 310,
          submittedAt: 3414591,
        },

        {
          participantId: 18,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 179,
          submittedAt: 48529,
        },

        {
          participantId: 18,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 546,
          submittedAt: 2900349,
        },

        {
          participantId: 18,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 272,
          submittedAt: 902504,
        },

        {
          participantId: 19,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 172,
          submittedAt: 154260,
        },

        {
          participantId: 19,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 581,
          submittedAt: 6012,
        },

        {
          participantId: 19,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 274,
          submittedAt: 3577144,
        },

        {
          participantId: 19,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 130,
          submittedAt: 2434049,
        },

        {
          participantId: 19,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 479,
          submittedAt: 1535494,
        },

        {
          participantId: 19,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 481,
          submittedAt: 3582605,
        },

        {
          participantId: 19,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 12,
          submittedAt: 2006611,
        },

        {
          participantId: 20,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 175,
          submittedAt: 2590709,
        },

        {
          participantId: 20,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 90,
          submittedAt: 644118,
        },

        {
          participantId: 20,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 256,
          submittedAt: 1771096,
        },

        {
          participantId: 20,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 389,
          submittedAt: 3559791,
        },

        {
          participantId: 20,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 453,
          submittedAt: 3298564,
        },

        {
          participantId: 20,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 422,
          submittedAt: 2964058,
        },

        {
          participantId: 20,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 316,
          submittedAt: 1618399,
        },

        {
          participantId: 21,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 468,
          submittedAt: 1172910,
        },

        {
          participantId: 21,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 546,
          submittedAt: 2244592,
        },

        {
          participantId: 21,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 505,
          submittedAt: 3354689,
        },

        {
          participantId: 21,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 235,
          submittedAt: 1448644,
        },

        {
          participantId: 21,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 432,
          submittedAt: 2352032,
        },

        {
          participantId: 21,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 94,
          submittedAt: 1373599,
        },

        {
          participantId: 21,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 368,
          submittedAt: 3403489,
        },

        {
          participantId: 21,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 114,
          submittedAt: 845671,
        },

        {
          participantId: 22,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 301,
          submittedAt: 568346,
        },

        {
          participantId: 22,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 250,
          submittedAt: 2806624,
        },

        {
          participantId: 22,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 540,
          submittedAt: 2295401,
        },

        {
          participantId: 22,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 184,
          submittedAt: 1210044,
        },

        {
          participantId: 22,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 234,
          submittedAt: 2676581,
        },

        {
          participantId: 22,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 508,
          submittedAt: 1752785,
        },

        {
          participantId: 22,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 6,
          submittedAt: 3343899,
        },

        {
          participantId: 22,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 506,
          submittedAt: 1502622,
        },

        {
          participantId: 22,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 405,
          submittedAt: 116491,
        },

        {
          participantId: 23,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 268,
          submittedAt: 326982,
        },

        {
          participantId: 23,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 395,
          submittedAt: 46629,
        },

        {
          participantId: 23,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 408,
          submittedAt: 3330222,
        },

        {
          participantId: 23,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 580,
          submittedAt: 531223,
        },

        {
          participantId: 23,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 284,
          submittedAt: 2777369,
        },

        {
          participantId: 23,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 281,
          submittedAt: 2593921,
        },

        {
          participantId: 23,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 595,
          submittedAt: 2904744,
        },

        {
          participantId: 23,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 557,
          submittedAt: 2148797,
        },

        {
          participantId: 23,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 59,
          submittedAt: 87888,
        },

        {
          participantId: 24,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 536,
          submittedAt: 2405917,
        },

        {
          participantId: 24,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 28,
          submittedAt: 2757730,
        },

        {
          participantId: 24,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 63,
          submittedAt: 185805,
        },

        {
          participantId: 24,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 599,
          submittedAt: 2059255,
        },

        {
          participantId: 24,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 9,
          submittedAt: 1592546,
        },

        {
          participantId: 24,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 160,
          submittedAt: 1140189,
        },

        {
          participantId: 24,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 93,
          submittedAt: 1942676,
        },

        {
          participantId: 24,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 543,
          submittedAt: 1364098,
        },

        {
          participantId: 24,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 320,
          submittedAt: 2933988,
        },

        {
          participantId: 25,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 577,
          submittedAt: 1916306,
        },

        {
          participantId: 25,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 126,
          submittedAt: 2756424,
        },

        {
          participantId: 25,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 324,
          submittedAt: 3324015,
        },

        {
          participantId: 25,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 282,
          submittedAt: 3118288,
        },

        {
          participantId: 25,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 32,
          submittedAt: 1353448,
        },

        {
          participantId: 25,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 227,
          submittedAt: 1444025,
        },

        {
          participantId: 25,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 360,
          submittedAt: 3249496,
        },

        {
          participantId: 25,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 460,
          submittedAt: 3497054,
        },

        {
          participantId: 26,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 61,
          submittedAt: 2671108,
        },

        {
          participantId: 26,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 350,
          submittedAt: 3453575,
        },

        {
          participantId: 26,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 216,
          submittedAt: 1876772,
        },

        {
          participantId: 26,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 539,
          submittedAt: 94341,
        },

        {
          participantId: 26,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 147,
          submittedAt: 2893081,
        },

        {
          participantId: 26,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 114,
          submittedAt: 2523436,
        },

        {
          participantId: 26,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 254,
          submittedAt: 2418848,
        },

        {
          participantId: 27,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 87,
          submittedAt: 59995,
        },

        {
          participantId: 27,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 8,
          submittedAt: 3161895,
        },

        {
          participantId: 27,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 271,
          submittedAt: 3300002,
        },

        {
          participantId: 27,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 57,
          submittedAt: 223872,
        },

        {
          participantId: 27,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 171,
          submittedAt: 25791,
        },

        {
          participantId: 27,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 103,
          submittedAt: 3064136,
        },

        {
          participantId: 27,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 264,
          submittedAt: 2991084,
        },

        {
          participantId: 27,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 280,
          submittedAt: 2607999,
        },

        {
          participantId: 28,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 10,
          submittedAt: 1988369,
        },

        {
          participantId: 28,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 349,
          submittedAt: 1295958,
        },

        {
          participantId: 28,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 403,
          submittedAt: 507703,
        },

        {
          participantId: 28,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 118,
          submittedAt: 1859789,
        },

        {
          participantId: 28,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 68,
          submittedAt: 1132539,
        },

        {
          participantId: 28,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 520,
          submittedAt: 3505959,
        },

        {
          participantId: 28,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 440,
          submittedAt: 848670,
        },

        {
          participantId: 28,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 204,
          submittedAt: 2320244,
        },

        {
          participantId: 28,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 205,
          submittedAt: 893651,
        },

        {
          participantId: 29,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 82,
          submittedAt: 926248,
        },

        {
          participantId: 29,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 280,
          submittedAt: 2944505,
        },

        {
          participantId: 29,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 76,
          submittedAt: 2620809,
        },

        {
          participantId: 29,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 294,
          submittedAt: 1442380,
        },

        {
          participantId: 29,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 188,
          submittedAt: 487308,
        },

        {
          participantId: 29,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 458,
          submittedAt: 2228344,
        },

        {
          participantId: 29,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 372,
          submittedAt: 2735280,
        },

        {
          participantId: 30,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 303,
          submittedAt: 1818724,
        },

        {
          participantId: 30,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 6,
          submittedAt: 3277082,
        },

        {
          participantId: 30,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 469,
          submittedAt: 2653682,
        },

        {
          participantId: 30,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 36,
          submittedAt: 3047705,
        },

        {
          participantId: 30,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 187,
          submittedAt: 873169,
        },

        {
          participantId: 30,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 61,
          submittedAt: 1575063,
        },

        {
          participantId: 30,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 115,
          submittedAt: 2295787,
        },

        {
          participantId: 31,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 51,
          submittedAt: 76836,
        },

        {
          participantId: 31,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 545,
          submittedAt: 2959897,
        },

        {
          participantId: 31,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 525,
          submittedAt: 597887,
        },

        {
          participantId: 31,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 151,
          submittedAt: 2307779,
        },

        {
          participantId: 31,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 274,
          submittedAt: 1784487,
        },

        {
          participantId: 31,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 328,
          submittedAt: 1016072,
        },

        {
          participantId: 32,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 362,
          submittedAt: 15739,
        },

        {
          participantId: 32,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 255,
          submittedAt: 1775981,
        },

        {
          participantId: 32,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 530,
          submittedAt: 1683618,
        },

        {
          participantId: 32,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 179,
          submittedAt: 840732,
        },

        {
          participantId: 32,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 175,
          submittedAt: 3044989,
        },

        {
          participantId: 32,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 511,
          submittedAt: 2357609,
        },

        {
          participantId: 32,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 595,
          submittedAt: 450545,
        },

        {
          participantId: 33,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 244,
          submittedAt: 3352396,
        },

        {
          participantId: 33,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 541,
          submittedAt: 967929,
        },

        {
          participantId: 33,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 479,
          submittedAt: 2194560,
        },

        {
          participantId: 33,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 531,
          submittedAt: 1421711,
        },

        {
          participantId: 33,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 32,
          submittedAt: 1956290,
        },

        {
          participantId: 33,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 504,
          submittedAt: 1605076,
        },

        {
          participantId: 33,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 300,
          submittedAt: 1037086,
        },

        {
          participantId: 34,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 96,
          submittedAt: 2658315,
        },

        {
          participantId: 34,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 35,
          submittedAt: 1569455,
        },

        {
          participantId: 34,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 569,
          submittedAt: 2793913,
        },

        {
          participantId: 34,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 564,
          submittedAt: 883434,
        },

        {
          participantId: 34,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 62,
          submittedAt: 1132766,
        },

        {
          participantId: 35,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 552,
          submittedAt: 2422390,
        },

        {
          participantId: 35,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 58,
          submittedAt: 2934562,
        },

        {
          participantId: 35,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 400,
          submittedAt: 772414,
        },

        {
          participantId: 35,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 294,
          submittedAt: 3372070,
        },

        {
          participantId: 35,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 211,
          submittedAt: 1205182,
        },

        {
          participantId: 35,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 85,
          submittedAt: 1114813,
        },

        {
          participantId: 35,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 227,
          submittedAt: 1831926,
        },

        {
          participantId: 36,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 54,
          submittedAt: 2853531,
        },

        {
          participantId: 36,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 73,
          submittedAt: 3064392,
        },

        {
          participantId: 36,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 57,
          submittedAt: 2608391,
        },

        {
          participantId: 36,
          contestProblemId: 3,
          verdict: "Accepted",
          points: 600,
          duration: 186,
          submittedAt: 927043,
        },

        {
          participantId: 36,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 170,
          submittedAt: 2958568,
        },

        {
          participantId: 36,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 88,
          submittedAt: 1682194,
        },

        {
          participantId: 37,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 152,
          submittedAt: 3262739,
        },

        {
          participantId: 37,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 46,
          submittedAt: 2284758,
        },

        {
          participantId: 37,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 192,
          submittedAt: 2246709,
        },

        {
          participantId: 37,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 326,
          submittedAt: 3448047,
        },

        {
          participantId: 37,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 594,
          submittedAt: 1187073,
        },

        {
          participantId: 37,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 390,
          submittedAt: 1896908,
        },

        {
          participantId: 37,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 124,
          submittedAt: 3379526,
        },

        {
          participantId: 37,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 151,
          submittedAt: 1907649,
        },

        {
          participantId: 38,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 561,
          submittedAt: 1521852,
        },

        {
          participantId: 38,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 33,
          submittedAt: 1476998,
        },

        {
          participantId: 38,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 310,
          submittedAt: 467971,
        },

        {
          participantId: 38,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 593,
          submittedAt: 1127986,
        },

        {
          participantId: 38,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 338,
          submittedAt: 203884,
        },

        {
          participantId: 38,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 527,
          submittedAt: 3060376,
        },

        {
          participantId: 39,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 578,
          submittedAt: 2006230,
        },

        {
          participantId: 39,
          contestProblemId: 2,
          verdict: "Wrong answer",
          points: 0,
          duration: 501,
          submittedAt: 940462,
        },

        {
          participantId: 39,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 424,
          submittedAt: 3189796,
        },

        {
          participantId: 39,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 33,
          submittedAt: 3058948,
        },

        {
          participantId: 39,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 585,
          submittedAt: 2706506,
        },

        {
          participantId: 39,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 84,
          submittedAt: 212585,
        },

        {
          participantId: 39,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 164,
          submittedAt: 508916,
        },

        {
          participantId: 39,
          contestProblemId: 5,
          verdict: "Wrong answer",
          points: 0,
          duration: 81,
          submittedAt: 668311,
        },

        {
          participantId: 40,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 546,
          submittedAt: 1375331,
        },

        {
          participantId: 40,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 505,
          submittedAt: 133956,
        },

        {
          participantId: 40,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 473,
          submittedAt: 1182629,
        },

        {
          participantId: 40,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 66,
          submittedAt: 2877460,
        },

        {
          participantId: 40,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 533,
          submittedAt: 1413582,
        },

        {
          participantId: 40,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 233,
          submittedAt: 2323375,
        },

        {
          participantId: 40,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 175,
          submittedAt: 2736020,
        },

        {
          participantId: 40,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 410,
          submittedAt: 1045724,
        },

        {
          participantId: 41,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 536,
          submittedAt: 3092498,
        },

        {
          participantId: 41,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 308,
          submittedAt: 1408523,
        },

        {
          participantId: 41,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 261,
          submittedAt: 2227193,
        },

        {
          participantId: 41,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 291,
          submittedAt: 2215982,
        },

        {
          participantId: 41,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 29,
          submittedAt: 2524268,
        },

        {
          participantId: 41,
          contestProblemId: 4,
          verdict: "Wrong answer",
          points: 0,
          duration: 434,
          submittedAt: 3155044,
        },

        {
          participantId: 41,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 39,
          submittedAt: 104032,
        },

        {
          participantId: 41,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 154,
          submittedAt: 48298,
        },

        {
          participantId: 42,
          contestProblemId: 1,
          verdict: "Wrong answer",
          points: 0,
          duration: 332,
          submittedAt: 1454480,
        },

        {
          participantId: 42,
          contestProblemId: 1,
          verdict: "Accepted",
          points: 200,
          duration: 231,
          submittedAt: 2928913,
        },

        {
          participantId: 42,
          contestProblemId: 2,
          verdict: "Accepted",
          points: 400,
          duration: 585,
          submittedAt: 2639904,
        },

        {
          participantId: 42,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 278,
          submittedAt: 2507383,
        },

        {
          participantId: 42,
          contestProblemId: 3,
          verdict: "Wrong answer",
          points: 0,
          duration: 219,
          submittedAt: 581045,
        },

        {
          participantId: 42,
          contestProblemId: 4,
          verdict: "Accepted",
          points: 800,
          duration: 176,
          submittedAt: 2889660,
        },

        {
          participantId: 42,
          contestProblemId: 5,
          verdict: "Accepted",
          points: 1000,
          duration: 82,
          submittedAt: 1063698,
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
