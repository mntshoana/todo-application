let sqlite3 = require('sqlite3').verbose()
let md5 = require('md5')

const DBSOURCE = "src/main/db/db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {

        db.run(`CREATE TABLE task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE DEFAULT (datetime('now','localtime')), 
            title text, 
            description text, 
            isDone BOOLEAN DEFAULT 0
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Provide default test data
                    const insert = 'INSERT INTO task (date, title, description) VALUES (?,?,?)'
                
                    db.run(insert, [new Date(2024, 1, 16, 21, 40), 'Dummy title',
                        "This is an ipsum lipsum description that obviously is not meant to make sense." +
                        "This is an ipsum lipsum description that obviously is not meant to make sense" +
                        "This is an ipsum lipsum description that obviously is not meant to make sense" +
                        "This is an ipsum lipsum description that obviously is not meant to make sense" +
                        "This is an ipsum lipsum description that obviously is not meant to make sense" +
                        "This is an ipsum lipsum description that obviously is not meant to make sense" +
                        "This is an ipsum lipsum description that obviously is not meant to make sense"]
                    )
                3
                    db.run(insert, [new Date(2024, 5, 5, 21, 40), 'Next title',
                        "For all the awesome people in the world, this is a description that is meant to make sense."]
                    )

                    db.run(insert, [new Date(2024, 11, 5, 9, 0), 'Mystery title',
                        "I wish I had a bit more question to ask the universe. It is full of questions in itself."]
                    )
                    db.run(insert, [new Date(2025, 1, 1, 0, 0), 'Let the new year begin',
                        "Happy New Years Day"]
                    )

                }
            });
    }
});


module.exports = db