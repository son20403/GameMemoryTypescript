"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.set("views", "templates");
app.use("/assets", express.static(path.join("dist/frontend")));
app.use("/", express.static(path.join("public")));
// app.use("/assets", express.default.static(path.default.join("dist/frontend")));
app.get("/board", (req, res) => {
    res.render("index", {});
});
app.get("/", (req, res) => {
    res.render("login", {});
});
app.listen(3000, () => {
    console.log("Server is listening at http://localhost:3000");
});
//# sourceMappingURL=index.js.map