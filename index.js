const express = require("express");

const server = express();

//DATABASE

const shortid = require("shortid");

const userData = [
  {
    id: shortid(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: shortid(), // hint: use the shortid npm package to generate it
    name: "John Doe", // String, required
    bio: "Jane's brother", // String, required
  },
  {
    id: shortid(), // hint: use the shortid npm package to generate it
    name: "Tim Doe", // String, required
    bio: "Jane's father", // String, required
  },
];

//POST

server.post("/api/users", (req, res) => {
  if (!req.query.name || !req.query.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for user" });
  } else {
    const newUser = req.query;
    userData.push(newUser);
    if (userData.includes(newUser)) {
      res.status(201).json(userData);
    } else {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
});

//GET

server.get("/api/users", (req, res) => {
  if (!userData) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  } else {
    res.status(201).json({ users: userData });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  if (!userData[id]) {
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist." });
  } else if (!userData) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  } else {
    res.status(201).json({ user: userData[id] });
  }
});

//DELETE

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = userData[id];

  if (!user) {
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist." });
  } else {
    userData.splice(id, 1);

    if (userData.includes(user)) {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    } else {
      res.status(201).json({ deletedUser: user, updatedUserData: userData });
    }
  }
});

//PUT

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = userData[id];

  if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    console.log(user);
    let updateUser = user;
    updateUser.name = req.query.name;
    updateUser.bio = req.query.bio;
    console.log(updateUser);
    userData[id] = updateUser;

    if (userData[id] !== updateUser) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    } else {
      res.status(201).json({ updatedUser: updateUser });
    }
  }
});

//LISTEN

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
