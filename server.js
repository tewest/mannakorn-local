const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/random", (req, res) => {
    const path = require('path');
    const dataPath = path.join(__dirname, './data/verses.json');
    const verses = JSON.parse(fs.readFileSync(dataPath));
    const random = verses[Math.floor(Math.random() * verses.length)];
    res.json(random);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
