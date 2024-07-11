const con = require(`../DB`);
const express = require("express");

const router = express.Router();

// Helper function to check if a post exists
const checkPostExists = (postId, callback) => {
  con.query("SELECT * FROM posts WHERE id = ?", [postId], (err, result) => {
    if (err) return callback(err, null);
    if (result.length === 0) return callback(null, false);
    return callback(null, true);
  });
};

// 1-get all posts
router.get("/posts", (req, res) => {
  con.query("SELECT * FROM posts", function (err, result, fields) {
    if (err) throw err;
    if (result.length == 0) res.send("No posts found");
    else res.send(result);
  });
});

// 2-get post by id
router.get("/:id", (req, res) => {
  const postId = req.params.id;
  con.query(
    `SELECT * FROM posts WHERE id = ${postId}`,
    function (err, result, fields) {
      if (err) throw err;
      if (result.length == 0) res.send("Post not found");
      else res.send(result);
    }
  );
});

// 3-add new post
router.post("/", (req, res) => {
  const { title, description, status, created_by, created_on } = req.body;
  con.query(
    `INSERT INTO posts(title,
    description,
    status,
    created_by,
    created_on) VALUES (?,?,?,?,?) `,
    [title, description, status, created_by, created_on],
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    }
  );
  res.send("Post added");
});

// 4-update a post by ID
router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const { title, description, status, updated_by, updated_on } = req.body;

  con.query(
    `UPDATE posts SET title = ?, description = ?, status = ?, updated_by = ?, updated_on = ? WHERE id = ?`,
    [title, description, status, updated_by, updated_on, postId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0)
        return res.status(404).send({ message: "Post not found" });
      res.send({ message: "Post updated" });
    }
  );
});

// 5-delete a post by ID
router.delete("/delete/:id", (req, res) => {
  const postId = req.params.id;
  con.query("DELETE FROM posts WHERE id = ?", [postId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0)
      return res.status(404).send({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  });
});

module.exports = router;
