import axios from 'axios';

export async function fetchImage(word, page) {
  const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=UTvAqhbPZRLYhf5RvRrY2WLJr4BhwsNNhe9G3hI9KlE&query=${word}&per_page=12&page=${page}`);
  return response.data;
};