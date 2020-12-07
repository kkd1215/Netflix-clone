import React, { useState, useEffect } from 'react';
import axios from '../modules/axios';
import '../includes/Row.css';
import Youtube from 'react-youtube';
import { API_KEY } from '../modules/request'


const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl] = useState("");

  const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

  const handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        async function fetchTrailer() {
          if(movie.media_type === 'tv'){
              const result = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}`);
              const trailerID = result.data.results[0].key;
              setTrailerUrl(trailerID.toString());
            } else {
              const result = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`);
              const trailerID = result.data.results[0].key;
              setTrailerUrl(trailerID.toString());
            }
        }
        fetchTrailer();
      }
       catch(err) {
        console.log(err);
      }



    }
  }

  const handleNetflix = (movie) => {
    if(trailerUrl) {
      setTrailerUrl("");
    } else {
      async function fetchTrailer() {
            const result = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}`);
            const trailerID = result.data.results[0].key;
            setTrailerUrl(trailerID.toString())
      }
      fetchTrailer();
    }
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  },[fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(movie => (
          <img
          key={movie.id}
          onClick={isLargeRow ? () => handleNetflix(movie) :() => handleClick(movie)}
          className= {`row__poster ${isLargeRow && "row__posterLarge"}`}
          src = {`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path }`}
          alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row;
