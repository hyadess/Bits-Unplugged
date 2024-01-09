'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Series",
      [
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
        // 13	3	Bubble Sort	\N	https://res.cloudinary.com/practicaldev/image/fetch/s--tZV8xTN4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/p36pPuu.gif
        // 14	3	Selection Sort	\N	https://res.cloudinary.com/practicaldev/image/fetch/s--6bITq5rX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://i0.wp.com/algorithms.tutorialhorizon.com/files/2019/01/Selection-Sort-Gif.gif%3Fzoom%3D1.25%26fit%3D300%252C214%26ssl%3D1
        // 15	3	Quick Sort	\N	https://assets.digitalocean.com/articles/alligator/js/quick-sort/quick-sort-animation.gif
        // 16	3	Merge Sort	\N	https://assets.digitalocean.com/articles/alligator/js/understanding-merge-sort/merge-sort-animation.gif
        // 2	2	Tower Of Hanoi	\N	/gifs/toh_light.gif
        // 7	2	N Queen	\N	https://meetwithbudhi.files.wordpress.com/2019/09/prog.gif
        // 8	6	Shortest Path	\N	https://www.get-digital-help.com/wp-content/uploads/2014/05/Find-shortest-path4.gif
        // 9	6	Bipartite Graph	\N	https://miro.medium.com/v2/resize:fit:588/0*PWKRBToddj9I36q4.gif
        // 1	6	Minimum Spanning Tree		https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2017/01/blog-10.jpg
        // 5	6	Graph Coloring	\N	https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Petersen_graph_3-coloring.svg/800px-Petersen_graph_3-coloring.svg.png
        // 4	6	Planar Graph	\N	https://miro.medium.com/v2/resize:fit:1400/1*Xo-W6UucD0e2gmOB5wescg.gif
        // 10	6	Isomorphism	\N	https://images.squarespace-cdn.com/content/v1/52b30f7ae4b067ba989438d4/1419401410738-XTMSALY9255E01WH06Y1/image-asset.gif
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Series", null, {});
  }
};
