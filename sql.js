const sql = require("sqlite3").verbose();
const db =  new sql.Database('.data/db.sqlite')
console.log("Initialized database connection.")

const tables = {
    infractions: [
        "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
        "snowflake TEXT NOT NULL",
        "reason TEXT",
        "moderator TEXT NOT NULL",
        "guild TEXT NOT NULL",
        "time INTEGER NOT NULL",
        "type TEXT NOT NULL"
    ]
}

for(let table in tables) {
    db.run(`CREATE TABLE ${table} (${tables[table].join(", ")})`, () => {
    });
}

module.exports = db