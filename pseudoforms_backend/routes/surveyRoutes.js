const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

// Pobierz wszystkie ankiety
router.get('/', surveyController.getAllSurveys);

// Pobierz konkretną ankietę po ID
router.get('/:id', surveyController.getSurveyById);

// Pobierz odpowiedzi do ankiety po ID
router.get('/:id/responses', surveyController.getResponsesBySurveyId);

// Utwórz nową ankietę
router.post('/', surveyController.createSurvey);

// Prześlij odpowiedzi do ankiety
router.put('/:id/submit', surveyController.submitSurvey);

// Usuń ankietę
router.delete('/:id', surveyController.deleteSurvey);

module.exports = router;

/**
 * @swagger
 * /surveys:
 *   get:
 *     summary: Pobierz wszystkie ankiety
 *     tags:
 *       - Ankiety
 *     description: Pobiera wszystkie ankiety z bazy SQL. Są to wyłącznie ankiety (tabela surveys), bez pytań do nich ani odpowiedzi
 *     responses:
 *       200:
 *         description: Pobrano wszystkie ankiety.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID ankiety - tworzony przy pomocy uuidv4().
 *                   title:
 *                     type: string
 *                     description: Tytuł ankiety.
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp utworzenia ankiety.
 *                   author_id:
 *                     type: string
 *                     description: ID autora ankiety.
 *       500:
 *           description: Nie udało się pobrać ankiet.
 */
router.get('/:id', surveyController.getSurveyById);
/**
 * @swagger
 * /surveys/{id}:
 *   get:
 *     summary: Pobierz ankietę o podanym ID
 *     tags:
 *       - Ankiety
 *     description: Pobiera ankietę o podanym ID z bazy danych. Ankieta zawiera informacje zawarte w tabeli surveys oraz odpowiadające dane z questions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ankiety (generowane przez uuidv4()).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pobrano ankietę o podanym ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID ankiety (generowane przez uuidv4()).
 *                 title:
 *                   type: string
 *                   description: Tytuł ankiety.
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp utworzenia ankiety.
 *                 author_id:
 *                   type: string
 *                   description: ID autora ankiety.
 *       404:
 *         description: Ankieta nie znaleziona.
 */
router.post('/', surveyController.createSurvey);
/**
 * @swagger
 * /surveys:
 *   post:
 *     summary: Stwórz nową ankietę
 *     tags:
 *       - Ankiety
 *     description: Dodaje nową ankietę do bazy danych (ankieta oraz pytania do niej). ID jest tworzone przez bazę. Można tworzyć ankietę o tej samej nazwie/autorze/pytaniach
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tytuł ankiety.
 *                 example: "Pączki"
 *               author:
 *                 type: string
 *                 description: ID użytkownika który stworzył ankietę.
 *                 example: NULL
 *               questions:
 *                 type: array
 *                 description: Lista pytań które zostaną dodane do ankiety.
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       description: Tekst pytania.
 *                     question_type:
 *                       type: string
 *                       description: Typ pytania (np. multiple_choice, text, single_choice).
 *                     options:
 *                       type: array
 *                       description: Możliwe opcje odpowiedzi (tylko dla pytań typu multiple_choice).
 *                       items:
 *                         type: string
 *           example:
 *             title: "Pączki"
 *             author: null
 *             questions:
 *               - text: "Czy lubisz pączki?"
 *                 question_type: "single_choice"
 *                 options: ["Tak!", "Nie!", "Zjem jak ktoś mi da"]
 *               - text: "Jakie smaki pączków lubisz?"
 *                 question_type: "multiple_choice"
 *                 options: ["Truskawkowy", "Czekoladowy", "Waniliowy", "Różany"]
 *     responses:
 *       201:
 *         description: Ankieta poprawnie utworzona.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID ankiety.
 *                 title:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 author_id:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID pytania.
 *                       text:
 *                         type: string
 *                       type:
 *                         type: string
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *       400:
 *         description: Brak jednego z wymaganych pól - title, questions.
 *       500:
 *         description: Błąd przy tworzeniu ankiety.
 */
router.put('/:id/submit', surveyController.submitSurvey);
/**
 * @swagger
 * /surveys/{id}/submit:
 *   put:
 *     summary: Wyślij odpowiedzi do ankiety
 *     tags:
 *       - Ankiety
 *     description: Wysyła odpowiedzi do ankiety o podanym id. W przykładzie jest są przygotowane dane dla ankiety z przykładu get /surveys, wystarczy jego id podać
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ankiety.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respondent_id:
 *                 type: string
 *                 description: ID użytkownika wysyłającego odpowiedzi. Może zawierać NULL - wtedy przyjmujemy że ankiete wypełnił niezalogowany użytownik.
 *                 example: "user_123"
 *               responses:
 *                 type: array
 *                 description: Tablica odpowiedzi na pytania. Zawiera 1 lub więcej odpowiedzi na pytania
 *                 items:
 *                   type: object
 *                   properties:
 *                     question_id:
 *                       type: integer
 *                       description: ID samego pytania. 
 *                       example: 1
 *                     response_text:
 *                       type: string
 *                       description: Tekst odpowiedzi. dla pytań multi będzie zawierać tablicę (zawierającą elementy z question_options_json), dla single po prosty jedną z opcji, dla otwartych (type - text) znajduje się dowolny tekst napisany przez użytkownika
 *                       example: "Tak!"
 *     responses:
 *       200:
 *         description: Wysłano odpowiedzi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Wysłano odpowiedzi."
 *       400:
 *         description: Nieprawidłowy typ odpowiedzi - na razie nie zaimplementowane prawidłowo.
 *       404:
 *         description: Ankieta nie znaleziona.
 *       500:
 *         description: Nie udało się wysłać odpowiedzi.
 */
router.delete('/:id', surveyController.deleteSurvey);
/**
 * @swagger
 * /surveys/{id}:
 *   delete:
 *     summary: Usuń ankietę
 *     tags:
 *       - Ankiety
 *     description: Usuwa ankietę o podanym ID z bazy danych.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID ankiety którą usuwamy.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ankieta została pomyślnie usunięta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ankieta została pomyślnie usunięta."
 *       400:
 *         description: Brak ID ankiety do usunięcia.
 *       404:
 *         description: Ankieta nie została znaleziona.
 *       500:
 *         description: Wewnętrzny błąd serwera.
 */
module.exports = router;