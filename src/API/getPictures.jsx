import axios from 'axios';

async function getPictures(searchQuery, page) {
  return await axios.get(
    `https://pixabay.com/api/?key=34679609-800cb3ce66b97456154e1ce44&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
}

export default getPictures;
