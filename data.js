const shortid = require("shortid");

const data = [
  {
    id: shortid(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  },
  {
    id: shortid(), // hint: use the shortid npm package to generate it
    name: "John Doe", // String, required
    bio: "Jane's brother",  // String, required
  },
  {
    id: shortid(), // hint: use the shortid npm package to generate it
    name: "Tim Doe", // String, required
    bio: "Jane's father",  // String, required
  }
];


