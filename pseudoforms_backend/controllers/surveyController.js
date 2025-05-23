const surveyService = require('../services/surveyService');

// GET /surveys
exports.getAllSurveys = (req, res) => {
  try {
    const surveys = surveyService.getAllSurveys();
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ error: 'Nie udało się pobrać ankiet' });
  }
};

// GET /surveys/:id
exports.getSurveyById = (req, res) => {
  const { id } = req.params;
  try {
    const survey = surveyService.getSurveyById(id);
    if (!survey) {
      return res.status(404).json({ error: 'Ankieta nie znaleziona' });
    }
    res.status(200).json(survey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd przy pobieraniu ankiety' });
  }
};

// GET /surveys/:id/responses
exports.getResponsesBySurveyId = (req, res) => {
  const { id } = req.params;
  try {
    const responses = surveyService.getResponsesBySurveyId(id);
    res.status(200).json(responses);
  } catch (err) {
    console.error('Błąd przy pobieraniu odpowiedzi:', err);
    res.status(500).json({ error: 'Nie udało się pobrać odpowiedzi dla ankiety' });
  }
};

// POST /surveys
exports.createSurvey = (req, res) => {
  const { title, author, questions } = req.body;

  if (!title || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Brak jednego z wymaganych pól: title, questions' });
  }

  try {
    const newSurvey = surveyService.createSurveys({ title, author, questions });
    res.status(201).json(newSurvey);
  } catch (err) {
    console.error('Błąd przy tworzeniu ankiety:', err);
    res.status(500).json({ error: 'Błąd przy tworzeniu ankiety' });
  }
};

// PUT /surveys/:id/submit
exports.submitSurvey = (req, res) => {
  const { id } = req.params;
  const { respondent_id, responses } = req.body;

  try {
    const survey = surveyService.getSurveyById(id);
    if (!survey) {
      return res.status(404).json({ error: 'Ankieta nie znaleziona' });
    }

    if (!Array.isArray(responses) || responses.length !== survey.questions.length) {
      return res.status(400).json({ error: 'Nieprawidłowy typ odpowiedzi' });
    }

    const success = surveyService.submitSurvey(id, respondent_id, responses);
    if (success) {
      res.status(200).json({ message: 'Wysłano odpowiedzi' });
    } else {
      res.status(500).json({ error: 'Nie udało się wysłać odpowiedzi' });
    }
  } catch (err) {
    console.error('Błąd przy wysyłaniu odpowiedzi:', err);
    res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
  }
};

// DELETE /surveys/:id
exports.deleteSurvey = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Brak ID ankiety do usunięcia' });
  }

  try {
    const survey = surveyService.getSurveyById(id);
    if (!survey) {
      return res.status(404).json({ error: 'Ankieta nie znaleziona' });
    }

    const success = surveyService.deleteSurvey(id);
    if (!success) {
      return res.status(403).json({ error: 'Ankieta nie została usunięta' });
    }

    res.status(200).json({ message: 'Ankieta została usunięta' });
  } catch (err) {
    console.error('Błąd przy usuwaniu ankiety:', err);
    res.status(500).json({ error: 'Błąd przy usuwaniu ankiety' });
  }
};
