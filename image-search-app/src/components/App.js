import React from 'react';

//import axios from 'axios';
import { useState } from 'react';
function App() {
  const [image, setImage] = useState('');
  //const clientId = 'eJh5aF1WYVGFp_O8tYnLx8Lyk-7fXy2dBiuIWi5Xma4';
  const clientId = process.env.REACT_APP_ACCESS_KEY;
  const [result, setResult] = useState([]);
  const handleChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = () => {
    console.log(image);
    const url =
      'https://api.unsplash.com/search/photos?page=1&query=' +
      image +
      '&client_id=' +
      clientId;
    const fetchPhotos = async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results, 'data');
      setResult(data.results);
    };

    fetchPhotos();
  };

  return (
    <div className="app">
      <div className="heading">
        <h1>React Image Search Using Unsplash API.</h1>
      </div>

      <div className="input">
        <input
          onChange={handleChange}
          type="text"
          name="image"
          placeholder="Search for images"
        />
      </div>
      <button onClick={handleSubmit} type="submit">
        Search
      </button>
      <div className="result">
        {result.map((image) => (
          <>
            <div className="card">
              <img src={image.urls.small} alt="omage" />
              <p className="username"> Photo by {image.user.name}</p>
              <p className="like">👍 {image.likes}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
