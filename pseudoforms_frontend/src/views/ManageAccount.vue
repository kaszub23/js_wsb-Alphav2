<template>
  <div>
    <Header />
    <h1>Zarządzanie kontem</h1>
    <p>Witaj, {{ user.name }}!</p>
    <p>Twoje konto:</p>
    <ul>
      <li>Imię i nazwisko: {{ user.name }}</li>
      <li>Adres e-mail: {{ user.email }}</li>
    </ul>
    <form @submit.prevent="changeName">
      <label for="newName">Nowa nazwa użytkownika:</label>
      <input type="text" id="newName" v-model="newName" />
      <button type="submit">Zmień nazwę</button>
    </form>
    <form @submit.prevent="changePassword">
      <label for="oldPassword">Stare hasło:</label>
      <input type="password" id="oldPassword" v-model="oldPassword" required />
      <label for="newPassword">Nowe hasło:</label>
      <input type="password" id="newPassword" v-model="newPassword" required />
      <button type="submit">Zmień hasło</button>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

export default {
  name: 'ManageAccount',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      user: {},
      newName: '',
      oldPassword: '',
      newPassword: ''
    };
  },
  mounted() {
    this.fetchUser ();
  },
  methods: {
    fetchUser () {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.user = user; // Ustawienie danych użytkownika
      }
    },
    async changeName() {
      try {
        await axios.patch('http://localhost:3000/users/change-name', {
          email: this.user.email,
          newName: this.newName
        });
        localStorage.removeItem('user');
        this.user.name = this.newName;
        axios.post('http://localhost:3000/users/login', {
          email: this.user.email,
          password: this.password
        });
 // Aktualizacja nazwy użytkownika w stanie
        localStorage.setItem('user', JSON.stringify(response.data)); // Zapisanie sesji
        this.$router.push('/'); // Przekierowanie na stronę główną
        this.newName = ''; // Resetowanie pola
      } catch (error) {
        console.error('Error changing name:', error);
      }
    },
    async changePassword() {
      try {
        await axios.patch('http://localhost:3000/users/change-password', {
          email: this.user.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        this.oldPassword = ''; // Resetowanie pola
        this.newPassword = ''; // Resetowanie pola
      } catch (error) {
        console.error('Error changing password:', error);
      }
    },
    logout() {
      localStorage.removeItem('user'); // Usunięcie sesji
      this.$router.push('/'); // Przekierowanie na stronę główną
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

  p {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #3b3f54;
  }
</style>
