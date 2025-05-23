const express = require('express');
const swaggerUI = require(`swagger-ui-express`);
const swaggerSpec = require(`./swagger`);
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const surveyRoutes = require('./routes/surveyRoutes');
const userRoutes = require('./routes/userRoutes')

const path = require('path');

app.use(express.json());
app.use(cors());
app.use(`/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/surveys', surveyRoutes);
app.use('/users', userRoutes);

//Błędy
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Coś poszło nie tak!' });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
  console.log('Swagger dostępny pod http://localhost:3000/api-docs')
});