db.posts.createIndex(
    {
     content: "text",
     title: "text"
    },
    {
     weights: {
       content: 5,
       title: 10
     },
     name: "post_content_title_idx"
    }
);