const userModel = require(`../models/userModel`);
const bcrypt = require('bcrypt');

exports.ShowUser = (email) => {
  return userModel.ShowUser(email);
};

exports.ShowUserPassword = (email) => {
  return userModel.ShowUserPassword(email);
};

exports.RegisterUser = async ({ name, email, password }) => {
  const existing = userModel.GetUserWithPassword(email);
  if (existing) throw new Error('Email już istnieje');

  const hashedPassword = await bcrypt.hash(password, 10);
  return userModel.RegisterUser({ name, email, hashedPassword });
};

exports.LoginUser = async ({ email, password }) => {
  const user = userModel.GetUserWithPassword(email);
  if (!user) throw new Error('Niepoprawny email lub hasło');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Niepoprawny email lub hasło');

  // Po zalogowaniu można dodać JWT (na życzenie)
  return { id: user.id, name: user.name, email: user.email };
};

exports.ChangeUserName = ({ email, newName }) => {
  return userModel.ChangeUserName({ email, newName });
};

exports.ChangeUserPassword = (email, newHashedPassword) => {
  return userModel.ChangeUserPassword(email, newHashedPassword);
};

exports.DeleteUser = (id) => {
  return userModel.DeleteUser(id);
};
