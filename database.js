const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './cocktaildb.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        db.run(`CREATE TABLE IF NOT EXISTS cocktails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            ingredients TEXT
        )`);
    }
});

module.exports = db;
