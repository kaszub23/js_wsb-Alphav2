const bcrypt = require('bcrypt');
const userService = require('../services/userService');

exports.ShowUser = (req, res) => {
  const { email } = req.params;
  const user = userService.ShowUser(email);
  if (!user) {
    return res.status(404).json({ error: 'Użytkownik o podanym emailu nie został znaleziony.' });
  }
  res.json(user);
};

exports.ShowUserPassword = (req, res) => {
  const { email } = req.params;
  const user = userService.ShowUserPassword(email);
  if (!user) {
    return res.status(404).json({ error: 'Użytkownik o podanym emailu nie został znaleziony.' });
  }
  res.json(user);
};

exports.RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Wymagane pola: name, email, password' });
  }

  try {
    const user = await userService.RegisterUser({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Wymagane pola: email, password' });
  }

  try {
    const user = await userService.LoginUser({ email, password });
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.ChangeUserName = (req, res) => {
  const { email, newName } = req.body;
  if (!email || !newName) {
    return res.status(400).json({ error: 'Wymagane pola: email, newName' });
  }

  const changed = userService.ChangeUserName({ email, newName });
  if (!changed) {
    return res.status(404).json({ error: 'Użytkownik nie został znaleziony.' });
  }

  res.json({ message: 'Nazwa użytkownika została zmieniona.' });
};

exports.ChangePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Wymagane pola: email, oldPassword, newPassword' });
  }

  try {
    const user = userService.ShowUserPassword(email);
    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Stare hasło jest nieprawidłowe.' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updated = userService.ChangeUserPassword(email, hashedNewPassword);

    if (!updated) {
      return res.status(500).json({ error: 'Nie udało się zaktualizować hasła.' });
    }

    res.json({ message: 'Hasło zostało zmienione.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.DeleteUser = (req, res) => {
  const { id } = req.params;
  const deleted = userService.DeleteUser(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Użytkownik nie został znaleziony.' });
  }

  res.json({ message: 'Użytkownik został usunięty.' });
};
