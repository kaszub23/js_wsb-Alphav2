<template>
    <section class="hero">
      <h1>Witaj w FormHub</h1>
      <p>
        Twórz, udostępniaj i zarządzaj wszystkimi swoimi formularzami online w jednym miejscu.
Niezależnie od tego, czy potrzebujesz szybkiego formularza opinii, czy pełnej ankiety,
mamy dla Ciebie rozwiązanie.
      </p>
      <router-link to="/add-form">
      <button class="add-form-button">Dodaj nowy formularz</button>
      </router-link>
    </section>
  </template>
  
  <style scoped>
  .hero {
    padding: 3rem 2rem;
    text-align: center;
    background: white;
  }
  
  .hero h1 {
    margin-bottom: 1rem;
  }
  
  .hero p {
    color: #555;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .add-form-button {
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  </style>