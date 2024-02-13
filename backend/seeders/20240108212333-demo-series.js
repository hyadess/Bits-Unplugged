"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Series",
      [
        {
          // 1
          topicId: 2,
          name: "Tower Of Hanoi",
          description:
            "Classic puzzle that challenges players to move a stack of disks from one peg to another, following strict rules, in the fewest possible moves.",
          logo: "https://us.123rf.com/450wm/ylivdesign/ylivdesign1701/ylivdesign170109038/70429747-colorful-pyramid-toy-icon-cartoon-illustration-of-colorful-pyramid-toy-vector-icon-for-web.jpg?ver=6",
          isLive: true,
        },
        {
          // 2
          topicId: 4,
          name: "Spanning Tree",
          description: "",
          logo: "https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2017/01/blog-10.jpg",
          isLive: true,
        },
        {
          // 3
          topicId: 1,
          name: "Shortest Path",
          description:
            "Finding the most efficient route or path between two points in a given network or graph.",
          logo: "https://media.istockphoto.com/id/1204141542/vector/easy-straight-complicated-paths.jpg?s=612x612&w=0&k=20&c=93R6hIIAEw2rTicfqNuj2GLfwPdDSLNruVrgx_O_DYA=",
          isLive: true,
        },

        {
          // 4
          topicId: 1,
          name: "Graph Coloring",
          description: "",
          logo: "https://static.vecteezy.com/system/resources/previews/029/583/668/original/color-icon-for-node-vector.jpg",
          isLive: true,
        },

        {
          // 5
          topicId: 1,
          name: "Isomorphism",
          description: "",
          logo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d1df5349-0b0f-4d07-a13d-c59daaae9f90/dg53ht0-d224bd39-3578-42c6-acd9-0336c3f641da.jpg/v1/fill/w_904,h_884,q_70,strp/spiderman_meme_by_yostverseeditsmarvel_dg53ht0-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA1NyIsInBhdGgiOiJcL2ZcL2QxZGY1MzQ5LTBiMGYtNGQwNy1hMTNkLWM1OWRhYWFlOWY5MFwvZGc1M2h0MC1kMjI0YmQzOS0zNTc4LTQyYzYtYWNkOS0wMzM2YzNmNjQxZGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.cv9Q8FgnY5Doy3JMOQaw6tkNp2wZ75eC1KiMELUhYas",
          isLive: true,
        },
        {
          // 6
          topicId: 1,
          name: "Travelling Salesman",
          description: "",
          logo: "https://media.istockphoto.com/id/1227007210/vector/business-decision-modern-businessman-standing-in-front-of-signpost-showing-different.jpg?s=612x612&w=0&k=20&c=0joKPEsJLRtPPC6WTnsZZg2MCmHPD-K6wj2c1hcp1VA=",
          isLive: true,
        },
        {
          // 7
          topicId: 1,
          name: "Planar Graph",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:1400/1*Xo-W6UucD0e2gmOB5wescg.gif",
          isLive: true,
        },
        {
          // 8
          topicId: 1,
          name: "Bipartite Graph",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:588/0*PWKRBToddj9I36q4.gif",
          isLive: false,
        },

        {
          // 9,
          topicId: 4,
          name: "Red Black",
          description: "",
          logo: "https://thumbs.dreamstime.com/b/illustration-black-tree-red-apples-vector-55899640.jpg",
          isLive: true,
        },
        {
          // 10,
          topicId: 1,
          name: "Vertex Cover",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*fYKrGW0IUeoS_8XtCoNaLw.gif",
          isLive: true,
        },
        {
          // 10,
          topicId: 1,
          name: "Independent Set",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*fYKrGW0IUeoS_8XtCoNaLw.gif",
          isLive: true,
        },
        {
          // 11,
          topicId: 1,
          name: "Dominating Set",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*fYKrGW0IUeoS_8XtCoNaLw.gif",
          isLive: true,
        },
        {
          // 12,
          topicId: 1,
          name: "Factor",
          description: "",
          logo: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*fYKrGW0IUeoS_8XtCoNaLw.gif",
          isLive: true,
        },
        {
          // 13,
          topicId: 1,
          name: "Max Flow Min Cut",
          description: "",
          logo: "https://uploads.toptal.io/blog/image/124061/toptal-blog-image-1503922944233-918c6faefd88554e45442287ce635def.gif",
          isLive: false,
        },
        {
          // 14
          topicId: 3,
          name: "Bubble Sort",
          description: "",
          logo: "https://res.cloudinary.com/practicaldev/image/fetch/s--tZV8xTN4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/p36pPuu.gif",
          isLive: true,
        },

        {
          topicId: 3,
          name: "Selection Sort",
          description: "",
          logo: "https://res.cloudinary.com/practicaldev/image/fetch/s--6bITq5rX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://i0.wp.com/algorithms.tutorialhorizon.com/files/2019/01/Selection-Sort-Gif.gif%3Fzoom%3D1.25%26fit%3D300%252C214%26ssl%3D1",
          isLive: true,
        },
        {
          topicId: 3,
          name: "Quick Sort",
          description: "",
          logo: "https://assets.digitalocean.com/articles/alligator/js/quick-sort/quick-sort-animation.gif",
          isLive: true,
        },
        {
          topicId: 3,
          name: "Merge Sort",
          description: "",
          logo: "https://assets.digitalocean.com/articles/alligator/js/understanding-merge-sort/merge-sort-animation.gif",
          isLive: true,
        },
        {
          topicId: 2,
          name: "N Queen",
          description: "",
          logo: "https://meetwithbudhi.files.wordpress.com/2019/09/prog.gif",
          isLive: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Series", null, {});
  },
};
