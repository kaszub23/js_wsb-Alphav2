<template>
  <div>
    <Header />
    <h1>Rejestracja</h1>
    <form @submit.prevent="register">
      <label for="name">Imię i nazwisko:</label>
      <input type="text" id="name" v-model="name" required />
      <br />
      <label for="email">Adres e-mail:</label>
      <input type="email" id="email" v-model="email" required />
      <br />
      <label for="password">Hasło:</label>
      <input type="password" id="password" v-model="password" required />
      <br />
      <button type="submit">Zarejestruj się</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    register() {
      axios.put('http://localhost:3000/users/register', {
  name: this.name,
  email: this.email,
  password: this.password
})
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data)); // Zapisanie sesji
        this.$router.push('/'); // Przekierowanie na stronę główną
      })
      .then(response => {
    localStorage.setItem('user.name', response.data.name); // Zapisanie nazwy użytkownika
    this.$router.push('/'); // Przekierowanie na stronę główną
  })
      .catch(error => {
        this.errorMessage = 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.'; // Ustawienie komunikatu o błędzie
        console.error(error);
      });
    }
  }
}
</script>
<style scoped>
  h1 {
    font-size: 2rem;
    color: #4f46e5;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  input[type="text"], input[type="email"], input[type="password"] {
    padding: 0.5rem;
    font-size: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button[type="submit"] {
    padding: 0.75rem 1.5rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #3b3f54;
  }
</style>
