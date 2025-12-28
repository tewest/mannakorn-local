const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/random", (req, res) => {
    const verses = JSON.parse(fs.readFileSync("./data/verses.json"));
    const random = verses[Math.floor(Math.random() * verses.length)];
    res.json(random);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
