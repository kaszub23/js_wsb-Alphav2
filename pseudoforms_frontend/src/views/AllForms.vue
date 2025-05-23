<template>
  <div>
    <Header />
    <section class="all-forms">
      <h2>Wszystkie Formularze</h2>
      <div v-if="loading">Ładowanie Formularzy...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="form-list">
        <div class="form-item" v-for="form in forms" :key="form.id">
          <h3>{{ form.title }}</h3>
          <p>Autor: {{ form.author || 'Brak' }}</p>
          <p>Stworzone dnia {{ formatDate(form.created_at) }}</p>
          
          <button @click="fillForm(form.id)">Wypełnij formularz</button>
          <button @click="toggleDetails(form.id)">
            {{ form.showDetails ? 'Ukryj szczegóły' : 'Szczegóły' }}
          </button>

          <div v-if="form.showDetails" class="details">
            <div v-if="form.detailsLoading">Ładowanie szczegółów...</div>
            <div v-else-if="form.detailsError" class="error">{{ form.detailsError }}</div>
            <div v-else>
              <p><strong>Autor:</strong> {{ form.author || 'Brak' }}</p>
              <p><strong>Data utworzenia:</strong> {{ formatDate(form.created_at) }}</p>

              <h4>Pytania:</h4>
              <ul>
                <li v-for="question in form.questions" :key="question.id" class="question-detail">
                  <strong>{{ question.text }}</strong> ({{ question.type }})
                  <div v-if="question.answerStats && Object.keys(question.answerStats).length">
                    <em>Ilość odpowiedzi:</em>
                    <ul>
                      <li v-for="(count, answer) in question.answerStats" :key="answer">
                        "{{ answer }}" - {{ count }}
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    Brak danych o odpowiedziach dla tego pytania
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'AllForms',
  components: { Header, Footer },
  data() {
    return {
      forms: [],
      loading: true,
      error: null
    };
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },
    async fetchForms() {
      try {
        const res = await fetch('http://localhost:3000/surveys');
        if (!res.ok) throw new Error('Nie udało się pobrać formularzy.');
        const formsData = await res.json();
        // Dodajemy pola do sterowania szczegółami
        this.forms = formsData.map(f => ({
          ...f,
          showDetails: false,
          detailsLoading: false,
          detailsError: null,
          questions: [],
        }));
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    fillForm(id) {
      this.$router.push({ name: 'FillForm', params: { formId: id } });
    },
    async toggleDetails(id) {
      const idx = this.forms.findIndex(f => f.id === id);
      if (idx === -1) return;
      const form = this.forms[idx];

      if(form.showDetails) { // Jeśli już pokazane, chowamy
        this.forms[idx].showDetails = false;
        return;
      }

      this.forms[idx].showDetails = true;
      if(form.questions.length === 0) {
        this.forms[idx].detailsLoading = true;
        this.forms[idx].detailsError = null;
        try {
          // Pobierz ankietę (z pytaniami)
          const resSurvey = await fetch(`http://localhost:3000/surveys/${id}`);
          if(!resSurvey.ok) throw new Error('Nie udało się pobrać szczegółów ankiety');
          const surveyDetails = await resSurvey.json();

          // Załaduj odpowiedzi do ankiety - zakładam, że masz endpoint GET /responses?survey_id=ID,
          // jeśli nie masz, poniżej wyświetlam info o braku danych
          let responsesData;
          try {
            const resResponses = await fetch(`http://localhost:3000/responses?survey_id=${id}`);
            if (!resResponses.ok) throw new Error('Brak endpointu odpowiedzi lub błąd podczas pobierania');
            responsesData = await resResponses.json();
          } catch {
            responsesData = null;
          }

          // Przetwórz statystyki odpowiedzi lokalnie
          // Format responsesData: załóżmy tablica obiektów: { question_id, response_text_json }
          // jeśli responsesData brak - ustaw pustą statystykę

          const answerStatsPerQuestion = {};

          if (responsesData) {
            // zliczamy odpowiedzi
            for(const response of responsesData) {
              const qid = response.question_id;
              // Zakładamy że response.response_text_json jest JSON-string (string odpowiedzi lub tablica)
              let answer;
              try {
                answer = JSON.parse(response.response_text_json);
              } catch {
                answer = response.response_text_json;
              }
              if(qid && answer !== undefined) {
                if (!answerStatsPerQuestion[qid]) answerStatsPerQuestion[qid] = {};
                if(Array.isArray(answer)) {
                  // jeśli wiele odpowiedzi
                  for(const ansPart of answer) {
                    answerStatsPerQuestion[qid][ansPart] = (answerStatsPerQuestion[qid][ansPart] || 0) + 1;
                  }
                } else {
                  // pojedyncza odpowiedź
                  answerStatsPerQuestion[qid][answer] = (answerStatsPerQuestion[qid][answer] || 0) + 1;
                }
              }
            }
          }

          // Zamapuj pytania na te ze statystykami
          this.forms[idx].questions = (surveyDetails.questions || []).map(q => {
            return {
              ...q,
              answerStats: answerStatsPerQuestion[q.id] || {}
            };
          });
        } catch (e) {
          this.forms[idx].detailsError = e.message || 'Błąd podczas ładowania szczegółów';
          this.forms[idx].questions = [];
        } finally {
          this.forms[idx].detailsLoading = false;
        }
      }
    }
  },
  mounted() {
    this.fetchForms();
  }
};
</script>

<style scoped>
.all-forms {
  padding: 2rem;
}

.form-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);
}

.details {
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.1);
}

.question-detail {
  margin-bottom: 1rem;
}

.error {
  color: red;
}

button {
  margin-right: 0.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3b3f54;
}
</style>