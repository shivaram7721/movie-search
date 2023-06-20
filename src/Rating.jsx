import styles from './Rating.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Rating({movieId}) {

//   const [input, setInput] = useState('')
//   const [title, setTitle] = useState('')
  const [data, setData] = useState([])
  console.log(data)
  console.log(movieId)

  useEffect(() => {
    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: `https://moviesdatabase.p.rapidapi.com/titles/${movieId}/ratings`,
            headers: {
              'X-RapidAPI-Key': '48c376654fmshbc9fcd7f101d893p185d8ejsnad0509089642',
              'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              setData([response.data.results])
              console.log(response.data.results);
          } catch (error) {
              console.error(error);
          }
        };

    fetchData();
  }, [movieId]);


  return (
    <div className={styles.container} >
        {
          data.length > 0 && (
            <div className={styles.ratingContainer}>
              <p className={styles.rating} ><span>Rating:</span> {data[0].averageRating}</p>
              <p className={styles.votes} ><span>Number of votes:</span> {data[0].numVotes}</p>
            </div>
          )
        }
    </div>
  );
}

