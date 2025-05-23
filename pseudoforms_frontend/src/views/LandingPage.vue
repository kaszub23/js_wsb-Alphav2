<template>
  <div>
    <Header />
    <HeroSection />
    <div style="text-align: center; margin: 2rem;">
      <!-- Button to Fetch All Forms -->
      <router-link to="/all-forms">
        <button class="fetch-button">Wyświetl wszystkie formularze</button>
      </router-link>
      <!-- Button to Add New Form -->
      <router-link to="/add-form">
        <button class="add-button">Dodaj nowy formularz</button>
      </router-link>
    </div>
    <RecentForms :forms="recentForms" />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import HeroSection from '../components/HeroSection.vue';
import RecentForms from '../components/RecentForms.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'LandingPage',
  components: {
    Header,
    HeroSection,
    RecentForms,
    Footer
  },
  data() {
    return {
      recentForms: [
        {
          title: 'Opinie użytkowników',
          description: 'Zbieraj opinie klientów na temat ostatnich zakupów.'
        },
        {
          title: 'Podanie o pracę',
          description: 'Formularz aplikacyjny na nasze wolne stanowiska.'
        },
        {
          title: 'Rejestracja wydarzenia',
          description: 'Umożliw użytkownikom łatwą rejestrację na Twoje wydarzenia.'
        },
        {
          title: 'Ankieta 2025',
          description: 'Roczne badanie mające na celu zrozumienie poziomu zadowolenia użytkowników.'
        },
        {
          title: 'Zapisz się do newslettera',
          description: 'Formularz służący do zbierania adresów e-mail, na które będziemy wysyłać nasz cotygodniowy newsletter.'
        }
      ]
    };
  }
};
</script>

<style scoped>
.fetch-button {
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
