/* eslint-disable  @typescript-eslint/no-var-requires, no-undef */
const express = require("express");
const path = require("path");

const app = express();
// eslint-disable-next-line no-undef
const port = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, "static")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});
app.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`news app listening on port ${port}`);
});
