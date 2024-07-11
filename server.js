const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use("/posts", require("./router/posts"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
