<template>
  <section class="recent-forms">
    <h2>Ostatnio dodane formularze</h2>
    <div class="form-list">
      <div class="form-item" v-for="(form, index) in forms" :key="index">
        <h3>{{ form.title }}</h3>
        <p>{{ form.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecentForms',
  props: {
    forms: Array
  }
};
</script>

<style scoped>
.recent-forms {
  padding: 2rem;
  background-color: #f1f5f9;
}

.recent-forms h2 {
  margin-bottom: 1rem;
}

.form-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.form-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.form-item h3 {
  margin: 0 0 0.5rem;
}

.form-item p {
  font-size: 0.9rem;
  color: #666;
}
</style>
