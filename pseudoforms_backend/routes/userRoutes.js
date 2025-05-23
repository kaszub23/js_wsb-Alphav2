const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Możliwość np. sprawdzenia danego użytkownika który stworzył ankiete. Szukamy po email, nie po ID, bo email jest w bazie jako NOT NULL UNIQUE, a po ID usera będziemy pozwalać kasować ankiety, tworzyć ankiety jako dany user itp/itd. nie wiem czyd dobrze myśle, no ale... 
router.get('/:email', userController.ShowUser);
/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Pobierz dane użytkownika
 *     description: Pobiera informacje o użytkowniku na podstawie podanego adresu email.
 *     tags:
 *       - Użytkownicy
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Adres email użytkownika, którego dane mają zostać pobrane.
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *     responses:
 *       200:
 *         description: Dane użytkownika zostały pomyślnie pobrane.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID użytkownika.
 *                 name:
 *                   type: string
 *                   description: Imię i nazwisko użytkownika.
 *                 email:
 *                   type: string
 *                   description: Adres email użytkownika.
 *       404:
 *         description: Użytkownik o podanym emailu nie został znaleziony.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Użytkownik o podanym emailu nie został znaleziony."
 *       500:
 *         description: Wewnętrzny błąd serwera.
 */
router.get('/with-password/:email', userController.ShowUserPassword);
/**
 * @swagger
 * /users/with-password/{email}:
 *   get:
 *     summary: Pobierz dane użytkownika z hasłem (TYLKO DO DEBUGOWANIA)
 *     description: Pobiera wszystkie dane użytkownika, w tym zaszyfrowane hasło. Endpoint przeznaczony wyłącznie do testów lub dla administratorów.
 *     tags:
 *       - Użytkownicy
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Adres email użytkownika.
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *     responses:
 *       200:
 *         description: Dane użytkownika zostały pobrane (z hasłem).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Użytkownik nie został znaleziony.
 *       500:
 *         description: Wewnętrzny błąd serwera.
 */
router.post('/login', userController.LoginUser);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logowanie użytkownika
 *     tags:
 *       - Użytkownicy
 *     description: Sprawdza poprawność emaila i hasła użytkownika.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: haslo123
 *     responses:
 *       200:
 *         description: Zalogowano pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Zalogowano pomyślnie
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     name:
 *                       type: string
 *                       example: Jan Kowalski
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *       401:
 *         description: Niepoprawny email lub hasło
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Niepoprawny email lub hasło
 */
router.put('/register', userController.RegisterUser);
/**
 * @swagger
 * /users/register:
 *   put:
 *     summary: Zarejestruj użytkownika
 *     tags:
 *       - Użytkownicy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Użytkownik zarejestrowany
 *       400:
 *         description: Email już istnieje lub brak wymaganych pól
 */
router.patch('/change-name', userController.ChangeUserName);
/**
 * @swagger
 * /users/change-name:
 *   patch:
 *     summary: Zmień nazwę użytkownika
 *     tags:
 *       - Użytkownicy
 *     description: Umożliwia zmianę nazwy użytkownika (name) na podstawie jego adresu email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newName
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               newName:
 *                 type: string
 *                 example: "Jan Nowak"
 *     responses:
 *       200:
 *         description: Nazwa użytkownika została zmieniona pomyślnie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nazwa użytkownika została zmieniona."
 *       400:
 *         description: Brak wymaganych danych wejściowych.
 *       404:
 *         description: Użytkownik nie został znaleziony.
 */
router.patch('/change-password', userController.ChangePassword);
/**
 * @swagger
 * /users/change-password:
 *   patch:
 *     summary: Zmień hasło użytkownika
 *     tags:
 *       - Użytkownicy
 *     description: Umożliwia zmianę hasła użytkownika po podaniu aktualnego hasła.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               oldPassword:
 *                 type: string
 *                 example: "stareHaslo123"
 *               newPassword:
 *                 type: string
 *                 example: "noweHaslo456"
 *     responses:
 *       200:
 *         description: Hasło zostało zmienione pomyślnie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hasło zostało zmienione pomyślnie."
 *       400:
 *         description: Nieprawidłowe stare hasło lub użytkownik nie istnieje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Stare hasło jest nieprawidłowe lub użytkownik nie istnieje."
 *       500:
 *         description: Błąd serwera.
 */
router.delete('/delete/:id', userController.DeleteUser);
/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Usuń użytkownika po ID
 *     tags:
 *       - Użytkownicy
 *     description: Usuwa użytkownika z bazy danych na podstawie jego ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID użytkownika do usunięcia (UUID).
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       200:
 *         description: Użytkownik został pomyślnie usunięty.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Użytkownik został usunięty."
 *       404:
 *         description: Użytkownik nie został znaleziony.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Użytkownik nie został znaleziony."
 *       500:
 *         description: Wewnętrzny błąd serwera.
 */

module.exports = router;
