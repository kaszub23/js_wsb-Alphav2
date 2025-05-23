<template>
  <header>
    <router-link to="/" class="logo">FormHub</router-link>
    <nav class="nav-links">
      <router-link v-if="!isLoggedIn" to="/login">
        <a href="#">Logowanie/Rejestracja</a>
      </router-link>
      <router-link v-if="isLoggedIn" to="/my-forms"> <a href="#">Moje formularze</a></router-link>

      <router-link v-if="isLoggedIn" to="/manage-account">
        <a href="#">Dane konta</a>
      </router-link>
      <router-link v-if="isLoggedIn" @click.prevent="logout">
        <a @click="logout">Wyloguj</a>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false
    };
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('user'); // Sprawdzenie, czy użytkownik jest zalogowany
  },
  methods: {
    logout() {
      localStorage.removeItem('user'); // Usunięcie sesji
      this.isLoggedIn = false; // Zaktualizowanie stanu
      this.$router.push('/'); // Przekierowanie na stronę główną
    },
  }
}
</script>

<style scoped>
header {
  background-color: #4f46e5;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
}
</style>