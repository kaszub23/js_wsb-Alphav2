const surveyModel = require(`../models/surveyModel`);

// Zwraca listę wszystkich ankiet (bez pytań i odpowiedzi)
exports.getAllSurveys = () => {
  return surveyModel.getAllSurveys();
};

// Zwraca ankietę o podanym ID wraz z jej pytaniami
exports.getSurveyById = (id) => {
  const rawData = surveyModel.getSurveyById(id);

  if (!rawData.length) return null;

  const survey = {
    id: rawData[0].survey_id,
    title: rawData[0].title,
    created_at: rawData[0].created_at,
    author_id: rawData[0].author_id,
    questions: []
  };

  rawData.forEach(q => {
    if (q.question_id) {
      survey.questions.push({
        id: q.question_id,
        text: q.question_text,
        type: q.question_type,
        options: q.question_options_json ? JSON.parse(q.question_options_json) : null
      });
    }
  });

  return survey;
};

// Tworzy nową ankietę z pytaniami
exports.createSurveys = ({ title, author, questions }) => {
  return surveyModel.createSurvey({ title, author, questions });
};

// Zapisuje odpowiedzi użytkownika do ankiety
exports.submitSurvey = (id, respondent_id, responses) => {
  return surveyModel.submitSurvey(id, respondent_id, responses);
};

// Usuwa ankietę
exports.deleteSurvey = (id) => {
  return surveyModel.deleteSurvey(id);
};

// Pobiera odpowiedzi do ankiety z danymi respondentów (imię, email, odpowiedzi)
exports.getResponsesBySurveyId = (id) => {
  return surveyModel.getResponsesBySurveyId(id);
};
