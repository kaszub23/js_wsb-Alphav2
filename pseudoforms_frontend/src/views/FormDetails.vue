<template>
  <div class="form-details">
    <Header />
    <section class="container">
      <h2>Szczegóły formularza</h2>

      <div v-if="form">
        <ul>
          <li><strong>Nazwa formularza:</strong> {{ form.title }}</li>
        </ul>

        <div v-for="question in questions" :key="question.id" class="question-block">
          <h3>Pytanie: {{ question.text }}</h3>

          <div v-if="question.options && question.options.length">
            <p><strong>Możliwe odpowiedzi:</strong> {{ question.options.join(', ') }}</p>
          </div>

          <div v-if="groupedResponses[question.id] && groupedResponses[question.id].length">
            <div
              v-for="(response, index) in groupedResponses[question.id]"
              :key="index"
              class="response-block"
            >
              <p><strong>Imię i nazwisko:</strong> {{ response.respondent_name || 'Anonim' }}</p>
              <p><strong>Email:</strong> {{ response.respondent_email || 'Brak' }}</p>
              <p><strong>Odpowiedź:</strong> {{ response.response_text }}</p>
            </div>
          </div>
          <div v-else>
            <em>Brak odpowiedzi na to pytanie.</em>
          </div>
        </div>
      </div>

      <router-link to="/my-forms" class="back-button">← Wróć do moich formularzy</router-link>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'FormDetails',
  components: { Header, Footer },
  data() {
    return {
      form: null,
      questions: [],
      groupedResponses: {}
    };
  },
  async created() {
    const formId = this.$route.params.formId;

    try {
      const formRes = await fetch(`http://localhost:3000/surveys/${formId}`);
      const responsesRes = await fetch(`http://localhost:3000/surveys/${formId}/responses`);

      if (!formRes.ok || !responsesRes.ok) throw new Error('Błąd pobierania danych');

      const formData = await formRes.json();
      const responseList = await responsesRes.json();

      this.form = formData;
      this.questions = formData.questions || [];

      this.groupResponses(responseList);
    } catch (err) {
      console.error('Błąd ładowania formularza:', err);
    }
  },
  methods: {
    groupResponses(responses) {
      const grouped = {};
      responses.forEach(resp => {
        let parsedText;
        try {
          parsedText = JSON.parse(resp.response_text_json);
        } catch {
          parsedText = resp.response_text_json;
        }

        if (!grouped[resp.question_id]) {
          grouped[resp.question_id] = [];
        }

        grouped[resp.question_id].push({
          ...resp,
          response_text: Array.isArray(parsedText) ? parsedText.join(', ') : parsedText
        });
      });
      this.groupedResponses = grouped;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 2rem;
  max-width: 800px;
  margin-left: 0;
}
.question-block {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f4ff;
  border-radius: 6px;
}
.response-block {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.back-button {
  display: inline-block;
  margin-top: 2rem;
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  border-radius: 5px;
}
.back-button:hover {
  background-color: #3c38c4;
}
</style>
