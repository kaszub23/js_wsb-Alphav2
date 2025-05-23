const Database = require(`better-sqlite3`);
const db = new Database(`./data/pseudoforms_database.db`);

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS surveys (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id TEXT
);`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    survey_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL,
    question_options_json TEXT,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
);`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    survey_id TEXT NOT NULL,
    question_id INTEGER NOT NULL,
    response_text_json TEXT NOT NULL,
    respondent_id TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    --FOREIGN KEY (respondent_id) REFERENCES users(id)
);`).run();

module.exports = db;