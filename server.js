import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Proxy Server running');
});

app.get('/restaurant-list', async (req, res) => {
  const { lat, long } = req.query;

  if (!lat || !long) {
    return res
      .status(400)
      .json({ error: 'Latitude and longitude are required' });
  }
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  res.send(data);
});

app.get('/restaurantmenu-list', async (req, res) => {
  const { lat, long, id } = req.query;
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${id}&submitAction=ENTER`;
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
