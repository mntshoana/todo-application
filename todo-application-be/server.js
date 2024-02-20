let db = require("./database.js")
let md5 = require("md5")
let bodyParser = require("body-parser");
let express = require("express")
let app = express()

let cors = require("cors")

app.use(cors({
    credentials: false,
    AccessControlAllowOrigin: '*',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// // Disable CORS
// // This is a security feature that prevents other websites from making requests to your server
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(res.setHeader('Access-Control-Allow-Origin', req.header('origin') 
//     || req.header('x-forwarded-host') || req.header('referer'ƒ) || req.header('host')))
//     next();
// });


// Server port
let HTTP_PORT = 3001
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


/***********/
// API
//**********/

// GET
// Retrieves all tasks from the database
app.get("/api/tasks", (req, res, next) => {
    const params = []
    db.all("select * from task", params, (err, rows) => {
        if (err) {
            res.status(400)
                .json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "code": 200,
            "data": rows
        })
        res.end();
    });
});


// GET
// Retrieves a single task from the database
app.get("/api/task/:id", (req, res, next) => {
    const params = [req.params.id]
    db.get(
        "SELECT * FROM task WHERE id = ?",
        params,
        (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "code": 200,
                "data": row
            })
            res.end();
        });
});

// PUT
// Adds a new task to the database
app.put("/api/task", (req, res, next) => {
    let errors = []
    if (req.body.title == "")
        errors.push("No title specified");
    if (req.body.description == "")
        errors.push("No description specified");

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }


    var data = {
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        isDone: req.body.isDone
    }
    var sql = 'INSERT INTO task (date, title, description, isDone) VALUES (?,?,?,?)'
    var params = [data.date, data.title, data.description, data.isDone]
    db.run(sql, params, (err, result, next) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "code": 201,
            "id": this.lastID
        })
        res.end();
    });
})

// POST
// Updates a task in the database
app.post("/api/task/:id", (req, res, next) => {
    const id = [req.params.id]
    var data = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        isDone: req.body.isDone
    }
    db.run(
        `UPDATE task SET 
        title = coalesce(?,title), 
        description = coalesce(?,description), 
        date = coalesce(?,date), 
        isDone = coalesce(?,isDone) WHERE id = ?`,
        [data.title, data.description, data.date, data.isDone, id],
        function (err, result, next) {
            console.log(data) // bug: update not making changes
        
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                message: "success",
                data: data,
                code: 200,
                changes: this.changes
            })
            res.end();
        });
})

// DELETE
// Deletes a task from the database
app.delete("/api/task/:id", (req, res, next) => {
    console.log(req);
    db.run(
        'DELETE FROM task WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                "message": "deleted",
                "code": 204,
                changes: this.changes
            })
            res.end();
        });
})

// Default response
app.use(function (req, res) {
    res.status(404);
});