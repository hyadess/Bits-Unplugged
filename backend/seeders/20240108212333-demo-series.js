'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Series",
      [
        {
          topicId: 2,
          name: "Tower Of Hanoi",
          description: "",
          logo: "/gifs/toh_light.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 1,
          topicId: 4,
          name: "Red Black",
          description: "",
          logo: "https://ds055uzetaobb.cloudfront.net/brioche/uploads/DtAKvHZ65j-rb-1.png?width=1200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 2,
          topicId: 1,
          name: "BFS",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*fYKrGW0IUeoS_8XtCoNaLw.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: 3,
          topicId: 1,
          name: "Max Flow Min Cut",
          description: "",
          logo: "https://uploads.toptal.io/blog/image/124061/toptal-blog-image-1503922944233-918c6faefd88554e45442287ce635def.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 3,
          name: "Bubble Sort",
          description: "",
          logo: "https://res.cloudinary.com/practicaldev/image/fetch/s--tZV8xTN4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/p36pPuu.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          topicId: 3,
          name: "Selection Sort",
          description: "",
          logo: "https://res.cloudinary.com/practicaldev/image/fetch/s--6bITq5rX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://i0.wp.com/algorithms.tutorialhorizon.com/files/2019/01/Selection-Sort-Gif.gif%3Fzoom%3D1.25%26fit%3D300%252C214%26ssl%3D1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 3,
          name: "Quick Sort",
          description: "",
          logo: "https://assets.digitalocean.com/articles/alligator/js/quick-sort/quick-sort-animation.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 3,
          name: "Merge Sort",
          description: "",
          logo: "https://assets.digitalocean.com/articles/alligator/js/understanding-merge-sort/merge-sort-animation.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          topicId: 2,
          name: "N Queen",
          description: "",
          logo: "https://meetwithbudhi.files.wordpress.com/2019/09/prog.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 1,
          name: "Shortest Path",
          description: "",
          logo: "https://www.get-digital-help.com/wp-content/uploads/2014/05/Find-shortest-path4.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 1,
          name: "Bipartite Graph",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:588/0*PWKRBToddj9I36q4.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 1,
          name: "Minimum Spanning Tree",
          description: "",
          logo: "https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2017/01/blog-10.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 1,
          name: "Graph Coloring",
          description: "",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Petersen_graph_3-coloring.svg/800px-Petersen_graph_3-coloring.svg.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 1,
          name: "Planar Graph",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:1400/1*Xo-W6UucD0e2gmOB5wescg.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topicId: 1,
          name: "Isomorphism",
          description: "",
          logo: "https://images.squarespace-cdn.com/content/v1/52b30f7ae4b067ba989438d4/1419401410738-XTMSALY9255E01WH06Y1/image-asset.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Series", null, {});
  }
};
