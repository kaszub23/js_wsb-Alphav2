const db = require(`../data/db`);
const { v4: uuidv4 } = require('uuid');

// Pobiera wszystkie ankiety (bez pytań i odpowiedzi)
function getAllSurveys() {
  return db.prepare(`
    SELECT id, title, author_id AS author, created_at FROM surveys
  `).all();
}

// Pobiera pełną ankietę wraz z pytaniami
function getSurveyById(id) {
  return db.prepare(`
    SELECT
      surveys.id AS survey_id,
      surveys.title,
      surveys.created_at,
      surveys.author_id,
      questions.id AS question_id,
      questions.question_text,
      questions.question_type,
      questions.question_options_json
    FROM surveys
    LEFT JOIN questions ON surveys.id = questions.survey_id
    WHERE surveys.id = ?
  `).all(id);
}

// Tworzy nową ankietę wraz z pytaniami
function createSurvey({ title, author, questions }) {
  const id = uuidv4();

  db.prepare(`
    INSERT INTO surveys (id, title, author_id, created_at)
    VALUES (?, ?, ?, ?)
  `).run(id, title, author, new Date().toISOString());

  for (const element of questions) {
    db.prepare(`
      INSERT INTO questions (survey_id, question_text, question_type, question_options_json)
      VALUES (?, ?, ?, ?)
    `).run(id, element.text, element.question_type, JSON.stringify(element.options));
  }

  return db.prepare(`SELECT * FROM surveys WHERE id = ?`).get(id);
}

// Zapisuje odpowiedzi użytkownika do bazy
function submitSurvey(surveyId, respondentId, response) {
  for (const element of response) {
    db.prepare(`
      INSERT INTO responses (survey_id, question_id, response_text_json, respondent_id, submitted_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      surveyId,
      element.question_id,
      JSON.stringify(element.response_text),
      respondentId || null,
      new Date().toISOString()
    );
  }

  return db.prepare(`
    SELECT * FROM responses WHERE survey_id = ? AND respondent_id = ?
  `).get(surveyId, respondentId);
}

// Usuwa ankietę
function deleteSurvey(id) {
  db.prepare(`DELETE FROM surveys WHERE id = ?`).run(id);
  return true;
}

// Pobiera odpowiedzi wraz z pytaniami i użytkownikami
function getResponsesBySurveyId(surveyId) {
  return db.prepare(`
    SELECT
      r.question_id,
      r.response_text_json,
      r.respondent_id,
      r.submitted_at,
      u.name AS respondent_name,
      u.email AS respondent_email,
      q.question_text
    FROM responses r
    LEFT JOIN users u ON r.respondent_id = u.id
    LEFT JOIN questions q ON r.question_id = q.id
    WHERE r.survey_id = ?
  `).all(surveyId);
}

module.exports = {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  submitSurvey,
  deleteSurvey,
  getResponsesBySurveyId
};
