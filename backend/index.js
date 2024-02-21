const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require('cors');

  
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello from our server!')
})



const connection = mysql.createConnection({
    host: "oasispractice-chrisspam1126-ece5.a.aivencloud.com",
    port: "16031",
    user: "avnadmin",
    password: "AVNS_wABtR6d4vmnUszOm4hC",
    database: "mydatabase"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});


app.post("/getUser", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const selectQuery = "SELECT * FROM users WHERE username = ? AND password = ?";

    connection.query(selectQuery, [username, password], (err, results) => {
        if (err) {
            console.error("Error checking credentials:", err);
            res.status(500).json({ error: "Error checking credentials" });
        } else {
            if (results.length > 0) {
                console.log("Credentials are valid");
                res.status(200).json({  username: username, password: password });
            } else {
                console.log("Invalid credentials");
                res.status(401).json({ error: "Invalid credentials" });
            }
        }
    });
});


app.listen(8080, () => {
    console.log('server listening on port 8080')
})

