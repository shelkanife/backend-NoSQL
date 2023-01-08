if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: ".env" });

const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.set("port", PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/containers");

app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.listen(app.get("port"), () =>
  console.log("Running on port: ", app.get("port"))
);
