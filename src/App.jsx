import styles from './App.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating } from './Rating';

function App() {

  const [input, setInput] = useState('')
  const [title, setTitle] = useState('')
  const [data, setData] = useState('')
  console.log(data.results)

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/akas/${title}`,
        headers: {
          'X-RapidAPI-Key': '48c376654fmshbc9fcd7f101d893p185d8ejsnad0509089642',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setData(response.data)
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [title]);

  function handleSearch() {
    setTitle(input.charAt(0).toUpperCase() + input.slice(1).toLowerCase());
    setInput('')
  }

  return (
    <div className={styles.main} >
      <div className={styles.searchContainer}>
        <input className={styles.inp} type='text' placeholder='enter title...' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button className={styles.btn} onClick={handleSearch}>Search</button>
      </div>

      {
        data && data.results.map((movie) => (
          <div className={styles.movieContainer} key={movie.id}>
            <img className={styles.image} src={movie.primaryImage.url}/>
            <div className={styles.titleContainer}>
              <h2 className={styles.title} >{movie.originalTitleText.text}</h2>
              <p className={styles.caption} ><span>Cast:</span> {movie.primaryImage.caption.plainText}</p>
              <p className={styles.release} ><span>Release Date:</span> {movie.releaseDate.day}-{movie.releaseDate.month}-{movie.releaseDate.year}</p>
              <Rating movieId={movie.id}/>
            </div>
          </div>
        ))
      }


      {/* <Rating movieId={data.id}/> */}
    </div>
  );
}

export default App;
