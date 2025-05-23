const db = require('../data/db');
const { v4: uuidv4 } = require('uuid');

exports.ShowUser = (email) => {
  const stmt = db.prepare(`SELECT id, name, email created_at FROM users WHERE email = ?`);
  return stmt.get(email);
};

exports.ShowUserPassword = (email) => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email); 
};

exports.GetUserWithPassword = (email) => {
  const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
  return stmt.get(email);
};

exports.RegisterUser = ({ name, email, hashedPassword }) => {
  const stmt = db.prepare(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`);
  const id = uuidv4();
  stmt.run(id, name, email, hashedPassword);
  return { id, name, email };
};

exports.LoginUser = ({ email }) => {
  const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
  return stmt.get(email);
};


exports.ChangeUserName = ({ email, newName }) => {
  const stmt = db.prepare(`UPDATE users SET name = ? WHERE email = ?`);
  const result = stmt.run(newName, email);
  return result.changes > 0;
};


exports.ChangeUserPassword = (email, newHashedPassword) => {
  const stmt = db.prepare('UPDATE users SET password = ? WHERE email = ?');
  const result = stmt.run(newHashedPassword, email);
  return result.changes > 0;
};


exports.DeleteUser = (id) => {
  const stmt = db.prepare(`DELETE FROM users WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
};
