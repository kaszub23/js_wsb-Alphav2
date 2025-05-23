<template>
  <div>
    <Header />
    <section class="my-forms">
      <h2>Moje formularze</h2>

      <div v-if="createdForms.length === 0">Brak utworzonych formularzy.</div>
      <div v-else class="form-list">
        <div class="form-item" v-for="form in createdForms" :key="form.id">
          <h3>{{ form.title }}</h3>
          <p>Autor: {{ form.author || 'Brak' }}</p>
          <p>Stworzone dnia {{ formatDate(form.created_at) }}</p>
          <div class="buttons">
            <router-link :to="`/form-details/${form.id}`" class="btn">Szczegóły</router-link>
            <button class="btn danger" @click="deleteForm(form.id)">Usuń</button>
            


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
  name: 'MyForms',
  components: { Header, Footer },
  data() {
    return {
      userId: null,
      createdForms: []
    };
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      console.warn('Brak userId — przekierowanie na stronę główną');
      this.$router.push('/');
      return;
    }

    this.userId = user.id;

    try {
      const res = await fetch(`http://localhost:3000/surveys`);
      if (!res.ok) throw new Error('Błąd podczas pobierania formularzy');
      const allForms = await res.json();
      this.createdForms = allForms.filter(form => form.author === this.userId);
    } catch (err) {
      console.error('Błąd przy pobieraniu formularzy:', err);
    }
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },
    async deleteForm(id) {
      if (!confirm('Czy na pewno chcesz usunąć ten formularz?')) return;

      try {
        const res = await fetch(`http://localhost:3000/surveys/${id}`, {
          method: 'DELETE'
        });

        if (!res.ok) throw new Error('Błąd przy usuwaniu formularza');
        this.createdForms = this.createdForms.filter(form => form.id !== id);
      } catch (err) {
        console.error('Usuwanie nie powiodło się:', err);
      }
    }
  }
};
</script>

<style scoped>
.my-forms {
  padding: 2rem;
}

.form-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.form-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn {
  display: inline-block;
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
}

.btn:hover {
  background-color: #3b3f54;
}

.btn.danger {
  background-color: #e53e3e;
}

.btn.danger:hover {
  background-color: #c53030;
}
</style>
