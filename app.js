import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_KEY = `5399311ff91564c4e964411e8bc3a18e`;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/weather', async (req, res) => {
  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    res.render('weather', { weather: weatherData });
  } catch (error) {
    res.render('error', { error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
