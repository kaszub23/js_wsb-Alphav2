<template>
  <div>
    <Header />
    <section class="fill-form">
      <h2>Wypełnij formularz: {{ form.title }}</h2>
      <form @submit.prevent="submitForm" v-if="form.questions && form.questions.length">
        <div class="form-field">
          <label for="respondentName">Twoja nazwa (opcjonalnie):</label>
          <input
            type="text"
            id="respondentName"
            v-model="respondentName"
            placeholder="Wpisz swoją nazwę lub pozostaw puste"
          />
        </div>

        <div v-for="(question, qIndex) in form.questions" :key="qIndex" class="question-block">
          <label class="question-text">{{ question.text }}</label>

          <!-- Pytanie jednokrotnego wyboru -->
          <div v-if="question.type === 'single_choice'">
            <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-item">
              <input
                type="radio"
                :name="'question-' + qIndex"
                :value="option"
                v-model="responses[qIndex]"
                required
                :id="`q${qIndex}_option${oIndex}`"
              />
              <label :for="`q${qIndex}_option${oIndex}`">{{ option }}</label>
            </div>
          </div>

          <!-- Pytanie wielokrotnego wyboru -->
          <div v-else-if="question.type === 'multiple_choice'">
            <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-item">
              <input
                type="checkbox"
                :value="option"
                v-model="responses[qIndex]"
                :id="`q${qIndex}_option${oIndex}`"
              />
              <label :for="`q${qIndex}_option${oIndex}`">{{ option }}</label>
            </div>
          </div>

          <!-- Inne typy pytań (np. tekstowe) -->
          <div v-else>
            <input
              type="text"
              v-model="responses[qIndex]"
              placeholder="Wprowadź odpowiedź"
              required
            />
          </div>
        </div>
        <button type="submit" class="submit-btn">Wyślij odpowiedzi</button>
      </form>

      <div v-else>Ładowanie formularza lub brak pytań.</div>

      <!-- Nowy przycisk powrotu -->
      <button @click="$router.push('/my-forms')" class="back-btn">
        ← Wróć do moich formularzy
      </button>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'FillForm',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      form: {},
      responses: [],
      respondentName: ''
    };
  },
  async created() {
    const formId = this.$route.params.formId;
    const res = await fetch(`http://localhost:3000/surveys/${formId}`);
    if (!res.ok) {
      this.form = { title: '', questions: [] };
      return;
    }
    this.form = await res.json();
    this.responses = this.form.questions.map(q =>
      q.type === 'multiple_choice' ? [] : ''
    );
  },
  methods: {
    async submitForm() {
      try {
        const respondent_id = this.respondentName.trim() ? this.respondentName.trim() : 'anonymous';
        const payload = {
          respondent_id,
          responses: this.form.questions.map((q, i) => ({
            question_id: q.id,
            response_text: Array.isArray(this.responses[i]) ? this.responses[i].join(', ') : this.responses[i]
          }))
        };

        const res = await fetch(`http://localhost:3000/surveys/${this.form.id}/submit`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Nie udało się wysłać odpowiedzi');
        alert('Dziękujemy za wypełnienie formularza!');
        this.$router.push('/all-forms');
      } catch (error) {
        alert('Błąd podczas wysyłania odpowiedzi. Spróbuj ponownie.');
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.fill-form {
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
}

.form-field {
  margin-bottom: 1.5rem;
}

.question-block {
  margin-bottom: 1.5rem;
}

.question-text {
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.option-item {
  margin-bottom: 0.3rem;
}

input[type='text'] {
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #3b3f54;
}

.back-btn {
  margin-top: 2rem;
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
}

.back-btn:hover {
  background-color: #3b3f54;
}
</style>
